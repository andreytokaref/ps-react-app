import React from 'react';
import { formatNumber } from '../utils/format';

function UpgradeCard({ icon, title, current, next, cost, onUpgrade }) {
    return (
        <div className="upgrade-card">
            <div className="upgrade-icon">{icon}</div>
            <div className="upgrade-info">
                <h3>{title}</h3>
                <p>{current} → {next}</p>
                <p>Стоимость: {formatNumber(cost)} 💰</p>
            </div>
            <button className="btn btn-upgrade" onClick={onUpgrade}>
                Улучшить
            </button>
        </div>
    );
}

export default UpgradeCard;