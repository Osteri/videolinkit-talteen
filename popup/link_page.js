var bg = browser.extension.getBackgroundPage();
browser.browserAction.setBadgeText({text: ''});

// Shorten text to a fixed length
function shortenText(str, len) {
  if (str.length > len) return str.substring(0, len) + "...";
  return str;
}

// Unix style basename for JS
function basename(str, sep) {
  return str.substr(str.lastIndexOf(sep) + 1);
}

function shortenedBasename(str, len) {
  return shortenText(basename(str, '/'), len);
}

// Action of copy button being pressed
function copyBtn() {
  console.log("Copy button pressed!")
}

// Action of download button being pressed
function downloadBtn() {
  console.log("Download button pressed!")
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
  console.log(link);
  var content = document.querySelector('template').content;
  var span = content.querySelector('span');
  //  span.textContent = basename(link, '/');
  span.textContent = shortenedBasename(link, 20);
  document.querySelector('#container').appendChild(
    document.importNode(content, true));
  // next row
  link = bg.streams.shift();
}
