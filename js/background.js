var top_stories = [];

// For retreiving info in content scripts
//chrome.extension.onRequest.addListener( function(request, sender, sendResponse) {
  //console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
//  switch(request.method.toLowerCase()) {
//    case "set":
//      localStorage[request.key] = request.setvalue;
//      sendResponse({});
//      break;
//    case "get":
//      sendResponse({value: settings[request.key]});
//      break;
//    default:
//      sendResponse({value: "error"});
//  }
//});

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    switch(text.toLowerCase()) {
      case "chat":
        chrome.tabs.create({url: 'http://gonintendo.com/?mode=chat'});
        break;
      case "games":
        chrome.tabs.create({url: 'http://gonintendo.com/?mode=games'});
        break;
      case "forum":
      case "boards":
        chrome.tabs.create({url: 'http://gonintendo.com/boards'});
        break;
      case "top":
        chrome.tabs.create({url: 'http://gonintendo.com/?c=2'});
        break;
      case "rumors":
        chrome.tabs.create({url: 'http://gonintendo.com/?c=5'});
        break;
      case "console":
        chrome.tabs.create({url: 'http://gonintendo.com/?c=6'});
        break;
      case "portable":
        chrome.tabs.create({url: 'http://gonintendo.com/?c=7s'});
        break;
      default:
        chrome.tabs.create({url: 'http://gonintendo.com/?mode=list&dosearch=1&s='+text});
    }
  });

var settings;
var refresh_rate = 60 * 20 * 1000;
function main() {
  prepareSettings();
  refresh_rate = parseInt(settings.refresh_rate) * 60 * 1000;
  window.setInterval(function(){refreshData();}, refresh_rate);
  refreshData();
}

function refreshData() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if(xhr.status==200) {
        var data = JSON.parse(xhr.responseText);
        processData(data);
      }
    }
  }
  xhr.open("GET", 'http://gonintendo.com/content/json/chrome-1.json?'+new Date().getTime(), true);
  xhr.send();
}

function processData(data) {
  if (data.live_stream.active.toString() == "1" && localStorage['live_stream'] == "0") {
    if (settings.live_stream.enable == '1') {
      showPopup('notifications/livestream.html', 'live_stream');
    }
  }
  localStorage['live_stream'] = data.live_stream.active.toString();
  top_stories = [];
  for(x=0; x<data.top_stories.length; x++) {
    top_story = data.top_stories[x];
    if(x==0) {
      if(localStorage['top_story_uuid'] != top_story.url) {
        if (settings.top_stories.enable == "1") {
          showPopup('notifications/top_story.html', 'top_stories');
        }
      }
      localStorage['top_story_uuid'] = top_story.url;
    }
    top_stories.push( {"title": top_story.title, "url": top_story.url} )
  }

}

/*
  Displays a notification from a HTML page on the user's screen
*/
function showPopup(url, sound_action) {
  var notification = webkitNotifications.createHTMLNotification(url);
  // Check if use wants to auto hide the notification
  if (parseInt(settings.notifications.close_delay) > 0) {
    notification.ondisplay = function() {
      setTimeout(function () {notification.cancel();}, parseInt(settings.notifications.close_delay) * 1000);
    };
  }
  notification.show();
  if (settings[sound_action].sound != 'none') {
    var audio = new Audio();
    audio.src = 'audio/'+settings[sound_action].sound;
    audio.play();
  }
}

/*
  Validates the presence of all needed settings and defaults missing values.
*/
function prepareSettings() {
  if (!localStorage['settings']) { // Hasn't been set yet
    settings = new Object();
  } else { // Something's there...
    try {
      settings = JSON.parse(localStorage['settings']);
    } catch (e) { // Failed to parse string to JSON
      settings = new Object();
    }
  }

  if (!settings.notifications) { settings.notifications = new Object(); }
  if (!settings.notifications.close_delay) { settings.notifications.close_delay = '5'; }

  if (!settings.live_stream) { settings.live_stream = new Object(); }
  if (!settings.live_stream.enable) { settings.live_stream.enable = '1'; }
  if (!settings.live_stream.sound) { settings.live_stream.sound = 'mushroom.mp3'; }

  if (!settings.top_stories) { settings.top_stories = new Object(); }
  if (!settings.top_stories.enable) { settings.top_stories.enable = '1'; }
  if (!settings.top_stories.sound) { settings.top_stories.sound = 'coin.mp3'; }

  //if (!settings.main_site) { settings.main_site = new Object(); }
  //if (!settings.main_site.hide_topper) { settings.main_site.hide_topper = '0'; }

  if (!settings.message_boards) { settings.message_boards = new Object(); }
  if (!settings.message_boards.swap_user_and_post) { settings.message_boards.swap_user_and_post = '0'; }

  if (!settings.refresh_rate) { settings.refresh_rate = '20'; }

  localStorage['settings'] = JSON.stringify(settings);

  if (!localStorage['top_story_uuid']) { localStorage['top_story_uuid'] = ''; }
  if (!localStorage['live_stream']) { localStorage['live_stream'] = '0'; }
}

document.addEventListener('DOMContentLoaded', function () {
  main();
});