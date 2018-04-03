var bg = browser.extension.getBackgroundPage();
browser.browserAction.setBadgeText({text: ''});

// test data
//bg.streams.push("https://cdnapisec.kaltura.com/p/1955031/sp/195503100/playManifest/entryId/1_349ur3ec/flavorIds/0_8c5ria2o,0_kuy39oon,0_efgndj3f,0_c9e0xsyb/format/applehttp/protocol/https/a.m3u8?referrer=aHR0cHM6Ly9hcmVlbmEueWxlLmZp&playSessionId=6a102147-0f70-8c02-bfc1-27f53e20d7b7&clientTag=html5:v2.63.3&preferredBitrate=600&uiConfId=37558971");
//bg.streams.push("https://ylekaod-a.akamaihd.net/s/fhls/p/1955031/sp/195503100/serveFlavor/entryId/1_349ur3ec/v/12/ev/13/flavorId/0_8c5ria2o/name/a.mp4/index.m3u8?__hdnea__=st=1521299778~exp=1521314178~acl=/s/fhls/p/1955031/sp/195503100/serveFlavor/entryId/1_349ur3ec/v/12/ev/13/flavorId/0_*~hmac=d0eb2d57bdf1560719ffd4742804549f21ecb38920d9169f01f5f2cf6a8f853d");
//bg.streams.push("https://ylekaod-a.akamaihd.net/s/fhls/p/1955031/sp/195503100/serveFlavor/entryId/1_349ur3ec/v/12/ev/13/flavorId/0_c9e0xsyb/name/a.mp4/index.m3u8?__hdnea__=st=1521299778~exp=1521314178~acl=/s/fhls/p/1955031/sp/195503100/serveFlavor/entryId/1_349ur3ec/v/12/ev/13/flavorId/0_*~hmac=d0eb2d57bdf1560719ffd4742804549f21ecb38920d9169f01f5f2cf6a8f853d");
//bg.streams.push("https://ylekaod-a.akamaihd.net/s/fhls/p/1955031/sp/195503100/serveFlavor/entryId/1_349ur3ec/v/12/ev/13/flavorId/0_efgndj3f/name/a.mp4/index.m3u8?__hdnea__=st=1521299778~exp=1521314178~acl=/s/fhls/p/1955031/sp/195503100/serveFlavor/entryId/1_349ur3ec/v/12/ev/13/flavorId/0_*~hmac=d0eb2d57bdf1560719ffd4742804549f21ecb38920d9169f01f5f2cf6a8f853d");
//bg.streams.push("https://ylekaod-a.akamaihd.net/s/fhls/p/1955031/sp/195503100/serveFlavor/entryId/1_349ur3ec/v/12/ev/13/flavorId/0_kuy39oon/name/a.mp4/index.m3u8?__hdnea__=st=1521299778~exp=1521314178~acl=/s/fhls/p/1955031/sp/195503100/serveFlavor/entryId/1_349ur3ec/v/12/ev/13/flavorId/0_*~hmac=d0eb2d57bdf1560719ffd4742804549f21ecb38920d9169f01f5f2cf6a8f853d");

// Shorten text to a fixed length
function shortenText(str, len) {
  if (str.length > len) return str.substring(0, len) + "...";
  return str;
}

// Unix style basename for JS
function basename(str, sep) {
  return str.substr(str.lastIndexOf(sep) + 1);
}

// basename() and shortenText() combined
function shortenedBasename(str, len) {
  return shortenText(basename(str, '/'), len);
}

// Copy JS variable on the clipboard
function copyToClipboard(text) {
  var dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.setAttribute('value', text);
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

console.log("Found " + bg.streams.length + " streams."); 

var link = bg.streams.shift();
while (link) {

  var content = document.querySelector('template').content;
  var span = content.querySelector('.ln-short');
  span.textContent = shortenedBasename(link, 20);
  span = content.querySelector('.ln-full');
  span.textContent = link; 
  
  document.querySelector('#container').appendChild(
    document.importNode(content, true));
  
  // next row
  link = bg.streams.shift();
}

// Add click event on each "copy" button
var buttons = document.getElementsByClassName('cp');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function() {
    var p = this.parentElement.previousElementSibling.previousElementSibling.textContent;
    console.log("Copied %c" + p, "color: blue", "to clipboard.");
    copyToClipboard(p);
  };
}

// Add click event on each "download" button
var buttons = document.getElementsByClassName('dl');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function() {
    // download functionality is not yet implemented
  };
}
