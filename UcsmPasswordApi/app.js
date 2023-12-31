const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3002;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

let password = '123456';

app.get('/getpassword', (req, res) => {
  res.json({ password });
});


app.post('/changepassword', (req, res) => {
  const newPassword = req.body.newPassword;

  if (newPassword) {
    password = newPassword;
    res.json({ message: 'Contraseña cambiada exitosamente' });
  } else {
    res.status(400).json({ error: 'Por favor, proporciona una nueva contraseña' });
  }
});

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
