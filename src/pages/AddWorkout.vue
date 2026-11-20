<template>
  <main class="page-container add-workout-page">
    <RouterLink to="/workouts" class="back-link">← Back to workouts</RouterLink>
    <header class="page-heading">
      <div>
        <p class="eyebrow">MAKE IT COUNT</p>
        <h1>Log a workout</h1>
        <p class="muted">Add a session and keep your progress moving.</p>
      </div>
      <span class="heading-icon" aria-hidden="true">＋</span>
    </header>
    <AddWorkoutForm />
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import AddWorkoutForm from '@/components/AddWorkoutForm.vue'
</script>
