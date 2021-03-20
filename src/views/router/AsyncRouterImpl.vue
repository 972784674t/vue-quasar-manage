<template>
  <base-content>
    <skeleton-demo :show="isLoadingVisible"/>
    <div class="base-markdown-content" v-show="!isLoadingVisible">
      <v-md-editor :value="content" mode="preview"/>
    </div>
  </base-content>
</template>

<script>
import SkeletonDemo from '../../components/Skeleton/SkeletonDemo'
import BaseContent from '../../components/BaseContent/BaseContent'

export default {
  name: 'AsyncRouterImpl',
  components: { SkeletonDemo, BaseContent },
  data () {
    return {
      content: '',
      isLoadingVisible: false
    }
  },
  methods: {
    getMsg () {
      this.isLoadingVisible = true
      const query = {
        url: this.$PUBLIC_PATH + 'data/asyncRouterData.md',
        method: 'get',
        responseType: 'text'
      }
      this.$fetchData(query).then(res => {
        this.isLoadingVisible = false
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
