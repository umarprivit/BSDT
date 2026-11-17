import express from 'express';
import {UpdateStatus} from '../controllers/statusController.js';

const router = express.Router();

router.post("/update", UpdateStatus);

export default router;
