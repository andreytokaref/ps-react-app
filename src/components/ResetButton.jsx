// src/components/ResetButton.jsx
import React from 'react';

function ResetButton({ onReset }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '15px',
            paddingTop: '15px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            <button
                onClick={() => {
                    if (window.confirm('Вы уверены, что хотите сбросить ВЕСЬ прогресс?\n\nЭто действие нельзя отменить!')) {
                        onReset();
                    }
                }}
                style={{
                    padding: '10px 25px',
                    background: 'rgba(255, 50, 50, 0.08)',
                    border: '1px solid rgba(255, 50, 50, 0.25)',
                    color: '#ff6666',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    transition: 'all 0.3s',
                    fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 50, 50, 0.15)';
                    e.target.style.borderColor = 'rgba(255, 50, 50, 0.5)';
                    e.target.style.color = '#ff4444';
                }}
                onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 50, 50, 0.08)';
                    e.target.style.borderColor = 'rgba(255, 50, 50, 0.25)';
                    e.target.style.color = '#ff6666';
                }}
            >
                🗑️ Сбросить прогресс
            </button>
        </div>
    );
}

export default ResetButton;