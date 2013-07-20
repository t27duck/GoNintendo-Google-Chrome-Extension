var settings = JSON.parse(localStorage['settings']);

function main() {
  // Set all fields... boring!
  document.getElementById("close_delay").value = settings.notifications.close_delay;
  document.getElementById("enable_top_stories").value = settings.top_stories.enable;
  document.getElementById("top-stories-sound").value = settings.top_stories.sound;;
  document.getElementById("enable_live_stream").value = settings.live_stream.enable;
  document.getElementById("live-stream-sound").value = settings.live_stream.sound;
  //document.getElementById("swap_user_and_post").value = settings.message_boards.swap_user_and_post;
  document.getElementById("refresh_rate").value = settings.refresh_rate;
  // document.getElementById("hide_topper").value = settings.main_site.hide_topper;
}

function previewTopStorySound() {
  previewSound(document.getElementById('top-stories-sound').value);
}

function previewLiveStreamSound() {
  previewSound(document.getElementById('live-stream-sound').value);
}

function previewSound(val) {
  if (val != '') {
    var a = new Audio();
    a.src = 'audio/'+val;
    a.play();
  }
}

function saveSettings() {
  var message = "Say whaaaa?";
  // Saving all fields... also boring!
  settings.notifications.close_delay = document.getElementById("close_delay").value;
  settings.top_stories.enable = document.getElementById("enable_top_stories").value;
  settings.top_stories.sound = document.getElementById("top-stories-sound").value;
  settings.live_stream.enable = document.getElementById("enable_live_stream").value;
  settings.live_stream.sound = document.getElementById("live-stream-sound").value;
  //settings.message_boards.swap_user_and_post = document.getElementById("swap_user_and_post").value;
  settings.refresh_rate = document.getElementById("refresh_rate").value;
  // settings.main_site.hide_topper = document.getElementById("hide_topper").value;

  localStorage['settings'] = JSON.stringify(settings);
  message = "Settings Saved! :)";

  document.getElementById("notice").innerHTML = message;
  document.getElementById("notice").style.display = 'block';
}

function hideNotice() {
  document.getElementById("notice").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#save-settings').addEventListener('click', saveSettings);
  document.querySelector('#preview-live-stream-sound').addEventListener('click', previewLiveStreamSound);
  document.querySelector('#preview-top-story-sound').addEventListener('click', previewTopStorySound);
  main();
});