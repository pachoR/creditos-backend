import { Request, Response } from 'express';
import servicioAlumno from '../services/alumno';

const getHealth = async (req: Request, res: Response) => {
    try {
        const healthResponse = await servicioAlumno.getHealth();
        res.json(healthResponse);
    } catch (error: any) {
        console.error('health check error: ', error);
        res.status(500).json({
            success: false,
            message: error,
            timestampt: new Date().toISOString()
        });
    }
}

const alumno = {
    getHealth
}

export default alumno;