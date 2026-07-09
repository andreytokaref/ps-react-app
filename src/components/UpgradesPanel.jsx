// src/components/UpgradesPanel.jsx
import React from 'react';
import UpgradeCard from './UpgradeCard';

function UpgradesPanel({ game }) {
    const upgrades = [
        {
            icon: '📦',
            title: 'Слоты экипировки',
            current: game.maxEquippedSlots,
            next: game.maxEquippedSlots + 1,
            cost: game.slotsUpgradeCost,
            onUpgrade: game.upgradeSlots
        },
        {
            icon: '🍀',
            title: 'Глобальная удача',
            current: `×${game.globalLuckMultiplier.toFixed(1)}`,
            next: `×${(game.globalLuckMultiplier * 1.13).toFixed(2)}`,
            cost: game.luckUpgradeCost,
            onUpgrade: game.upgradeLuck
        },
        {
            icon: '⚡',
            title: 'Скорость открытия',  // ← Переименовано
            current: `${game.autoOpenSpeed.toFixed(2)} сек`,  // ← Показываем секунды
            next: `${(game.autoOpenSpeed * 0.95).toFixed(2)} сек`,  // ← Уменьшаем интервал
            cost: game.autoUpgradeCost,
            onUpgrade: game.upgradeAutoOpen
        }
    ];

    return (
        <div className="upgrades-panel">
            <h2>🔼 Улучшения</h2>
            <div className="upgrades-grid">
                {upgrades.map((upgrade, index) => (
                    <UpgradeCard key={index} {...upgrade} />
                ))}
            </div>
        </div>
    );
}

export default UpgradesPanel;