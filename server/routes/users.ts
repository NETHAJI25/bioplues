import { Router } from 'express';
import { db, schema } from '../db/index.ts';
import { eq, desc } from 'drizzle-orm';
import { authenticate } from '../middleware/auth.ts';
import { authorize } from '../middleware/auth.ts';
import { getPagination, buildPaginatedResponse } from '../utils/pagination.ts';

const router = Router();

router.use(authenticate);

router.get('/', authorize('admin'), async (req, res, next) => {
  try {
    const { page, limit, offset } = getPagination(req.query);
    const users = await db.select().from(schema.users).limit(limit).offset(offset).orderBy(desc(schema.users.createdAt));
    const [{ count }] = await db.select({ count: schema.users.id }).from(schema.users).then(rows => [{ count: rows.length }]); // simple
    res.json(buildPaginatedResponse(users, users.length, page, limit));
  } catch (error) {
    next(error);
  }
});

router.get('/me', (req, res) => {
  res.json({ success: true, data: req.user });
});

export default router;
