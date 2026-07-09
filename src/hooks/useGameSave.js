import { useEffect, useCallback } from 'react';

export function useGameSave(state) {
    const saveGame = useCallback(() => {
        const data = {
            currency: state.currency,
            pets: state.pets,
            maxEquippedSlots: state.maxEquippedSlots,
            globalLuckMultiplier: state.globalLuckMultiplier,
            autoOpenSpeed: state.autoOpenSpeed,
            autoOpenEnabled: state.autoOpenEnabled,
            selectedEgg: state.selectedEgg,
            totalEggsOpened: state.totalEggsOpened,      // ← должно быть
            totalPetsHatched: state.totalPetsHatched,      // ← должно быть
            slotsUpgradeCost: state.slotsUpgradeCost,
            luckUpgradeCost: state.luckUpgradeCost,
            autoUpgradeCost: state.autoUpgradeCost,
            shards: state.shards,                          // ← должно быть
            enchants: state.enchants,                      // ← должно быть
        };
        localStorage.setItem('petSimulatorSave', JSON.stringify(data));
    }, [state]);

    useEffect(() => {
        saveGame();
    }, [
        state.currency, state.pets, state.maxEquippedSlots,
        state.globalLuckMultiplier, state.autoOpenSpeed,
        state.autoOpenEnabled, state.selectedEgg,
        state.slotsUpgradeCost, state.luckUpgradeCost, state.autoUpgradeCost
    ]);

    useEffect(() => {
        const handleBeforeUnload = () => saveGame();
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [saveGame]);

    return { saveGame };
}