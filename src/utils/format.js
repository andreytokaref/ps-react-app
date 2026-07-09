import { ALL_PETS, RARITY_ORDER } from '../config/gameConfig';

export function formatNumber(num) {
    if (num === undefined || num === null) return '0';
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return Math.floor(num).toString();
}

export function formatChance(chance) {
    if (chance >= 1e9) return `1/${(chance / 1e9).toFixed(0)}B`;
    if (chance >= 1e6) return `1/${(chance / 1e6).toFixed(0)}M`;
    if (chance >= 1e3) return `1/${(chance / 1e3).toFixed(0)}K`;
    return `1/${chance.toFixed(0)}`;
}

export function getEffectiveChances(totalLuck, eggPets) {
    const common = eggPets.filter(p => ['Common', 'Unique'].includes(p.rarity));
    const rareEpic = eggPets.filter(p => ['Rare', 'Epic'].includes(p.rarity));
    const legendaryPlus = eggPets.filter(p => ['Legendary', 'Secret', 'Celestial', 'Exotic'].includes(p.rarity));

    let cuWeights = [], cuTotal = 0;
    for (let config of common) {
        const weight = 1.0 / config.chance;
        cuWeights.push({ config, weight });
        cuTotal += weight;
    }

    let reWeights = [], reTotal = 0;
    for (let config of rareEpic) {
        const weight = 1.0 / config.chance;
        reWeights.push({ config, weight });
        reTotal += weight;
    }

    let lpWeights = [], lpTotal = 0;
    for (let config of legendaryPlus) {
        const effectiveChance = config.chance / totalLuck;
        const weight = 1.0 / effectiveChance;
        lpWeights.push({ config, weight, effectiveChance });
        lpTotal += weight;
    }

    let totalWeight = cuTotal + reTotal + lpTotal;

    if ((reTotal / totalWeight) * 100 > 25) {
        const maxReWeight = (cuTotal + lpTotal) * 0.25 / 0.75;
        const scale = maxReWeight / reTotal;
        reWeights = reWeights.map(w => ({ ...w, weight: w.weight * scale }));
        reTotal = maxReWeight;
        totalWeight = cuTotal + reTotal + lpTotal;
    }

    if ((lpTotal / totalWeight) * 100 > 10) {
        const maxLpWeight = (cuTotal + reTotal) * 0.10 / 0.90;
        const scale = maxLpWeight / lpTotal;
        lpWeights = lpWeights.map(w => ({ ...w, weight: w.weight * scale, effectiveChance: w.effectiveChance / scale }));
        lpTotal = maxLpWeight;
        totalWeight = cuTotal + reTotal + lpTotal;
    }

    const chances = [];

    for (let { config, weight } of cuWeights) {
        const percentage = (weight / totalWeight) * 100;
        chances.push({ config, percentage, effectiveChance: 100 / percentage });
    }

    for (let { config, weight } of reWeights) {
        const percentage = (weight / totalWeight) * 100;
        chances.push({ config, percentage, effectiveChance: 100 / percentage });
    }

    for (let { config, weight, effectiveChance } of lpWeights) {
        const percentage = (weight / totalWeight) * 100;
        chances.push({ config, percentage, effectiveChance });
    }

    chances.sort((a, b) => b.percentage - a.percentage);

    return chances;
}