document.querySelectorAll(".site-item").forEach(item => {
    item.addEventListener("click", () => {
      const baseUrl = item.getAttribute("data-url");
      chrome.runtime.sendMessage({ action: "copyUrl", baseUrl }, response => {
        if (response.status === "success") {
          window.close();
        }
      });
    });
  });
  