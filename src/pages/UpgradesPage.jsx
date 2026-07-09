import React from 'react';
import UpgradesPanel from '../components/UpgradesPanel';

function UpgradesPage({ game }) {
    return (
        <div className="upgrades-page">
            <UpgradesPanel game={game} />
        </div>
    );
}

export default UpgradesPage;