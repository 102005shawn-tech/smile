// 頁面載入檢查
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});

function updateUI() {
    const acc = localStorage.getItem('tcu_account');
    const nick = localStorage.getItem('tcu_nickname');
    
    if (acc) {
        document.getElementById('welcomeMsg').innerText = `你好，${nick}！`;
        generateQRCode(acc);
    }
}

// 產生 QR Code 的核心函式
function generateQRCode(text) {
    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = ""; // 重要：先清空舊的
    
    new QRCode(qrContainer, {
        text: text,
        width: 200,
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

function saveAndRegister() {
    const acc = document.getElementById('accountInput').value.trim();
    const nick = document.getElementById('nicknameInput').value.trim();

    if (!acc || !nick) {
        alert("請填寫完整資訊");
        return;
    }

    localStorage.setItem('tcu_account', acc);
    localStorage.setItem('tcu_nickname', nick);
    updateUI();
    alert("帳號已儲存，QR Code 已產生！");
}

// 掃描功能保持不變...
let html5QrCode;
function startScanner() {
    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        { facingMode: "environment" }, 
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
            html5QrCode.stop();
            // 寫入 Supabase 的邏輯...
            alert("掃描成功！已傳送微笑給 " + decodedText);
        }
    ).catch(err => alert("相機開啟失敗：" + err));
}