import React from 'react';
import { formatNumber } from '../utils/format';

function TopBar({ game }) {
    return (
        <div className="top-bar">
            <div className="currency-display">
                <span className="icon">💰</span>
                <span>{formatNumber(game.currency)}</span>
            </div>
            <div className="stats">
                <div className="stat">
                    <span>📈</span>
                    <span className="income-value">{formatNumber(game.totalIncome)}/сек</span>
                </div>
                <div className="stat">
                    <span>🍀</span>
                    <span className="luck-value">×{game.totalLuck.toFixed(1)}</span>
                </div>
                <div className="stat">
                    <span>🎒</span>
                    <span className="slots-value">{game.totalEquipped}/{game.maxEquippedSlots}</span>
                </div>
                <div className="stat">
                    <span>🤖</span>
                    <span className={`auto-value ${game.autoOpenEnabled ? 'active' : ''}`}>
                        {game.autoOpenEnabled ? 'Вкл' : 'Выкл'}
                    </span>
                </div>
            </div>

            {/* Кнопка сброса */}
            <button
                className="top-reset-btn"
                onClick={() => {
                    if (window.confirm('Сбросить ВЕСЬ прогресс?')) {
                        game.resetGame();
                    }
                }}
                title="Сбросить прогресс"
            >
                🗑️
            </button>
        </div>
    );
}

export default TopBar;