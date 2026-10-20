import type { Request, Response, NextFunction } from 'express';
import type { Role } from '../types/index.ts';

const roleHierarchy: Record<Role, number> = {
  viewer: 1,
  analyst: 2,
  auditor: 2,
  admin: 4,
};

export const requireRole = (minRole: Role) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    const userLevel = roleHierarchy[req.user.role] || 0;
    const requiredLevel = roleHierarchy[minRole] || 0;
    if (userLevel < requiredLevel) {
      return res.status(403).json({ success: false, error: 'Insufficient permissions' });
    }
    next();
  };
};

export const requireOrgAccess = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Basic org scope check - can be extended per resource
    next();
  };
};
