'use strict';

const diceRegex = /^(\d+)(?:d(\d*)(?:([kdx])(\d+))?)?$/;
const dieRegex = /^(d)(\d+)$/
const operatorRegex = /(-|\+)/g;

const randInt = max => Math.ceil(Math.random() * max);

const dieRoll = (expression) => {
    let type = determineType(expression);
    // console.log(type, "type")
    if (type.type === null) {
        return null;
    }
    switch (type.type) {
        case "single":
            return diceRoll(expression, type);
        case "literal":
            let val = {
                'die': [null],
                'total': parseInt(expression, type)
            }
            return val;
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
    // console.log(toRoll, "toroll")
    if (diceRegex.exec(toRoll) === null) {
        return null;
    }
    let [initRoll, N, sides, type, num, ...rest] = diceRegex.exec(toRoll);
    let roll = {
        N: parseInt(N),
        sides: parseInt(sides),
        type: type,
        num: parseInt(num)
    };
    if (sides === undefined) {
        roll.type = "literal";
        return roll;
    } else if (type === undefined) {
        roll.type = "single";
        return roll;
    } else if (type == "d" && num < N) {
        roll.type = "lowest";
        return roll;
    } else if (type == "k" && num < N) {
        roll.type = "highest";
        return roll;
    } else if (type == "x" && num <= sides) {
        roll.type = "explosive";
        return roll;
    } else {
        return "I do not recognize your nonsense!";
    }
}

const diceRoll = (toRoll, rol) => {
    let arr = [];

    for (let i = 0; i < rol.N; i++) {
        arr.push(randInt(rol.sides));
    }
    let val = {
        'die': arr,
        'total': arr.reduce((a, b) => a + b)
    }
    return val;
}

const dropLow = (toRoll, rol) => {
    let arr = [];
    for (let i = 0; i < rol.N; i++) {
        arr.push(randInt(rol.sides));
    }
    let val = {
        'die': arr,
        'total': arr.sort((a, b) => a - b).slice((rol.num), arr.length).reduce((a, b) => a + b)
    }
    return val;
}

const keepHigh = (toRoll, rol) => {
    let arr = [];
    for (let i = 0; i < rol.N; i++) {
        arr.push(randInt(rol.sides));
    }
    let total = arr.sort((a, b) => b - a).splice(0, rol.num)
    let val = {
        'die': arr.concat(total).sort((a, b) => b - a),
        'total': total.reduce((a, b) => a + b)
    }
    return val;
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
    let val = {
        'total': arr.reduce((a, b) => a + b),
        'die': arr
    }
    return val;
}

const evaluate = (userInput) => {
    let vals = [];

    let uiArr = userInput
        .split(' ')
        .join('')
        .split(operatorRegex)
        .map((input) => (dieRegex.exec(input) !== null) ? input = `1${input}` : input)

    if (uiArr.length % 2 == 0) {
        uiArr.pop();
    }
    if (!uiArr.length) {
        // console.log("fail here")
        return null;
    }

    let str = uiArr
        .map((element) => {
            if (diceRegex.exec(element) !== null) {
                let temp = dieRoll(element)
                vals.push(temp)
                return element = temp.total
            } else {
                return element
            }
        }).join('');

    let answer = eval(str);

    let data = {
        'values': vals,
        'answer': answer
    };
    return data;
}

const check = (input, max, min) => {
    let loose = [];
    let working = [];
    for (let i = 0; i < 100000; i++) {

        let answer = evaluate(input).answer

        if (answer <= max && answer >= min) {
            working.push(answer)
        } else {
            loose.push(answer);
        }

    }
    console.log(loose.length, "loose");
    console.log(working.length, "working");
}

const probability = (input) => {
    console.log(input, "input")
    let prob = {};
    for (let i = 0; i < 100000; i++) {
        let answer = evaluate(input).answer

        if (prob.hasOwnProperty(answer)) {
            prob[answer] += 1;
        } else {
            prob[answer] = 1;
        }

    }
    for (var roll in prob) {
        if (prob.hasOwnProperty(roll)) {
            prob[roll] = ((prob[roll] / 100000) * 100).toFixed(4);
        }
    }
    console.log(prob)
    return prob
}

// let single = "3d6";
// let lowest = "5d6d2";
// let highest = "5d6k2";
// let explosive = "4d6x5";
// let literal = "200";
// let fail = "xxxxxxxxx";
// let input = `${explosive} + ${literal}`;
// console.log(eval(`${literal}+${literal}`), "lit")
// console.log(evaluate('3d6+211'), "input");
// console.log(evaluate(input), "input 2");
// console.log(evaluate('d6'), "single");
// console.log(evaluate(literal), "literal");
// console.log(evaluate(single), "multi");
// console.log(evaluate(lowest), "lowest");
// console.log(evaluate(highest), "highest");
// console.log(evaluate(explosive), "explosive");
// console.log(evaluate(fail), "fail");
// check('3d6+212', 230, 209)
probability('3d6')


module.exports = {
    determineType: determineType,
    evaluate: evaluate,
    keepHigh: keepHigh,
    dropLow: dropLow,
    diceRoll: diceRoll,
    probability: probability
}