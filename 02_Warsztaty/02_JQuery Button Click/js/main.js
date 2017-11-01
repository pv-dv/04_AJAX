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
$(document).ready(function(){
    $("#btn").click(function(){
        $.getJSON("http://echo.jsontest.com/userId/108/userName/Akademia108/userURL/akademia108.pl",
              function(jsonData){ //Success
                    console.log(jsonData);
              })
    })
});


