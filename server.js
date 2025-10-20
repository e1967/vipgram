const express = require('express');
const app = express();

app.use(express.json());

let messages = [];

// ✅ MESAJ KAYDET
app.put('/messaging/private', (req, res) => {
    console.log('📨 Gelen mesaj:', req.body);
    
    messages.push({
        id: Date.now(),
        ...req.body,
        timestamp: new Date()
    });
    
    res.json({ 
        success: true, 
        message: "Mesaj kaydedildi" 
    });
});

// ✅ MESAJLARI GETİR
app.get('/messages', (req, res) => {
    res.json({
        success: true,
        data: messages
    });
});

// ✅ SAĞLIK KONTROLÜ
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Backend çalışıyor!',
        totalMessages: messages.length
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Basit backend ${PORT} portunda çalışıyor!`);
});app.listen(PORT, () => {
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
