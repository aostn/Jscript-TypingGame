//Define the time limit
let TIME_LIMIT = 60;

//Define the quotes be used
let quotes_array = [
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "The way to get started is to quit talking and begin doing.",
    "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
    "If life were predictable it would cease to be life, and be without flavor.",
    "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    "Life is what happens when you're busy making other plans.",
    "Do not pray for easy lives. Pray to be stronger men."
];

//Select the required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text =  document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote(){
    quote_text.textContent = null;
    current_quote = quotes_array[quoteNo];

    //Separate each character and make an element
    //out of each of them to individually style them
    current_quote.split(' ').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quote_text.appendChild(charSpan)
    })

    //Roll over to the first quote
    if (quoteNo < quotes_array.length - 1)
        quoteNo++;
    else    
        quoteNo = 0;
}

function processCurrentText(){

    //Get current input text and split it
    curr_input = input_area.value;
    curr_input_array = curr_input.split(' ');

    //Increment total character typed
    characterTyped++;
    errors = 0;

    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
        let typedChar = curr_intput_array[index]

        //Character not currently typed
        if(typedChar == null){
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');

            //Correct character
        } else if(typedChar === char.innerText){
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');
            
            //Incorrect charcter
        } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');

            //Increments number of erorrors
            errors++;
        }
    });

    //Display the number of errors
    error_text.textContent = total_errors + errors;

    //Update accuracy text
    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);

    //If current text is completely typed
    //irrespective of errors
    if(curr_input.length == current_quote.length){
        updateQuote();
        
        //Update total errors
        total_errors += errors;

        //Clear the input area
        input_area.value = "";
    }
}

function startGame(){

    resetValues();
    updateQuote();

    //Clear old timer and start a new timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 10000);
}

function resetValues(){

    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0; 
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;

    input_area.value = "";
    quote_text.textContent = 'Click on the area below to start the game';
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
}

function updateTimer(){
    if(timeLeft > 0){
        //Decreased timer
        timeLeft--;

        //Increase the time elapsed
        timeElapsed++;

        //Update the timer text
        timer_text.textContent = timeLeft + "s";
    } else{
        finishGame();
    }
}

function finishGame(){
    //Stop the timer
    clearInterval(timer);

    //Disable the input area
    input_area.disabled = true;

    //Show finishing text
    quote_text.textContent = "Click on restart to start a new game.";
    
    //Display restart button
    restart_btn.style.display = "block";

    //Calculate cpm and wpm
    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed ) * 60));

    //Update cpm and wpm text
    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;

    //Display the cpm and wpm
    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
}