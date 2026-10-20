import { Router } from 'express';
import { db, schema } from '../db/index.ts';
import { eq, desc } from 'drizzle-orm';
import { authenticate } from '../middleware/auth.ts';
import { generateId } from '../utils/crypto.ts';

const router = Router();
router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const assets = await db.select().from(schema.assets).orderBy(desc(schema.assets.createdAt));
    res.json({ success: true, data: assets });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { projectId, targetId, type, name, value, criticality } = req.body;
    const id = generateId('ast');
    await db.insert(schema.assets).values({ id, projectId, targetId, type, name, value, criticality: criticality || 'medium' }).run();
    res.status(201).json({ success: true, data: { id, name } });
  } catch (error) {
    next(error);
  }
});

export default router;
