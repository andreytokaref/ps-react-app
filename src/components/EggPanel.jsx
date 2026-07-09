// src/components/EggPanel.jsx
import React, { useState } from 'react';
import { formatNumber, getEffectiveChances } from '../utils/format';
import { RARITY_COLORS, RARITY_ORDER } from '../config/gameConfig';

function EggPanel({ game }) {
    const egg = game.currentEgg;
    const [showEggSelect, setShowEggSelect] = useState(false);
    const [showChances, setShowChances] = useState(false);

    const chances = getEffectiveChances(game.totalLuck, egg.pets);

    const rarityGroups = {};
    chances.forEach(({ config, percentage, effectiveChance }) => {
        if (!rarityGroups[config.rarity]) {
            rarityGroups[config.rarity] = [];
        }
        rarityGroups[config.rarity].push({ config, percentage, effectiveChance });
    });

    return (
        <div className="egg-panel">
            {/* Выбор яйца */}
            <div className="egg-select-header" onClick={() => setShowEggSelect(!showEggSelect)}>
                <h2 style={{ color: egg.color }}>{egg.icon} {egg.name}</h2>
                <span className="egg-select-arrow">{showEggSelect ? '▲' : '▼'}</span>
            </div>

            {showEggSelect && (
                <div className="egg-selector">
                    {game.EGGS_CONFIG.map(e => (
                        <button
                            key={e.id}
                            className={`egg-select-btn ${game.selectedEgg === e.id ? 'active' : ''}`}
                            onClick={(ev) => {
                                ev.stopPropagation();
                                game.setSelectedEgg(e.id);
                                setShowEggSelect(false);
                            }}
                            style={{ borderColor: e.color }}
                        >
                            <span style={{ fontSize: '20px' }}>{e.icon}</span>
                            <span style={{ fontSize: '11px' }}>{e.name}</span>
                            <span style={{ fontSize: '10px', color: '#f0c040' }}>{formatNumber(e.cost)} 💰</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Яйцо */}
            <div className="egg-container" onClick={() => game.openEggs(1)}>
                <div className="egg-animation">
                    <span className="egg-icon" style={{ filter: `drop-shadow(0 0 20px ${egg.color})` }}>
                        {egg.icon}
                    </span>
                </div>
            </div>

            <div className="egg-info">
                <p>Стоимость: {formatNumber(egg.cost)} 💰</p>
                <p>🍀 Удача: ×{game.totalLuck.toFixed(2)}</p>

                <div className="open-buttons">
                    <button className="btn btn-open" onClick={() => game.openEggs(1)}>1 яйцо</button>
                    <button className="btn btn-open" onClick={() => game.openEggs(3)}>3 яйца</button>
                    <button className="btn btn-open" onClick={() => game.openEggs(8)}>8 яиц</button>
                </div>

                <button
                    className={`btn btn-auto ${game.autoOpenEnabled ? 'active' : ''}`}
                    onClick={game.toggleAutoOpen}
                >
                    🤖 Авто: {game.autoOpenEnabled ? 'Вкл' : 'Выкл'}
                </button>
                <div className="auto-speed">Интервал: {game.autoOpenSpeed.toFixed(2)} сек</div>

                {/* Кнопка шансов */}
                <button
                    className="btn btn-chances"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowChances(prev => !prev);
                    }}
                >
                    {showChances ? '▲ Скрыть шансы' : '▼ Показать шансы'}
                </button>

                {/* Список шансов */}
                {showChances && (
                    <div className="chances-container">
                        <h4>Шансы выпадения (удача ×{game.totalLuck.toFixed(1)}):</h4>
                        {RARITY_ORDER.map(rarity => {
                            if (!rarityGroups[rarity]) return null;
                            return (
                                <div key={rarity} className="rarity-group">
                                    <div className="rarity-title" style={{ color: RARITY_COLORS[rarity] }}>
                                        {rarity}
                                    </div>
                                    {rarityGroups[rarity].map(({ config, percentage, effectiveChance }) => (
                                        <div key={config.name} className="chance-item" style={{ color: RARITY_COLORS[rarity] }}>
                                            <span>{config.icon} {config.name}</span>
                                            <span>
                                                {percentage >= 1
                                                    ? `${percentage.toFixed(2)}%`
                                                    : `1/${formatNumber(effectiveChance)}`
                                                }
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default EggPanel;