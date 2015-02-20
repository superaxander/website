pageName = "Home"
function createRequest() {
  try {
    request = new XMLHttpRequest();
  } catch (tryMS) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (otherMS) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        request = null;
      }
    }
  }
  return request;
}

function loadPage(page){
  oldPage = pagename;
  oldUrl = url;
  url = "/content/" + page;
  pagename = page;
  request = createRequest()
  if (request == null) {
    alert("Request failed");
  }else{
    request.onreadystatechange = changeContent;
    registerRequest.open("GET", url, true);
    registerRequest.send(null);
  }
}

function changeContent(){
  if(request.readyState == 4){
    if(request.status == 200){
        contentpane = document.getElementById("content");
        contentpane.innerHTML = request.getResponseText();
        menuItem = document.getElementById(pagename);
        menuItem.style = "color:black";
        menuItem.onClick = null;
        if(oldPage != null && oldUrl != null){
          menuItem2 = document.getElementById(oldPage)
          menuItem2.style = null;
          menuItem2.onClick = "loadPage(oldPage)"
        }
    }
  }
}
