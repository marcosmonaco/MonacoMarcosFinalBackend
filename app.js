const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");

const SECRET_KEY = "UpWD7Ou4uQPeNKZ";

// URI para conectarse con la bd
const MONGO_URI =
  "mongodb+srv://admin:admin@monacomarcosfinalbacken.uprpm.mongodb.net/?retryWrites=true&w=majority&appName=MonacoMarcosFinalBackend16";

mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log("Conexión exitosa a MongoDB Atlas"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Modelado de datos de tarjetas gráficas (GPU)
const tarjetaGraficaSchema = new mongoose.Schema({
  modelo: String,
  marca: String,
  memoria: Number,
  precio: Number,
  fechaLanzamiento: Date,
});

const TarjetaGrafica = mongoose.model("tarjetaGrafica", tarjetaGraficaSchema);

app.use(express.json());

// Middleware para verificar tokens
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({error: "Token no proporcionado"});
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({error: "Token inválido o expirado"});
    }
    req.user = decoded; // Almacena los datos del token decodificado
    next();
  });
};

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡La API funciona correctamente!");
});

// Ruta de login para generar un token
app.post("/login", (req, res) => {
  const {username, password} = req.body;
  //  Autenticación
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({user: username}, SECRET_KEY, {expiresIn: "10h"});
    res.json({message: "Autenticación exitosa", token});
  } else {
    res.status(401).json({error: "Credenciales inválidas"});
  }
});

// obtener tarjetas gráficas (requiere token)
app.get("/tarjetas-graficas", verifyToken, async (req, res) => {
  const tarjetas = await TarjetaGrafica.find();
  res.json(tarjetas);
});

// buscar una tarjeta gráfica por modelo (requiere token)
app.get("/tarjetas-graficas/:modelo", verifyToken, async (req, res) => {
  const tarjeta = await TarjetaGrafica.findOne({modelo: req.params.modelo});
  tarjeta
    ? res.json(tarjeta)
    : res
        .status(404)
        .json({error: "No existe la tarjeta gráfica con ese modelo"});
});

// agregar una tarjeta gráfica (sin token)
app.post("/tarjetas-graficas/agregar", async (req, res) => {
  const {modelo, marca, memoria, precio, fechaLanzamiento} = req.body;
  if (!modelo || !marca || !memoria || !precio || !fechaLanzamiento) {
    return res.status(400).json({error: "Faltan datos a ingresar"});
  }
  const nuevaTarjeta = new TarjetaGrafica({
    modelo,
    marca,
    memoria,
    precio,
    fechaLanzamiento,
  });
  await nuevaTarjeta.save();
  res.status(201).json(nuevaTarjeta);
});

// actualizar una tarjeta gráfica por modelo (requiere token)
app.put("/tarjetas-graficas/:modelo", verifyToken, async (req, res) => {
  const {memoria, precio} = req.body;
  const tarjeta = await TarjetaGrafica.findOneAndUpdate(
    {modelo: req.params.modelo},
    {memoria, precio},
    {new: true}
  );
  tarjeta
    ? res.json({message: "Datos actualizados", tarjeta})
    : res
        .status(404)
        .json({error: "No se encontró la tarjeta gráfica con ese modelo"});
});

// eliminar una tarjeta gráfica por modelo (requiere token)
app.delete("/tarjetas-graficas/:modelo", verifyToken, async (req, res) => {
  const tarjeta = await TarjetaGrafica.findOneAndDelete({
    modelo: req.params.modelo,
  });
  tarjeta
    ? res.json({message: "Tarjeta gráfica eliminada", tarjeta})
    : res
        .status(404)
        .json({error: "No se encontró la tarjeta gráfica con ese modelo"});
});

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
