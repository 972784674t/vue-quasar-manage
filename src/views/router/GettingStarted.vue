<template>
  <base-content>
    <skeleton-demo :show="isLoadingVisible"/>
    <div class="base-markdown-content" v-show="!isLoadingVisible">
      <v-md-editor :value="content" mode="preview"/>
    </div>
  </base-content>
</template>

<script>
import BaseContent from '../../components/BaseContent/BaseContent'
import SkeletonDemo from '../../components/Skeleton/SkeletonDemo'

export default {
  name: 'GettingStarted',
  components: { SkeletonDemo, BaseContent },
  data () {
    return {
      content: '',
      isLoadingVisible: false
    }
  },
  methods: {
    getMsg () {
      this.isLoadingVisible = !this.isLoadingVisible
      const query = {
        url: this.$PUBLIC_PATH + 'data/startData.md',
        method: 'get',
        responseType: 'text'
      }
      this.$fetchData(query).then(res => {
        this.isLoadingVisible = !this.isLoadingVisible
        this.content = res.data
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getMsg()
  }
}
</script>
