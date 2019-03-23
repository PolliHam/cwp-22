console.log("Hi! This is npm package cwp-22 version 1.0.0");

const PRIOPETETS = {
    '(': 0,
    ')': 0,
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3,
};

const EXPRESSIONS = {
    '+': (a, b) => { return a+b },
    '-': (a, b) => { return a-b },
    '*': (a, b) => { return a*b },
    '/': (a, b) => { return a/b },
};

let badges =[];
let literals = [];

function parsePolishNotation(polishExpression){
    polishExpression.split(' ').forEach(function(item) {
        checkSymbol(item);
    });
    let result = literals[0];
    literals = [];
    return result;
}

function checkSymbol(symbol) {
    if ( !isNaN(parseInt(symbol)) ) {
        literals.push(symbol);
    }
    else {
        checkBadget(symbol);
    }
}

function checkBadget(symbol) {
    badges.push(symbol);
    if (badges.size === 0) {
        return;
    }
    while ( (PRIOPETETS[badges[badges.length - 2]] < PRIOPETETS[symbol]) || badges.length === 1 ) {
        let badge = badges.pop();
        if (badge === '(' || badge === ')'){
            continue;
        }
        literals.push(calculateExpression( parseInt(literals.pop()), parseInt(literals.pop()), badge ));
    }
}

function calculateExpression(firstLiteral, secondLiteral, badget){
    return EXPRESSIONS[badget](secondLiteral, firstLiteral);
}

module.exports =  parsePolishNotation ;

