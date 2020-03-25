(function(){
    `use strict`;
    var btn=document.querySelector('#btn');
    function showDate(){
        `use strict`;
        document.querySelector(`#output`).textContent=Date();
        btn.textContent=`Click to clear`;
    }
    function clearDate(){
        `use strict`;
        var txtNode=document.querySelector(`#output`).firstChild;
        document.querySelector(`#output`).removeChild(txtNode);
        btn.textContent=`What time is it?`
    }
    btn.addEventListener(`mouseover`,showDate,false);
    btn.addEventListener(`click`,clearDate,false);
})();