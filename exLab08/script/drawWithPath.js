(function(){
    `use strict`;
    var canvas=document.querySelector(`#helloCanvas`);
    if(canvas.getContext){
        var canvasContext=canvas.getContext(`2d`);
        canvasContext.beginPath();
        canvasContext.moveTo(50, 50);
        canvasContext.lineTo(200, 200);
        canvasContext.lineTo(200, 50);
        //canvasContext.fill();
        canvasContext.closePath();
        canvasContext.strokeStyle=`rgb(200, 0, 0)`;
        canvasContext.stroke();
    }else{
        //Canvas-unsupported code here
    }
})();