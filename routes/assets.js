import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Serve static files from the "node_modules" directory
router.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));

export default router;