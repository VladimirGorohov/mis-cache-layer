import type { NextFunction, Request, Response } from 'express';
import { dictionaryRequestCounter } from '../services/requestCounter';

export function dictionaryRequestCounterMiddleware(
  _req: Request,
  _res: Response,
  next: NextFunction,
): void {
  dictionaryRequestCounter.increment();
  next();
}
