import { Router } from 'express';
import { register, collectDefaultMetrics } from 'prom-client';
import { env } from '../config/env.ts';

const router = Router();

if (env.PROMETHEUS_ENABLED) {
  collectDefaultMetrics();
}

router.get('/', async (req, res) => {
  if (!env.PROMETHEUS_ENABLED) {
    return res.status(404).json({ success: false, error: 'Metrics disabled' });
  }
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

export default router;
