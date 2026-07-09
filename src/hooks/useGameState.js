import { useState, useEffect, useRef } from 'react';
import { GAME_CONFIG } from '../config/gameConfig';

export function useGameState() {
    const loadState = (key, defaultValue) => {
        const saved = localStorage.getItem('petSimulatorSave');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                return data[key] !== undefined ? data[key] : defaultValue;
            } catch (e) {
                return defaultValue;
            }
        }
        return defaultValue;
    };

    const [currency, setCurrency] = useState(() => loadState('currency', GAME_CONFIG.STARTING_CURRENCY));
    const [pets, setPets] = useState(() => loadState('pets', {}));
    const [maxEquippedSlots, setMaxEquippedSlots] = useState(() => loadState('maxEquippedSlots', GAME_CONFIG.MAX_EQUIPPED_SLOTS));
    const [globalLuckMultiplier, setGlobalLuckMultiplier] = useState(() => loadState('globalLuckMultiplier', 1.0));
    const [autoOpenSpeed, setAutoOpenSpeed] = useState(() => loadState('autoOpenSpeed', 2.0));
    const [autoOpenEnabled, setAutoOpenEnabled] = useState(() => loadState('autoOpenEnabled', false));
    const [selectedEgg, setSelectedEgg] = useState(() => loadState('selectedEgg', 'common'));
    const [totalEggsOpened, setTotalEggsOpened] = useState(() => loadState('totalEggsOpened', 0));
    const [totalPetsHatched, setTotalPetsHatched] = useState(() => loadState('totalPetsHatched', 0));
    const [slotsUpgradeCost, setSlotsUpgradeCost] = useState(() => loadState('slotsUpgradeCost', 1000));
    const [luckUpgradeCost, setLuckUpgradeCost] = useState(() => loadState('luckUpgradeCost', 1000));
    const [autoUpgradeCost, setAutoUpgradeCost] = useState(() => loadState('autoUpgradeCost', 500));
    const [lastResults, setLastResults] = useState(null);
    const [rarePet, setRarePet] = useState(null);
    const [showEquipDialog, setShowEquipDialog] = useState(null);
    const [notification, setNotification] = useState(null);
    const [shards, setShards] = useState(() => loadState('shards', 0));
    const [enchants, setEnchants] = useState(() => loadState('enchants', {}));
    return {
        currency, setCurrency,
        pets, setPets,
        maxEquippedSlots, setMaxEquippedSlots,
        globalLuckMultiplier, setGlobalLuckMultiplier,
        autoOpenSpeed, setAutoOpenSpeed,
        autoOpenEnabled, setAutoOpenEnabled,
        selectedEgg, setSelectedEgg,
        totalEggsOpened, setTotalEggsOpened,
        totalPetsHatched, setTotalPetsHatched,
        slotsUpgradeCost, setSlotsUpgradeCost,
        luckUpgradeCost, setLuckUpgradeCost,
        autoUpgradeCost, setAutoUpgradeCost,
        lastResults, setLastResults,
        rarePet, setRarePet,
        showEquipDialog, setShowEquipDialog,
        notification, setNotification,
        shards, setShards,
        enchants, setEnchants,
        loadState
    };
}