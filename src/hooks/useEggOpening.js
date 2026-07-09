import { useCallback, useRef } from 'react';
import { EGGS_CONFIG, GAME_CONFIG } from '../config/gameConfig';
import { rollPet } from '../utils/rollPet';

export function useEggOpening(state, showNotification) {
    const isProcessing = useRef(false);

    const openEggs = useCallback((count) => {
        const egg = EGGS_CONFIG.find(e => e.id === state.selectedEgg);
        if (!egg) return;

        const cost = egg.cost * count;

        if (state.currency < cost) {
            showNotification('❌ Недостаточно валюты!', 'error');
            return;
        }

        if (isProcessing.current) return;
        isProcessing.current = true;

        state.setCurrency(prev => prev - cost);

        const results = {};
        let shardsEarned = 0;

        state.setPets(prev => {
            const newPets = { ...prev };

            for (let i = 0; i < count; i++) {
                const petName = rollPet(state.selectedEgg, state.globalLuckMultiplier);
                if (petName) {
                    results[petName] = (results[petName] || 0) + 1;
                    if (!newPets[petName]) {
                        newPets[petName] = { count: 0, equipped: 0, enchant: null };
                    }
                    newPets[petName] = {
                        ...newPets[petName],
                        count: newPets[petName].count + 1
                    };
                }

                // Шанс на шард 1 к 1000
                if (Math.random() < 1 / GAME_CONFIG.SHARD_CHANCE) {
                    shardsEarned++;
                }
            }

            return newPets;
        });

        if (shardsEarned > 0) {
            state.setShards(prev => prev + shardsEarned);
        }

        const totalHatched = Object.values(results).reduce((s, v) => s + v, 0);
        state.setTotalEggsOpened(prev => prev + count);
        state.setTotalPetsHatched(prev => prev + totalHatched);
        state.setLastResults({ count, results, eggId: state.selectedEgg, shardsEarned });

        for (let petName in results) {
            const egg = EGGS_CONFIG.find(e => e.id === state.selectedEgg);
            const pet = egg?.pets.find(p => p.name === petName);
            if (pet && ['Legendary', 'Secret', 'Celestial', 'Exotic'].includes(pet.rarity)) {
                state.setRarePet(pet);
                setTimeout(() => state.setRarePet(null), 3000);
            }
        }

        setTimeout(() => { isProcessing.current = false; }, state.autoOpenSpeed * 1000);

    }, [state, showNotification]);

    return { openEggs, isProcessing };
}