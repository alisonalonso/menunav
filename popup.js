
var tabId;

function showMenu(menu) {
    console.log(menu);

    var main = document.getElementById('m');
    if (menu)
        main.innerHTML = menu;

}

function load_menu() {

    tabId = chrome.extension.getBackgroundPage().selectedId;
    if (tabId)
        chrome.tabs.get(tabId, function (tab) {
            document.getElementById("tabBase").href = tab.url;
        });

    var menu = chrome.extension.getBackgroundPage().selectedMenu;
    if (menu)
        showMenu(menu);

}

window.onload = load_menu;

window.onclick = function(e) {
    if ((e.target instanceof HTMLElement) && (e.target.tagName === "A"))
    {
        chrome.tabs.update(tabId, {"url": e.target.toString()});
        window.close();
    }
};