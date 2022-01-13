import express from "express";
import { getArtistInfo } from '../controllers/artists.js';

const routes = express.Router();
try {
    routes.get('/artists/:id', getArtistInfo);
} catch (error) {
    throw Error(`Invalid URI ${error.message}`)
}

export default routes;
