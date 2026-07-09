import React, { useState } from 'react';

function EquipDialog({ dialog, onConfirm, onClose }) {
    const [count, setCount] = useState(1);

    if (!dialog) return null;

    const { petName, maxEquip, type } = dialog;

    return (
        <div className="custom-dialog" onClick={onClose}>
            <div className="dialog-content" onClick={e => e.stopPropagation()}>
                <h3>{type === 'equip' ? 'Экипировать' : 'Снять'} {petName}</h3>
                <p>Выберите количество (1-{maxEquip})</p>

                <div className="dialog-input-group">
                    <button
                        className="dialog-btn"
                        onClick={() => setCount(Math.max(1, count - 1))}
                    >−</button>

                    <input
                        type="number"
                        value={count}
                        readOnly
                        min="1"
                        max={maxEquip}
                    />

                    <button
                        className="dialog-btn"
                        onClick={() => setCount(Math.min(maxEquip, count + 1))}
                    >+</button>
                </div>

                <div className="dialog-actions">
                    <button className="btn btn-cancel" onClick={onClose}>
                        Отмена
                    </button>
                    <button
                        className="btn btn-confirm"
                        onClick={() => onConfirm(petName, count)}
                    >
                        {type === 'equip' ? '✅ Экипировать' : '❌ Снять'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EquipDialog;