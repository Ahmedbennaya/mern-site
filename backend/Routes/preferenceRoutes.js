import express from 'express';
import { savePreferences } from '../Controllers/preferencesController.js';

const router = express.Router();

router.post('/savePreferences', savePreferences);

export default router;
