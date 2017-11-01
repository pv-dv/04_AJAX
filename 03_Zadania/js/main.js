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



function getData(event){
    ajax({
            type: "GET",
            url:  "http://echo.jsontest.com/imie/Piotr/nazwisko/Lewinski/zawod/Programista/firma/Akademia108",
            onError:    function () {console.log("Could not establish connection")},
            onSuccess:  function(response) {
                        
                        var jsonObject = JSON.parse(response);
                        
                        var userName = document.createElement("p");
                        userName.innerText = "Name: " + jsonObject.imie;
                
                        var userProf = document.createElement("p");
                        userProf.innerText = "Profession: " + jsonObject.zawod;

                        var userSurname = document.createElement("p");
                        userSurname.innerText = "Surname: " + jsonObject.nazwisko;
                
                        var company = document.createElement("p");
                        company.innerText = "Company: " + jsonObject.firma;
                        
                        $("#dev-data").append(userName);
                        $("#dev-data").append(userProf);
                        $("#dev-data").append(userSurname);
                        $("#dev-data").append(company);
                    
            }
    });  
};

//Function call
document.getElementById("btn").addEventListener("click", getData);

