const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/slike');
});

// GALERIJA, ruta prema folderu /slike
app.get('/slike', (req, res) => {
  const folderPath = path.join(__dirname, 'public', 'images');
  const files = fs.readdirSync(folderPath);

  const images = files
    .filter(file => file.endsWith('.jpg') || file.endsWith('.svg'))
    .map((file, index) => ({
      url: `/images/${file}`,
      id: `slika${index + 1}`,
      title: `Slika ${index + 1}`
    }));

  res.render('slike', { images });
});

app.listen(PORT, () => {
console.log(`Server radi na http://localhost:${PORT}`);
});


