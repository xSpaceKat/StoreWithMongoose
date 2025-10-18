import express from "express";
import { AppError, globlaErrorHandler } from "./utils/appError.js";
import morgan from "morgan";
import corsMiddleware from "./utils/validateCORS.js";
import jwt from "jsonwebtoken";
import { conectar } from "./config/db.js";
import productoRouter from "./routers/productoRouter.js";
import validateJWT from "./utils/validateJWT.js";

conectar();

const app = express();
//Middleware para analizar los datos del cuerpo de las solicitudes en formato JSON
app.use(express.json());

//Configurar el middleware de morgan para el registro de solicitudes en consola
app.use(morgan("combined"));

app.use(corsMiddleware);

app.post("/api/users/login", (req, res, next) => {
  // Por lo general va encriptado y desencriptado en un header
  const { username, password } = req.body;

  if (username === "admin" && password === "password") {
    const payload = {
      userId: 1,
      username: "admin",
      role: "admin",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ msg: "Se inicio sesion con exito", token });
  } else {
    next(new AppError("Usuario no valido", 401));
  }
});

// Nivel de ruta
// app.use(validateJWT);

// Nivel de aplicacion
//Middleware para exponer mis rutas y puedan ser accedidas
app.use('/api/products', validateJWT, productoRouter);
app.use('/api/ventas', validateJWT, ventaRouter);

app.use((req, res, next) => {
  const error = new AppError(
    `No se ha podido acceder a ${req.originalUrl} en el servidor`,
    404
  );
  next(error);
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
