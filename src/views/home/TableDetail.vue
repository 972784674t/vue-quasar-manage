<template>
  <base-content>
    <h5>{{ msg }}</h5>
  </base-content>
</template>

<script>
import BaseContent from '../../components/BaseContent/BaseContent'

export default {
  name: 'TableDetail',
  components: { BaseContent },
  data () {
    return {
      msg: ''
    }
  },
  created () {
    this.msg = this.$route.query
  }
}
</script>
