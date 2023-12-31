const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

const generarDatos = () => {
  const generarDNI = () => '72935062'; 
  const generarNombre = () => 'Juan';
  const generarApellido = () => 'Gómez'; 
  const generarCodigo = () => Math.floor(Math.random() * 10000).toString();
  const generarCurso = () => 'Matemáticas'; 
  const generarNota = () => Math.floor(Math.random() * 11); 
  const generarFechaNacimiento = () => {
    const dia = Math.floor(Math.random() * 28) + 1;
    const mes = Math.floor(Math.random() * 12) + 1;
    const año = Math.floor(Math.random() * (2002 - 1980 + 1)) + 1980;
    return `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
  };

  return {
    DNI: generarDNI(),
    Nombres: generarNombre(),
    Apellidos: generarApellido(),
    Codigo: generarCodigo(),
    Cursos: Array.from({ length: 3 }, generarCurso), 
    Notas: Array.from({ length: 3 }, generarNota), 
    FechaNacimiento: generarFechaNacimiento(),
  };
};


app.get('/getdashboarddata', (req, res) => {
  const datos = generarDatos();
  res.json(datos);
});

app.get('/getnombre/:dni', (req, res) => {
    const dniProvided = req.params.dni;
    const datos = generarDatos();
  
    // Compara el DNI proporcionado con el DNI generado
    if (dniProvided === datos.DNI) {
      const nombreCompleto = datos.Nombres + ' ' + datos.Apellidos;
      res.json({ nombreCompleto });
    } else {
      res.json({ mensaje: 'DNI incorrecto' });
    }
  });

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
