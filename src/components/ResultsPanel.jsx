import React, { useState, useEffect, useRef } from 'react';
import { RARITY_COLORS, RARITY_ORDER, ALL_PETS, EGGS_CONFIG } from '../config/gameConfig';

function ResultsPanel({ game }) {
    const [resultsHistory, setResultsHistory] = useState([]);
    const listRef = useRef(null);

    useEffect(() => {
        if (game.lastResults) {
            setResultsHistory(prev => [game.lastResults, ...prev].slice(0, 30));
        }
    }, [game.lastResults]);

    if (resultsHistory.length === 0) {
        return (
            <div className="results-panel">
                <h2>🎉 Последние открытия</h2>
                <div className="results-list" ref={listRef}>
                    <p className="placeholder">Откройте яйцо, чтобы увидеть результат!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="results-panel">
            <h2>🎉 Последние открытия</h2>
            <div className="results-list" ref={listRef}>
                {resultsHistory.map((result, index) => {
                    const { count, results, eggId, shardsEarned } = result;

                    const rarityGroups = {};
                    for (let petName in results) {
                        const pet = ALL_PETS[petName];
                        if (pet) {
                            if (!rarityGroups[pet.rarity]) {
                                rarityGroups[pet.rarity] = [];
                            }
                            rarityGroups[pet.rarity].push({
                                name: petName,
                                count: results[petName]
                            });
                        }
                    }

                    const egg = EGGS_CONFIG.find(e => e.id === eggId);
                    const eggName = egg ? egg.name : 'Яйцо';

                    return (
                        <div key={index} className="result-item">
                            <strong>🎉 {eggName}: {count} яиц</strong>
                            {shardsEarned > 0 && (
                                <span className="shards-earned">💠 +{shardsEarned}</span>
                            )}
                            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 5, gap: 4 }}>
                                {RARITY_ORDER.map(rarity => {
                                    if (!rarityGroups[rarity]) return null;
                                    return (
                                        <span
                                            key={rarity}
                                            className="rarity-block"
                                            style={{
                                                borderLeft: `3px solid ${RARITY_COLORS[rarity]}`,
                                            }}
                                        >
                                            <span style={{ color: RARITY_COLORS[rarity], fontWeight: 'bold' }}>
                                                {rarity}:
                                            </span>
                                            {' '}
                                            {rarityGroups[rarity].map(p => `${p.name} x${p.count}`).join(', ')}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ResultsPanel;