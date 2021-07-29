const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const fs = require('fs');

const multer = require('multer');

const engineFileUpload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  },
});

const upload = multer({ storage: engineFileUpload });

const contacts = require('./data.json');

app.use(express.json());
app.use(cors());

app.post('/post', upload.single('image'), (req, res) => {
  const name = req.body.name;
  const image = req.file.filename;
  contacts.push({
    name,
    image,
  });

  fs.writeFileSync('./data.json', JSON.stringify(contacts));
  res.send('Upload success');
});

app.get('/', (req, res) => {
  res.send(contacts);
});

app.listen(PORT, () => {
  console.log(`server is oke port ${PORT}`);
});
