// app.js - 慈大微笑系統核心邏輯
const myAcc = localStorage.getItem('tcu_account');

if (myAcc) {
    // 這裡一定要確認 ID 是 "qrcode"
    new QRCode(document.getElementById("qrcode"), {
        text: myAcc,
        width: 150,
        height: 150
    });
} else {
    document.getElementById("qrcode").innerText = "尚未設定帳號";
}
// 1. 初始化頁面：檢查是否有存過帳號
document.addEventListener('DOMContentLoaded', () => {
    const savedAcc = localStorage.getItem('tcu_account');
    const savedNick = localStorage.getItem('tcu_nickname');
    
    if (savedAcc && savedNick) {
        document.getElementById('accountInput').value = savedAcc;
        document.getElementById('nicknameInput').value = savedNick;
        document.getElementById('statusMsg').innerText = `歡迎回來，${savedNick}！`;
    }
});

// 2. 儲存帳號設定
function saveAndRegister() {
    const acc = document.getElementById('accountInput').value.trim();
    const nick = document.getElementById('nicknameInput').value.trim();

    if (!acc || !nick) {
        alert("⚠️ 請輸入完整的帳號與暱稱！");
        return;
    }

    // 存到瀏覽器本地暫存，下次不用重複輸入
    localStorage.setItem('tcu_account', acc);
    localStorage.setItem('tcu_nickname', nick);
    
    document.getElementById('statusMsg').innerText = `設定成功！你好，${nick}。`;
    alert("✅ 帳號設定已儲存！");
}

// 3. 傳送微笑到 Supabase 資料庫
async function testSmile() {
    const acc = localStorage.getItem('tcu_account');
    const nick = localStorage.getItem('tcu_nickname');

    if (!acc || !nick) {
        alert("❌ 請先在上方輸入帳號並點擊「儲存並開始」！");
        return;
    }

    document.getElementById('statusMsg').innerText = "正在連線資料庫...";

    try {
        // 執行寫入動作
        const { data, error } = await supabaseClient
            .from('smile_records') // 這裡要對應你在 Supabase SQL 建立的表名
            .insert([
                { 
                    sender_account: acc, 
                    sender_nickname: nick,
                    receiver_account: 'TCU_Campus' // 預設接收者
                }
            ]);

        if (error) throw error;

        document.getElementById('statusMsg').innerText = "😊 微笑已成功送出並存入資料庫！";
        alert("✨ 恭喜！資料庫寫入成功！");

    } catch (err) {
        console.error("錯誤詳情:", err);
        document.getElementById('statusMsg').innerText = "❌ 傳送失敗，請檢查 config.js 的 Key 是否正確。";
        alert("發生錯誤：" + err.message);
    }
}