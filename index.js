const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let passwordLength=10;
// let allcheck=0;
let checkCount=0;
let password="";
handleslider();

function handleslider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"


}

function setindicator(color){
    indicator.style.backgroundcolor=color;
    
}

function getRndInteger(min, max){
    return Math.floor(Math.random() *(max-min))+min;
}

function generateRandomNO(){
    return getRndInteger(0,9);
}

function generatelowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateuppercase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generatesymbol(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copycontent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
    }
    copyMsg.classList.add("active");

    setTimeout( ()=>{
        copyMsg.classList.remove("active");
    },2000);
}

function shufflepassword(array){
    //
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random() *  (i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el) =>(str+=el));
    return str;
}

function handleCheckBoxChange(){
    checkcount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkcount++;
    });

    if(passwordLength<checkcount){
        passwordLength=checkcount;
        handleslider();
    }
}

allCheckBox.forEach( (checkbox) =>{
    checkbox.addEventListener('change', handleCheckBoxChange)
})

inputSlider.addEventListener('input',(e)=> {
    passwordLength=e.target.value;
    handleslider();
})

copyBtn.addEventListener('click', () =>{
    if(passwordDisplay.value)
        copycontent();
    
})

generateBtn.addEventListener('click', () => {
    if(checkcount==0)
         return;

    if(passwordLength<checkcount){
        passwordLength=checkcount;
        handleslider();
    }

    console.log("Starting the journey");

    password="";

    // if(uppercaseCheck.checked){
    //     password += generateuppercase();
    // }

    // if(lowercaseCheck.checked){
    //     password += generatelowercase();
    // }

    // if(numbersCheck.checked){
    //     password += generateRandomNO();
    // }

    // if(symbolsCheck.checked){
    //     password += generatesymbol();
    // }

    let funcArr=[];

    if(uppercaseCheck.checked)
        funcArr.push(generateuppercase);

    if(lowercaseCheck.checked)
        funcArr.push(generatelowercase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNO);

    if(symbolsCheck.checked)
        funcArr.push(generatesymbol);

    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i]();
        
    }
    console.log("Starting the journey");

    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Starting the journey");

    password=shufflepassword(Array.from(password));

    passwordDisplay.value=password;

    calcStrength();
    

})