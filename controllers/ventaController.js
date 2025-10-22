import VentaDAO from "../dao/ventaDAO.js";
import { AppError } from "../utils/appError.js";

class VentaController {

  static async crearVenta(req, res, next) {
    try {
      const { productoId, cantidad } = req.body;

      const nuevaVenta = await VentaDAO.crearVenta(productoId, cantidad);
      res.status(201).json(nuevaVenta);
    } catch (error) {
      next(new AppError("Error al crear la venta", 500));
    }
  }

  static async agregaProductosAVenta(req, res, next) {
    try {
      const idVenta = req.params.id;
      const productos = req.body.productos;
      
      const ventaActualizada = await VentaDAO.agregaProductosAVenta(idVenta, productos);
      res.status(200).json(ventaActualizada);
    } catch (error) {
      next(new AppError("Error al agregar productos a la venta", 500));
    }
  }

}

export default VentaController;
