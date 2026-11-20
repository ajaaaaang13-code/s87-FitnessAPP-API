<template>
  <form class="workout-form" @submit.prevent="addWorkout">
    <div class="form-field">
      <label for="workout-name">Workout name</label>
      <input
        id="workout-name"
        v-model.trim="form.name"
        class="form-control"
        type="text"
        maxlength="80"
        placeholder="e.g. Morning run"
        required
      />
    </div>

    <div class="form-row">
      <div class="form-field">
        <label for="workout-duration">Duration</label>
        <div class="input-group">
          <input
            id="workout-duration"
            v-model.number="form.duration"
            class="form-control"
            type="number"
            min="1"
            max="1440"
            step="1"
            placeholder="45"
            required
          />
          <span class="input-group-text">minutes</span>
        </div>
      </div>
    </div>

    <p v-if="error" class="alert alert-danger" role="alert">{{ error }}</p>
    <div class="form-actions">
      <RouterLink to="/workouts" class="btn btn-outline-secondary">Cancel</RouterLink>
      <button class="btn btn-success" type="submit" :disabled="isLoading">
        {{ isLoading ? 'Saving…' : 'Save workout' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import api, { endpoints, getApiError } from '@/api'

const router = useRouter()
const form = ref({ name: '', duration: null })
const error = ref('')
const isLoading = ref(false)

async function addWorkout() {
  error.value = ''
  isLoading.value = true

  try {
    await api.post(endpoints.addWorkout, {
      name: form.value.name,
      duration: Number(form.value.duration),
    })
    await router.push({ name: 'Workouts' })
  } catch (requestError) {
    error.value = getApiError(requestError, 'Could not save your workout.')
  } finally {
    isLoading.value = false
  }
}
</script>
