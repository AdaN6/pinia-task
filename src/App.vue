<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1 >
        {{taskStore.name}}
      </h1>
    </header>

    <!-- filter -->

    <nav class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'favs'">Favourite Tasks</button>
    </nav>

    <!-- Task List -->
    <div class="task-list" v-if="filter === 'all'">
      <p>all task</p>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task"/>
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>favourite task</p>
      <div v-for="task in taskStore.favs">
        <TaskDetails :task="task"/>
      </div>
    </div>

  </main>
</template>

<script>
import { ref } from 'vue'
import TaskDetails from "./components/TaskDetails.vue"
import {useTaskStore} from "./stores/TaskStore"
export default {
  components:{ TaskDetails},
    setup() {
      const taskStore = useTaskStore()

      const filter = ref('all')

      return {taskStore, filter}
    }
  }
</script>

