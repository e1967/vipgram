{
  "name": "vipgram-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "firebase-admin": "^11.0.0"
  }
}        success: true,
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
