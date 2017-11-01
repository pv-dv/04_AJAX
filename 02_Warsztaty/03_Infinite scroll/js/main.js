function ajax(ajaxParams) {
    var parameters = {
        type:       ajaxParams.type      || "POST",
        url:        ajaxParams.url       || "",
        onError:    ajaxParams.onError   || function () {},
        onSuccess:  ajaxParams.onSuccess || function () {},
        dataType:   ajaxParams.dataType  || "text"
    };

    function httpSuccess(httpRequest) {
        try {
            return ((httpRequest.status >= 200 && httpRequest.status < 300) ||
                     httpRequest.status == 304 ||
                    (httpRequest.userAgent.indexOf("Safari") >= 0 &&
                     typeof httpRequest.status == "undefined"));
            } catch (err) {
                return false;
            }
    };

    var httpReq = new XMLHttpRequest();
    
    httpReq.open(ajaxParams.type,  //open connection using defined method
                 ajaxParams.url,   //with the defined URL link
                 true);            //in asynchronous mode = true
    
    httpReq.onreadystatechange = function () {  
        if (httpReq.readyState == 4) { 
            if (httpSuccess(httpReq)) {
                var returnedData = (ajaxParams.dataType == "XML") ? httpReq.responseXML : httpReq.responseText;
                ajaxParams.onSuccess(returnedData);
                httpReq = null;    
            } else {
                ajaxParams.onError(httpReq.statusText);
            }
        };
    };
    httpReq.send();
}; //end of function ajax



//Function call
window.onscroll = function(){
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        pasteData();
    }
};

function pasteData(){
    ajax({
            type: "GET",
            url:  "https://jsonplaceholder.typicode.com/users ",
            onError:    function () {console.log("Could not establish connection")},
            onSuccess:  function(response) {
                        
                        var jsonObject = JSON.parse(response);
                
                        for(var i = 0; i<Object.keys(jsonObject).length; i++){
                            var separator = document.createElement("p");
                            separator.innerHTML = "<<<-------->>>";
                            document.body.appendChild(separator);
                            
                            var userId = document.createElement("p");
                            userId.innerText = "UserID: " + jsonObject[i].userId;
                            document.body.appendChild(userId);
                            
                            var userName = document.createElement("p");
                            userName.innerText = "User Name: " + jsonObject[i].name;
                            document.body.appendChild(userName);
                            
                            var website = document.createElement("p");
                            website.innerText = "User Name: " + jsonObject[i].website;
                            document.body.appendChild(website);
                        }
            }
    });  
};

