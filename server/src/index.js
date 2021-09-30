const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const multiparty = require('connect-multiparty');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const multipartMiddleware = multiparty({ uploadDir: "./uploads" });

app.post('/upload', multipartMiddleware, (req, res) => {
  console.log(req);
  const files = req.files;
  console.log(files);
  return res.status(201).json({ message: files });
});

app.get('', (req, res) => {
  return res.status(200).json('recebido');
})

app.use((err, req, res, next) => res.json({ error: err.message }));

app.listen(3333, () => {
  console.log('Servidor rodando! 🚀🚀🚀');
});
