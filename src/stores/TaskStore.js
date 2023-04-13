import { defineStore } from "pinia";

// define store function let us make a store

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [
            {id: 1, title: "buy some milk", isFav: false},
            {id: 2, title: "play Gloomhaven", isFav: true},
        ],
        name: 'Ada'
    }),
    getters: {
        favs() {
            return this.tasks.filter(task => task.isFav)
        }
    }
})