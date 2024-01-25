const config = require('./config');

class RouletteWheel {
    constructor(numberOfSlots) {
        this.numberOfSlots = numberOfSlots;
    }

    spin() {
        return Math.floor(Math.random() * this.numberOfSlots);
    }
}

class RouletteTable {
    constructor(colorManager) {
        this.colorManager = colorManager;
    }

    getColor(number) {
        return this.colorManager.getColor(number);
    }
}

class ColorManager {
    constructor(colors) {
        this.colors = colors;
    }

    getColor(number) {
        return this.colors[number];
    }
}

class Bet {
    constructor(amount) {
        if (new.target === Bet) {
            throw new TypeError('Cannot construct Bet instances directly');
        }
        
        this.amount = amount;
    }

    checkWin(winningNumber, winningColor) {
        throw new Error('Method "checkWin()" must be implemented.');
    }
}

class NumberBet extends Bet {
    constructor(number, amount) {
        super(amount);

        this.number = number;
    }

    checkWin(winningNumber) {
        return this.number === winningNumber;
    }
}

class RangeBet extends Bet {
    constructor(start, end, amount) {
        super(amount);

        this.start = start;
        this.end = end;
    }

    checkWin(winningNumber) {
        return winningNumber >= this.start && winningNumber <= this.end;
    }
}

class DozenBet extends Bet {
    constructor(dozen, amount) {
        super(amount);

        this.dozen = dozen;
    }

    checkWin(winningNumber) {
        const [start, end] = config.DOZEN_RANGES[this.dozen];

        return winningNumber >= start && winningNumber <= end;
    }
}

class ColorBet extends Bet {
    constructor(color, amount) {
        super(amount);

        this.color = color;
    }

    checkWin(winningColor) {
        return this.color === winningColor;
    }
}

class EvenBet extends Bet {
    constructor(amount) {
        super(amount);
    }

    checkWin(winningNumber) {
        if (winningNumber === 0) return false;
        return winningNumber % 2 === 0;
    }
}

class OddBet extends Bet {
    constructor(amount) {
        super(amount);
    }

    checkWin(winningNumber) {
        if (winningNumber === 0) return false;
        return winningNumber % 2 !== 0;
    }
}

class ColumnBet extends Bet {
    constructor(column, amount) {
        super(amount);

        this.column = column;
    }

    checkWin(winningNumber) {
        if (winningNumber === 0) return false;
        return ((winningNumber - 1) % 3) + 1 === this.column;
    }
}


class PayoutStrategy {
    constructor() {
        if (new.target === PayoutStrategy) {
            throw new TypeError('Cannot construct PayoutStrategy instances directly');
        }
    }

    calculatePayout(bet, winningNumber, winningColor) {
        throw new Error('Method "calculatePayout()" must be implemented.');
    }
}

class NumberBetPayoutStrategy extends PayoutStrategy {
    constructor(payoutMultiplier, payoutLose) {
        super();
        this.payoutMultiplier = payoutMultiplier;
        this.payoutLose = payoutLose;
    }

    calculatePayout(bet, winningNumber) {
        return bet.checkWin(winningNumber) ? bet.amount * this.payoutMultiplier : this.payoutLose;
    }
}

class DozenBetPayoutStrategy extends PayoutStrategy {
    constructor(payoutMultiplier, payoutLose) {
        super();
        this.payoutMultiplier = payoutMultiplier;
        this.payoutLose = payoutLose;
    }

    calculatePayout(bet, winningNumber) {
        return bet.checkWin(winningNumber) ? bet.amount * this.payoutMultiplier : this.payoutLose;
    }
}

class ColorBetPayoutStrategy extends PayoutStrategy {
    constructor(payoutMultiplier, payoutLose) {
        super();
        this.payoutMultiplier = payoutMultiplier;
        this.payoutLose = payoutLose;
    }

    calculatePayout(bet, _, winningColor) {
        return bet.checkWin(winningColor) ? bet.amount * this.payoutMultiplier : this.payoutLose;
    }
}

class EvenBetPayoutStrategy extends PayoutStrategy {
    constructor(payoutMultiplier, payoutLose) {
        super();
        this.payoutMultiplier = payoutMultiplier;
        this.payoutLose = payoutLose;
    }

    calculatePayout(bet, winningNumber) {
        return bet.checkWin(winningNumber) ? bet.amount * this.payoutMultiplier : this.payoutLose;
    }
}

class OddBetPayoutStrategy extends PayoutStrategy {
    constructor(payoutMultiplier, payoutLose) {
        super();
        this.payoutMultiplier = payoutMultiplier;
        this.payoutLose = payoutLose;
    }

    calculatePayout(bet, winningNumber) {
        return bet.checkWin(winningNumber) ? bet.amount * this.payoutMultiplier : this.payoutLose;
    }
}

class ColumnBetPayoutStrategy extends PayoutStrategy {
    constructor(payoutMultiplier, payoutLose) {
        super();
        this.payoutMultiplier = payoutMultiplier;
        this.payoutLose = payoutLose;
    }

    calculatePayout(bet, winningNumber) {
        return bet.checkWin(winningNumber) ? bet.amount * this.payoutMultiplier : this.payoutLose;
    }
}

