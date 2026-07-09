import React from 'react';
import PetsPanel from '../components/PetsPanel';

function PetsPage({ game }) {
    return (
        <div className="pets-page">
            <PetsPanel game={game} />
        </div>
    );
}

export default PetsPage;