var words=[
    [`Mario`,`RedAlert`,`Contra`],
    [`Harry Potter`,`Fantastic Beasts`,`Narnia`],
    [`One Piece`,`Sword Art Online`,`Inazuma Eleven`]
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

function createButton(){
    var alphabets=[`a`,`b`,`c`,`d`,`e`,`f`,`g`,`h`,`i`,`j`,`k`,`l`,`m`,`n`,`o`,`p`,`q`,`r`,`s`,`t`,`u`,`v`,`w`,`x`,`y`,`z`];
    buttonArea=document.querySelector(`#buttons`);
    var btn;

    for(var i=0;i<alphabets.length;i++){
        btn=document.createElement(`button`);
        btn.className=`letter`;
        btn.innerHTML=alphabets[i];
        btn.addEventListener(`click`,function(){
            var guessed=this.innerHTML;
            this.setAttribute(`class`,this.getAttribute(`class`)+` active`);
            this.setAttribute(`disabled`,true)
            for(var j=0;j<word.length;j++){
                if(word[j].toLowerCase()===guessed){
                    guesses[j].innerHTML=guessed;
                    counter++;
                }
            }
            var j=(word.toLowerCase().indexOf(guessed));
            if(j!==-1)showStatus();
            else{
                lives-=1;
                showStatus();
                animateHangman();
            }
        });
        buttonArea.appendChild(btn);
    }
}

function createHole(){
    wordHolder=document.querySelector(`#hold`);
    holdArea = document.createElement('ul');
    holdArea.setAttribute('id', 'my-word');
    for (var i = 0; i < word.length; i++) {
        var guess = document.createElement('li');
        guess.setAttribute('class', 'guess');
        if (word[i] === "-") {
            guess.innerHTML = "-";
            space += 1;
        }else if(word[i]==" "){
            guess.innerHTML=" ";
            space+=1;
        }else {
            guess.innerHTML = "_";
        }
        guesses.push(guess);
        wordHolder.appendChild(holdArea);
        holdArea.appendChild(guess);
    }
}

function showStatus(){
    showLives.innerHTML=`You have `+lives+` live(s) remaining..`;
    if(lives<1){
        buttonArea.setAttribute(`class`,`avoid-clicks`)
        showLives.innerHTML=`Game Over`;
    }
    for(var i=0;i<guesses.length;i++){
        if(counter+space==guesses.length)showLives.innerHTML=`You Win!`;
    }
}

function startGame(){
    while(chosenCategory==null||chosenCategory<1||chosenCategory>3||Array.isArray(chosenCategory))chosenCategory=parseInt(prompt(`Please select category\n[1] Game\n[2] Movie\n[3] Anime`,`1`));
    chosenCategory=words[chosenCategory-1];
    word=chosenCategory[Math.floor(Math.random()*chosenCategory.length)];
    lives=10;
    space=counter=0;
    guesses=[];
    canvas();
    createButton();
    createHole();
    showStatus();
    showCategory();
}

function showCategory(){
    categoryName.innerHTML=`The Chosen Category Is `;
    if(chosenCategory===words[0])categoryName.innerHTML+=`Game`;
    else if(chosenCategory===words[1])categoryName.innerHTML+=`Movie`;
    else if(chosenCategory===words[2])categoryName.innerHTML+=`Anime`;

}

function animateHangman(){
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

function head(){
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

drawArray=[rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2 ,frame1]

function canvas(){
    myStickman=document.querySelector(`#stickman`);
    context=myStickman.getContext(`2d`);
    context.beginPath();
    context.strokeStyle=`#000`;
    context.lineWidth=2;
}

(function(){
    `use strict`;
    startGame();
    hint.addEventListener(`click`,function(){
        hints=[
            [`Luigi`,`Command & Conquer`,`Produced by Konami in 1987`],
            [`Hogwarts`,`J.K.Rolling in 2016`,`A series of novels by C. S. Lewis.`],
            [`A Japanese shōnen manga series written and illustrated by Eiichiro Oda.`,`A Japanese light novel series written by Reki Kawahara and illustrated by abec.`,`The animated series was produced by OLM under the direction of Katsuhito Akiyama and consists of 127 episodes.`]
        ];
        var categoryIndex=words.indexOf(chosenCategory);
        var hintIndex=chosenCategory.indexOf(word);
        showClue.innerHTML=`Clue : `+hints[categoryIndex][hintIndex];
    });
    reset.addEventListener(`click`,function(){
        holdArea.parentNode.removeChild(holdArea);
        buttonArea.innerHTML=``;
        showClue.innerHTML=``;
        startGame();
    });
    
})();