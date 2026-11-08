import { ICD10_DIAGNOSES } from '../data/icd10Diagnoses';
import type { Icd10Diagnosis } from '../types/icd10';

const DB_LATENCY_MS = 1000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function findAllIcd10(): Promise<Icd10Diagnosis[]> {
  await delay(DB_LATENCY_MS);
  return [...ICD10_DIAGNOSES];
}
