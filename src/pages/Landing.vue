<template>
  <main class="landing-page">
    <section class="landing-hero">
      <div class="hero-copy">
        <p class="eyebrow">A LITTLE STRONGER EVERY DAY</p>
        <h1>Make time for <span>yourself.</span></h1>
        <p class="hero-description">
          Keep your workouts in one place, follow your progress, and celebrate every time you show up.
        </p>
        <div class="hero-actions">
          <RouterLink class="btn btn-success btn-lg" :to="user.isAuthenticated() ? '/workouts' : '/register'">
            {{ user.isAuthenticated() ? 'View my workouts' : 'Get started' }}
            
          </RouterLink>
          <RouterLink class="hero-secondary-link" :to="user.isAuthenticated() ? '/addWorkouts' : '/login'">
            {{ user.isAuthenticated() ? 'Log a workout' : 'I already have an account' }}
          </RouterLink>
        </div>
        <div class="hero-note">
         
          <span>Simple tracking. Personal progress.</span>
        </div>
      </div>

      <div class="hero-image-wrap">
        <img
          class="hero-image"
          src="/fitness-hero.png"
          alt="Illustration of an athlete running along a green trail"
        />
      </div>
    </section>

    <section class="landing-features" aria-label="Fitness Tracker features">
      <article class="feature-item">
        <span class="feature-number">01</span>
        <h2>Log your sessions</h2>
        <p>Save the workout and duration so your effort has a place to live.</p>
      </article>
      <article class="feature-item">
        <span class="feature-number">02</span>
        <h2>See your progress</h2>
        <p>Review your history and watch the minutes add up over time.</p>
      </article>
      <article class="feature-item">
        <span class="feature-number">03</span>
        <h2>Keep your rhythm</h2>
        <p>Small, consistent steps are worth celebrating. Keep moving at your pace.</p>
      </article>
    </section>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useGlobalStore } from '@/stores/global'

const user = useGlobalStore()
</script>
