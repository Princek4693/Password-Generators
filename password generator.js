let  inputSlider = document.querySelector(".slider");
let lengthDisplay = document.querySelector("#lengthNumber");
let passwordDisplay = document.querySelector(".displayPassword");
let copyBtn = document.querySelector("#btn")
let copyMsg = document.querySelector("#span");
let uppercaseCheck = document.querySelector("#uppercase");
let lowercaseCheck = document.querySelector("#lowercase");
let numbersCheck = document.querySelector("#numbers");
let symbolsCheck = document.querySelector("#symbols");
let indicator = document.querySelector("[data-indicator]");
let generateBtn = document.querySelector(".generateButton");
let allCheckBox = document.querySelectorAll("input[type=checkbox]");
let symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';



// initially
let password = "";
let passwordLength = 10;
let checkCount = 0;
// ste strength circle color to grey
setIndicator("grey")  // same chij function declaration chahe to uper bhi aur neecha bhi
//set password length


handleSlider();        // it is a function declaration by hoisting process we can move call function to top of the file and if we want they can move to bottom outside the function 
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    let min = inputSlider.min;
    let max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "% 100%";
    
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`
}
// setIndicator("#dddddd") 


function getRndInteger(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
}


function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65,91))
    
}

function generateSymbol() {
    let randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
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
       passwordLength >=6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00")
    } 
  
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    // to make copy wala span visible
    copyMsg.classList.add("hello");

    setTimeout( () => {
        copyMsg.classList.remove("hello");
    },2000);
}

function shufflePassword(array) {
    //Fisher Yates Method
    for(let i = array.length - 1; i > 0; i--) {
        //random j, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    //special condition
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkCount == 0)
        return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    //let's start the journey to find new password
    console.log("Starting the Journey")
    //remove old password
    password = "";


    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);
    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber)

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

//compulsory addition
    for(let i=0; i<funcArr.length; i++){
            password += funcArr[i]();
    }
    console.log("compulsory addition done")

    //remaining addition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("ranIndex" + randIndex);
        password += funcArr[randIndex](); 
    }
    console.log("Remaining addition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI addition done");
    //calculate strength
    calcStrength();
});


    let Dada = document.addEventListener("click" , function(){

        if(passwordDisplay.type == "password"){
            passwordDisplay.type = "text";
            Dada.style.backgroundColor = "red";
        }
        else{
            passwordDisplay.type = "password";
        }
    })
