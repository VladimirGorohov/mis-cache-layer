import { Router } from 'express';
import { dictionaryRequestCounterMiddleware } from '../middleware/dictionaryRequestCounter';
import { dictionaryCache } from '../services/dictionaryCache';

export const dictionariesRouter = Router();

dictionariesRouter.get(
  '/icd10',
  dictionaryRequestCounterMiddleware,
  async (req, res) => {
    const body = await dictionaryCache.getIcd10(req, res);

    if (body === null || req.destroyed || res.writableEnded) {
      return;
    }

    res.json(body);
  },
);
