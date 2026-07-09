// src/config/gameConfig.js

export const RARITY_ORDER = ["Common", "Unique", "Rare", "Epic", "Legendary", "Secret", "Celestial", "Exotic"];

export const RARITY_COLORS = {
    "Common": "#808080",
    "Unique": "#00ff00",
    "Rare": "#0088ff",
    "Epic": "#a020f0",
    "Legendary": "#ffd700",
    "Secret": "#ff0000",
    "Celestial": "#00ffff",
    "Exotic": "#ff00ff"
};

// Энчанты
export const ENCHANTS = [
    // Доход (33.8%)
    { id: "income1", name: "Rich I", chance: 0.28, multiplier: 1.10, icon: "💰", type: "income", description: "Доход +10%" },
    { id: "income2", name: "Rich II", chance: 0.06, multiplier: 1.25, icon: "💰", type: "income", description: "Доход +25%" },
    { id: "income3", name: "Rich III", chance: 0.025, multiplier: 1.50, icon: "💰", type: "income", description: "Доход +50%" },
    { id: "income4", name: "Rich IV", chance: 0.0035, multiplier: 2.0, icon: "💎", type: "income", description: "Доход ×2" },
    { id: "income5", name: "Rich V", chance: 0.001, multiplier: 3.0, icon: "💎", type: "income", description: "Доход ×3" },

    // Удача (30.5%)
    { id: "luck1", name: "Lucky I", chance: 0.26, multiplier: 1.05, icon: "🍀", type: "luck", description: "Удача +5%" },
    { id: "luck2", name: "Lucky II", chance: 0.04, multiplier: 1.15, icon: "🍀", type: "luck", description: "Удача +15%" },
    { id: "luck3", name: "Lucky III", chance: 0.014, multiplier: 1.30, icon: "🍀", type: "luck", description: "Удача +30%" },
    { id: "luck4", name: "Lucky IV", chance: 0.002, multiplier: 1.50, icon: "🍀", type: "luck", description: "Удача +50%" },

    // Скорость (29.2%)
    { id: "auto1", name: "Hasty I", chance: 0.27, multiplier: 0.93, icon: "⚡", type: "auto", description: "Скорость +7%" },
    { id: "auto2", name: "Hasty II", chance: 0.033, multiplier: 0.85, icon: "⚡", type: "auto", description: "Скорость +15%" },
    { id: "auto3", name: "Hasty III", chance: 0.01, multiplier: 0.75, icon: "⚡", type: "auto", description: "Скорость +25%" },
    { id: "auto4", name: "Hasty IV", chance: 0.0015, multiplier: 0.60, icon: "⚡", type: "auto", description: "Скорость +40%" },


];
// Сумма: 0.338 + 0.305 + 0.292 + 0.065 = 1.000 ✅


export const EGGS_CONFIG = [
    {
        id: "common", name: "Common Egg", cost: 10, icon: "🥚", color: "#808080",
        pets: [
            { name: "Doggy", rarity: "Common", chance: 3, income: 2.0, icon: "🐕" },
            { name: "Kitty", rarity: "Common", chance: 3, income: 2.0, icon: "🐈" },
            { name: "Bunny", rarity: "Unique", chance: 4, income: 8.0, icon: "🐰" },
            { name: "Bear", rarity: "Rare", chance: 20, income: 25.0, icon: "🐻" },
            { name: "King Doggy", rarity: "Secret", chance: 100000000, income: 100000.0, icon: "👑" },
            { name: "Timberdoodle", rarity: "Exotic", chance: 10000000000, income: 5000000.0, icon: "🌟" }
        ]
    },
    {
        id: "spotted", name: "Spotted Egg", cost: 110, icon: "🥚", color: "#ffaa00",
        pets: [
            { name: "Mouse", rarity: "Common", chance: 3, income: 4.0, icon: "🐭" },
            { name: "Wolf", rarity: "Common", chance: 4, income: 3.0, icon: "🐺" },
            { name: "Fox", rarity: "Unique", chance: 5, income: 15.0, icon: "🦊" },
            { name: "Polar Bear", rarity: "Rare", chance: 10, income: 50.0, icon: "🐻‍❄️" },
            { name: "Panda", rarity: "Epic", chance: 20, income: 150.0, icon: "🐼" }
        ]
    },
    {
        id: "iceshard", name: "Iceshard Egg", cost: 450, icon: "🥚", color: "#00ccff",
        pets: [
            { name: "Ice Kitty", rarity: "Common", chance: 3, income: 8.0, icon: "🐱" },
            { name: "Deer", rarity: "Common", chance: 4, income: 6.0, icon: "🦌" },
            { name: "Ice Wolf", rarity: "Unique", chance: 5, income: 30.0, icon: "🐺" },
            { name: "Piggy", rarity: "Rare", chance: 7, income: 100.0, icon: "🐷" },
            { name: "Ice Deer", rarity: "Rare", chance: 13, income: 80.0, icon: "🦌" },
            { name: "Ice Dragon", rarity: "Epic", chance: 33, income: 300.0, icon: "🐉" }
        ]
    },
    {
        id: "patriotic", name: "Patriotic Egg", cost: 4444, icon: "🥚", color: "#ff4444",
        pets: [
            { name: "Patriotic Bunny", rarity: "Common", chance: 2, income: 20.0, icon: "🐰" },
            { name: "Patriotic Slime", rarity: "Rare", chance: 3, income: 200.0, icon: "🟢" },
            { name: "Patriotic Angel", rarity: "Epic", chance: 25, income: 800.0, icon: "👼" },
            { name: "Patriotic Octopus", rarity: "Legendary", chance: 100000, income: 5000.0, icon: "🐙" },
            { name: "Patriotic Elemental", rarity: "Legendary", chance: 2000000, income: 15000.0, icon: "⚡" },
            { name: "Patriotic Mush", rarity: "Secret", chance: 250000000, income: 100000.0, icon: "🍄" },
            { name: "Patriotic Overlord", rarity: "Secret", chance: 1000000000, income: 500000.0, icon: "👑" },
            { name: "Patriotic Star", rarity: "Secret", chance: 10000000000, income: 2000000.0, icon: "⭐" },
            { name: "Liberty Torch", rarity: "Celestial", chance: 25000000000, income: 10000000.0, icon: "🗽" },
            { name: "Firework God", rarity: "Celestial", chance: 125000000000, income: 50000000.0, icon: "🎆" },
            { name: "Patriotic Robot 2.0", rarity: "Exotic", chance: 250000000000, income: 200000000.0, icon: "🤖" },
            { name: "VOID GUARDIAN", rarity: "Exotic", chance: 1000000000000, income: 1000000000.0, icon: "🌌" }
        ]
    }
];

export const ALL_PETS = {};
EGGS_CONFIG.forEach(egg => {
    egg.pets.forEach(pet => {
        ALL_PETS[pet.name] = pet;
    });
});

export const GAME_CONFIG = {
    STARTING_CURRENCY: 10000,
    MAX_EQUIPPED_SLOTS: 3,
    AUTO_OPEN_MAX: 8,
    SHARD_CHANCE: 1, // 1 к 1000
};