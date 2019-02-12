var app2= new Vue({
  el: '#app',
  data: {
    show: {
      modalCreateUser: false,
      buttonCreateUser: true
    },
    newUser: {
      username: null,
      password: null,
      adminDescription: '',
      notNeedCheck: '0',
      type: 'producer'
    },
    IDload: new Date().getTime(),
    listUser: [],
    count: 0,
    pagging: {
      limit: 10,
      skip: 0,
      search: {
        username: '',
        filter: null
      }
    },
    filter: {
      all: true,
      active:false,
      choxetduyet: false,
      khongxetduyet: false,
      expired: false
    }
  },
  watch: {
    'pagging.search.username': function(newVal, oldVal) {
      this.reload()
    }
  },
  methods: {
    reload: function() {
      this.listUser = []
      this.count = 0
      this.pagging.skip = 0
      this.IDload = new Date().getTime()
    },
    openModalCreateUser: function() {
      this.show.modalCreateUser = true
      this.show.buttonCreareUser = true
      this.newUser = {
        username: null,
        password: null,
        adminDescription: '',
        notNeedCheck: '0',
        type: 'producer'
      }
    },
    saveNewUser: function () {
      if(!this.newUser_username_dirty || !this.newUser_password_dirty ) return alert('Vui lòng nhập đầy đủ các trường')
      if(!this.newUser_username_valid || !this.newUser_password_valid ) return alert('Vui lòng nhập lại các trường')
      var body = {
        username: this.newUser.username,
        password: this.newUser.password,
        adminDescription: this.newUser.adminDescription,
      }
      if(this.newUser.notNeedCheck == '1') {body.notNeedCheck = true}
      this.show.buttonCreateUser = false
      axios.post('/api/admin/user', body)
        .then((response) => {
          this.show.buttonCreateUser = true
          if(!response.data.success) {
            return alert('Lỗi : ' + response.data.message)
          } else {
            this.show.modalCreateUser = false
            this.IDload = new Date().getTime()
            return alert('Tạo mới User thành công')
          }
        })
        .catch((error) => {
          this.show.buttonCreateUser = true
          console.log(error)
        });
    },
    checkIsActiveDate: function(time) {
      time = parseInt(time)
      if(new Date().getTime() < time)
        return true
      else return false
    },
    infiniteHandler($state) {
      this.pagging.search.filter = this.filter
      var params = this.pagging
      axios.get('/api/admin/user', { params: params })
        .then((response) => {
          if(response.data.success && response.data.users.length) {
            this.listUser.push(...response.data.users)
            this.count = response.data.count
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
    runFilter: function (name) {
      if(name == 'active' || name == 'all') {
        if(this.filter[name]) return
        this.filter.all = false
        this.filter.active = false
        this.filter.choxetduyet = false
        this.filter.khongxetduyet = false
        this.filter.expired = false
        this.filter[name] = true
      } else {
        this.filter.all = false
        this.filter.active = false
        this.filter[name] = !this.filter[name]
        if(!this.filter[name]) {
          if(!this.filter.expired && !this.filter.khongxetduyet && !this.filter.choxetduyet) {
            this.filter.all = true
          }
        }
      }

      //SEARCH
      this.listUser = []
      this.count = 0
      this.pagging.skip = 0
      this.IDload = new Date().getTime()
    }
  },
  computed: {
    newUser_username_valid: function () {
      var regrex = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
      return this.newUser.username.match(regrex) ? true : false
    },
    newUser_username_dirty: function () {
      if(this.newUser.username === null) return false
      else return true
    },
    newUser_password_valid: function () {
      var regrex = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
      return this.newUser.password.match(regrex) ? true : false
    },
    newUser_password_dirty: function () {
      if(this.newUser.password === null) return false
      else return true
    }
  }
})