import React from 'react';
import { formatNumber } from '../utils/format';
import { RARITY_COLORS, RARITY_ORDER, ALL_PETS } from '../config/gameConfig';
import ResetButton from '../components/ResetButton';


function StatsPage({ game }) {
    // Статистика по редкостям
    // Статистика по редкостям
    const rarityStats = {};
    let totalPets = 0;

    Object.entries(game.pets).forEach(([name, data]) => {
        const pet = ALL_PETS[name];
        if (!pet) return;

        if (!rarityStats[pet.rarity]) {
            rarityStats[pet.rarity] = { count: 0, equipped: 0 };
        }
        rarityStats[pet.rarity].count += data.count;
        rarityStats[pet.rarity].equipped += data.equipped;
        totalPets += data.count;
    });

    // Самый редкий пет (по шансу выпадения)
    let rarestPet = null;
    let rarestChance = 0; // Ищем наибольший делитель (самый редкий)

    Object.entries(game.pets).forEach(([name, data]) => {
        if (data.count === 0) return;
        const pet = ALL_PETS[name];
        if (!pet) return;

        // Чем больше chance, тем реже пет
        if (pet.chance > rarestChance) {
            rarestChance = pet.chance;
            rarestPet = { name, ...pet, count: data.count };
        }
    });

    return (
        <div className="stats-page">
            <h2>📊 Статистика</h2>

            <div className="stats-grid">
                {/* Общая статистика */}
                <div className="stats-card">
                    <h3>📈 Общее</h3>
                    <div className="stats-row">
                        <span>💰 Валюта</span>
                        <span className="stats-value">{formatNumber(game.currency)}</span>
                    </div>
                    <div className="stats-row">
                        <span>📦 Всего петов</span>
                        <span className="stats-value">{formatNumber(totalPets)}</span>
                    </div>
                    <div className="stats-row">
                        <span>🥚 Открыто яиц</span>
                        <span className="stats-value">{formatNumber(game.totalEggsOpened)}</span>
                    </div>
                    <div className="stats-row">
                        <span>💠 Шардов</span>
                        <span className="stats-value" style={{ color: '#00bcd4' }}>{formatNumber(game.shards)}</span>
                    </div>
                </div>

                {/* Доход и удача */}
                <div className="stats-card">
                    <h3>⚡ Характеристики</h3>
                    <div className="stats-row">
                        <span>📈 Доход/сек</span>
                        <span className="stats-value" style={{ color: '#4CAF50' }}>{formatNumber(game.totalIncome)}</span>
                    </div>
                    <div className="stats-row">
                        <span>🍀 Общая удача</span>
                        <span className="stats-value" style={{ color: '#f0c040' }}>×{game.totalLuck.toFixed(2)}</span>
                    </div>
                    <div className="stats-row">
                        <span>🌟 Глобальная удача</span>
                        <span className="stats-value" style={{ color: '#f0c040' }}>×{game.globalLuckMultiplier.toFixed(2)}</span>
                    </div>
                    <div className="stats-row">
                        <span>🎒 Слоты</span>
                        <span className="stats-value" style={{ color: '#2196F3' }}>{game.totalEquipped}/{game.maxEquippedSlots}</span>
                    </div>
                </div>

                {/* Авто-открывание */}
                <div className="stats-card">
                    <h3>🤖 Авто-открывание</h3>
                    <div className="stats-row">
                        <span>Статус</span>
                        <span className="stats-value" style={{ color: game.autoOpenEnabled ? '#4CAF50' : '#f44336' }}>
                            {game.autoOpenEnabled ? 'Включено' : 'Выключено'}
                        </span>
                    </div>
                    <div className="stats-row">
                        <span>Интервал</span>
                        <span className="stats-value">{game.autoOpenSpeed.toFixed(2)} сек</span>
                    </div>
                    <div className="stats-row">
                        <span>Текущее яйцо</span>
                        <span className="stats-value" style={{ color: game.currentEgg?.color }}>
                            {game.currentEgg?.name || '—'}
                        </span>
                    </div>
                </div>

                {/* Распределение по редкостям */}
                <div className="stats-card stats-full">
                    <h3>🎨 Петов по редкостям</h3>
                    <div className="rarity-bars">
                        {RARITY_ORDER.map(rarity => {
                            const stats = rarityStats[rarity];
                            const count = stats ? stats.count : 0;
                            const equipped = stats ? stats.equipped : 0;
                            const percent = totalPets > 0 ? (count / totalPets * 100) : 0;

                            return (
                                <div key={rarity} className="rarity-bar-row">
                                    <div className="rarity-bar-label">
                                        <span style={{ color: RARITY_COLORS[rarity] }}>{rarity}</span>
                                        <span className="rarity-bar-count">
                                            {formatNumber(count)}
                                            {equipped > 0 && ` (${equipped} экип.)`}
                                        </span>
                                    </div>
                                    <div className="rarity-bar-track">
                                        <div
                                            className="rarity-bar-fill"
                                            style={{
                                                width: `${Math.max(percent, 0.01)}%`,
                                                background: RARITY_COLORS[rarity],
                                                boxShadow: `0 0 10px ${RARITY_COLORS[rarity]}44`
                                            }}
                                        />
                                    </div>
                                    <span className="rarity-bar-percent">{percent.toFixed(2)}%</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Самый редкий пет */}
                {rarestPet && (
                    <div className="stats-card">
                        <h3>👑 Самый редкий пет</h3>
                        <div className="rarest-pet-display">
                            <span className="rarest-pet-icon">{rarestPet.icon}</span>
                            <div>
                                <div style={{ color: RARITY_COLORS[rarestPet.rarity], fontWeight: 'bold', fontSize: '16px' }}>
                                    {rarestPet.name}
                                </div>
                                <div style={{ color: RARITY_COLORS[rarestPet.rarity], fontSize: '13px' }}>
                                    {rarestPet.rarity}
                                </div>
                                <div style={{ color: '#f0c040', fontSize: '12px', marginTop: '3px' }}>
                                    Шанс: 1 / {formatNumber(rarestPet.chance)}
                                </div>
                                <div style={{ color: '#888', fontSize: '12px', marginTop: '2px' }}>
                                    В коллекции: {formatNumber(rarestPet.count)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Улучшения */}
                <div className="stats-card">
                    <h3>🔼 Уровни улучшений</h3>
                    <div className="stats-row">
                        <span>📦 Слоты</span>
                        <span className="stats-value">{game.maxEquippedSlots} (след. {formatNumber(game.slotsUpgradeCost)} 💰)</span>
                    </div>
                    <div className="stats-row">
                        <span>🍀 Удача</span>
                        <span className="stats-value">×{game.globalLuckMultiplier.toFixed(1)} (след. {formatNumber(game.luckUpgradeCost)} 💰)</span>
                    </div>
                    <div className="stats-row">
                        <span>⚡ Скорость</span>
                        <span className="stats-value">{game.autoOpenSpeed.toFixed(1)} сек (след. {formatNumber(game.autoUpgradeCost)} 💰)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatsPage;