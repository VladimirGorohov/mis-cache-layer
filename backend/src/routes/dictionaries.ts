import { Router } from 'express';
import { findAllIcd10 } from '../services/icd10Repository';
import type { Icd10Response } from '../types/icd10';

export const dictionariesRouter = Router();

dictionariesRouter.get('/icd10', async (_req, res) => {
  const data = await findAllIcd10();
  const body: Icd10Response = { source: 'db', data };
  res.json(body);
});
