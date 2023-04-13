import { defineStore } from "pinia";

// define store function let us make a store

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        // tasks: [
        //     {id: 1, title: "buy some milk", isFav: false},
        //     {id: 2, title: "play Gloomhaven", isFav: true},
        //     {id: 3, title: "buy cheese", isFav: true},
        // ],
        tasks:[],
        name: 'Ada'
    }),
    getters: {
        favs() {
            return this.tasks.filter(task => task.isFav)
        },
        favCount() {
            return this.tasks.reduce((prev, current)=> {
                return current.isFav ? prev + 1 : prev
            }, 0)
        },
        totalCount: (state) => {
            return state.tasks.length
        }
    },
    actions: {
        async getTasks() {
            const res = await fetch(' http://localhost:3000/tasks')
            const data = await res.json()

            this.tasks = data
        },
        addTask(task) {
            this.tasks.push(task)
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(task => {
                return task.id !== id
            })
        },
        toggleFav(id) {
            const task = this.tasks.find(task => task.id === id)
            task.isFav = !task.isFav
        }
    }
})