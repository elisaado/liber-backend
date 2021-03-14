import express from 'express'

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ ok: true, data: { msg: "Welcome to the Liber API!" } });
});

export default router;
