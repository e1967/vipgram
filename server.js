const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let messages = [];
let users = [];

// ✅ MESAJ GÖNDER - Sketchware uyumlu
app.put('/messaging/private', (req, res) => {
    const { title, body, token, topic } = req.body;
    
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
    
    res.json({ 
        success: true, 
        message: "Mesaj gönderildi",
        data: newMessage
    });
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
