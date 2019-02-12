var app2= new Vue({
  el: '#app-edit',
  components: {
    vuejsDatepicker
  },
  data: {
    user: null,
    rootUser: null,
    config: {
      logo_default: '/images/logo_default.png',
      favicon_default: '/images/favicon_default.png',
      cover_default: '/images/cover_default.png'
    },
    show: {
      loading: false
    }
  },
  created: function() {
    this.getUserInfo()
  },
  computed: {
    outdate: {
      get: function () {
        return new Date(parseInt(this.user.outdate))
      },
      set: function (newValue) {
        this.user.outdate = newValue.getTime()
      }}
  },
  methods: {
    getUserInfo: function () {
      var id = new URL(location.href).searchParams.get('id')
      if(!id) window.location = '/admin/manager/user'
      this.show.loading = true
      axios.get('/user/' + id)
        .then((response) => {
          this.show.loading = false
          if(response.data) {
            console.log(response.data)
            this.user = response.data
            this.rootUser = _.clone(this.user)
          }
        })
        .catch((error) => {
          this.show.loading = false
          window.location = '/admin/manager/user'
        })
    },
    updatePreview: function () {
      if(!this.user.f_html) {
        return alert('Nội dung đang trống')
      }
      var body = this.user
      this.show.loading = true
      axios.put('/api/admin/user/updatePreview', body)
        .then((response) => {
          this.show.loading = false
          if(response.data.success) {
            var win = window.open('/preview/' + this.user.id, '_blank');
            win.focus();
          } else {
            alert(JSON.stringify(response.data.message))
          }
        })
        .catch((error) => {
          this.show.loading = false
          alert(JSON.stringify(error))
        });
    },
    saveProfile: function () {
      if(this.user.f_favicon != this.rootUser.f_favicon) {
        this.user.f_favicon_upload = true
      }
      if(this.user.f_logo != this.rootUser.f_logo) {
        this.user.f_logo_upload = true
      }
      if(this.user.f_cover != this.rootUser.f_cover) {
        this.user.f_cover_upload = true
      }
      var user = _.omit(this.user, 'f_preview')
      this.show.loading = true
      axios.put('/api/admin/user/', user)
        .then((response) => {
          this.show.loading = false
          if(response.data.success) {
            utils.confirm({title:'Cập nhật thành công',msg:'Bạn có muốn đóng tab này lại?', okText:'Có', cancelText:'Không', callback:()=>{
              window.close()
            }})
          } else {
            alert(JSON.stringify(response.data.message))
          }

        })
        .catch((error) => {
          this.show.loading = false
          alert(JSON.stringify(error))
        });
    },
    checkIsActiveDate: function(time) {
      time = parseInt(time)
      if(new Date().getTime() < time)
        return true
      else return false
    }
  },
})