import { useCallback } from 'react';

export function useUpgrades(state, showNotification) {
    const upgradeSlots = useCallback(() => {
        if (state.currency >= state.slotsUpgradeCost) {
            state.setCurrency(prev => prev - state.slotsUpgradeCost);
            state.setMaxEquippedSlots(prev => prev + 1);
            state.setSlotsUpgradeCost(prev => prev * 10);
            showNotification('📦 Слоты улучшены!', 'success');
        } else {
            showNotification('❌ Недостаточно валюты!', 'error');
        }
    }, [state, showNotification]);

    const upgradeLuck = useCallback(() => {
        if (state.currency >= state.luckUpgradeCost) {
            state.setCurrency(prev => prev - state.luckUpgradeCost);
            state.setGlobalLuckMultiplier(prev => prev * 1.13);
            state.setLuckUpgradeCost(prev => prev * 3);
            showNotification('🍀 Удача улучшена!', 'success');
        } else {
            showNotification('❌ Недостаточно валюты!', 'error');
        }
    }, [state, showNotification]);

    const upgradeAutoOpen = useCallback(() => {
        if (state.currency >= state.autoUpgradeCost) {
            state.setCurrency(prev => prev - state.autoUpgradeCost);
            state.setAutoOpenSpeed(prev => Math.max(0.1, prev * 0.95));
            state.setAutoUpgradeCost(prev => prev * 2.5);
            showNotification('⚡ Скорость открытия улучшена!', 'success');
        } else {
            showNotification('❌ Недостаточно валюты!', 'error');
        }
    }, [state, showNotification]);

    const toggleAutoOpen = useCallback(() => {
        state.setAutoOpenEnabled(prev => {
            const newState = !prev;
            showNotification(newState ? '🤖 Авто-открывание включено!' : '🤖 Авто-открывание выключено!', 'info');
            return newState;
        });
    }, [state, showNotification]);

    return { upgradeSlots, upgradeLuck, upgradeAutoOpen, toggleAutoOpen };
}