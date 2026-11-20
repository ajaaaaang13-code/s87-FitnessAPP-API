<template>
  <article class="workout-card">
    <div v-if="!isEditing" class="workout-main">
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
      <div class="workout-actions">
        <button class="btn btn-sm btn-outline-secondary" type="button" :disabled="isBusy" @click="beginEdit">
          Edit
        </button>
        <button
          v-if="!isComplete"
          class="btn btn-sm btn-outline-success"
          type="button"
          :disabled="isBusy"
          @click="$emit('complete', workoutId)"
        >
          Complete
        </button>
        <button class="btn btn-sm btn-outline-danger" type="button" :disabled="isBusy" @click="deleteWorkout">
          Delete
        </button>
      </div>
    </div>

    <form v-else class="edit-workout-form" @submit.prevent="saveChanges">
      <div class="edit-workout-fields">
        <div class="form-field">
          <label :for="`workout-name-${workoutId}`">Workout name</label>
          <input
            :id="`workout-name-${workoutId}`"
            v-model.trim="draft.name"
            class="form-control form-control-sm"
            type="text"
            maxlength="80"
            required
          />
        </div>
        <div class="form-field">
          <label :for="`workout-duration-${workoutId}`">Duration (minutes)</label>
          <input
            :id="`workout-duration-${workoutId}`"
            v-model.number="draft.duration"
            class="form-control form-control-sm"
            type="number"
            min="1"
            max="1440"
            step="1"
            required
          />
        </div>
        <div class="form-field">
          <label :for="`workout-status-${workoutId}`">Status</label>
          <select
            :id="`workout-status-${workoutId}`"
            v-model="draft.status"
            class="form-select form-select-sm"
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn-sm btn-outline-secondary" type="button" :disabled="isBusy" @click="cancelEdit">
          Cancel
        </button>
        <button class="btn btn-sm btn-success" type="submit" :disabled="isBusy">
          {{ isBusy ? 'Saving…' : 'Save changes' }}
        </button>
      </div>
    </form>
  </article>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  workout: {
    type: Object,
    required: true,
  },
  isBusy: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update', 'delete', 'complete'])

const isEditing = ref(false)
const draft = ref({ name: '', duration: 1, status: 'pending' })
const workoutId = computed(() => props.workout._id || props.workout.id)
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

function resetDraft() {
  draft.value = {
    name: props.workout.name || '',
    duration: Number(props.workout.duration) || 1,
    status: props.workout.status || 'pending',
  }
}

function beginEdit() {
  resetDraft()
  isEditing.value = true
}

function cancelEdit() {
  isEditing.value = false
  resetDraft()
}

function saveChanges() {
  if (!workoutId.value) return

  const updates = {
    name: draft.value.name,
    duration: Number(draft.value.duration),
    status: draft.value.status,
  }

  if (!updates.name.trim() || !Number.isFinite(updates.duration) || updates.duration < 1) return

  isEditing.value = false
  emit('update', { id: workoutId.value, updates })
}

function deleteWorkout() {
  if (workoutId.value && window.confirm(`Delete "${props.workout.name || 'this workout'}"?`)) {
    emit('delete', workoutId.value)
  }
}

watch(
  () => props.workout,
  () => {
    if (isEditing.value) resetDraft()
  },
)
</script>
