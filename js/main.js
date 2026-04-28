'use strict';

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
