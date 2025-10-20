const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let messages = [];

// ✅ SADECE MESAJ KAYDET (FCM OLMADAN)
app.put('/messaging/private', (req, res) => {
    const { title, body, token, topic } = req.body;
    
    const newMessage = {
        id: Date.now(),
        sender: token,
        message: body,
        timestamp: new Date(),
        to: topic
    };
    
    messages.push(newMessage);
    console.log('📨 Yeni mesaj:', body);

    // FCM OLMADAN - sadece mesaj kaydet
    res.json({ 
        success: true, 
        message: "Mesaj kaydedildi (bildirim yok)"
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend çalışıyor!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Backend ${PORT} portunda çalışıyor!`);
});        };
        
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
