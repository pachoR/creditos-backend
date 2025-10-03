export type HealthResponse = {
    message: string,
    error: boolean
}

export const getHealth = async (): Promise<HealthResponse> => {
    return {
        message: 'ok',
        error: false
    }
}

const servicioAlumno = {
    getHealth
}

export default servicioAlumno;