import { onMounted, onUnmounted, ref, shallowRef } from 'vue';
import { fetchIcd10, isAbortError } from '../api/dictionaries';
import type { DataSource, Icd10Diagnosis } from '../types/icd10';

export function useIcd10Dictionary() {
  const rows = shallowRef<Icd10Diagnosis[]>([]);
  const loading = ref(false);
  const durationMs = ref<number | null>(null);
  const source = ref<DataSource | null>(null);
  const errorMessage = ref<string | null>(null);

  let controller: AbortController | null = null;
  let requestId = 0;

  async function refresh(): Promise<void> {
    controller?.abort();

    const nextController = new AbortController();
    controller = nextController;
    const currentRequestId = ++requestId;

    loading.value = true;
    errorMessage.value = null;

    const startedAt = performance.now();

    try {
      const payload = await fetchIcd10(nextController.signal);

      if (currentRequestId !== requestId) {
        return;
      }

      rows.value = payload.data;
      source.value = payload.source;
      durationMs.value = Math.round(performance.now() - startedAt);
    } catch (error) {
      if (isAbortError(error) || currentRequestId !== requestId) {
        return;
      }

      source.value = null;
      durationMs.value = Math.round(performance.now() - startedAt);
      errorMessage.value =
        error instanceof Error ? error.message : 'Network request failed';
    } finally {
      if (currentRequestId !== requestId) {
        return;
      }

      loading.value = false;

      if (controller === nextController) {
        controller = null;
      }
    }
  }

  function dispose(): void {
    requestId += 1;
    controller?.abort();
    controller = null;
    loading.value = false;
  }

  onMounted(() => {
    void refresh();
  });

  onUnmounted(dispose);

  return {
    rows,
    loading,
    durationMs,
    source,
    errorMessage,
    refresh,
  };
}
