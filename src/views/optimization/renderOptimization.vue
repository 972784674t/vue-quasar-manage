<template>
  <base-content>
    <div class="base-markdown-content">
      <v-md-editor :value="content" mode="preview"/>
    </div>
  </base-content>
</template>

<script>
import BaseContent from '../../components/BaseContent/BaseContent'
export default {
  name: 'renderOptimization',
  components: { BaseContent },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    getMsg () {
      const query = {
        url: this.$PUBLIC_PATH + 'data/renderOptimizationData.md',
        method: 'get',
        responseType: 'text'
      }
      this.$fetchData(query).then(res => {
        this.content = res.data
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getMsg()
  }
}
</script>
