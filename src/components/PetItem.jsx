import React from 'react';
import { ALL_PETS, RARITY_COLORS } from '../config/gameConfig';
import { formatNumber } from '../utils/format';

function PetItem({ petName, petData, game }) {
    const config = ALL_PETS[petName];
    if (!config) return null;

    const available = petData.count - petData.equipped;

    return (
        <div className={`pet-item ${config.rarity.toLowerCase()} ${petData.equipped > 0 ? 'equipped' : ''}`}>
            <div className="pet-main-info">
                <span className="pet-icon">{config.icon}</span>
                <div className="pet-details">
                    <span className="pet-name" style={{ color: RARITY_COLORS[config.rarity] }}>
                        {petName}
                    </span>
                    <span className="pet-count">
                        x{formatNumber(petData.count)}
                        {petData.equipped > 0 && ` [${petData.equipped} экип.]`}
                    </span>
                </div>
            </div>
            <div className="pet-stats">
                <span>💰{formatNumber(config.income)}/сек</span>
            </div>
            <div className="pet-actions">
                {available > 0 && (
                    <button className="equip-btn" onClick={() => game.equipPet(petName)} title="Экипировать">
                        +
                    </button>
                )}
                {petData.equipped > 0 && (
                    <button className="unequip-btn" onClick={() => game.unequipPet(petName)} title="Снять">
                        −
                    </button>
                )}
            </div>
        </div>
    );
}

export default PetItem;