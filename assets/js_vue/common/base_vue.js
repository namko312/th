Vue.filter('admin_description', function(value) {
  if (value.length > 30) {
    return value.substring(0, 30) + '...';
  } else {
    return value
  }
})
Vue.filter('dateformat', function(value) {
  if (value) {
    var dateTime = parseInt(value)
    if(dateTime) {
      var now = moment(dateTime)
      if(now.isValid()) {
        return now.format("DD-MM-YYYY")
      } else {
        return 'Invalid'
      }
    } else {
      return 'Invalid'
    }

  } else {
    return value
  }
})
