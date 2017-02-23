var expect = require('chai').expect;
var dice = require('../api/dice.js');

describe("type finder", function() {
    describe("find the type of expression", function() {
        it("returns the type of expression as a string", function() {
            var literal = dice.determineType("2").type;
            var single = dice.determineType("3d6").type;
            var lowest = dice.determineType("5d6d2").type;
            var highest = dice.determineType("5d6k2").type;
            var explosive = dice.determineType("5d6x2").type;
            var fail = dice.determineType("bob");

            expect(literal).to.equal("literal");
            expect(single).to.equal("single");
            expect(lowest).to.equal("lowest");
            expect(highest).to.equal("highest");
            expect(explosive).to.equal("explosive");
            expect(fail).to.equal(null);
        })
    })
})

describe("die roller", function() {
    describe("find get return of given roll expression", function() {
        it("returns the literal number given as a string", function() {
            var literal = dice.evaluate("2").answer;
            expect(literal).to.equal(2);
        })
        it("3d6 returns a value between 3 and 18", function() {
            var evaluated;
            for (var i = 0; i < 10000; i++) {
                var singleEval = dice.evaluate("3d6").answer;
                if (singleEval <= 18 && singleEval >= 3) {
                    evaluated = true;
                } else {
                    evaluated = false;
                    expect(singleEval).to.equal("a number lower than 19 and greater than 2");
                }
            }
            expect(evaluated).to.equal(true);
        })
        it("5d6d2​ returns a value between 3 and 18", function() {
            var evaluated = 10000;
            for (var i = 0; i < 1000; i++) {
                var lowEval = dice.evaluate("5d6d2").answer;
                if (lowEval <= 18 && lowEval >= 3) {
                    evaluated = true;
                } else {
                    evaluated = false;
                    expect(lowEval).to.equal("a number lower than 19 and greater than 2");
                }
            }
            expect(evaluated).to.equal(true);
        })
        it("5d6k2 returns a value between 2 and 12", function() {
            var evaluated = 10000;
            for (var i = 0; i < 1000; i++) {
                var highEval = dice.evaluate("5d6k2").answer;
                if (highEval <= 12 && highEval >= 2) {
                    evaluated = true;
                } else {
                    evaluated = false;
                    expect(highEval).to.equal("a number lower than 13 and greater than 1");
                }
            }
            expect(evaluated).to.equal(true);
        })
        it("4d6x5 returns a value between 4 and Infinity", function() {
            var evaluated = 1000;
            for (var i = 0; i < 10000; i++) {
                var expEval = dice.evaluate("4d6x5").answer;
                if (expEval >= 2) {
                    evaluated = true;
                } else {
                    evaluated = false;
                    expect(expEval).to.equal("a number greater than 3");
                }
            }
            expect(evaluated).to.equal(true);
        })
        it("4d8d1 - 1d4 returns a value between -1 and 23", function() {
            var evaluated = 1000;
            for (var i = 0; i < 10000; i++) {
                var multiEval = dice.evaluate("4d8d1 - 1d4").answer;
                if (multiEval >= -1 && multiEval <= 23) {
                    evaluated = true;
                } else {
                    evaluated = false;
                    expect(multiEval).to.equal("a number between 0 and 23");
                }
            }
            expect(evaluated).to.equal(true);
        })

    })
})