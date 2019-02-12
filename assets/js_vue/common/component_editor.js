Vue.component('editor', {
  data: function () {
    return {
      id: 'editor-' + new Date().getTime(),
      option: null
    }
  },
  props: ['content', 'viewhtml', 'uidupload', 'for', 'onlytext'],
  mounted: function() {
    this.option = {
      svgPath: '/fonts/trumbowyg.svg',
      btnsDef: {
        image: {
          dropdown: ['insertImage', 'upload'],
          ico: 'insertImage'
        }
      },
      btns: [
        ['undo', 'redo'],
        ['formatting'],
        ['fontfamily'],
        ['fontsize'],
        ['strong', 'em', 'del'],
        ['foreColor', 'backColor'],
        ['link'],
        ['image'],
        ['emoji'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
        ['unorderedList', 'orderedList'],
        ['horizontalRule'],
        ['removeformat'],
        ['table'],
        ['fullscreen']
      ],
      plugins: {

        upload: {
          serverPath: this.for == 'admin' ? '/api/admin/user/upload/image' : '/api/me/upload/image',
          fileFieldName: 'image',
          headers: {
            uid: this.uidupload
          },
          urlPropertyName: 'data.link'
        }
      }

    }
    if(this.viewhtml) {
      this.option.btns.unshift(['viewHTML'])
    }
    if(this.onlytext) {
      this.option = {
        svgPath: '/fonts/trumbowyg.svg',
        btns: [
          ['emoji'],
          ['removeformat']
        ]
      }
    }
    $('#' + this.id).trumbowyg(this.option)

    $('#' + this.id).trumbowyg().on('tbwinit', () => {
      $('#' + this.id).trumbowyg('html', this.content)
    })
    $('#' + this.id).trumbowyg().on('tbwchange', () => {
      this.updateContent($('#' + this.id).trumbowyg('html'))
    })
  },
  methods: {
    updateContent: function (value) {
      this.$emit('input', value)
    }
  },
  template: `
    <textarea :id="id"></textarea>
  `
})