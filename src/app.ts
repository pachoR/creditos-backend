import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from "path";
import routes from './routes/index';

process.on('uncaughtException', (error) => {
    console.error('⚠️ Uncaught exception', error.message);
    console.error(error.stack)
})

const app = express();
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(cors({
    origin: 'http://sampablo.teclaguna.systems'
}));

app.use(express.json());

app.use("/api", routes);
// app.use(errorHandler)

const PORT = process.env.PORT || 1000;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error: any) {
        console.error("Failed to start server", error);
        process.exit(1);
    }
};

startServer()


export default app;
