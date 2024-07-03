# Lokalni_server

Lokalni server pokreće se naredbom node server.js

na lokalnom serveru nalazi se xml datoteka
server.js upravlja http zahtjevima

putanja do xml datoteke 
    const formDataPath = path.join(__dirname, 'formData.xml');

putanja do web-aplikacije za http zahtjeve
dopuštanje zahtjeva s url web-aplikacije
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); //url za react web aplikaciju
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

http get i post zahtjev 
    app.get('/formData.xml', (req, res) => { ...}
    app.post('/formData.xml', (req, res) => { ... }