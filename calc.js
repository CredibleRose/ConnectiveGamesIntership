let value = ''; 
let rvt = '';
let isCurrentInputAValue = false; 
let isCurrentInputInt = false;
let amountOfIntegerPart = 0;
let amoutOfFactional = 0;
let isCurrentInputFractional = false; 
let hasDot = false;
let openBracketAmount = 0;
let closeBracketAmount = 0;
let isCurrentInputOperation = false; 
let isOpenBracket = false;
let isCloseBraket = false;
let memoryValue = '';
let isPressReverseSigns = false
let reverseValue = 0

const digit = ['0','1','2','3','4','5','6','7','8','9']
const rtvnum = ['Rvt']
const reverseSigns = ['+/-']
const backspace = ['Backspace']
const dots = ['.'];
const enter = ['Enter'];
const action = ['-','+','*','/']
const brakets = ['(',')']
const memoryButtons = ['MC' , 'MS' , 'MR' , 'M+' , 'M-']
const out = document.querySelector('.calc-screen p');

function clearAll () {
    value = '';
    memoryValue = '';
    isCurrentInputAValue = false; 
    isCurrentInputOperation = false;
    hasDot = false 
    isOpenBracket = false;
    isCloseBraket = false;
    isCurrentInputInt = false;
    isCurrentInputFractional = false;
    openBracketAmount = 0;
    closeBracketAmount = 0;
    amoutOfFactional = 0;
    amountOfIntegerPart = 0;   
    out.textContent = 0;
    isPressReverseSigns = false
    pmnumber = 0
    reverseValue = 0

}
function removeLastSymbol () {
    if(value.slice(value.length-2,-1) == '+' || '-'|| '*'||'/'){
        console.log(isCurrentInputFractional);
        if(!isCurrentInputFractional & isCurrentInputInt){
            isCurrentInputFractional = true;
            isCurrentInputInt = false;
            hasDot = false
        }else{
            isCurrentInputFractional = false
            isCurrentInputInt = true
            hasDot = true
        }
    }
    switch (value.slice(-1)){
        case '(':
            isOpenBracket = false;
            break
        case ')':
            isCloseBraket = false
            break
        case '+':
            isCurrentInputOperation = false
            break
        case '-':
            isCurrentInputOperation = false
            break
        case '*':
            isCurrentInputOperation = false
            break
        case '/':
            isCurrentInputOperation = false
            break
        case '.':
            hasDot = false
            isCurrentInputInt = true
            isCurrentInputFractional = false
            break
    }
    if(hasDot){
        amoutOfFactional-=1
    }else if (!hasDot){
        amountOfIntegerPart-=1
    }   
    value = value.slice(0, -1);
    out.textContent = value;   
}
function clear () {
    value = ''
    finish = false;
    out.textContent = 0;
}
function calculation(buffString) {        
    buffString = buffString.replace(/([^[0-9.]{1})/g, " $1 ").trim();      
    buffString = buffString.replace(/ {1,}/g, " ");     
    var buffArray = buffString.split(/\s/);     
    var polishString = new Array;        
    var polishStack = new Array;       
    var stringId = -1;        
    var stackId = -1;       
    for (var i = 0; i < buffArray.length; i++) {    
        switch (buffArray[i]) {       
            case "(":       
                stackId++;       
                polishStack[stackId] = buffArray[i];       
                break;       
            case ")":        
                while (stackId >= 0 && polishStack[stackId] != "(") {       
                    stringId++;       
                    polishString[stringId] = polishStack[stackId];       
                    stackId--;        
                }        
                stackId--;       
                break;        
            case "+":        
                while (stackId >= 0 && (polishStack[stackId] == "+" || polishStack[stackId] == "-" || polishStack[stackId] == "*" || polishStack[stackId] == "/")) {        
                    stringId++;       
                    polishString[stringId] = polishStack[stackId];       
                    stackId--;       
                }       
                stackId++;        
                polishStack[stackId] = buffArray[i];       
                break;        
            case "-":        
                while (stackId >= 0 && (polishStack[stackId] == "+" || polishStack[stackId] == "-" || polishStack[stackId] == "*" || polishStack[stackId] == "/")) {        
                    stringId++;
                    polishString[stringId] = polishStack[stackId];       
                    stackId--;       
                }        
                stackId++;        
                polishStack[stackId] = buffArray[i];        
                break;        
            case "*":        
                while (stackId >= 0 && (polishStack[stackId] == "*" || polishStack[stackId] == "/")) {        
                    stringId++;        
                    polishString[stringId] = polishStack[stackId];        
                    stackId--;       
                }        
                stackId++;        
                polishStack[stackId] = buffArray[i];       
                break;        
            case "/":       
                while (stackId >= 0 && (polishStack[stackId] == "*" || polishStack[stackId] == "/")) {       
                    stringId++;       
                    polishString[stringId] = polishStack[stackId];       
                    stackId--;        
                }       
                stackId++;        
                polishStack[stackId] = buffArray[i];        
                break;        
            default:        
                stringId++;      
                polishString[stringId] = buffArray[i];       
            }       
    }       
    while (stackId >= 0) {       
        stringId++;
        polishString[stringId] = polishStack[stackId];
        stackId--;
    }
    stackId = -1;
    var stringIdMax = stringId;
     
    for (stringId = 0; stringId <= stringIdMax; stringId++ ) {
        switch (polishString[stringId]) {
                    case "+":
                        stackId--;
                        polishStack[stackId] = polishStack[stackId] + polishStack[stackId + 1];
                        break;
                    case "-":
                        stackId--;
                        polishStack[stackId] = polishStack[stackId] - polishStack[stackId + 1];
                        break;
                    case "*":
                        stackId--;
                        polishStack[stackId] = polishStack[stackId] * polishStack[stackId + 1];
                        break;
                    case "/":
                        stackId--;
                        polishStack[stackId] = polishStack[stackId] / polishStack[stackId + 1];
                        break;
                    default:
                        stackId++;
                        polishStack[stackId] = parseFloat(polishString[stringId]);
        }
    }
    return polishStack[stackId];
}                
function equalValue() {
        let res = calculation(value);
        rvt = res;
        value = res
        let stri = ''
        stri = res.toString()        
        out.textContent = parseFloat(parseFloat(res.toString()).toFixed(8));
}
function pressNumberKey(key) {
    if(hasDot && amoutOfFactional<8){
        value +=key
        amoutOfFactional++
        out.textContent = value;
        isCurrentInputAValue = true;
        isCurrentInputFractional = true;
        isCurrentInputOperation = false;
        return
    }else if(!hasDot && amountOfIntegerPart<12){
        amountOfIntegerPart++
        isCurrentInputInt = true;
        isCurrentInputFractional = false;
        value +=key
        out.textContent = value;
        isCurrentInputAValue = true;
        isCurrentInputOperation = false;
        return
    }else{
        out.textContent = value;
        return
    }
}
function pressDotKey(key) {
    if (isCurrentInputInt && !isCurrentInputFractional && !hasDot){
        hasDot = true;
        amountOfIntegerPart = 0;
        value +=key;
        isCurrentInputInt = false;
        out.textContent = value;
        return;
    }
}
function pressBraketsKey(key){
    if (isOpenBracket && !isCloseBraket && key === '(' && isCurrentInputAValue && !isCurrentInputOperation){
        out.textContent = value;
        return
    }
    else if (!isOpenBracket && isCloseBraket && key === ')' && !isCurrentInputAValue && isCurrentInputOperation){
        out.textContent = value;            
        return
    }
    else if (!isOpenBracket && isCloseBraket && key === '(' && !isCurrentInputAValue && !isCurrentInputOperation){
        value +=key
        isOpenBracket = true;
        isCloseBraket = false;
        out.textContent = value;
        return
    }
    else if (isOpenBracket && !isCloseBraket && key === ')' && isCurrentInputAValue && isCurrentInputOperation){
        out.textContent = value;            
        return
    }
    else if (!isOpenBracket && !isCloseBraket && key === '(' && !isCurrentInputAValue && !isCurrentInputOperation){
        value +=key
        isOpenBracket = true;
        isCloseBraket = false;
        out.textContent = value;
        return            
    }
    else if (!isOpenBracket && isCloseBraket && key === '('){
        value +=key
        isOpenBracket = true;
        isCloseBraket = false;
        out.textContent = value;
        return
    }
    else if (isOpenBracket && !isCloseBraket && key === ')' && isCurrentInputAValue && !isCurrentInputOperation){
        value +=key
        isCloseBraket = true;
        isOpenBracket = false;
        out.textContent = value;
        return
    }
    else if (!isOpenBracket && !isCloseBraket && key ==='(' && !isCurrentInputAValue){
        value +=key
        isOpenBracket = true;
        isCloseBraket = false;
        out.textContent = value;
        return
    }
}
function pressOperationKey(key) {
    if (isCurrentInputOperation && !isCurrentInputAValue) {
        out.textContent = value;
        return
    }
    else{
        amountOfIntegerPart = 0
        amoutOfFactional = 0
        hasDot = false;
        isCurrentInputOperation = true;
        isCurrentInputAValue = false
        value += key;
        out.textContent = value;
        return;
    }
}
function pressMemoryKey(key){
    switch (key){
        case 'MC':
            memoryValue = ''
            out.textContent = value;
            break;
        case 'MS':
            memoryValue = value;
            value = '';
            break;
        case 'MR':
            value = memoryValue;
            out.textContent = value;
            break;
        case 'M+':
            memoryValue = memoryValue + ' + ' + value;
            memoryValue = eval(memoryValue);
            value = '';
            break;
        case 'M-':
            memoryValue =memoryValue + ' - ' + value;
            memoryValue = eval(memoryValue);
            value = '';
            break;
    }
}

document.querySelector('.AC').onclick = clearAll;
document.querySelector('.equal').onclick = equalValue;
document.querySelector('.C').onclick = clear;
document.querySelector('.back').onclick = removeLastSymbol;

document.querySelector('.buttons').onclick = (event) => {
    if(!event.target.classList.contains('btn')) return;
    if(event.target.classList.contains('AC')) return;


    const key = event.target.textContent;

    if (digit.includes(key)) {
        pressNumberKey(key);        
    }
    if (rtvnum.includes(key)){
        value = rvt;
        out.textContent = value;
        return;
    }
    if (dots.includes(key)){
        pressDotKey(key)
    }
    if (reverseSigns.includes(key)){
        value.toString();       

        if(!isPressReverseSigns){
            pmnumber=value   
            reverseValue = value.split('').reverse().join('') 
            for(let i = 0 ; i <= value.length;i++){
                console.log('est')
                console.log(reverseValue.slice(i,i +1 -value.length))
                if(reverseValue.slice(i,i +1 -value.length)=='+'){
                    reverseValue = reverseValue.replace(/[\+]/,'-(+')
                    break
                }else if(reverseValue.slice(i,i +1 -value.length)=='-'){
                    reverseValue = reverseValue.replace(/[\-]/,'-(-')
                    break
                }else if(reverseValue.slice(i,i +1 -value.length)=='*'){
                    reverseValue = reverseValue.replace(/[\*]/,'-(*')
                    break
                }else if(reverseValue.slice(i,i +1 -value.length)=='/'){
                    reverseValue = reverseValue.replace(/[\/]/,'-(/')
                    break
                }
            }

            value = reverseValue.split('').reverse().join('')
            value += ')'
            out.textContent = value; 
            isPressReverseSigns = true;
        }
        else{
            isPressReverseSigns = false
            value = pmnumber
            out.textContent = value;
        }
        out.textContent = value;
        return
    }
    if (brakets.includes(key)) {
        pressBraketsKey(key);       
    }
    if (action.includes(key)) {
        pressOperationKey(key);
    }
    if (memoryButtons.includes(key)){
        pressMemoryKey(key);
    }    
}
 
document.onkeydown = (event) => {
    const keyb = event.key;
    console.log(event.key);
    if (backspace.includes(keyb)){
        removeLastSymbol();
    }
    if (digit.includes(keyb)) {
        pressNumberKey(keyb)
    }
    if (dots.includes(keyb)){
        pressDotKey(keyb)
    }
    if (action.includes(keyb)) {
        pressOperationKey(keyb)
    }
    if (brakets.includes(keyb)) {
        pressBraketsKey(keyb);       
    }
    if (enter.includes(keyb)){
        equalValue();        
    }
}