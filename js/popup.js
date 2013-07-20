function main() {
  chrome.runtime.getBackgroundPage(function(bg) {
    for(x=0; x<bg.top_stories.length; x++) {
      top_story = bg.top_stories[x];
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.setAttribute('href',top_story.url);
      a.setAttribute('target','_blank');
      t = document.createTextNode(top_story.title);
      a.appendChild(t);
      li.appendChild(a);
      document.getElementById('top-stories').appendChild(li);
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  main();
});