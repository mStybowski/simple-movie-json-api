import express from 'express';
import { addMovieController, getMoviesController } from '../controllers/movies.controller.js';

const router = express.Router();

router.post('/add', addMovieController);
router.get('/get', getMoviesController);

export default router;