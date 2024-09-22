chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({tabId: tab.id});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getPageContent") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0]) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: getPageContent
                }, (results) => {
                    if (chrome.runtime.lastError) {
                        console.error("Error executing script:", chrome.runtime.lastError);
                        sendResponse({error: "Failed to execute script: " + chrome.runtime.lastError.message});
                    } else if (results && results[0]) {
                        sendResponse({content: results[0].result});
                    } else {
                        sendResponse({error: "No content retrieved"});
                    }
                });
            } else {
                sendResponse({error: "No active tab found"});
            }
        });
        return true; // 保持消息通道开放
    }
});

function getPageContent() {
    return document.body.innerText;
}