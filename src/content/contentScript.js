chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "copyToClipboard") {
    const textArea = document.createElement("textarea");
    textArea.value = message.text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    showCustomNotification("Đã sao chép: " + message.text);
  }
});

function showCustomNotification(notificationText) {
  const notification = document.createElement('div');
  notification.id = 'custom-notification';
  notification.style.position = 'fixed';
  notification.style.top = '10px';
  notification.style.right = '10px';
  notification.style.backgroundColor = '#4CAF50';
  notification.style.color = 'white';
  notification.style.padding = '10px';
  notification.style.borderRadius = '5px';
  notification.innerText = notificationText; 

  document.body.appendChild(notification);

  setTimeout(() => {
      notification.remove();
  }, 3000);
}

