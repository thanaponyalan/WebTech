/* define the Ajax call */
function ajaxCall(dataURL, outputElement, callback){
    `use strict`;
    var XHR=new XMLHttpRequest();
    outputElement.innerHTML=`Loading...`;
    XHR.onreadystatechange=function(){
        if(XHR.readyState===4&&XHR.status===200){
            var contacts=JSON.parse(XHR.responseText);
            if(typeof callback===`function`)callback(contacts);
            else alert(`There was a problem of request:\n ${XHR.statusText}`);
        }
    };
    XHR.open(`GET`, dataURL);
    XHR.send(null);
}
/* wrap everything in an anonymous function to contain the variables */
(function(){
    `use strict`;

    var searchForm=document.querySelector(`#searchForm`),
        searchField=document.querySelector(`#q`),
        target=document.querySelector(`#output`),
        getAllButton=document.querySelector(`#getAll`),
        jsonURL=`./data/contacts.json`;

    
        var addr={
            search:function(event){
                
                ajaxCall(jsonURL, target, function(data){
                    var searchValue=searchField.value,
                        addrBook=data.addressBook,
                        count=addrBook.length,
                        i;

                    event.preventDefault();
                    
                    target.innerHTML=``;
                    if(count>0&&searchValue!==``){
    
                        for(i=0;i<count;i++){
                            
                            var obj=addrBook[i],
                                isItFound=obj.name.indexOf(searchValue);
    
                            if(isItFound!==-1){
                                target.innerHTML+=`<p>${obj.name}, <a href="mailto: ${obj.email}">${obj.email}</a><p>`;
                            }
                        }
                    }
                });
            },
            getAllContacts:function(){
                ajaxCall(jsonURL, target, function(data){
                    var i,
                        addrBook=data.addressBook,
                        count=addrBook.length;
    
                    target.innerHTML=``;
    
                    if(count>0){
                        for(i=0;i<count;i++){
                            var obj=addrBook[i];
                            target.innerHTML+=`<p>${obj.name}, <a href="mailto: ${obj.email}">${obj.email}</a><p>`;
                        }
                    }
                });
            },
            setActiveSection:function(){
                this.parentNode.setAttribute(`class`,`active`);
            },
            removeActiveSection:function(){
                this.parentNode.removeAttribute(`class`);
            },
            addHoverClass:function(){
                searchForm.setAttribute(`class`,`hovering`);
            },
            removeHoverClass:function(){
                searchForm.removeAttribute(`class`);
            }
        };
        searchField.addEventListener(`keyup`,addr.search,false);
        searchForm.addEventListener(`submit`,addr.search,false);
        getAllButton.addEventListener(`click`,addr.getAllContacts,false);
        searchField.addEventListener(`focus`,addr.setActiveSection,false);
        searchField.addEventListener(`blur`,addr.removeActiveSection,false);
        searchField.addEventListener(`mouseout`,addr.removeHoverClass,false);
})();