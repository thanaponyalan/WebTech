(function(){
    `use strict`;
    var btn=document.querySelector('#btn');
    btn.onclick=function(){
        document.querySelector(`#output`).textContent=Date();
    }
})();