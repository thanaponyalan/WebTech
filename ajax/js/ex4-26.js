function ajaxCall(dataURL){
    `use strict`;
    var XHR=new XMLHttpRequest();
    XHR.onreadystatechange=function(){
        if(XHR.readyState===4){
            if(XHR.status===200)console.log(XHR.responseText);
            else alert(`There was a problem of request:\n ${XHR.statusText}`);
        }
    }
    XHR.open(`GET`,dataURL);
    XHR.send(null);
}

ajaxCall(`data/contacts.json`);