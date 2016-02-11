/**
 * Created by alison on 09/02/16.
 */


if (window == top) {
    chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
        sendResponse(findMenu());
    });
}

var findMenu = function() {
    var menus = document.getElementsByTagName('nav');
    var found = (menus.length > 0);

    return (found) ? (new XMLSerializer()).serializeToString(menus[0]) : null;
};
