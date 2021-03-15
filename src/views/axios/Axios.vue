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
  name: 'Axios',
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
        url: this.$PUBLIC_PATH + 'data/axiosData.md',
        method: 'get',
        responseType: 'text'
      }
      this.$fetchData(query).then(res => {
        this.content = res.data
        this.isLoadingVisible = !this.isLoadingVisible
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
