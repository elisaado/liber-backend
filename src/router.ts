import express from 'express'
import { googleAuthenticationHandler } from './handlers/googleAuthenticationHandler';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ ok: true, data: { msg: "Welcome to the Liber API!" } });
});

router.post('/auth/google', googleAuthenticationHandler);

export default router;
