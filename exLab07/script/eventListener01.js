(function(){
    `use strict`;
    var btn=document.querySelector('#btn');
    btn.addEventListener(`click`,function(){
        document.querySelector(`#output`).textContent=Date();
    },false);
})();