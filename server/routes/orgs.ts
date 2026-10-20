import { Router } from 'express';
import { db, schema } from '../db/index.ts';
import { eq } from 'drizzle-orm';
import { authenticate } from '../middleware/auth.ts';
import { authorize } from '../middleware/auth.ts';
import { generateId } from '../utils/crypto.ts';

const router = Router();
router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const orgs = await db.select().from(schema.organizations);
    res.json({ success: true, data: orgs });
  } catch (error) {
    next(error);
  }
});

router.post('/', authorize('admin'), async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const id = generateId('org');
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await db.insert(schema.organizations).values({ id, name, slug, description }).run();
    res.status(201).json({ success: true, data: { id, name, slug } });
  } catch (error) {
    next(error);
  }
});

export default router;
