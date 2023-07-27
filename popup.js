// popup.js
document.addEventListener("DOMContentLoaded", function () {
    // Local depolama alanından su miktarını al
    chrome.storage.local.get(["waterAmount", "resetTime"], function (result) {
      let waterAmount = result.waterAmount || 0;
      const waterAmountElement = document.getElementById("water-amount");
      waterAmountElement.textContent = waterAmount + " ml";
  
      // Artır butonu için event listener
      document.getElementById("increase-btn").addEventListener("click", function () {
        waterAmount += 250;
        waterAmountElement.textContent = waterAmount + " ml";
        // Su miktarını lokalde sakla
        chrome.storage.local.set({ waterAmount: waterAmount });
      });
  
      // Azalt butonu için event listener
      document.getElementById("decrease-btn").addEventListener("click", function () {
        if (waterAmount >= 250) {
          waterAmount -= 250;
          waterAmountElement.textContent = waterAmount + " ml";
          // Su miktarını lokalde sakla
          chrome.storage.local.set({ waterAmount: waterAmount });
        }
      });
  
      // Eğer bugünün sıfırlama zamanı geçmişse su miktarını sıfırla
      if (Date.now() >= (result.resetTime || 0)) {
        waterAmount = 0;
        waterAmountElement.textContent = "0 ml";
        // Yarının sıfırlama zamanını ayarla (gece yarısı saat 00:00)
        const tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0);
        chrome.storage.local.set({ waterAmount: 0, resetTime: tomorrow.getTime() });
      }
    });
  });
  