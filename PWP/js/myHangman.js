// assign words in each category
var words=[
    [`Mario`,`RedAlert`,`Contra`], //Game Category
    [`Harry Potter`,`Fantastic Beasts`,`Narnia`], //Movie Category
    [`One Piece`,`Sword Art Online`,`Inazuma Eleven`] //Anime Category
];
var word,wordHolder,holdArea,buttonArea;
var guesses=[],
    drawArray=[];
var lives,space,counter,chosenCategory;

var myStickman,context;

var reset=document.querySelector(`#reset`),
    showClue = document.querySelector(`#clue`),
    hint=document.querySelector(`#hint`),
    showLives=document.querySelector(`#mylives`),
    categoryName=document.querySelector(`#categoryName`);

function createButton(){ //Add 26 btns for 26 English alphabet, assign eventListener to each btn.
    var alphabets=[`a`,`b`,`c`,`d`,`e`,`f`,`g`,`h`,`i`,`j`,`k`,`l`,`m`,`n`,`o`,`p`,`q`,`r`,`s`,`t`,`u`,`v`,`w`,`x`,`y`,`z`];
    buttonArea=document.querySelector(`#buttons`);
    buttonArea.removeAttribute(`class`);
    var btn;

    for(var i=0;i<alphabets.length;i++){
        btn=document.createElement(`button`); //create button elem.
        btn.className=`letter`; //assign class for css decoration
        btn.innerHTML=alphabets[i]; //assign each alphabet to each button
        btn.addEventListener(`click`,function(){ //add evenlistener onclick
            var guessed=this.innerHTML; //guessed alphabet
            this.setAttribute(`class`,this.getAttribute(`class`)+` active`); //add class for css decoration
            this.setAttribute(`disabled`,true) //disabled pressed button
            for(var j=0;j<word.length;j++){ //compare guessed alphabet to each alphabet of the random word
                if(word[j].toLowerCase()===guessed){ //guessed alphabet is only lower case so, make sure to transform the random word to lower case
                    guesses[j].innerHTML=guessed; //guessed is array of HTML elem. show an alphabet if guessed true.
                    counter++; //increase counter by 1; to check if game end.
                }
            }
            var j=(word.toLowerCase().indexOf(guessed)); //check if guessed alphabet is part of the random word; -1 isn't part of the random word otherwise, it's part of the random word.
            if(j!==-1)showStatus(); //show current status (remaining lives)
            else{
                lives-=1; //decrease live by 1 if guessed wrong.
                showStatus();
                animateHangman(); //draw a part of hangman
            }
        });
        buttonArea.appendChild(btn); //append each button into buttonArea (element#buttons)
    }
}

function createHole(){ //create guessing area
    wordHolder=document.querySelector(`#hold`);
    holdArea = document.createElement('ul');
    holdArea.setAttribute('id', 'my-word'); //assign id for css decoration
    for (var i = 0; i < word.length; i++) {
        var guess = document.createElement('li');
        guess.setAttribute('class', 'guess'); //assign class for css decoration
        // letter is "-" or " "(blankspace) then show that letter and increase space by 1 to check if game end otherwise, show _ (underscore)
        if (word[i] === "-") {
            guess.innerHTML = "-";
            space += 1;
        }else if(word[i]==" "){
            guess.innerHTML=" ";
            space+=1;
        }else {
            guess.innerHTML = "_";
        }
        guesses.push(guess); //push each HTML element to guesses (array of HTML elem.)
        wordHolder.appendChild(holdArea); //append holdArea (ul#my-word) into wordHolder (element#hold)
        holdArea.appendChild(guess); //append each guess letter into holdArea
    }
}

function showStatus(){
    //Normally show remaining live(s), 
    //if live less than 1 then Game Over and add css class to avoid click on the other guess buttons and show Game Over in status elem.
    //if game end (check if counter+space==length of word) show You Win! in status elem
    showLives.innerHTML=`You have `+lives+` live(s) remaining..`;
    if(lives<1){
        buttonArea.setAttribute(`class`,`avoid-clicks`)
        showLives.innerHTML=`Game Over`;
    }
    if(counter+space==guesses.length){
        buttonArea.setAttribute(`class`,`avoid-clicks`)
        showLives.innerHTML=`You Win!`;
    }
    
}

