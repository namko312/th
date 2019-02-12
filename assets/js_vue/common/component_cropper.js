Vue.component('cropper', {
  data: function () {
    return {
      id: 'cropper-' + new Date().getTime(),
      show: {
        modal: false
      },
      cropper: null,
      fileSrc: null
    }
  },
  props: ['src', 'imagewidth', 'imageheight', 'fontsize', 'maxwidthheight' ,'ratio', 'freeratio'],
  mounted: function() {
    document.getElementById(`${this.id}-input`).addEventListener('change', (e) => {
      var files = e.target.files;
      if (files && files.length > 0) {
        this.show.modal = true
        file = files[0]
        var reader  = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener("load", () => {
          var image = document.getElementById(`${this.id}-imgfile`)
          image.onload = () => {
            var canvas = document.querySelector(`#${this.id}-canvas`)
            canvas.height = canvas.width * (image.height / image.width)
            if(canvas.height > canvas.width) {
              canvas.height = this.maxwidthheight
              canvas.width = canvas.height * (image.width / image.height)
            }
            var ctx = canvas.getContext("2d")
            ctx.drawImage(image,0,0,image.width,image.height,0,0,canvas.width,canvas.height)
            var opsuon = {
              zoomable: false,
              viewMode: 1,
              autoCropArea: 0.5,
              aspectRatio: parseFloat(this.ratio) ? parseFloat(this.ratio) : 1,
              ready: () => {

              }
            }
            if(this.freeratio) {
              opsuon.aspectRatio = null
            }
            this.cropper = new Cropper(canvas, opsuon);
          }
          this.fileSrc = reader.result
        }, false)
      }
    })
  },
  methods: {
    chooseFile: function () {
      $(`#${this.id}-input`).click()
    },
    cancel: function () {
      this.show.modal = false
      $(`#${this.id} form`).submit(() => { return false })
      $(`#${this.id} form`).get(0).reset()
      this.fileSrc = null
      this.cropper = null
    },
    crop: function () {
      this.src = this.cropper.getCroppedCanvas().toDataURL()
      this.$emit('input', this.src)
      this.cancel()
    }
  },
  template: `
<div :id="this.id">
    <div class="vcropper-wrap" :style="{width: imagewidth,height:imageheight}">
        <img class="vcropper-img"  :src="src" />
        <div class="vcropper-camera-wrap" @click="chooseFile()">
            <i class="fa fa-camera-retro" :style="{fontSize: fontsize}"></i>
        </div>
    </div>
    <form>
        <input :id="this.id + '-input'" type="file" name="image" accept="image/*" hidden>
    </form>
    <div class="vmodal-wrap" v-if="show.modal">
        <div class="vmodal-body">
            <img :id="id + '-imgfile'" :src="fileSrc" class="d-none">
            <div style="overflow: auto; max-width: 90vw; max-height: 80vh">
                <canvas :id="id + '-canvas'" :width="maxwidthheight"></canvas>
            </div>
            <div class="pull-right mt-2">
                <button class="btn btn-success" @click="crop()">Xong</button>
                <button class="btn btn-secondary" @click="cancel()">Huỷ</button>
            </div>
        </div>
    </div>
</div>
  `
})