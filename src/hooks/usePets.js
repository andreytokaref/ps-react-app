import { useCallback } from 'react';
import { ALL_PETS } from '../config/gameConfig';

export function usePets(state, showNotification) {
    const totalIncome = Object.entries(state.pets).reduce((total, [name, data]) => {
        if (data.equipped > 0) {
            const pet = ALL_PETS[name];
            if (pet) total += pet.income * data.equipped;
        }
        return total;
    }, 0);

    const totalEquipped = Object.values(state.pets).reduce((sum, data) => sum + data.equipped, 0);
    const totalPetsCount = Object.values(state.pets).reduce((sum, data) => sum + data.count, 0);

    const equipPet = useCallback((petName) => {
        const petData = state.pets[petName];
        if (!petData) return;

        if (totalEquipped >= state.maxEquippedSlots) {
            showNotification('❌ Нет свободных слотов!', 'error');
            return;
        }

        const available = petData.count - petData.equipped;
        if (available <= 0) {
            showNotification('❌ Нет доступных петов!', 'error');
            return;
        }

        const maxEquip = Math.min(available, state.maxEquippedSlots - totalEquipped);

        if (maxEquip === 1) {
            // Если можно экипировать только 1 - делаем сразу
            state.setPets(prev => ({
                ...prev,
                [petName]: { ...prev[petName], equipped: prev[petName].equipped + 1 }
            }));
            showNotification(`✅ ${petName} экипирован!`, 'success');
        } else {
            // Показываем диалог
            state.setShowEquipDialog({ petName, maxEquip, type: 'equip' });
        }
    }, [state, totalEquipped, showNotification]);

    const unequipPet = useCallback((petName) => {
        const petData = state.pets[petName];
        if (!petData || petData.equipped <= 0) return;

        if (petData.equipped === 1) {
            // Если экипирован только 1 - снимаем сразу
            state.setPets(prev => ({
                ...prev,
                [petName]: { ...prev[petName], equipped: prev[petName].equipped - 1 }
            }));
            showNotification(`❌ ${petName} снят!`, 'info');
        } else {
            // Показываем диалог
            state.setShowEquipDialog({ petName, maxEquip: petData.equipped, type: 'unequip' });
        }
    }, [state, showNotification]);

    const confirmEquip = useCallback((petName, count) => {
        state.setPets(prev => ({
            ...prev,
            [petName]: { ...prev[petName], equipped: prev[petName].equipped + parseInt(count) }
        }));
        state.setShowEquipDialog(null);
        showNotification(`✅ ${petName} x${count} экипирован!`, 'success');
    }, [state, showNotification]);

    const confirmUnequip = useCallback((petName, count) => {
        state.setPets(prev => ({
            ...prev,
            [petName]: { ...prev[petName], equipped: prev[petName].equipped - parseInt(count) }
        }));
        state.setShowEquipDialog(null);
        showNotification(`❌ ${petName} x${count} снят!`, 'info');
    }, [state, showNotification]);

    return { totalIncome, totalEquipped, totalPetsCount, equipPet, unequipPet, confirmEquip, confirmUnequip };
}