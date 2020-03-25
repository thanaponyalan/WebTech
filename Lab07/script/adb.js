/* wrap everything in an anonymous function to contain the variables */
(function(){
    `use strict`;

    var contacts={"addressBook":[
        {
            "name": "hillisha",
            "email": "hill@example.com"
        },
        {
            "name": "paul",
            "email": "cleveland@example.com"
        },
        {
            "name": "vishaal",
            "email": "vish@example"
        },
        {
            "name": "mike",
            "email": "grady@example.com"
        },
        {
            "name": "jamie",
            "email": "dusted@example.com"
        },
        {
            "name": "pongkiat",
            "email": "pongkiat.jo@kmitl.ac.th"
        }
    ]};


    var searchForm=document.querySelector(`#searchForm`),
        searchField=document.querySelector(`#q`),
        count=contacts.addressBook.length,
        target=document.querySelector(`#output`),
        getAllButton=document.querySelector(`#getAll`);

    
        var addr={
            search:function(event){
                
                var searchValue=searchField.value, i;
                
                event.preventDefault();
                
                target.innerHTML=``;

                if(count>0&&searchValue!==``){

                    for(i=0;i<count;i++){
                        
                        var obj=contacts.addressBook[i],
                            isItFound=obj.name.indexOf(searchValue);

                        if(isItFound!==-1){
                            target.innerHTML+=`<p>${obj.name}, <a href="mailto: ${obj.email}">${obj.email}</a><p>`;
                        }
                    }
                }
            },
            getAllContacts:function(){
                var i;

                target.innerHTML=``;

                if(count>0){
                    for(i=0;i<count;i++){
                        var obj=contacts.addressBook[i];
                        target.innerHTML+=`<p>${obj.name}, <a href="mailto: ${obj.email}">${obj.email}</a><p>`;
                    }
                }
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