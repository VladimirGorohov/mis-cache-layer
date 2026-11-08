export interface Icd10Diagnosis {
  id: number;
  code: string;
  name: string;
}

export interface Icd10Response {
  source: 'db';
  data: Icd10Diagnosis[];
}
