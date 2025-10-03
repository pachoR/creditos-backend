import { Router } from 'express';
import alumno from '../controllers/alumno';
const router = Router();

router.get('/health', alumno.getHealth);

export default router;