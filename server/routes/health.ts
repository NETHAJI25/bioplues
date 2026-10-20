import { Router } from 'express';
import { db } from '../db/index.ts';
import { sql } from 'drizzle-orm';
import { env } from '../config/env.ts';

const router = Router();

router.get('/', async (req, res) => {
  try {
    await db.run(sql`SELECT 1`);
    res.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: env.NODE_ENV,
    });
  } catch (error) {
    res.status(503).json({ success: false, status: 'unhealthy' });
  }
});

router.get('/ready', async (req, res) => {
  res.json({ success: true, status: 'ready' });
});

export default router;
