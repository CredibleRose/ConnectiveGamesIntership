let number = ''; //конечное число
let rvt = '';
let znachenie = false; 
let celoe = false;//целое число
let neceloe = false; //число после точки
let dot = false; // точка 
let sign = ''; // знак операции
let math = false; 
let open = false;
let close = false;
let memory = '';

let finish = false;

const digit = ['0','1','2','3','4','5','6','7','8','9']
const rtvnum = ['Rvt']
const plusmin = ['+/-']
const dots = ['.'];
const action = ['-','+','*','/']
const parentheses = ['(',')']
const mem = ['MC' , 'MS' , 'MR' , 'M+' , 'M-']
const out = document.querySelector('.calc-screen p');


function clearAll () {
    number = '';
    memory = '';
    znachenie = false; 
    math = false; 
    open = false;
    close = false;
    finish = false;
    celoe = false;
    neceloe = false;    
    out.textContent = 0;
}
function remove () {
    number = number.slice(0, -1);
    out.textContent = number;
}
function equal () {
    rvt = number;
    number = eval(number).toString();
    out.textContent = number;
    finish = true;
}
function clear () {
    number = ''
    finish = false;
    out.textContent = 0;
}

document.querySelector('.AC').onclick = clearAll;
document.querySelector('.equal').onclick = equal;
document.querySelector('.C').onclick = clear;
document.querySelector('.back').onclick = remove;

//нажато что-то
document.querySelector('.buttons').onclick = (event) => {
    if(!event.target.classList.contains('btn')) return;
    if(event.target.classList.contains('AC')) return;

    //out.textContent = '';

    const key = event.target.textContent;

    //нажата цыфра
    if (digit.includes(key)) {
        if(dot){
            number +=key
            out.textContent = number;
            znachenie = true;
            neceloe = true;
            math = false;
            return
        }else if(!dot){
            celoe = true;
            neceloe = false;
            number +=key
            out.textContent = number;
            znachenie = true;
            math = false;
            return
        }
        
    }

    if (rtvnum.includes(key)){
        number = rvt;
        out.textContent = number;
        return;
    }

    if (dots.includes(key)){
        if (celoe && !neceloe && !dot){
            dot = true;
            number +=key;
            celoe = false;
            out.textContent = number;
            return;
        }
    }

    if (plusmin.includes(key)){
        number = eval(number)*-1;
        number.toString();
        out.textContent = number;
        return
    }
    //нажата скобка
    if (parentheses.includes(key)) {
        if (open && !close && key === '(' && znachenie && !math){
            out.textContent = number;
            return
        }else if (!open && close && key === ')' && !znachenie && math){
            out.textContent = number;            
            return
        }
        else if (!open && close && key === '(' && !znachenie && !math){
            number +=key
            open = true;
            close = false;
            out.textContent = number;
            return
        }else if (open && !close && key === ')' && znachenie && math){
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
        }else if (open && !close && key === ')' && znachenie && !math){
            number +=key
            close = true;
            open = false;
            out.textContent = number;
            return
        }else if (!open && !close && key ==='(' && !znachenie){
            number +=key
            open = true;
            close = false;
            out.textContent = number;
            return
        }
        console.log(math, znachenie);       
    }

    //Нажата клавиша +-/*
    if (action.includes(key)) {
        if (math && !znachenie) {
            out.textContent = number;
            return
        }else{
            dot = false;
            sign = key;
            math = true;
            znachenie = false
            number += key;
            out.textContent = number;
            return;}
    }

    if (mem.includes(key)){
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
}