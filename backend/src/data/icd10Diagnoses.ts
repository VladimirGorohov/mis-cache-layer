import type { Icd10Diagnosis } from '../types/icd10';

export const ICD10_DIAGNOSES: readonly Icd10Diagnosis[] = [
  { id: 1, code: 'J06.9', name: 'Острая инфекция верхних дыхательных путей неуточненная' },
  { id: 2, code: 'I10', name: 'Эссенциальная (первичная) гипертензия' },
  { id: 3, code: 'E11.9', name: 'Сахарный диабет 2 типа без осложнений' },
  { id: 4, code: 'M54.5', name: 'Боль внизу спины' },
  { id: 5, code: 'K29.7', name: 'Гастрит неуточненный' },
];
