/*
function init(id) { 
  chrome.extension.sendRequest({method: "get", key: 'main_site'}, function(response) { 
    var settings = response.value; 
    var css = '';
    if (settings.hide_topper == '1') {
      css += ' #topper { display: none; }';
    }
    if (css != '' ) {
      var s=document.createElement('style');
      s.setAttribute('type','stylesheet');s.setAttribute('type','text/css');
      c = document.createTextNode(css);
      s.appendChild(c);
      document.getElementsByTagName('head')[0].appendChild(s);
    }
  });
} 

init();
*/