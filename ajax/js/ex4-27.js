function ajaxCall(dataURL, callback){
    `use strict`;
    var XHR=new XMLHttpRequest();
    XHR.onreadystatechange=function(){
        if(XHR.readyState===4){
            if(XHR.status===200){
                var contacts=JSON.parse(XHR.responseText);
                
                if(typeof callback===`function`)callback(contacts);
            }
            else alert(`There was a problem of request:\n ${XHR.statusText}`);
        }
    }
    XHR.open(`GET`,dataURL);
    XHR.send(null);
}

ajaxCall(`data/contacts.json`,function(data){
    console.log(data.addressBook);
});