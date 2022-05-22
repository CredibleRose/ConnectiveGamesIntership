let number = ''; 
let rvt = '';
let znachenie = false; 
let celoe = false;
let celoecol = 0;
let neceloecol = 0;
let neceloe = false; 
let dot = false; 
let sign = '';
let openkol = 0;
let closekol = 0;
let math = false; 
let open = false;
let close = false;
let memory = '';
let plusminactive = false;
let finish = false;
let plusminnumber = false
let pmnumber = 0
let numberusualy = 0

const digit = ['0','1','2','3','4','5','6','7','8','9']
const rtvnum = ['Rvt']
const plusmin = ['+/-']
const backspace = ['Backspace']
const dots = ['.'];
const enter = ['Enter'];
const action = ['-','+','*','/']
const parentheses = ['(',')']
const mem = ['MC' , 'MS' , 'MR' , 'M+' , 'M-']
const out = document.querySelector('.calc-screen p');

//Полная очистка
function clearAll () {
    number = '';
    memory = '';
    znachenie = false; 
    math = false;
    dot = false 
    open = false;
    close = false;
    finish = false;
    celoe = false;
    neceloe = false;
    openkol = 0;
    closekol = 0;
    neceloecol = 0;
    celoecol = 0;   
    out.textContent = 0;
    plusminnumber = false
    pmnumber = 0
    numberusualy = 0

}
//Удаление
function remove () {
    if(number.slice(number.length-2,-1) == '+' || '-'|| '*'||'/'){
        console.log(neceloe);
        if(!neceloe & celoe){
            neceloe = true;
            celoe = false;
            dot = false
        }else{
            neceloe = false
            celoe = true
            dot = true
        }
    }
    switch (number.slice(-1)){
        case '(':
            open = false;
            break
        case ')':
            close = false
            break
        case '+':
            math = false
            break
        case '-':
            math = false
            break
        case '*':
            math = false
            break
        case '/':
            math = false
            break
        case '.':
            dot = false
            celoe = true
            neceloe = false
            break
    }
    if(dot){
        neceloecol-=1
    }else if (!dot){
        celoecol-=1
    }   
    number = number.slice(0, -1);
    out.textContent = number;   
}
//Очистка
function clear () {
    number = ''
    finish = false;
    out.textContent = 0;
}
//Обратная польская запись
function calculation(buffString) {        
    buffString = buffString.replace(/([^[0-9.]{1})/g, " $1 ").trim(); // добавим пробелы вокруг не чисел       
    buffString = buffString.replace(/ {1,}/g, " ");              // удаление сдвоенных пробелов       
    var buffArray = buffString.split(/\s/);                   // Элементы - в массив        
    var polishString = new Array;        
    var polishStack = new Array;       
    var stringId = -1;        
    var stackId = -1;       
    for (var i = 0; i < buffArray.length; i++) {                // формируем обратную польскую запись        
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
    }                                                                  // польская запись готова
    stackId = -1;                                                      // Начинаем считать по польской записи
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
//Вычесления                
function kalk() {
        let res = calculation(number);
        rvt = res;
        number = res
        let stri = ''
        stri = res.toString()        
        out.textContent = parseFloat(parseFloat(res.toString()).toFixed(8));
        finish = true;
}
//Нажата цифра
function pressnumber(key) {
    if(dot && neceloecol<8){
        number +=key
        neceloecol++
        out.textContent = number;
        znachenie = true;
        neceloe = true;
        math = false;
        return
    }else if(!dot && celoecol<12){
        celoecol++
        celoe = true;
        neceloe = false;
        number +=key
        out.textContent = number;
        znachenie = true;
        math = false;
        return
    }else{
        out.textContent = number;
        return
    }
}
//Нажата точка
function pressdot(key) {
    if (celoe && !neceloe && !dot){
        dot = true;
        celoecol = 0;
        number +=key;
        celoe = false;
        out.textContent = number;
        return;
    }
}
//Нажато скобка
function pressopenclose(key){
    if (open && !close && key === '(' && znachenie && !math){
        out.textContent = number;
        return
    }
    else if (!open && close && key === ')' && !znachenie && math){
        out.textContent = number;            
        return
    }
    else if (!open && close && key === '(' && !znachenie && !math){
        number +=key
        open = true;
        close = false;
        out.textContent = number;
        return
    }
    else if (open && !close && key === ')' && znachenie && math){
        out.textContent = number;            
        return
    }
    else if (!open && !close && key === '(' && !znachenie && !math){
        number +=key
        open = true;
        close = false;
        out.textContent = number;
        return            
    }
    else if (!open && close && key === '('){
        number +=key
        open = true;
        close = false;
        out.textContent = number;
        return
    }
    else if (open && !close && key === ')' && znachenie && !math){
        number +=key
        close = true;
        open = false;
        out.textContent = number;
        return
    }
    else if (!open && !close && key ==='(' && !znachenie){
        number +=key
        open = true;
        close = false;
        out.textContent = number;
        return
    }
}
//Нажато действие
function pressaction(key) {
    if (math && !znachenie) {
        out.textContent = number;
        return
    }
    else{
        celoecol = 0
        neceloecol = 0
        dot = false;
        sign = key;
        math = true;
        znachenie = false
        number += key;
        out.textContent = number;
        return;
    }
}
//Нажато память
function pressmem(key){
    switch (key){
        case 'MC':
            memory = ''
            out.textContent = number;
            break;
        case 'MS':
            memory = number;
            number = '';
            break;
        case 'MR':
            number = memory;
            out.textContent = number;
            break;
        case 'M+':
            memory = memory + ' + ' + number;
            memory = eval(memory);
            number = '';
            break;
        case 'M-':
            memory =memory + ' - ' + number;
            memory = eval(memory);
            number = '';
            break;
    }
}


document.querySelector('.AC').onclick = clearAll; //Нажато полное очищение на экране
document.querySelector('.equal').onclick = kalk; //Нажато равно
document.querySelector('.C').onclick = clear; // Нажато C
document.querySelector('.back').onclick = remove; //Нажато <-

//нажато что-то на экране
document.querySelector('.buttons').onclick = (event) => {
    if(!event.target.classList.contains('btn')) return;
    if(event.target.classList.contains('AC')) return;


    const key = event.target.textContent;

    //нажата цыфра
    if (digit.includes(key)) {
        pressnumber(key);        
    }
    //нажата rvt
    if (rtvnum.includes(key)){
        number = rvt;
        out.textContent = number;
        return;
    }
    //нажата точка
    if (dots.includes(key)){
        pressdot(key)
    }
    //нажат -+
    if (plusmin.includes(key)){
        number.toString();       

        if(!plusminnumber){
            pmnumber=number   
            numberusualy = number.split('').reverse().join('') 
            for(let i = 0 ; i <= number.length;i++){
                console.log('est')
                console.log(numberusualy.slice(i,i +1 -number.length))
                if(numberusualy.slice(i,i +1 -number.length)=='+'){
                    numberusualy = numberusualy.replace(/[\+]/,'-(+')
                    break
                }else if(numberusualy.slice(i,i +1 -number.length)=='-'){
                    numberusualy = numberusualy.replace(/[\-]/,'-(-')
                    break
                }else if(numberusualy.slice(i,i +1 -number.length)=='*'){
                    numberusualy = numberusualy.replace(/[\*]/,'-(*')
                    break
                }else if(numberusualy.slice(i,i +1 -number.length)=='/'){
                    numberusualy = numberusualy.replace(/[\/]/,'-(/')
                    break
                }
            }

            number = numberusualy.split('').reverse().join('')
            number += ')'
            out.textContent = number; 
            plusminnumber = true;
        }
        else{
            plusminnumber = false
            number = pmnumber
            out.textContent = number;
        }
        out.textContent = number;
        return
    }
    //нажата скобка
    if (parentheses.includes(key)) {
        pressopenclose(key);       
    }

    //Нажата клавиша +-/*
    if (action.includes(key)) {
        pressaction(key);
    }

    if (mem.includes(key)){
        pressmem(key);
    }
    
}
//нажато что-то на клавиатуре 
document.onkeydown = (event) => {
    const keyb = event.key;
    console.log(event.key);
    if (backspace.includes(keyb)){
        remove();
    }
    if (digit.includes(keyb)) {
        pressnumber(keyb)
    }
    if (dots.includes(keyb)){
        pressdot(keyb)
    }
    //Нажата клавиша +-/*
    if (action.includes(keyb)) {
        pressaction(keyb)
    }
    if (parentheses.includes(keyb)) {
        pressopenclose(keyb);       
    }
    if (enter.includes(keyb)){
        kalk();        
    }
}