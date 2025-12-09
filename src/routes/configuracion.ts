import { Router } from 'express';
import * as configuracionController from '../controllers/configuracion';
import { verificarToken } from '../middleware/auth';

const router = Router();

// Obtener todas las configuraciones
router.get('/', verificarToken, configuracionController.getAllConfiguraciones);

// Obtener una configuración por nombre
router.get('/:nombre', verificarToken, configuracionController.getConfiguracionByNombre);

// Crear una nueva configuración
router.post('/', verificarToken, configuracionController.createConfiguracion);

// Actualizar una configuración por nombre
router.put('/:nombre', verificarToken, configuracionController.updateConfiguracion);

// Eliminar una configuración por nombre
router.delete('/:nombre', verificarToken, configuracionController.deleteConfiguracion);

export default router;
