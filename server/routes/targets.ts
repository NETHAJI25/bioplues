import { Router } from 'express';
import { db, schema } from '../db/index.ts';
import { eq, desc } from 'drizzle-orm';
import { authenticate } from '../middleware/auth.ts';
import { generateId } from '../utils/crypto.ts';

const router = Router();
router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const targets = await db.select().from(schema.targets).orderBy(desc(schema.targets.createdAt));
    res.json({ success: true, data: targets });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { projectId, name, type, url, ipAddress, scope, excludeScope } = req.body;
    const id = generateId('tgt');
    await db.insert(schema.targets).values({ id, projectId, name, type, url, ipAddress, scope: scope || [], excludeScope: excludeScope || [] }).run();
    res.status(201).json({ success: true, data: { id, name } });
  } catch (error) {
    next(error);
  }
});

export default router;
