import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { pool, createTable, insertPost } from './db/configuracion.js'; // Asegúrate de agregar la extensión .js

const app = express();

//Habilitamos middleware y cors
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
// Creando la tabla al iniciar el servidor
createTable();

app.get('/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener posts' });
    }
});

app.post('/posts', async (req, res) => {
    const { titulo, img, descripcion } = req.body; 
    try {
        await insertPost(titulo, img, descripcion);
        res.status(201).json({ message: 'Post creado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el post' });
    }
});

const PORT = process.env.PORT || 5005; // Cambié el puerto a 5005
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




