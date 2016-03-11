
// Global accessor
var menus = [];
var selectedMenu = null;
var selectedId = null;

function updateMenu(tabId) {
    chrome.tabs.sendMessage(tabId, {}, function(menu) {
        menus[tabId] = menu;
        updateSelected(tabId);
    });
}

function updateSelected(tabId) {
    selectedMenu = menus[tabId];
    if (selectedMenu) {
        chrome.pageAction.show(tabId);
        chrome.pageAction.setTitle({tabId:tabId, title:"Menu for " + tabId.toString()});
    } else {
        chrome.pageAction.hide(tabId);
    }
}

//noinspection JSUnusedLocalSymbols
chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
    if (change.status == "complete") {
        updateMenu(tabId);
    }
});

//noinspection JSUnusedLocalSymbols
chrome.tabs.onActivated.addListener(function(tab, info) {
    selectedId = tab.tabId;
    updateMenu(tab.tabId);
    updateSelected(tab.tabId);
});

// Ensure the current selected tab is set up.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    updateMenu(tabs[0].id);
});