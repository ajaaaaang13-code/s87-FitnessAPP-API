<template>
  <div class="app-shell">
    <NavbarComponent />
    <RouterView />
    <footer class="app-footer">STRIDE FITNESS TRACKER <span>Small steps. Strong habits.</span></footer>
  </div>
</template>

<script setup>
import NavbarComponent from './components/NavbarComponent.vue'
</script>
