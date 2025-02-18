const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar cors

const app = express();
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Datos_clientes'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;
  const query = 'INSERT INTO contactos (name, email, phone, message) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, phone, message], (err, result) => {
    if (err) {
      return res.status(500).send('Error al guardar la información');
    }
    res.status(200).send('Información guardada correctamente');
  });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});