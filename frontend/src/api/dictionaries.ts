import type { Icd10Response } from '../types/icd10';

const ICD10_URL = '/api/v1/dictionaries/icd10';

export function isAbortError(error: unknown): boolean {
  if (error instanceof DOMException) {
    return error.name === 'AbortError';
  }

  return error instanceof Error && error.name === 'AbortError';
}

export async function fetchIcd10(signal: AbortSignal): Promise<Icd10Response> {
  const response = await fetch(ICD10_URL, { signal });

  if (!response.ok) {
    throw new Error(`ICD-10 request failed with status ${response.status}`);
  }

  return response.json() as Promise<Icd10Response>;
}
