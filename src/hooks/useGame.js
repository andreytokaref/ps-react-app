// src/hooks/useGame.js
import { useCallback, useEffect, useRef } from 'react';
import { useGameState } from './useGameState';
import { useGameSave } from './useGameSave';
import { useEggOpening } from './useEggOpening';
import { usePets } from './usePets';
import { useUpgrades } from './useUpgrades';
import { useAutoOpen } from './useAutoOpen';
import { EGGS_CONFIG, GAME_CONFIG, ENCHANTS } from '../config/gameConfig';

export function useGame() {
    const state = useGameState();
    const { saveGame } = useGameSave(state);

    const showNotification = useCallback((message, type) => {
        state.setNotification({ message, type });
        setTimeout(() => state.setNotification(null), 1500);
    }, []);

    const { openEggs, isProcessing } = useEggOpening(state, showNotification);
    const pets = usePets(state, showNotification);
    const upgrades = useUpgrades(state, showNotification);

    useAutoOpen(state, isProcessing);

    // Доход с учетом энчантов
    const incomeMultiplier = Object.entries(state.enchants).reduce((mult, [id, count]) => {
        const enchant = ENCHANTS.find(e => e.id === id);
        if (enchant && id.startsWith('income')) {
            mult *= Math.pow(enchant.multiplier, count);
        }
        return mult;
    }, 1.0);

    const totalIncome = pets.totalIncome * incomeMultiplier;

    // Удача с учетом энчантов
    const luckMultiplier = Object.entries(state.enchants).reduce((mult, [id, count]) => {
        const enchant = ENCHANTS.find(e => e.id === id);
        if (enchant && id.startsWith('luck')) {
            mult *= Math.pow(enchant.multiplier, count);
        }
        return mult;
    }, 1.0);

    const totalLuck = state.globalLuckMultiplier * luckMultiplier;

    // Слоты с учетом энчантов
    const extraSlots = Object.entries(state.enchants).reduce((slots, [id, count]) => {
        const enchant = ENCHANTS.find(e => e.id === id);
        if (enchant && id.startsWith('slots')) {
            slots += enchant.multiplier * count;
        }
        return slots;
    }, 0);

    const effectiveSlots = state.maxEquippedSlots + extraSlots;

    // Генерация дохода
    const incomeRef = useRef(null);
    useEffect(() => {
        incomeRef.current = setInterval(() => {
            state.setCurrency(prev => prev + totalIncome);
        }, 1000);
        return () => clearInterval(incomeRef.current);
    }, [totalIncome]);

    // Покупка энчанта
    const buyEnchant = useCallback((enchantId) => {
        const enchant = ENCHANTS.find(e => e.id === enchantId);
        if (!enchant) return;

        if (state.shards >= enchant.cost) {
            state.setShards(prev => prev - enchant.cost);
            state.setEnchants(prev => ({
                ...prev,
                [enchantId]: (prev[enchantId] || 0) + 1
            }));
            showNotification(`✅ ${enchant.name} куплен!`, 'success');
        } else {
            showNotification('❌ Недостаточно шардов!', 'error');
        }
    }, [state, showNotification]);

    const enchantPet = useCallback((petName) => {
        if (state.shards < 1) {
            showNotification('❌ Недостаточно шардов!', 'error');
            return;
        }

        const petData = state.pets[petName];
        if (!petData) return;

        // Тратим шард
        state.setShards(prev => prev - 1);

        // Выбираем энчант по шансам
        const roll = Math.random();
        let cumulative = 0;
        let selectedEnchant = ENCHANTS[0]; // По умолчанию первый

        for (let enchant of ENCHANTS) {
            cumulative += enchant.chance;
            if (roll <= cumulative) {
                selectedEnchant = enchant;
                break;
            }
        }

        // Применяем энчант к пету
        state.setPets(prev => ({
            ...prev,
            [petName]: {
                ...prev[petName],
                enchant: selectedEnchant.id
            }
        }));

        // Показываем результат
        const rarity = selectedEnchant.chance >= 0.10 ? 'обычный' :
            selectedEnchant.chance >= 0.05 ? 'редкий' :
                selectedEnchant.chance >= 0.02 ? 'эпический' : 'легендарный';

        showNotification(`✨ ${petName} получил ${rarity} энчант: ${selectedEnchant.name}!`, 'success');
    }, [state, showNotification]);


    const resetGame = useCallback(() => {
        localStorage.removeItem('petSimulatorSave');
        state.setCurrency(GAME_CONFIG.STARTING_CURRENCY);
        state.setPets({});
        state.setMaxEquippedSlots(GAME_CONFIG.MAX_EQUIPPED_SLOTS);
        state.setGlobalLuckMultiplier(1.0);
        state.setAutoOpenSpeed(2.0);
        state.setAutoOpenEnabled(false);
        state.setSelectedEgg('common');
        state.setTotalEggsOpened(0);
        state.setTotalPetsHatched(0);
        state.setSlotsUpgradeCost(1000);
        state.setLuckUpgradeCost(1000);
        state.setAutoUpgradeCost(500);
        state.setShards(0);
        state.setEnchants({});
        state.setLastResults(null);
        state.setRarePet(null);
        showNotification('🔄 Прогресс сброшен!', 'info');
    }, [showNotification]);

    const currentEgg = EGGS_CONFIG.find(e => e.id === state.selectedEgg) || EGGS_CONFIG[0];

    return {
        ...state,
        ...pets,
        ...upgrades,
        totalIncome,
        totalLuck,
        totalEquipped: pets.totalEquipped,
        maxEquippedSlots: effectiveSlots,
        openEggs,
        buyEnchant,
        resetGame,
        currentEgg,
        enchantPet,
        EGGS_CONFIG
    };
}