pagename = "Home";
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
  url = "content/" + page;
  pagename = page;
  registerRequest = createRequest();
  if (registerRequest === null) {
    alert("Request failed");
  }else{
    registerRequest.onreadystatechange = changeContent;
    registerRequest.open("POST", url, true);
    registerRequest.send(null);
    document.title = "Alexander | Loading"
    spinner = document.createElement("I")
    spinner.class = "fa fa-spinner fa-spin"
    title = document.getElementById("title");
    title.innerHTML = "Loading"
    title.appendChild(spinner)
  }
}

function changeContent(){
  if(registerRequest.readyState == 4){
    if(registerRequest.status == 200){
        title = document.getElementById("title");
        title.innerHTML = pagename
        contentpane = document.getElementById("content");
        contentpane.innerHTML = registerRequest.responseText;
        document.title = "Alexander | "+pagename;
    }
  }else if(registerRequest.readyState == 3){
    document.title = "Alexander | Loading..."
  }else if(registerRequest.readyState == 2){
    document.title = "Alexander | Loading.."
  }else{
    document.title = "Alexander | Loading."
  }
}
