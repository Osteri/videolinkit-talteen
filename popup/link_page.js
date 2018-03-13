var bg = browser.extension.getBackgroundPage();
browser.browserAction.setBadgeText({text: ''});

// Parallel arrays for making things simple
var shortLinks = document.getElementsByClassName("divTableCellLink");
var copyDivs = document.getElementsByClassName("divTableCellCopy");
var originalLinks = [];

// Unix style basename for JS
function baseName(str, sep) {
  return str.substr(str.lastIndexOf(sep) + 1);
}

// Copy JS variable on the clipboard
function copyToClipboard(text){
  var dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.setAttribute('value', text);
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

console.log("Found " + bg.streams.length + " streams."); 

// Gather DOM elements in parallel arrays
var link = bg.streams.shift(); // dequeue next link
for (var i = 0; link; link = bg.streams.shift(), i++) {
  originalLinks.push(link);
  var field = baseName(link, '/');
  shortLinks[i].innerHTML = field; 
}
for (var i = 0; i < copyDivs.length; i++) {
  var field = '📋';
  copyDivs[i].innerHTML = field; 
}

// Modifies link_page.html elements
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("divTableCellCopy")) {
    var link_id = e.target.id - 1; // get earlier cell (not the one clicked)
    console.log("Copying " + shortLinks[link_id].innerHTML + " to clipboard.");
    console.log("Copied " + originalLinks[link_id] + ".");
    copyToClipboard(originalLinks[link_id]); 
    return;
  } 
});

