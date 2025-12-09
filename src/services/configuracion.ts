import pool from './db';
import { Configuracion, ConfiguracionCreate, ConfiguracionUpdate } from '../types/configuracion';

export const getAllConfiguraciones = async (): Promise<Configuracion[]> => {
  const result = await pool.query(
    'SELECT config_nombre, config_valor FROM Configuraciones ORDER BY config_nombre'
  );
  return result.rows;
};

export const getConfiguracionByNombre = async (nombre: string): Promise<Configuracion | null> => {
  const result = await pool.query(
    'SELECT config_nombre, config_valor FROM Configuraciones WHERE config_nombre = $1',
    [nombre]
  );
  return result.rows[0] || null;
};

export const createConfiguracion = async (configuracion: ConfiguracionCreate): Promise<Configuracion> => {
  const result = await pool.query(
    'INSERT INTO Configuraciones (config_nombre, config_valor) VALUES ($1, $2) RETURNING config_nombre, config_valor',
    [configuracion.config_nombre, configuracion.config_valor]
  );
  return result.rows[0];
};

export const updateConfiguracion = async (nombre: string, configuracion: ConfiguracionUpdate): Promise<Configuracion | null> => {
  const result = await pool.query(
    'UPDATE Configuraciones SET config_valor = $1 WHERE config_nombre = $2 RETURNING config_nombre, config_valor',
    [configuracion.config_valor, nombre]
  );
  return result.rows[0] || null;
};

export const deleteConfiguracion = async (nombre: string): Promise<boolean> => {
  const result = await pool.query(
    'DELETE FROM Configuraciones WHERE config_nombre = $1',
    [nombre]
  );
  return (result.rowCount ?? 0) > 0;
};
