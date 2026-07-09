import React, { useState } from 'react';
import PetItem from './PetItem';
import { formatNumber } from '../utils/format';
import { ALL_PETS, RARITY_ORDER } from '../config/gameConfig';

function PetsPanel({ game }) {
    const [filter, setFilter] = useState('all');

    const filteredPets = Object.entries(game.pets)
        .filter(([_, data]) => filter === 'all' || data.equipped > 0)
        .sort(([a], [b]) => {
            const petA = ALL_PETS[a];
            const petB = ALL_PETS[b];
            if (!petA || !petB) return 0;
            return RARITY_ORDER.indexOf(petA.rarity) - RARITY_ORDER.indexOf(petB.rarity);
        });

    return (
        <div className="pets-panel">
            <h2>📦 Мои петы</h2>
            <div className="pets-filter">
                <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                    Все
                </button>
                <button className={`filter-btn ${filter === 'equipped' ? 'active' : ''}`} onClick={() => setFilter('equipped')}>
                    Экипированы
                </button>
            </div>
            <div className="pets-list">
                {filteredPets.length === 0 ? (
                    <p className="placeholder">У вас пока нет петов!</p>
                ) : (
                    filteredPets.map(([name, data]) => (
                        <PetItem key={name} petName={name} petData={data} game={game} />
                    ))
                )}
            </div>
            <div className="pets-summary">
                <p>Всего петов: {formatNumber(game.totalPetsCount)}</p>
                <p>Экипировано: {game.totalEquipped}/{game.maxEquippedSlots}</p>
            </div>
        </div>
    );
}

export default PetsPanel;