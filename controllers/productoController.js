import ProductoDAO from "../dao/productoDAO.js";
import { AppError } from "../utils/appError.js";

class ProductoController {
  static async crearProducto(req, res, next) {
    try {
      const { nombre, precio, cantidad } = req.body;

      if (!nombre || !precio || !cantidad) {
        return next(
          new AppError(
            "Los campos nombre, precio y cantidad son requeridos",
            400
          )
        );
      }

      const productoData = { nombre, precio, cantidad };
      const producto = await ProductoDAO.crearProducto(productoData);
      res.status(201).json(producto);
    } catch (error) {
      next(new AppError("Ocurrio un error al crear el producto", 500));
    }
  }

  static async obtenerProductoPorId(req, res, next) {
    try {
      const id = req.params.id;
      const producto = await ProductoDAO.obtenerProductoPorId(id);

      if (!producto) {
        return next(new AppError("Producto no encontrado", 404));
      }

      res.status(200).json(producto);
    } catch (error) {
      next(new AppError("Ocurrio un error al obtener el producto", 500));
    }
  }

  static async obtenerProductos(req, res, next) {
    try {
      // http://localhost:3000/api/products?limit=10
      // http://localhost:3000/api/products?limit=10&limitsup=20
      const limit = req.query.limit || 10;
      const productos = await ProductoDAO.obtenerProductos(limit);

      if (!productos) {
        next(new AppError("No se encontraron productos", 404));
      }

      res.status(200).json(productos);
    } catch (error) {
      next(new AppError("Ocurrio un error al obtener los productos", 500));
    }
  }

  static async actualizarProducto(req, res, next) {
    try {
      const id = req.params.id;

      const productoexists = await ProductoDAO.obtenerProductoPorId(id);

      if (!productoexists) {
        return next(new AppError("Producto no encontrado", 404));
      }

      const productoData = req.body;

      const producto = await ProductoDAO.actualizarProductoPorId(
        id,
        productoData
      );

      res.status(200).json(producto);
    } catch (error) {
      next(new AppError("Ocurrio un error al actualizar el producto", 500));
    }
  }

  async eliminarProducto(req, res, next) {
    try {
      const id = req.params.id;

      const productoexists = await ProductoDAO.obtenerProductoPorId(id);

      if (!productoexists) {
        return next(new AppError("Producto no encontrado", 404));
      }

      await ProductoDAO.eliminarProductoPorId(id);

      res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      next(new AppError("Ocurrio un error al eliminar el producto", 500));
    }
  }
}

export default ProductoController;
