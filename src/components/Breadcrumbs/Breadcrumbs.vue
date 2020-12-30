<template>
  <div class="flex">
  <q-breadcrumbs style="transform: translateX(10px);display: inline-block;" active-color="none">
    <transition-group name="breadcrumb">
    <template v-for="(v,i) in breadcrumbs">
     <q-breadcrumbs-el v-if="v.title" style="line-height: 20px;margin-top: 6px;"
       :label="v.title"
       :icon="v.icon"
       :key="i+v.title">
         <div v-if="breadcrumbs.length !== i+1" style="margin:0px 8px 0px 8px">
           /
         </div>
     </q-breadcrumbs-el>
    </template>
    </transition-group>
  </q-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  data () {
    return {
      breadcrumbs: []
    }
  },
  mounted () {
    this.breadcrumbs = this.$store.getters.getBreadcrumbs
  },
  computed: {
    getBreadcrumbs () {
      return this.$store.getters.getBreadcrumbs
    }
  },
  watch: {
    getBreadcrumbs (newVal, oldVal) {
      this.breadcrumbs = newVal
    }
  }
}
</script>
