(function(){
    `use strict`;
    //Step 1 Get a node in DOM
    var canvas=document.querySelector(`#helloCanvas`);
        if(canvas.getContext){//Step 2 Check web browser support
            //Step 3 Access the drawing context and draw
            var canvasContext=canvas.getContext(`2d`);
            canvasContext.fillStyle=`rgb(200, 0, 0)`;
            canvasContext.fillRect(0, 0, 100, 200);
            canvasContext.fillStyle=`rgba(0, 0, 200, 0.5)`;
            canvasContext.fillRect(50, 100, 100, 100);
        }else{
            //canvas-unsupported code here
        }

})();