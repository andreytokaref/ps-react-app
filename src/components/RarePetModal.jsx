import React, { useEffect } from 'react';
import { RARITY_COLORS } from '../config/gameConfig';

function RarePetModal({ pet, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="modal show" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="modal-close" onClick={onClose}>×</span>
                <div className="rare-pet-animation">
                    <span className="rare-pet-icon">{pet.icon}</span>
                </div>
                <h2 className="rare-pet-name" style={{ color: RARITY_COLORS[pet.rarity] }}>
                    {pet.name}
                </h2>
                <p className="rare-pet-rarity">{pet.rarity}</p>
                <div className="confetti"></div>
            </div>
        </div>
    );
}

export default RarePetModal;