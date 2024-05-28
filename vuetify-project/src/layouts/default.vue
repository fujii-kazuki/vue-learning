<template>
  <v-app>
    <h2 class="text-h2">Reading Recorder</h2>

    <nav>
      <ul class="d-flex">
        <li>
          <router-link to="/home">
            Home
          </router-link>
        </li>
        <li>
          <router-link to="/search">
            Search
          </router-link>
        </li>
        <li>
          Support
        </li>
      </ul>
    </nav>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  //
</script>
