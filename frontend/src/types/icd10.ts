export interface Icd10Diagnosis {
  id: number;
  code: string;
  name: string;
}

export type DataSource = 'cache' | 'db';

export interface Icd10Response {
  source: DataSource;
  data: Icd10Diagnosis[];
}
