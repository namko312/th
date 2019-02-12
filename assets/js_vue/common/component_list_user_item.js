var VueMasonryPlugin = window["vue-masonry-plugin"].VueMasonryPlugin
Vue.use(VueMasonryPlugin)
Vue.component('listUserItem', {
  data: function () {
    return {
      id: 'listUserItem-' + new Date().getTime(),
    }
  },
  methods: {
    getHeight: function (text) {
      text = $(text).text()
      var line = Math.floor(text.length / 50)
      var height = line * 36
      if(height < 200) height = 300
      else if(height > 600) height = 600
      return {
        height: height + 'px'
      }
    }
  },
  props: ['users'],
  components: {
    VueMasonryPlugin: window["vue-masonry-plugin"].VueMasonryPlugin
  },
  template: `
    <div class="m-auto" v-masonry  fit-width="true" transition-duration="0s" item-selector=".grid-item-for-user">
        <a v-masonry-tile class="grid-item-for-user" v-for="user in users" :href="'/shop/' + user.username" :style="getHeight(user.f_description)">
            <div class="position-relative">
                <img class="img-fluid" :src="user.f_cover ? user.f_cover : '/images/cover_default.png'">
                 <h5 class="position-absolute m-0 p-0" style="bottom: 0; left: 0;">
                    <span v-if="user.type == 'producer'" class="d-block badge btn-gradient-v2">Nhà sản xuất</span>
                    <span v-if="user.type == 'business'" class="d-block badge btn-gradient-v1">Nhà bán buôn</span>
                 </h5>
            </div>
            <div class="container-fluid">
              <div class="row mt-1">
                 <div class="col-3">
                     <img class="img-fluid img-circle" :src="user.f_logo ? user.f_logo : '/images/logo_default.png'">
                 </div>
                 <div class="col-9">
                     <div class="d-flex align-items-center" style="height: 100%">
                         <h6>{{user.f_title}}</h6>
                     </div>
                 </div>
              </div>
            </div>
            <div class="m-auto" style="padding: 10px">
                <div class="grid-description" v-html="user.f_description"></div>
            </div>
        </a>
    </div>
  `
})