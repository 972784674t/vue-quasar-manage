<template>
  <div class="q-py-md q-px-md text-grey-9 ">
    <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
      <template v-for="button in buttonList">
        <template v-if="button.URL">
          <router-link v-if="button.URL.indexOf('http') === -1"
                       :key="button.text"
                       :to="button.URL"
                       class="drawer-footer-link"
          >
            {{ button.text }}
          </router-link>
          <a v-else
             :key="button.text"
             :href="button.URL"
             target="_blank"
             class="drawer-footer-link"
          >
            {{ button.text }}
          </a>
        </template>
        <template v-else>
          <a
            :key="button.text"
            :href="button.URL"
            target="_blank"
            class="drawer-footer-link"
          >
            {{ button.text }}
          </a>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import _Vue from 'vue'
export default {
  name: 'BottomLink',
  data () {
    return {
      buttonList: _Vue.prototype.$buttonList
    }
  }
}
</script>
<style lang="css" scoped>
  .drawer-footer-link {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
    font-size: .75rem
  }
  .drawer-footer-link:hover{
    color: #000
  }
</style>
