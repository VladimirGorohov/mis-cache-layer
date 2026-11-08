<script setup lang="ts">
import { computed } from 'vue';
import { useIcd10Dictionary } from '../composables/useIcd10Dictionary';

const { rows, loading, durationMs, source, errorMessage, refresh } = useIcd10Dictionary();

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: 'Код МКБ-10', dataIndex: 'code', key: 'code', width: 140 },
  { title: 'Наименование', dataIndex: 'name', key: 'name' },
];

const alertType = computed(() => {
  if (errorMessage.value) {
    return 'error' as const;
  }

  if (source.value === 'cache') {
    return 'success' as const;
  }

  if (source.value === 'db') {
    return 'warning' as const;
  }

  return 'info' as const;
});

const alertMessage = computed(() => {
  if (errorMessage.value) {
    return errorMessage.value;
  }

  if (source.value === 'cache') {
    return 'SUCCESS: Данные получены из кэша сервера';
  }

  if (source.value === 'db') {
    return 'ATTENTION: Тяжелый запрос к БД';
  }

  return 'Нажмите «Обновить данные», чтобы загрузить справочник';
});
</script>

<template>
  <div class="page">
    <header class="page__header">
      <div>
        <h1 class="page__title">Справочник МКБ-10</h1>
        <p class="page__subtitle">Слой кэширования справочников МИС</p>
      </div>
      <a-button type="primary" :loading="loading" @click="refresh">
        Обновить данные
      </a-button>
    </header>

    <div class="page__meta">
      <a-alert :type="alertType" :message="alertMessage" show-icon />
      <p v-if="durationMs !== null" class="page__duration">
        Время выполнения запроса: <strong>{{ durationMs }} мс</strong>
      </p>
    </div>

    <a-table
      :columns="columns"
      :data-source="rows"
      :loading="loading"
      row-key="id"
      :pagination="false"
      size="middle"
    />
  </div>
</template>

<style scoped>
.page {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 24px 48px;
  font-family: "IBM Plex Sans", "Segoe UI", sans-serif;
  color: #0f172a;
}

.page__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.page__title {
  margin: 0 0 4px;
  font-size: 28px;
  font-weight: 650;
  letter-spacing: -0.02em;
}

.page__subtitle {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

.page__meta {
  display: grid;
  gap: 12px;
  margin-bottom: 20px;
}

.page__duration {
  margin: 0;
  font-size: 14px;
  color: #334155;
}

.page__duration strong {
  font-variant-numeric: tabular-nums;
  color: #0f172a;
}
</style>
