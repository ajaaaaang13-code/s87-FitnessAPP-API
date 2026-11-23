<template>
  <header class="topbar">
    <RouterLink class="brand" to="/" aria-label="Stride home">
      <span class="brand-mark">S</span>
      <span>stride<span class="brand-dot">.</span></span>
    </RouterLink>

    <nav v-if="user.isAuthenticated()" class="nav-links" aria-label="Main navigation">
      <RouterLink to="/workouts">My workouts</RouterLink>
      <RouterLink class="nav-action" to="/addWorkouts">＋ Add workout</RouterLink>
      <RouterLink to="/logout">Log out</RouterLink>
    </nav>
    <nav v-else class="nav-links" aria-label="Account navigation">
      <RouterLink to="/login">Log in</RouterLink>
      <RouterLink class="nav-action" to="/register">Create account</RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useGlobalStore } from '@/stores/global'

const user = useGlobalStore()
</script>
