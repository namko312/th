Vue.component('loading', {
  data: function () {
    return {
      style_div1: {},
      style_div2: {},
      style_div3: {}
    }
  },
  props: ['fixed', "show"],
  created: function() {
    this.style_div1 = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(256, 256, 256, 0.8)',
      'z-index': 9999999
    }
    if(this.fixed) {
      this.style_div1.position = 'fixed'
    }
    this.style_div2 = {
      height: '100%',
      display: 'flex',
      'align-items': 'center'
    }
    this.style_div3 = {
      margin: 'auto'
    }

  },
  methods: {

  },
  template: `
<div v-if="show" :style="style_div1">
    <div :style="style_div2">
        <svg width="80px"  height="80px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-blank" :style="style_div3">
          <circle cx="50" cy="50" fill="none" r="46" stroke="#e15b64" stroke-width="5">
            <animate attributeName="stroke-dasharray" calcMode="linear" values="0 0 0 144.51326206513048 0 144.51326206513048;0 0 144.51326206513048 0 0 144.51326206513048;0 0 144.51326206513048 0 0 144.51326206513048;0 144.51326206513048 0 144.51326206513048 0 144.51326206513048;0 144.51326206513048 0 144.51326206513048 0 144.51326206513048" keyTimes="0;0.2;0.4;0.6;1" dur="1.3" begin="-1.3s" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="50" cy="50" fill="none" r="40" stroke="#f8b26a" stroke-width="5">
            <animate attributeName="stroke-dasharray" calcMode="linear" values="0 0 0 125.66370614359172 0 125.66370614359172;0 0 125.66370614359172 0 0 125.66370614359172;0 0 125.66370614359172 0 0 125.66370614359172;0 125.66370614359172 0 125.66370614359172 0 125.66370614359172;0 125.66370614359172 0 125.66370614359172 0 125.66370614359172" keyTimes="0;0.2;0.4;0.6;1" dur="1.3" begin="-1.196s" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="50" cy="50" fill="none" stroke="#abbd81" stroke-width="5">
            <animate attributeName="stroke-dasharray" calcMode="linear" values="0 0 0 106.81415022205297 0 106.81415022205297;0 0 106.81415022205297 0 0 106.81415022205297;0 0 106.81415022205297 0 0 106.81415022205297;0 106.81415022205297 0 106.81415022205297 0 106.81415022205297;0 106.81415022205297 0 106.81415022205297 0 106.81415022205297" keyTimes="0;0.2;0.4;0.6;1" dur="1.3" begin="-1.092s" repeatCount="indefinite"></animate>
          </circle>
          <g transform="rotate(180 50 50)">
            <circle cx="50" cy="50" fill="none" r="46" stroke="#e15b64" stroke-width="5">
              <animate attributeName="stroke-dasharray" calcMode="linear" values="0 0 0 144.51326206513048 0 144.51326206513048;0 0 144.51326206513048 0 0 144.51326206513048;0 0 144.51326206513048 0 0 144.51326206513048;0 144.51326206513048 0 144.51326206513048 0 144.51326206513048;0 144.51326206513048 0 144.51326206513048 0 144.51326206513048" keyTimes="0;0.2;0.4;0.6;1" dur="1.3" begin="-0.572s" repeatCount="indefinite"></animate>
            </circle>
            <circle cx="50" cy="50" fill="none" r="40" stroke="#f8b26a" stroke-width="5">
              <animate attributeName="stroke-dasharray" calcMode="linear" values="0 0 0 125.66370614359172 0 125.66370614359172;0 0 125.66370614359172 0 0 125.66370614359172;0 0 125.66370614359172 0 0 125.66370614359172;0 125.66370614359172 0 125.66370614359172 0 125.66370614359172;0 125.66370614359172 0 125.66370614359172 0 125.66370614359172" keyTimes="0;0.2;0.4;0.6;1" dur="1.3" begin="-0.676s" repeatCount="indefinite"></animate>
            </circle>
            <circle cx="50" cy="50" fill="none" stroke="#abbd81" stroke-width="5">
              <animate attributeName="stroke-dasharray" calcMode="linear" values="0 0 0 106.81415022205297 0 106.81415022205297;0 0 106.81415022205297 0 0 106.81415022205297;0 0 106.81415022205297 0 0 106.81415022205297;0 106.81415022205297 0 106.81415022205297 0 106.81415022205297;0 106.81415022205297 0 106.81415022205297 0 106.81415022205297" keyTimes="0;0.2;0.4;0.6;1" dur="1.3" begin="-0.8320000000000001s" repeatCount="indefinite"></animate>
            </circle>
          </g>
        </svg>
    </div>
</div>
  `
})