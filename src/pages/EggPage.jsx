import React, { useState } from 'react';
import EggPanel from '../components/EggPanel';
import ResultsPanel from '../components/ResultsPanel';

function EggPage({ game }) {
    return (
        <div className="egg-page">
            <div className="egg-page-left">
                <EggPanel game={game} />
            </div>
            <div className="egg-page-right">
                <ResultsPanel game={game} />
            </div>
        </div>
    );
}

export default EggPage;