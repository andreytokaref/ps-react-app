import { useEffect, useRef } from 'react';
import { EGGS_CONFIG } from '../config/gameConfig';
import { rollPet } from '../utils/rollPet';

export function useAutoOpen(state, isProcessing) {
    const autoOpenRef = useRef(null);

    useEffect(() => {
        if (state.autoOpenEnabled) {
            const intervalMs = state.autoOpenSpeed * 1000;

            autoOpenRef.current = setInterval(() => {
                if (isProcessing.current) return;

                const egg = EGGS_CONFIG.find(e => e.id === state.selectedEgg);
                if (!egg) return;

                const maxPossible = Math.floor(state.currency / egg.cost);
                if (maxPossible > 0) {
                    const count = Math.min(8, maxPossible);
                    const cost = egg.cost * count;

                    isProcessing.current = true;

                    state.setCurrency(prev => prev - cost);

                    const results = {};
                    state.setPets(prev => {
                        const newPets = { ...prev };
                        for (let i = 0; i < count; i++) {
                            const petName = rollPet(state.selectedEgg, state.globalLuckMultiplier);
                            if (petName) {
                                results[petName] = (results[petName] || 0) + 1;
                                if (!newPets[petName]) newPets[petName] = { count: 0, equipped: 0 };
                                newPets[petName] = { ...newPets[petName], count: newPets[petName].count + 1 };
                            }
                        }
                        return newPets;
                    });

                    const totalHatched = Object.values(results).reduce((s, v) => s + v, 0);
                    state.setTotalEggsOpened(prev => prev + count);
                    state.setTotalPetsHatched(prev => prev + totalHatched);
                    state.setLastResults({ count, results, eggId: state.selectedEgg });

                    setTimeout(() => { isProcessing.current = false; }, state.autoOpenSpeed * 1000);
                }
            }, intervalMs);

            return () => { if (autoOpenRef.current) clearInterval(autoOpenRef.current); };
        } else {
            if (autoOpenRef.current) clearInterval(autoOpenRef.current);
        }
    }, [state.autoOpenEnabled, state.autoOpenSpeed, state.selectedEgg]);
}