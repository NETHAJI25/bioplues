import type { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.ts';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, error: 'Not found' });
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  
  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      errors: err.errors,
    });
  }
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
