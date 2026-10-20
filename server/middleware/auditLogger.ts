import type { Request, Response, NextFunction } from 'express';
import { db, schema } from '../db/index.ts';
import { generateId } from '../utils/crypto.ts';

export const auditLogger = (action: string, resource: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json.bind(res);
    
    res.json = (body: any) => {
      try {
        db.insert(schema.auditLogs).values({
          id: generateId('alog'),
          userId: req.user?.id,
          orgId: req.user?.orgId || null,
          action,
          resource,
          resourceId: req.params?.id || body?.data?.id,
          details: { method: req.method, path: req.path, body: req.body },
          ipAddress: req.ip || (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress,
          userAgent: req.headers['user-agent'],
        }).run();
      } catch (e) {
        // Don't block request on audit log failure
      }
      return originalJson(body);
    };
    
    next();
  };
};
