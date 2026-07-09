import React, { useState } from 'react';
import { ENCHANTS, ALL_PETS, RARITY_COLORS } from '../config/gameConfig';
import { formatNumber } from '../utils/format';

function EnchantsPage({ game }) {
    const [selectedPet, setSelectedPet] = useState(null);

    const ownedPets = Object.entries(game.pets).filter(([_, data]) => data.count > 0);

    const handleEnchant = () => {
        if (!selectedPet) {
            alert('Сначала выберите пета!');
            return;
        }

        if (game.shards < 1) {
            alert('Недостаточно шардов! Нужен 1 шард.');
            return;
        }

        game.enchantPet(selectedPet);
    };

    return (
        <div className="enchants-page">
            <div className="enchants-header">
                <h2>✨ Зачарование петов</h2>
                <div className="shards-display">
                    💠 Шарды: <span>{formatNumber(game.shards)}</span>
                </div>
                <p className="enchants-info">
                    1 зачарование = 1 шард. Шарды выпадают при открытии яиц (1 к 1000)
                </p>
            </div>

            {/* Выбор пета */}
            <div className="enchant-select-pet">
                <h3>Выберите пета для зачарования:</h3>
                {ownedPets.length === 0 ? (
                    <p className="placeholder">У вас пока нет петов!</p>
                ) : (
                    <div className="pet-select-list">
                        {ownedPets.map(([name, data]) => {
                            const pet = ALL_PETS[name];
                            if (!pet) return null;
                            const enchant = ENCHANTS.find(e => e.id === data.enchant);
                            const enchantName = enchant ? enchant.name : null;

                            return (
                                <div
                                    key={name}
                                    className={`pet-select-item ${selectedPet === name ? 'selected' : ''}`}
                                    onClick={() => setSelectedPet(name)}
                                    style={{
                                        borderLeft: `3px solid ${RARITY_COLORS[pet.rarity] || '#888'}`
                                    }}
                                >
                                    <span className="pet-select-icon">{pet.icon}</span>
                                    <div className="pet-select-info">
                                        <span style={{ color: RARITY_COLORS[pet.rarity] || '#fff', fontWeight: 'bold' }}>
                                            {name}
                                        </span>
                                        <span className="pet-select-rarity" style={{ color: RARITY_COLORS[pet.rarity] || '#888' }}>
                                            {pet.rarity}
                                        </span>
                                    </div>
                                    <span className="pet-select-count">x{data.count}</span>
                                    {enchantName ? (
                                        <span className="pet-select-enchant" style={{ color: '#00bcd4' }}>
                                            ✨ {enchantName}
                                        </span>
                                    ) : (
                                        <span className="pet-select-no-enchant" style={{ color: '#666' }}>
                                            Нет энчанта
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Кнопка зачарования */}
            {selectedPet && (
                <div className="enchant-action">
                    <h3>Зачаровать выбранного пета</h3>
                    <p style={{ color: '#888', fontSize: '13px', marginBottom: '15px' }}>
                        Стоимость: 1 💠 за попытку. Вы получите случайный энчант из списка ниже.
                    </p>

                    <button
                        className="btn btn-enchant-main"
                        onClick={handleEnchant}
                        disabled={game.shards < 1}
                    >
                        ✨ Зачаровать за 1 💠
                    </button>

                    {/* Список всех энчантов */}
                    <div className="enchants-list">
                        <h4>Возможные энчанты:</h4>
                        <div className="enchants-grid">
                            {ENCHANTS.map(enchant => (
                                <div key={enchant.id} className="enchant-card">
                                    <div className="enchant-icon">{enchant.icon}</div>
                                    <div className="enchant-info">
                                        <h4>{enchant.name}</h4>
                                        <p>{enchant.description}</p>
                                        <p className="enchant-chance" style={{
                                            color: enchant.chance >= 0.10 ? '#4CAF50' :
                                                enchant.chance >= 0.05 ? '#FF9800' :
                                                    enchant.chance >= 0.02 ? '#f44336' : '#ff00ff',
                                            fontSize: '11px',
                                            fontWeight: 'bold'
                                        }}>
                                            Шанс: {(enchant.chance * 100).toFixed(2)}%
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EnchantsPage;