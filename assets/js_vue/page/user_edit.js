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
  methods: {
    getUserInfo: function () {
      axios.get('/user/me')
        .then((response) => {
          this.show.loading = false
          if(response.data) {
            console.log(response.data)
            this.user = response.data.user
            this.rootUser = _.clone(this.user)
          }
        })
        .catch((error) => {
          this.show.loading = false
          window.location = '/dashboard'
        })
    },
    updatePreview: function () {
      if(!this.user.f_html) {
        return alert('Nội dung đang trống')
      }
      var body = this.user
      this.show.loading = true
      axios.put('/api/me/user/updatePreview', body)
        .then((response) => {
          this.show.loading = false
          if(response.data.success) {
            var win = window.open('/preview/me', '_blank');
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
      utils.confirm({title:'Chú ý',
        msg:'Khi bạn cập nhật, website của bạn sẽ không còn hiển thị với bất kì ai' +
          ' cho đến khi chúng tôi xác nhận nội dung bạn cập nhật là hợp lệ. Bạn có chắc chắn muốn cập nhật không?',
        okText:'Có', cancelText:'Không', callback:()=>{
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
          axios.put('/api/me/user', user)
            .then((response) => {
              this.show.loading = false
              if(response.data.success) {
                alert('Cập nhật thành công')
                window.location = '/dashboard'
              } else {
                alert(JSON.stringify(response.data.message))
              }

            })
            .catch((error) => {
              this.show.loading = false
              alert(JSON.stringify(error))
            });
        }})

    }
  },
})