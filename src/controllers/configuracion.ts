import { Request, Response } from 'express';
import * as configuracionService from '../services/configuracion';
import { ConfiguracionCreate, ConfiguracionUpdate } from '../types/configuracion';

export const getAllConfiguraciones = async (_req: Request, res: Response) => {
  try {
    const configuraciones = await configuracionService.getAllConfiguraciones();
    res.json(configuraciones);
  } catch (error) {
    console.error('Error al obtener configuraciones:', error);
    res.status(500).json({ error: 'Error al obtener configuraciones' });
  }
};

export const getConfiguracionByNombre = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;
    const configuracion = await configuracionService.getConfiguracionByNombre(nombre);
    
    if (!configuracion) {
      return res.status(404).json({ error: 'Configuración no encontrada' });
    }
    
    res.json(configuracion);
  } catch (error) {
    console.error('Error al obtener configuración:', error);
    res.status(500).json({ error: 'Error al obtener configuración' });
  }
};

export const createConfiguracion = async (req: Request, res: Response) => {
  try {
    const configuracionData: ConfiguracionCreate = req.body;
    
    if (!configuracionData.config_nombre || !configuracionData.config_valor) {
      return res.status(400).json({ error: 'config_nombre y config_valor son requeridos' });
    }
    
    const nuevaConfiguracion = await configuracionService.createConfiguracion(configuracionData);
    res.status(201).json(nuevaConfiguracion);
  } catch (error: any) {
    console.error('Error al crear configuración:', error);
    if (error.code === '23505') { // Duplicate key error
      return res.status(409).json({ error: 'La configuración ya existe' });
    }
    res.status(500).json({ error: 'Error al crear configuración' });
  }
};

export const updateConfiguracion = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;
    const configuracionData: ConfiguracionUpdate = req.body;
    
    if (!configuracionData.config_valor) {
      return res.status(400).json({ error: 'config_valor es requerido' });
    }
    
    const configuracionActualizada = await configuracionService.updateConfiguracion(nombre, configuracionData);
    
    if (!configuracionActualizada) {
      return res.status(404).json({ error: 'Configuración no encontrada' });
    }
    
    res.json(configuracionActualizada);
  } catch (error) {
    console.error('Error al actualizar configuración:', error);
    res.status(500).json({ error: 'Error al actualizar configuración' });
  }
};

export const deleteConfiguracion = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;
    const eliminado = await configuracionService.deleteConfiguracion(nombre);
    
    if (!eliminado) {
      return res.status(404).json({ error: 'Configuración no encontrada' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar configuración:', error);
    res.status(500).json({ error: 'Error al eliminar configuración' });
  }
};
