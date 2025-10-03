import { Router } from 'express';
import alumno from './alumno';

const router = Router();

router.use('/alumno', alumno);

export default router;