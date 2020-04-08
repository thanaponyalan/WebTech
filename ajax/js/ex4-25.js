var XHR=new XMLHttpRequest();

XHR.onreadystatechange=function(){
    `use strict`;
    if(XHR.readyState===4){
        if(XHR.status===200)console.log(XHR.responseText);
        else alert(`There was a problem of request:\n ${XHR.statusText}`);
    }
}

XHR.open(`GET`,`data/contacts.json`);

XHR.send(null);