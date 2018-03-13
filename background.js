// Usually the web service gives multiple *.m3u8 streams to choose from.
// They are meant for different bitrates and we are not interested in those.
// The one .m3u8 we are interested is the main .m3u8, which usually has 
// different name, depending on the stream service we are using. We need to figure out
// how to get the master .m3u8 stream. Usually the ones we don't want has numbers
// in their name (such as video_b70000.m3u8), so we could try to remove *.m3u8
// URLs that have numbers in their names. The one we are looking for is usually the
// first one (after ads).

// background-script.js
"use strict";

var streams = [];
var pattern1 = "*://*/*.m3u8*";
var pattern2 = "*://*/*.mpd*";

function registerURL(requestDetails) {
  streams.push(requestDetails.url);
  var len = streams.length;
  browser.browserAction.setBadgeText( {text: len.toString()} );
}

function handleActivated(activeInfo) {
  console.log("Emptying link buffer.")
  browser.browserAction.setBadgeText( {text: ''});
  streams = [];
}

browser.webRequest.onBeforeRequest.addListener(
  registerURL,
  {urls:[pattern1, pattern2], types:["xmlhttprequest"]}
);

browser.tabs.onActivated.addListener(handleActivated);
