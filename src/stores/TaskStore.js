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
        name: 'Ada',
        isLoading: false,
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
            this.isLoading = true
            const res = await fetch(' http://localhost:3000/tasks')
            const data = await res.json()

            this.tasks = data
            this.isLoading = false
        },
        async addTask(task) {
            this.tasks.push(task)

            const res = await fetch('http://localhost:3000/tasks', 
                {
                    method: 'POST',
                    body: JSON.stringify(task),
                    headers: {'Content-Type': 'application/json'}
                })

                if (res.error) {
                    console.log(res.error)
                }
        },
        async deleteTask(id) {
            this.tasks = this.tasks.filter(task => {
                return task.id !== id
            })

            const res = await fetch('http://localhost:3000/tasks/' + id, 
                {
                    method: 'DELETE',
                })

                if (res.error) {
                    console.log(res.error)
                }
        },
        async toggleFav(id) {
            const task = this.tasks.find(task => task.id === id)
            task.isFav = !task.isFav

            const res = await fetch('http://localhost:3000/tasks/' + id, 
                {
                    method: 'PATCH',
                    body: JSON.stringify({isFav: task.isFav}),
                    headers: {'Content-Type': 'application/json'}
                })

                if (res.error) {
                    console.log(res.error)
                }
        }
    }
})