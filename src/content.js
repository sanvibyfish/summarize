console.log("Content script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received in content script:", request);
    if (request.action === "getPageContent") {
        console.log("Sending page content");
        sendResponse({content: document.body.innerText});
    }
    return true; // 保持消息通道开放
});