import { EGGS_CONFIG } from '../config/gameConfig';

export function rollPet(eggId, totalLuck) {
    const egg = EGGS_CONFIG.find(e => e.id === eggId);
    if (!egg) return EGGS_CONFIG[0].pets[0].name;

    const pets = egg.pets;
    const common = pets.filter(p => ['Common', 'Unique'].includes(p.rarity));
    const rareEpic = pets.filter(p => ['Rare', 'Epic'].includes(p.rarity));
    const legendaryPlus = pets.filter(p => ['Legendary', 'Secret', 'Celestial', 'Exotic'].includes(p.rarity));

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
        lpWeights.push({ config, weight });
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
        lpWeights = lpWeights.map(w => ({ ...w, weight: w.weight * scale }));
        totalWeight = cuTotal + reTotal + maxLpWeight;
    }

    const roll = Math.random() * totalWeight;
    let cumulative = 0;

    for (let { config, weight } of [...cuWeights, ...reWeights, ...lpWeights]) {
        cumulative += weight;
        if (roll <= cumulative) return config.name;
    }

    return pets[0].name;
}