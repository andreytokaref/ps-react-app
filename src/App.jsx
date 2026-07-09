import React, { useState } from 'react';
import { useGame } from './hooks/useGame';
import TopBar from './components/TopBar';
import EggPage from './pages/EggPage';
import PetsPage from './pages/PetsPage';
import UpgradesPage from './pages/UpgradesPage';
import EnchantsPage from './pages/EnchantsPage';
import StatsPage from './pages/StatsPage';
import RarePetModal from './components/RarePetModal';
import EquipDialog from './components/EquipDialog';
import ResetButton from './components/ResetButton';

import './styles/App.css';
import './styles/buttons.css';
import './styles/egg.css';
import './styles/results.css';
import './styles/pets.css';
import './styles/upgrades.css';
import './styles/enchants.css';
import './styles/stats.css';
import './styles/modal.css';
import './styles/topbar.css';

function App() {
    const game = useGame();
    const [activeTab, setActiveTab] = useState('eggs');

    const tabs = [
        { id: 'eggs', name: 'Яйца', icon: '🥚' },
        { id: 'pets', name: 'Петы', icon: '📦' },
        { id: 'upgrades', name: 'Улучшения', icon: '🔼' },
        { id: 'enchants', name: 'Энчанты', icon: '✨' },
        { id: 'stats', name: 'Статистика', icon: '📊' },
    ];

    if (!game) return <div className="loading">Загрузка...</div>;

    return (
        <div className="app">
            <TopBar game={game} />

            {/* Вкладки */}
            <div className="tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        <span className="tab-name">{tab.name}</span>
                    </button>
                ))}
            </div>

            {/* Контент вкладок */}
            <div className="tab-content">
                {activeTab === 'eggs' && <EggPage game={game} />}
                {activeTab === 'pets' && <PetsPage game={game} />}
                {activeTab === 'upgrades' && <UpgradesPage game={game} />}
                {activeTab === 'enchants' && <EnchantsPage game={game} />}
                {activeTab === 'stats' && <StatsPage game={game} />}
            </div>

            {game.rarePet && <RarePetModal pet={game.rarePet} onClose={() => game.setRarePet(null)} />}
            {game.showEquipDialog && (
                <EquipDialog
                    dialog={game.showEquipDialog}
                    onConfirm={game.showEquipDialog.type === 'equip' ? game.confirmEquip : game.confirmUnequip}
                    onClose={() => game.setShowEquipDialog(null)}
                />
            )}
            {game.notification && (
                <div className={`notification notification-${game.notification.type}`}>
                    {game.notification.message}
                </div>
            )}
        </div>
    );
}

export default App;