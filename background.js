
// Global accessor
var menus = [];
var selectedMenu = null;
var selectedId = null;

function updateMenu(tabId) {
    chrome.tabs.sendMessage(tabId, {}, function(menu) {
        menus[tabId] = menu;
        if (!menu) {
            chrome.pageAction.hide(tabId);
        } else {
            chrome.pageAction.show(tabId);
            if (selectedId == tabId) {
                updateSelected(tabId);
            }
        }
    });
}

function updateSelected(tabId) {
    selectedMenu = menus[tabId];
    if (selectedMenu)
        chrome.pageAction.setTitle({tabId:tabId, title:"Tab " + tabId.toString()});
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
    updateSelected(tab.tabId);
});

// Ensure the current selected tab is set up.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    updateMenu(tabs[0].id);
});