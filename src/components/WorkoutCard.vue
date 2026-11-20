<template>
  <article class="workout-card">
    <div class="workout-avatar" aria-hidden="true">{{ initial }}</div>
    <div class="workout-details">
      <h3>{{ workout.name || 'Workout' }}</h3>
      <p>{{ displayDate }}</p>
    </div>
    <div class="workout-duration">
      <strong>{{ Number(workout.duration) || 0 }}</strong>
      <span>min</span>
    </div>
    <span class="status-pill" :class="isComplete ? 'status-complete' : 'status-other'">
      <span class="status-dot" aria-hidden="true"></span>
      {{ statusLabel }}
    </span>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  workout: {
    type: Object,
    required: true,
  },
})

const initial = computed(() => String(props.workout.name || 'W').charAt(0).toUpperCase())
const statusLabel = computed(() =>
  String(props.workout.status || 'unknown')
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' '),
)
const isComplete = computed(() => String(props.workout.status).toLowerCase() === 'completed')
const displayDate = computed(() => {
  const date = new Date(props.workout.dateAdded)
  return Number.isNaN(date.getTime())
    ? 'Date unavailable'
    : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date)
})
</script>
