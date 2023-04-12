<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1 >
        {{taskStore.name}}
      </h1>
    </header>
  </main>
</template>

<script>
import {useTaskStore} from "./stores/TaskStore"
  export default {
    setup() {
      const taskStore = useTaskStore()

      return {taskStore}
    }
  }
</script>

