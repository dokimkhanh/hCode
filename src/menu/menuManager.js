import { websites } from '../utils/urlHelper.js';
import { decodeHex } from '../utils/hexDecoder.js';

export function createContextMenu() {
    chrome.contextMenus.create({
        id: "hCodeLinkGenerator",
        title: "hCode",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "copyCode",
        parentId: "hCodeLinkGenerator",
        title: "Copy Code",
        contexts: ["selection"]
    });

    Object.keys(websites).forEach(key => {
        chrome.contextMenus.create({
            id: key,
            parentId: "copyCode",
            title: key.charAt(0).toUpperCase() + key.slice(1),
            contexts: ["selection"]
        });
    });

    chrome.contextMenus.create({
        id: "decodeMenu",
        parentId: "hCodeLinkGenerator",
        title: "Giải mã",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "decodeHex",
        parentId: "decodeMenu",
        title: "Hex",
        contexts: ["selection"]
    });
}

export function handleMenuClick(info) {
    const selectedText = info.selectionText ? info.selectionText.trim() : "";
    const numbersOnly = selectedText.replace(/\D/g, "");

    try {
        if (websites[info.menuItemId] && numbersOnly) {
            const fullUrl = websites[info.menuItemId].url.replace("{id}", numbersOnly);
            copyToClipboard(fullUrl);
        }
        else if (info.menuItemId === 'decodeHex' && selectedText) {
            const decodedText = decodeHex(selectedText);
            copyToClipboard(decodedText);
        }
        else {
            console.log("No matching action found or invalid input");
        }
    } catch (error) {
        copyToClipboard(error.message);
    }
}

function copyToClipboard(text) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "copyToClipboard", text });
    });
}