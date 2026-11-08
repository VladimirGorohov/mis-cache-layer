import type { Request, Response } from 'express';
import { ICD10_DIAGNOSES } from '../data/icd10Diagnoses';
import type { Icd10Diagnosis } from '../types/icd10';

const DB_LATENCY_MS = 1000;

export function findAllIcd10(
  req: Request,
  res: Response,
  onAborted?: () => void,
): Promise<Icd10Diagnosis[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (req.destroyed || res.writableEnded) {
        onAborted?.();
      }

      resolve([...ICD10_DIAGNOSES]);
    }, DB_LATENCY_MS);
  });
}