class RangeBetPayoutStrategy extends PayoutStrategy {
    constructor(payoutMultiplier, payoutLose) {
        super();
        this.payoutMultiplier = payoutMultiplier;
        this.payoutLose = payoutLose;
    }

    calculatePayout(bet, winningNumber) {
        return bet.checkWin(winningNumber) ? bet.amount * this.payoutMultiplier : this.payoutLose;
    }
}

class PayoutStrategyFactory {
    constructor() {
        if (new.target === PayoutStrategyFactory) {
            throw new TypeError('Cannot construct PayoutStrategyFactory instances directly');
        }
    }

    createPayoutStrategy(bet) {
        throw new Error('This method should be implemented by subclasses');
    }
}

class ConcretePayoutStrategyFactory extends PayoutStrategyFactory {
    constructor(strategyConfig) {
        super();
        this.strategies = strategyConfig;
    }

    createPayoutStrategy(bet) {
        const strategy = this.strategies[bet.constructor.name];

        if (!strategy) {
            throw new Error('No payout strategy for this type of bet');
        }

        return strategy;
    }
}

class Game {
    constructor(rouletteWheel, rouletteTable, strategyFactory) {
        this.rouletteWheel = rouletteWheel;
        this.rouletteTable = rouletteTable;
        this.strategyFactory = strategyFactory;
        this.bets = [];
    }

    placeBet(bet) {
        this.bets.push(bet);
    }

    clearBets() {
        this.bets = [];
    }

    play() {
        const winningNumber = this.rouletteWheel.spin();
        const winningColor = this.rouletteTable.getColor(winningNumber);
        
        this.bets.forEach(bet => { 
            const payoutStrategy = this.strategyFactory.createPayoutStrategy(bet);
            const payout = payoutStrategy.calculatePayout(bet, winningNumber, winningColor);

            if (payout > 0) {
                console.log(`You win! Winning number is ${winningNumber} (${winningColor}). Your payout is ${payout}`);
            } else {
                console.log(`You lose! Winning number is ${winningNumber} (${winningColor}).`);
            }
        });

        this.clearBets();
    }
}

const colorManager = new ColorManager(config.COLORS);

const numberBetPayoutStrategy = new NumberBetPayoutStrategy(config.PAYOUTS.NUMBER_BET_MULTIPLIER, config.PAYOUTS.PAYOUT_LOSE);
const dozenBetPayoutStrategy = new DozenBetPayoutStrategy(config.PAYOUTS.DOZEN_BET_MULTIPLIER, config.PAYOUTS.PAYOUT_LOSE);
const colorBetPayoutStrategy = new ColorBetPayoutStrategy(config.PAYOUTS.COLOR_BET_MULTIPLIER, config.PAYOUTS.PAYOUT_LOSE);
const evenBetPayoutStrategy = new EvenBetPayoutStrategy(config.PAYOUTS.EVEN_BET_MULTIPLIER, config.PAYOUTS.PAYOUT_LOSE);
const oddBetPayoutStrategy = new OddBetPayoutStrategy(config.PAYOUTS.ODD_BET_MULTIPLIER, config.PAYOUTS.PAYOUT_LOSE);
const columnBetPayoutStrategy = new ColumnBetPayoutStrategy(config.PAYOUTS.COLUMN_BET_MULTIPLIER, config.PAYOUTS.PAYOUT_LOSE);
const rangeBetPayoutStrategy = new RangeBetPayoutStrategy(config.PAYOUTS.RANGE_BET_MULTIPLIER, config.PAYOUTS.PAYOUT_LOSE);

const strategyFactory = new ConcretePayoutStrategyFactory({
    'NumberBet': numberBetPayoutStrategy,
    'DozenBet': dozenBetPayoutStrategy,
    'ColorBet': colorBetPayoutStrategy,
    'EvenBet': evenBetPayoutStrategy,
    'OddBet': oddBetPayoutStrategy,
    'ColumnBet': columnBetPayoutStrategy,
    'RangeBet': rangeBetPayoutStrategy,
});


const game = new Game(new RouletteWheel(config.ROULETTE_WHEEL.SLOTS_COUNT), new RouletteTable(colorManager), strategyFactory);

const betOnNumber = new NumberBet(17, 100);
game.placeBet(betOnNumber);

const betOdd = new OddBet(100);
game.placeBet(betOdd);

const betEven = new EvenBet(100);
game.placeBet(betEven);

const betOnColorBlack = new ColorBet('black', 100);
game.placeBet(betOnColorBlack);

const betOnColorRed = new ColorBet('red', 100);
game.placeBet(betOnColorRed);

const сolumnBet1 = new ColumnBet(1, 100);
game.placeBet(сolumnBet1);

const сolumnBet2 = new ColumnBet(2, 100);
game.placeBet(сolumnBet2);

const сolumnBet3 = new ColumnBet(3, 100);
game.placeBet(сolumnBet3);

const betRange1to18 = new RangeBet(1, 18, 100);
game.placeBet(betRange1to18);

const betRange19to36 = new RangeBet(19, 36, 100);
game.placeBet(betRange19to36);

const bet1to12 = new DozenBet(1, 100);
game.placeBet(bet1to12);

const bet13to24 = new DozenBet(2, 100);
game.placeBet(bet13to24);

const bet25to36 = new DozenBet(3, 100);
game.placeBet(bet25to36);

game.play();