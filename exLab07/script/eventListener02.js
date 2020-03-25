(function(){
    `use strict`;
    function showDate(){
        document.querySelector(`#output`).textContent=Date();
    }
    var btn=document.querySelector('#btn');
    btn.addEventListener(`mouseover`,showDate,false);
})();