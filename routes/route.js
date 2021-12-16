import  express  from "express";
import { getArtistInfo } from '../controllers/artists.js'

const routes = express.Router();

routes.get('/artists/:id', getArtistInfo);

export default routes;
