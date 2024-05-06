const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(bodyParser.json({ limit: '100MB' }));
app.use(bodyParser.urlencoded({ limit: '100MB', extended: true }));

app.get('/', (req, res) => {
    res.send('Express server');
});

const formDataPath = path.join(__dirname, 'formData.xml');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); //url za react web aplikaciju
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/formData.xml', (req, res) => {
    res.sendFile(formDataPath);
});

const xml2js = require('xml2js');

app.post('/formData.xml', (req, res) => {
    
    const formData = req.body;

    fs.readFile(formDataPath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Greška pri čitanju XML datoteke:', err);
            res.status(500).send('Došlo je do greške pri čitanju XML datoteke.');
            return;
        }

        const xmlData = req.body;

        xml2js.parseString(data, (parseErr, result) => {
            if (parseErr) {
                console.error('Greška pri parsiranju XML datoteke:', parseErr);
                res.status(500).send('Došlo je do greške pri parsiranju XML datoteke.');
                return;
            }

            const newFormData = {
                appName: formData.form.appName,
                customAppName: formData.form.customAppName,
                location: formData.form.location,
                customLocation: formData.form.customLocation,
                description: formData.form.description,
                media: formData.form.media,
                deviceType: formData.form.deviceType,
                deviceModel: formData.form.deviceModel,
                osType: formData.form.osType,
                browserType: formData.form.browserType,
                email: formData.form.email
            };

            result.forms.form.push(newFormData);

            const builder = new xml2js.Builder();
            const xmlData = builder.buildObject(result);

            fs.writeFile(formDataPath, xmlData, (writeErr) => {
                if (writeErr) {
                    console.error('Greška pri spremanju podataka:', writeErr);
                    res.status(500).send('Došlo je do greške pri spremanju podataka.');
                } else {
                    console.log('Podaci uspješno spremljeni.');
                    res.status(200).send('Podaci uspješno spremljeni.');
                }
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server pokrenut na portu ${PORT}`);
});
