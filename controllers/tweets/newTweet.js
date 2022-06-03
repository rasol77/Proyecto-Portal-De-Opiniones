const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const insertTweetQuery = require('../../db/tweetQueries/insertTweetQuery');

const { generateError, createPathIfNotExists } = require('../../helpers');

const newTweet = async (req, res, next) => {
    try {
        const { text } = req.body;

        // Si el texto no existe o supera los 280 caracteres lanzamos un error.
        if (!text || text.length > 280) {
            throw generateError(
                'Falta el texto o la longitud supera los 280 caracteres',
                400
            );
        }

        // Variable donde almacenaremos el nombre con el que guardaremos la imagen
        // en el disco.
        let imgName;

        // Si la imagen existe la guardamos.
        if (req.files && req.files.image) {
            // Creamos una ruta absoluta al directorio de descargas.
            const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

            // Creamos el directorio si no existe.
            await createPathIfNotExists(uploadsDir);

            // Procesamos la imagen y la convertimos en un objeti de tipo "Sharp".
            const sharpImg = sharp(req.files.image.data);

            // Redimensionamos la imagen para evitar que sean demasiado grandes.
            // Le asignamos 500px de ancho.
            sharpImg.resize(500);

            // Generamos un nombre único para la imagen.
            imgName = `${nanoid(24)}.jpg`;

            // Generamos la ruta absoluta a la imagen.
            const imgPath = path.join(uploadsDir, imgName);

            // Guardamos la imagen en el directorio de descargas.
            await sharpImg.toFile(imgPath);
        }

        // Agregamos el tweet.
        insertTweetQuery(req.idUser, text, imgName);

        res.send({
            status: 'ok',
            message: 'Tweet creado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newTweet;
