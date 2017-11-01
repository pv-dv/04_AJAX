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

    
    //New object
    var httpReq = new XMLHttpRequest();
    
    
    //Open new server connection
    httpReq.open(ajaxParams.type,  //open connection using defined method
                 ajaxParams.url,   //with the defined URL link
                 true);            //in asynchronous mode = true
    
    //onreadychange is run whenever document status (httpReq.readystate) is changed
    //Possible values:
    //0. Not connected
    //1. Connected
    //2. Request received
    //3. Request processing
    //4. Request processed and data ready for use
    httpReq.onreadystatechange = function () {  //function is called 4 times - every time the status changes from 0-4
        if (httpReq.readyState == 4) { //we are interrested only when request has been processed -> 4
            
            //Once request processed check the connection status again, as meanwhile it might be broken
            if (httpSuccess(httpReq)) {
                //if Success - return XML/JSON
                var returnedData = (ajaxParams.dataType == "XML") ? httpReq.responseXML : httpReq.responseText;

                ajaxParams.onSuccess(returnedData);

                httpReq = null; //kill object to avoid unneccessary server connection, as data are already retrieved above

            } else {
                ajaxParams.onError(httpReq.statusText);
            }
        };
    };
    
    //Send using above defined ajaxParams
    httpReq.send();

}; //end of function ajax


//Function call
ajax({
    type: "GET",
    url: "http://echo.jsontest.com/userId/108/userName/Akademia108/userURL/akademia108",
    onError: function () {console.log("Could not establish connection")},
//    onSuccess: function () {console.log("Connected!")},
    onSuccess: function (response) {
        console.log("Retrieved data in text format:")
        console.log(response)
        
        //parse text to JSON format
        var jsonObject = JSON.parse(response);
        console.log("Retrieved data parsed to JSON format:")
        console.log(jsonObject);
        
        //Navigation through JSON object - as usuall with keys
        console.log("User ID: " + jsonObject.userId);
        console.log("User Name: " + jsonObject.userName);
        console.log("User URL: " + jsonObject.userURL);
        
        
        var paragraph = document.createElement("p");
        paragraph.innerText = "User ID: " + jsonObject.userId;
        document.getElementById("retrieved-data").appendChild(paragraph);
        
        
    },
});