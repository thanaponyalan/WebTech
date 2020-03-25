var game=[
    ['.',`.`,`.`,`.`,`.`,`.`,`.`,`.`,`.`],
    [`.`,`.`,`.`,`.`,`.`,`.`,`.`,`.`,`.`],
    [`.`,`.`,`.`,`.`,`.`,`.`,`.`,`.`,`.`],
    [`.`,`.`,`.`,`.`,`.`,`.`,`.`,`.`,`.`],
    [`.`,`.`,`.`,`.`,`.`,`.`,`.`,`.`,`.`],
    [`.`,`.`,`.`,`.`,`.`,`.`,`.`,`.`,`.`],
    [`.`,`.`,`.`,`.`,`.`,`.`,`.`,`.`,`.`],
    [`.`,`.`,`.`,`.`,`.`,`.`,`.`,`.`,`.`],
    [`.`,`.`,`.`,`.`,`.`,`.`,`.`,`.`,`.`]
];

var board=document.createElement(`pre`);
document.body.appendChild(board);

var button=document.createElement(`button`);
button.onclick=fire;
var t=document.createTextNode(`Fire!`);
document.body.appendChild(button);
button.appendChild(t);

function drawBoard(){
    `use strict`;
    var boardContents=``,i,j;
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            boardContents+=game[i][j]+`    `;
        }
        boardContents+=`<br><br><br>`
    }
    return boardContents;
}
board.innerHTML=drawBoard();

var x,y,direction;
while(isNaN(x)||x<0||x>8)x=Number(prompt(`ระบุตำแหน่งในแนวแกน X ที่คุณต้องการวางเรือ: (0-8)`));
while(isNaN(y)||y<0||y>8)y=Number(prompt(`ระบุตำแหน่งในแนวแกน Y ที่คุณต้องการวางเรือ: (0-8)`));
direction=prompt(`คุณต้องการวางเรือในแนวนอน กด(h) หรือแนวตั้ง กด(v)`);

if(direction[0]==`h`){
    var c;
    for(c=x;c<(x+4);c++){
        game[y][c]=`#`;
    }
}
if(direction[0]==`v`){
    var c;
    for(c=y;c<(y+4);c++){
        game[c][x]=`#`;
    }
}
board.innerHTML=drawBoard();

function fire(){
    `use strict`;

    var fireX,fireY;
    while(isNaN(fireX)||fireX<0||fireX>8)fireX=Number(prompt(`ระบุตำแหน่งในแนวแกน X ที่คุณต้องการยิง: (0-8)`));
    while(isNaN(fireY)||fireY<0||fireY>8)fireY=Number(prompt(`ระบุตำแหน่งในแนวแกน Y ที่คุณต้องการยิง: (0-8)`));   
    
    if(game[fireY][fireX]==`.`)alert(`พลาดเป้า`);
    else if(game[fireY][fireX]==`*`)alert(`เรือดังกล่าวถูกยิงไปแล้ว`);
    else{
        alert(`Boom!!! คุณยิงโดนเรือ`);
        game[fireY][fireX]=`*`;
        board.innerHTML=drawBoard();
    }
    var shipfound,i,j;
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            if(game[i][j]!=`.`&&game[i][j]!=`*`)shipfound=true;
        }
    }
    if(!shipfound){
        alert(`เรือทุกลำถูกจมหมดแล้ว เก่งมากกัปตัน! จบเกม`);
        document.body.removeChild(button);
    }
}