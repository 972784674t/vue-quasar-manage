<template>
  <div class="" style="margin: 10px;height: calc(100vh - 105px);">
    <v-md-editor v-model="content" height="100%"></v-md-editor>
  </div>
</template>

<script>

export default {
  name: 'markdown',
  data () {
    return {
      content: ''
    }
  },
  methods: {
    getMsg () {
      const query = {
        url: this.$PUBLIC_PATH + 'data/markdownData.md',
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