function startGame(){
    //choose category by input a number
    while(chosenCategory==null||chosenCategory<1||chosenCategory>3||Array.isArray(chosenCategory))chosenCategory=parseInt(prompt(`Please select category\n[1] Game\n[2] Movie\n[3] Anime`,`1`));
    chosenCategory=words[chosenCategory-1];
    word=chosenCategory[Math.floor(Math.random()*chosenCategory.length)]; //random a word
    lives=10; //a player has 10 lives
    space=counter=0; //space and counter (to check if game end) initial with 0
    guesses=[]; //a array of HTML elem.
    canvas(); //start to draw with canvas
    createButton();
    createHole();
    showStatus();
    showCategory(); //show chosen category
}

function showCategory(){
    categoryName.innerHTML=`The Chosen Category Is `;
    if(chosenCategory===words[0])categoryName.innerHTML+=`Game`;
    else if(chosenCategory===words[1])categoryName.innerHTML+=`Movie`;
    else if(chosenCategory===words[2])categoryName.innerHTML+=`Anime`;

}

function animateHangman(){ //draw each part of hangman depends on how many lives left.
    drawArray[lives]();
}

function draw(pathFromX, pathFromY, pathToX, pathToY){
    context.moveTo(pathFromX,pathFromY);
    context.lineTo(pathToX,pathToY);
    context.stroke();
}

function frame1(){
    draw(0,150,150,150);
}

function frame2(){
    draw(10,0,10,600);
}

function frame3(){
    draw(0,5,70,5);
}

function frame4(){
    draw(60,5,60,15);
}

function head(){ //draw head(circle) with arc
    myStickman=document.querySelector(`#stickman`);
    context=myStickman.getContext(`2d`);
    context.beginPath();
    context.arc(60,25,10,0,Math.PI*2,true);
    context.stroke();
}

function torso(){
    draw(60,36,60,70);
}

function rightArm(){
    draw(60,46,100,50);
}

function leftArm(){
    draw(60,46,20,50);
}

function rightLeg(){
    draw(60,70,100,100);
}

function leftLeg(){
    draw(60,70,20,100);
}

drawArray=[rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2 ,frame1]; //put each function into drawArray

function canvas(){ //start canvas draw with color: #000 and width: 2
    myStickman=document.querySelector(`#stickman`);
    context=myStickman.getContext(`2d`);
    context.beginPath();
    context.strokeStyle=`#000`;
    context.lineWidth=2;
}

(function(){
    `use strict`;
    startGame();
    hint.addEventListener(`click`,function(){ //add event listener when hint button clicked
        //array of hint (as same position as word position)
        hints=[
            [`Luigi`,`Command & Conquer`,`Produced by Konami in 1987`],
            [`Hogwarts`,`J.K.Rolling in 2016`,`A series of novels by C. S. Lewis.`],
            [`A Japanese shōnen manga series written and illustrated by Eiichiro Oda.`,`A Japanese light novel series written by Reki Kawahara and illustrated by abec.`,`The animated series was produced by OLM under the direction of Katsuhito Akiyama and consists of 127 episodes.`]
        ];
        var categoryIndex=words.indexOf(chosenCategory); //check index of chosenCategory in words
        var hintIndex=chosenCategory.indexOf(word); //check index of word in chosenCategory
        showClue.innerHTML=`Clue : `+hints[categoryIndex][hintIndex]; //show clue
    });
    reset.addEventListener(`click`,function(){ //add event listener when reset button clicked
        holdArea.parentNode.removeChild(holdArea); //remove all guessed alphabets
        buttonArea.innerHTML=``; //clear all button
        showClue.innerHTML=``; //clear clue
        context.clearRect(0, 0, 400, 400);
        startGame(); //start new game
    });
})();