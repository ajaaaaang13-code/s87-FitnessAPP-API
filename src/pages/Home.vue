<template>
  <main class="page-container workouts-page">
    <header class="page-heading">
      <div>
        <p class="eyebrow">YOUR FITNESS, YOUR PACE</p>
        <h1>My workouts<span class="heading-dot">.</span></h1>
        <p class="muted">Every session is progress. Keep showing up.</p>
      </div>
      <RouterLink to="/addWorkouts" class="btn btn-success">＋ Add workout</RouterLink>
    </header>

    <section class="stats-grid" aria-label="Workout progress">
      <article class="stat-card">
        <span>Total workouts</span>
        <strong>{{ workouts.length }}</strong>
      </article>
      <article class="stat-card">
        <span>Total time</span>
        <strong>{{ totalMinutes }} <small>min</small></strong>
      </article>
      <article class="stat-card">
        <span>Completed</span>
        <strong>{{ completedCount }}</strong>
      </article>
    </section>

    <div class="section-heading">
      <h2>Recent sessions</h2>
      <button class="btn btn-sm btn-outline-success" type="button" :disabled="isLoading" @click="fetchWorkouts">
        Refresh
      </button>
    </div>

    <p v-if="isLoading" class="empty-state" role="status">Loading workouts…</p>
    <p v-else-if="error" class="alert alert-danger" role="alert">{{ error }}</p>
    <section v-else-if="workouts.length" class="workout-list">
      <WorkoutCard
        v-for="(workout, index) in workouts"
        :key="workout._id || workout.id || `${workout.name}-${index}`"
        :workout="workout"
      />
    </section>
    <section v-else class="empty-state">
      <h3>No workouts yet</h3>
      <p class="muted">Log your first session and start building your progress.</p>
      <RouterLink to="/addWorkouts" class="btn btn-success">Add your first workout</RouterLink>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import api, { endpoints, getApiError } from '@/api'
import WorkoutCard from '@/components/WorkoutCard.vue'
import { useGlobalStore } from '@/stores/global'

const router = useRouter()
const user = useGlobalStore()
const workouts = ref([])
const error = ref('')
const isLoading = ref(false)

const totalMinutes = computed(() =>
  workouts.value.reduce((sum, workout) => sum + (Number(workout.duration) || 0), 0),
)
const completedCount = computed(() =>
  workouts.value.filter((workout) => String(workout.status).toLowerCase() === 'completed').length,
)

async function fetchWorkouts() {
  error.value = ''
  isLoading.value = true

  try {
    const response = await api.get(endpoints.workouts)
    const data = response.data
    const list = Array.isArray(data) ? data : data?.workouts
    if (!Array.isArray(list)) {
      throw new Error('The API returned an unexpected workouts response.')
    }
    workouts.value = list
  } catch (requestError) {
    error.value = getApiError(requestError, 'Could not load workouts.')
    if (requestError.response?.status === 401 || requestError.response?.status === 403) {
      user.clearToken()
      await router.push('/login')
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchWorkouts)
</script>
