import type { Request, Response } from 'express';
import type { Icd10Diagnosis, Icd10Response } from '../types/icd10';
import { findAllIcd10 } from './icd10Repository';
import { dictionaryRequestCounter } from './requestCounter';

export class DictionaryCache {
  private entries: Icd10Diagnosis[] | null = null;
  private inflight: Promise<Icd10Diagnosis[]> | null = null;

  async getIcd10(req: Request, res: Response): Promise<Icd10Response | null> {
    if (dictionaryRequestCounter.shouldInvalidate()) {
      this.entries = null;
    }

    if (this.entries !== null) {
      return { source: 'cache', data: this.entries };
    }

    const data = await this.loadCollapsed(req, res);

    if (req.destroyed || res.writableEnded) {
      return null;
    }

    return { source: 'db', data };
  }

  private loadCollapsed(req: Request, res: Response): Promise<Icd10Diagnosis[]> {
    if (this.inflight === null) {
      this.inflight = findAllIcd10(req, res, () => {
        dictionaryRequestCounter.rollback();
      })
        .then((data) => {
          this.entries = data;
          return data;
        })
        .finally(() => {
          this.inflight = null;
        });
    }

    return this.inflight;
  }
}

export const dictionaryCache = new DictionaryCache();
