const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();

app.use(cors());
app.use(express.json());

// Firebase Admin SDK (FCM için)
const serviceAccount = {
  "type": "service_account",
  "project_id": "vipgram",
  "private_key": process.env.FIREBASE_PRIVATE_KEY,
  "client_email": process.env.FIREBASE_CLIENT_EMAIL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let messages = [];
let users = [];

// ✅ MESAJ GÖNDER + FCM BİLDİRİM
app.put('/messaging/private', async (req, res) => {
    const { title, body, token, topic } = req.body;
    
    try {
        // 1. Mesajı kaydet
        const newMessage = {
            id: Date.now(),
            sender: token,
            message: body,
            timestamp: new Date(),
            to: topic,
            title: title
        };
        
        messages.push(newMessage);
        console.log('📨 Yeni mesaj:', body);

        // 2. FCM BİLDİRİM GÖNDER
        const message = {
            notification: {
                title: title || "Yeni Mesaj",
                body: body
            },
            token: token // FCM token'ı
        };

        // Bildirim gönder
        const response = await admin.messaging().send(message);
        console.log('✅ Bildirim gönderildi:', response);

        res.json({ 
            success: true, 
            message: "Mesaj ve bildirim gönderildi",
            data: newMessage
        });

    } catch (error) {
        console.error('❌ Bildirim hatası:', error);
        res.json({ 
            success: false, 
            message: "Mesaj kaydedildi ama bildirim gönderilemedi",
            error: error.message 
        });
    }
});

// ✅ MESAJLARI GETİR
app.get('/messages', (req, res) => {
    res.json({
        success: true,
        data: messages
    });
});

// ✅ HEALTH CHECK
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend çalışıyor!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Backend ${PORT} portunda çalışıyor!`);
});
