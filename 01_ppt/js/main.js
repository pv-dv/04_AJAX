function ajax(ajaxParams){
    var parameters = {
        type:       ajaxParams.type      || "POST",
        url:        ajaxParams.url       || "",
        onError:    ajaxParams.onError   || function(),
        onSuccess:  ajaxParams.onSuccess || function(),
        dataType:   ajaxParams.dataType  || "text"
    };
    
    function httpSuccess(httpRequest){
        try {
            return ((httpRequest.status >= 200 && httpRequest.status < 300) ||
                    httpRequest.status == 304 ||                  
                    (httpRequest.userAgent.indexOf("Safari") >= 0 &&
                    typeof httpRequest.status == "undefined"));
        } catch(err) {
            return false;
        }
    };
    
    
    var httpReq = new XMLHTTPRequest();
    
    httpReq.open(ajaxParams.type,
                 ajaxParams.url,
                 true);
    
    //onreadychange is run whenever document status (httpReq.readystate) is changed
    //Possible values:
    //0. Not connected
    //1. Connected
    //2. Request received
    //3. Request processing
    //4. Request processed and data ready for use
    httpReq.onreadystatechange = function(){
        if(httpReq.readyState == 4){
            //Once request processed check the connection status
            if(httpSuccess(httpReq)){
                //if Success - return XML/JSON
                var returnedData = (ajaxParams.dataType == "XML") ? httpReq.responseXML : httpReq.responseText;
                
                ajaxParams.onSuccess(returnedData);
            }
        }
    }
    
    
    
    
    
    
    
} //function ajax

