import express from 'express';
import ProductoController from '../controllers/productoController';

const router = express.Router();

router.get('/', ProductoController.obtenerProductos);
router.put('/:id', ProductoController.obtenerProductoPorId);
router.post('/', ProductoController.crearProducto);
router.put('/:id', ProductoController.actualizarProducto);
router.delete('/:id', ProductoController.eliminarProducto);

export default router;
