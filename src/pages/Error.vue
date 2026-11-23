<template>
  <main class="auth-page">
    <section class="auth-card text-center">
      <p class="eyebrow">PAGE NOT FOUND</p>
      <h1>We couldn't find that page.</h1>
      <p class="muted">The address may be outdated or typed incorrectly.</p>
      <RouterLink :to="homePath" class="btn btn-success">Return to Stride</RouterLink>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useGlobalStore } from '@/stores/global'

const user = useGlobalStore()
const homePath = computed(() => (user.isAuthenticated() ? '/workouts' : '/login'))
</script>
