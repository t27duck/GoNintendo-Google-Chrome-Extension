function init(id) { 
  chrome.extension.sendRequest({method: "get", key: 'message_boards'}, function(response) { 
    var settings = response.value; 
    var css = '';
    if (settings.swap_user_and_post == "1") {
      css += ' .attachbox { float: left; width: auto; margin: 5px 5px 5px 0; padding: 6px; background-color: #FFFFFF; border: 1px dashed #d8d8d8; clear: right; }';
      css += ' .postbody { padding: 0; line-height: 1.48em; color: #333333; width: 76%; float: right; clear: both; }';
      css += ' .postprofile { margin: 5px 0 10px 0; min-height: 80px; color: #666666; border-left: none; border-right: 1px solid #FFFFFF; width: 22%; float: left; display: inline; }';
      css += ' .pm .postprofile { border-right: 1px solid #DDDDDD; }';
      css += ' .online { /* background-image: url("{T_IMAGESET_LANG_PATH}/icon_user_online.gif"); margin-top: -5px; */ }';
      css += ' .online dt { margin-top: 5px; }';
      css += ' .profile-icons { margin-right: 45px; }';
    }

    if (css != '') {
      var s=document.createElement('style');
      s.setAttribute('type','stylesheet');s.setAttribute('type','text/css');
      c = document.createTextNode(css);
      s.appendChild(c);
      document.getElementsByTagName('head')[0].appendChild(s);
    }
  });
} 

init();