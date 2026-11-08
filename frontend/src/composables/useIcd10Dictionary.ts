import { onMounted, ref, shallowRef } from 'vue';
import { fetchIcd10 } from '../api/dictionaries';
import type { DataSource, Icd10Diagnosis } from '../types/icd10';

export function useIcd10Dictionary() {
  const rows = shallowRef<Icd10Diagnosis[]>([]);
  const loading = ref(false);
  const durationMs = ref<number | null>(null);
  const source = ref<DataSource | null>(null);
  const errorMessage = ref<string | null>(null);

  async function refresh(): Promise<void> {
    loading.value = true;
    errorMessage.value = null;

    const startedAt = performance.now();

    try {
      const payload = await fetchIcd10();
      rows.value = payload.data;
      source.value = payload.source;
      durationMs.value = Math.round(performance.now() - startedAt);
    } catch (error) {
      source.value = null;
      durationMs.value = Math.round(performance.now() - startedAt);
      errorMessage.value = error instanceof Error ? error.message : 'Network request failed';
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    void refresh();
  });

  return {
    rows,
    loading,
    durationMs,
    source,
    errorMessage,
    refresh,
  };
}
