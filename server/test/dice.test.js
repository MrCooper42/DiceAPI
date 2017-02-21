var expect = require('chai').expect;
var dice = require('../client/js/dice');

describe("type finder", function() {
    describe("find the type of expression", function() {
        it("returns the type of expression as a string", function() {
            var literal = dice.determineType("2");
            var single = dice.determineType("3d6");
            var lowest = dice.determineType("5d6d2");
            var highest = dice.determineType("5d6k2");
            var explosive = dice.determineType("5d6x2");
            var fail = dice.determineType("bob")

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
            var literal = dice.evaluate("2");
            expect(literal).to.equal(2);
        })
        it("returns a value between 3 and 18", function() {
                for (var i = 0; i < 1000; i++) {
                    var single = dice.evaluate("3d6");
                    console.log(single.includes(/^([3-9]|1[0-8])$/), "single")
                        // console.log(single.contains(/^([3-9]|1[0-8])$/), "match")
                    expect(single).to.equal(/^([3-9]|1[0-8])$/);
                }
            })
            // var lowest = dice.diceRoll("5d6d2");
            // var highest = dice.diceRoll("5d6k2");
            // var explosive = dice.diceRoll("5d6x2");
            // var fail = dice.diceRoll("bob")

        // expect(lowest).to.equal("lowest");
        // expect(highest).to.equal("highest");
        // expect(explosive).to.equal("explosive");
        // expect(fail).to.equal(null);
    })
})