import { createContextMenu, handleMenuClick } from '../menu/menuManager.js';

chrome.runtime.onInstalled.addListener(() => {
    createContextMenu();
});

chrome.contextMenus.onClicked.addListener((info) => {
    handleMenuClick(info);
});
