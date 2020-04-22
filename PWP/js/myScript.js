function myFunction(){
    var x=document.querySelector(`#myTopNav`);
    if(x.className==="topnav")x.className+=" responsive";
    else x.className="topnav";
}