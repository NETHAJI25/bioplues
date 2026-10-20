import { Router } from 'express';
import { db, schema } from '../db/index.ts';
import { eq, desc } from 'drizzle-orm';
import { authenticate } from '../middleware/auth.ts';
import { generateId } from '../utils/crypto.ts';
import { getPagination, buildPaginatedResponse } from '../utils/pagination.ts';

const router = Router();
router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const { page, limit, offset } = getPagination(req.query);
    const projects = await db.select().from(schema.projects).limit(limit).offset(offset).orderBy(desc(schema.projects.createdAt));
    res.json(buildPaginatedResponse(projects, projects.length, page, limit));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, description, orgId } = req.body;
    const id = generateId('prj');
    await db.insert(schema.projects).values({ id, name, description, orgId: orgId || req.user?.orgId, ownerId: req.user?.id }).run();
    res.status(201).json({ success: true, data: { id, name } });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [project] = await db.select().from(schema.projects).where(eq(schema.projects.id, req.params.id)).limit(1);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
});

export default router;
