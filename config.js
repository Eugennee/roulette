const config = {
    ROULETTE_WHEEL: {
        SLOTS_COUNT: 37,
    },

    PAYOUTS: {
        NUMBER_BET_MULTIPLIER: 36,
        DOZEN_BET_MULTIPLIER: 3,
        COLOR_BET_MULTIPLIER: 2,
        COLUMN_BET_MULTIPLIER: 3,
        RANGE_BET_MULTIPLIER: 2,
        EVEN_BET_MULTIPLIER: 2,
        ODD_BET_MULTIPLIER: 2,
        LOSE: 0,
    },

    DOZEN_RANGES: {
        '1': [1, 12],
        '2': [13, 24],
        '3': [25, 36],
    },

    COLORS: ['green', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black'],
};

module.exports = config;