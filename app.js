// Importar dependencias
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios'
// import OpenAI from 'openai';

dotenv.config();

//Cargar express
const app = express();
const PORT = process.env.PORT || 3000;

// Servir frontend (index.html)
app.use("/", express.static("public"));

// Middleware para procesar json y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para generar imagenes con IA
app.post("/api/gen-img" , async (req, res) => {
    const apiKey = process.env.OPENAI_API_KEY;
    
    const { category } = req.body;

    let myPrompt = `
        Eres un diseñador gráfico experto.
        Tu objetivo final es crear una avatar para un ${category}.
        Especificaciones del avatar:
            - Estilo: Cartoon (tipo dibujos animados)
            - Dimensiones: 256x256 pixeles
            - Fondo de la imagen: Color sólido
            - Protagonista del avatar debe ser: ${category}
            - Formato de la imagen siempre será cuadrado o rectangular

        Para hacer bien el trabajo debes cumplir con todas las especificaciones.
        Si lo haces bien te pagaré 700 dolares.
    `;

    try {
        const response = await axios.post(`https://api.openai.com/v1/images/generations`, {
            model: "dall-e-2",
            prompt: myPrompt,
            n: 1,
            size: "256x256"
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            }
        });

        const imageUrl = response.data.data[0].url;

        return res.status(200).json({ image_url: imageUrl })

    } catch (error) {
        console.log(`Error al generar la imagen: ${error}`);
        return res.status(500).json({ error: "Error al generar avatar" });
    }

});

// Servir el backend
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});