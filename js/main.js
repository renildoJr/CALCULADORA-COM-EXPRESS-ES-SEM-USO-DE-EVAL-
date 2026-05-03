'use strict';
const btns = document.querySelectorAll(".btn");
const view_exp = document.querySelector(".view__expr");
let expression = "";

function isOpper(char = "") {
    return ["+", "-", "*", "/"].includes(char);
}

function convert(expr = "") {
    const exprList = [];
    let hasOnlyOppers = true;
    let numStr = "";
    let current;

    if(!expr.length) {
        return [];
    }

    for(let i = 0; i < expr.length; i++) {
        if(!isNaN(expr[i]) && expr[i]) {
            hasOnlyOppers = false;
        }
    }

    if(hasOnlyOppers) {
        return [];
    }

    for(let i = 0; i < expr.length; i++) {
        current = expr[i];

        if(current === "-") {
            if(i === 0) {
                numStr += "-";
                continue;
            }
            else if(isOpper(expr[i - 1])) {
                numStr += "-";
                continue;
            }
        }

        if(isOpper(current)) {
            if(numStr.length) {
                exprList.push(Number(numStr));
                numStr = "";
            }
            exprList.push(current)
        }else {
            numStr += current;
        }
    }


    exprList.push(Number(numStr));
    return exprList;

}

function calc(exprList = []) {

    let calc;
    
    for(let i = 0; i < exprList.length; i ++) {
        let opper = exprList[i];
        if(opper === "*" || opper === "/") {
            let prevNumber = exprList[i - 1];
            let nextNumber = exprList[i + 1];
            if(opper === "*") {
                calc = prevNumber * nextNumber;
            }else {
                calc = prevNumber / nextNumber;
            }
            
            exprList[i - 1] = null;
            exprList[i] = null;
            exprList[i + 1] = calc;
        }
        
    }

    exprList = exprList.filter(val => val !== null);
    
    while(exprList.length > 1) {
        const opper = exprList[1];
        if(opper === "+") {
            calc = exprList[0] + exprList[2];
        }else {
            calc = exprList[0] - exprList[2];
        }
        
        exprList[0] = calc;
        exprList.splice(1, 2);
    }

    return exprList[0] !== Infinity ? exprList[0] : "Erro";
}

function expressionRules(char) {
    const lastChar = expression.charAt(expression.length - 1);

    if(isOpper(char) && !expression.length) {
        return true;
    }
    
    if(lastChar === "-" && char === "-" ) {
        return true;
    }

    if(lastChar === "+" && char ==="-" ) {
        expression = expression.slice(0, -1);
        expression += char;
        return true;
    }

    if(isOpper(lastChar) && isOpper(char) && char !== "-") {
        expression = expression.slice(0, -1);
        expression += char;
        return true;
    }
}

function updateExpression(command = "") {
    if(expressionRules(command)) {
        return;
    }

    switch(command) {
        case "clear":
            expression = "";
            break;
        case "remove":
            expression = expression.slice(0, -1);
            break;
        case "=":
            expression = String(calc(convert(expression)));
            break;
        default:
            expression += command;
    }
}

function display(val = "") {
    updateExpression(val);
    view_exp.textContent = expression.replaceAll("*", "x").replaceAll("/", "÷");
}

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        display(btn.value);
    })
})
