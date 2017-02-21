let single = "3d6";
let lowest = "5d6d2";
let highest = "5d6k2";
let explosive = "4d6x5";
let literal = "2";
let fail = "xxxxxxxxx"
let input = explosive + " - " + literal
    // const diceRegex = /^(\d+)(?:d(\d+)?(?:([kdx])(\d+))?)?$/;
const diceRegex = /^(\d+)(?:d(\d*)(?:([kdx])(\d+))?)?$/;
const randInt = max => Math.ceil(Math.random() * max);

const dieRoll = (expression) => {
    let type = determineType(expression);
    if (type.type === null) {
        return null;
    }
    switch (type.type) {
        case "single":
            return diceRoll(expression, type);
        case "literal":
            return parseInt(expression, type);
        case "lowest":
            return dropLow(expression, type);
        case "highest":
            return keepHigh(expression, type);
        case "explosive":
            return explosiveRoll(expression, type);
        default:
            return null;
    }
}

const determineType = (toRoll) => {
    if (diceRegex.exec(toRoll) === null) {
        return null;
    }
    let [initRoll, N, sides, type, num, ...rest] = diceRegex.exec(toRoll)
    let roll = {
        N: parseInt(N),
        sides: parseInt(sides),
        type: type,
        num: parseInt(num)
    };
    if (sides === undefined) {
        // match this to number
        roll.type = "literal";
        return roll;
    } else if (type === undefined) {
        roll.type = "single";
        return roll;
    } else if (type === "d" && num < N) {
        roll.type = "lowest";
        return roll;
    } else if (type === "k" && num < N) {
        roll.type = "highest";
        return roll;
    } else if (type === "x" && num <= sides) {
        roll.type = "explosive";
        return roll;
    } else {
        return "I do not recognize your nonsense!";
    }
}

const diceRoll = (toRoll, rol) => {
    let answer = 0

    for (let i = 0; i < rol.N; i++) {
        answer += randInt(rol.sides);
    }
    return answer;
}

const dropLow = (toRoll, rol) => {
    let arr = [];
    for (let i = 0; i < rol.N; i++) {
        arr.push(randInt(rol.sides));
    }
    return arr.sort((a, b) => a - b).slice((rol.num), arr.length).reduce((a, b) => a + b)
}

const keepHigh = (toRoll, rol) => {
    let arr = [];
    for (let i = 0; i < rol.N; i++) {
        arr.push(randInt(rol.sides));
    }
    return arr.sort((a, b) => b - a).splice(0, rol.num).reduce((a, b) => a + b);
}

const explosiveRoll = (toRoll, rol, answer = 0) => {
    let arr = [];
    if (rol.num == 1) {
        return Infinity;
    }
    for (let i = 0; i < rol.N; i++) {
        let currRoll = randInt(rol.sides);
        if (currRoll >= rol.num) {
            i--;
        }
        arr.push(currRoll);
    }
    return arr.reduce((a, b) => a + b);
}

let evaluate = (userInput) => {
    let operatorRegex = /(-|\+)/g
    userInput = userInput.split(' ').join('').split(operatorRegex)
        .filter((check) => (diceRegex.exec(check) !== null || operatorRegex.test(check)));
    if (userInput.length % 2 == 0) {
        userInput.pop();
    }
    if (!userInput.length) {
        // console.log("fail here")
        return null;
    }
    return eval(userInput
        .map((element) => (diceRegex.exec(element) !== null) ? element = dieRoll(element) : element)
        .join(''))
}

console.log(evaluate(input), "input")
console.log(evaluate(single), "single")
console.log(evaluate(literal), "literal")
console.log(evaluate(lowest), "lowest")
console.log(evaluate(highest), "highest")
console.log(evaluate(explosive), "explosive")
console.log(evaluate(fail), "fail")

module.exports = {
    determineType: determineType,
    evaluate: evaluate,
    keepHigh: keepHigh,
    dropLow: dropLow,
    diceRoll: diceRoll
}