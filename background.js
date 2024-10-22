let selectedText = "";
const websites = {
    HentaiVN: { url: "https://ayamehentai.cc/{id}-doc-truyen-id.html", icon: "assets/img/webs/hentaivn.png" },
    nhentai: { url: "https://nhentai.net/g/{id}", icon: "assets/img/webs/nhen.png" },
    Rule34Video: { url: "https://rule34video.co/search/{id}", icon: "assets/img/webs/rl34video.png" },
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "hCodeLinkGenerator",
        title: "hCode",
        contexts: ["selection"]
    });

    Object.keys(websites).forEach(key => {
        chrome.contextMenus.create({
            id: key,
            parentId: "hCodeLinkGenerator",
            title: key.charAt(0).toUpperCase() + key.slice(1),
            contexts: ["selection"],
            // icons: [{ size: 16, url: websites[key].icon }]
        });
    });
});

chrome.contextMenus.onClicked.addListener((info) => {
    selectedText = info.selectionText ? info.selectionText.trim() : "";

    const numbersOnly = selectedText.replace(/\D/g, "");
    if (websites[info.menuItemId] && numbersOnly) {
        const fullUrl = websites[info.menuItemId].url.replace("{id}", numbersOnly);
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "copyToClipboard", text: fullUrl });
        });
    } else {
        console.log("Khong tim thay website");
    }

});
