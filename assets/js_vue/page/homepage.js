var app2= new Vue({
  el: '#app',
  data: {
    users: [],
    pagging: {
      skip: 0,
      limit: 3
    }
  },
  methods: {
    infiniteHandler($state) {
      axios.get('/general/user', { params: { limit: this.pagging.limit, skip: this.pagging.skip } })
        .then((response) => {
          if(response.data.success && response.data.users.length) {
            this.users.push(...response.data.users)
            this.pagging.skip += response.data.users.length
            $state.loaded()
          } else if(response.data.success) {
            $state.complete()
          } else {
            $state.error()
          }
        })
        .catch((error) => {
          $state.error()
        })
    },
  }
})