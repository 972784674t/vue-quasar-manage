<template>
    <base-content>
        <div class="row base-card-shadow" style="margin: 8px;background-color: white">
          <div class="col-md-4 col-sm-4 col-xs-12" style="border-right: 1px solid rgba(0,0,0,0.12)">
              <div class="flex justify-between align-center items-center" style="font-size: 1.32rem;margin: 15px;">
                <span class="text-weight-bold">基础路由</span>
                <q-btn color="primary" icon="add" label="新增角色" />
              </div>
              <q-separator/>
              <div style="margin: 0 0 0 20px">
                <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
                <q-tree
                  :nodes="baseRouter.baseR"
                  node-key="name"
                  default-expand-all
                  :selected="baseRouter.selected"
                >
                  <template v-slot:default-header="prop" >
                    <q-checkbox v-model="rolesSelect" :val="prop.node.name"/>
                    <div class="row items-center" style="width: 100%">
                      <q-icon :name="prop.node.meta.icon || 'share'" class="q-mr-sm" />
                      <div >{{ prop.node.meta.title }}</div>
                    </div>
                  </template>
                </q-tree>
                </q-scroll-area>
              </div>
          </div>
          <div class="col-md-4 col-sm-4 col-xs-12">
            <div class="flex justify-between align-center items-center" style="font-size: 1.32rem;margin: 15px;height: 36px">
              <span class="text-weight-bold">角色路由</span>
              <div>
              <q-btn outline color="primary" icon="add" label="保存角色" style="margin-right: 20px"/>
              <q-btn dense outline round color="primary" icon="replay" @click="handleReset" />
              </div>
            </div>
            <q-separator/>
            <div style="margin: 0 0 0 20px;">
              <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
                <q-tree
                  :nodes="rolesRouter.baseR"
                  node-key="name"
                  default-expand-all
                  :selected="rolesRouter.selected"
                  no-nodes-label="未选择任何路由"
                >
                  <template v-slot:default-header="prop" >
                    <q-checkbox v-model="rolesSelect" :val="prop.node.name"/>
                    <div class="row items-center" style="width: 100%" @click.prevent="handleSelect(prop.node)">
                      <q-icon :name="prop.node.meta.icon || 'share'" class="q-mr-sm" />
                      <div >{{ prop.node.meta.title }}</div>
                    </div>
                  </template>
                </q-tree>
              </q-scroll-area>
            </div>
          </div>
          <div class="col" style="border-left: 1px solid rgba(0,0,0,0.12)">
            <div class="flex justify-between align-center items-center" style="font-size: 1.32rem;margin: 15px;height: 36px">
              <span class="text-weight-bold">配置：{{rolesRouter.selected.title}}</span>
            </div>
            <q-separator/>
            <div style="margin: 20px">
              <div class="q-gutter-sm">
                <q-input v-model="rolesRouter.selected.title" label="路由标题" />
                <q-input v-model="rolesRouter.selected.icon" label="路由图标" />
                <q-checkbox v-model="rolesRouter.selected.isHidden" label="是否隐藏" color="teal" />
                <q-checkbox v-model="rolesRouter.selected.isOpen" label="是否展开" color="orange" />
                <q-checkbox v-model="rolesRouter.selected.keepAlive" label="是否缓存" color="red" />
                <q-input v-model="rolesRouter.selected.itemLabel" label="分组名称（如果需要）" />
              </div>
            </div>
            <q-separator/>
            <div class="flex justify-between align-center items-center" style="font-size: 1.32rem;margin: 15px;height: 36px">
              <span class="text-weight-bold">角色路由数据结构</span>
            </div>
            <div style="margin: 15px">
              <q-input
                v-model="rolesRouterData"
                outlined
                type="textarea"
                style="height: 100%"
              />
            </div>
          </div >
        </div>

    </base-content>
</template>

<script>
import { thumbStyleOfMenu } from '../../components/BaseContent/ThumbStyle'
import BaseContent from '../../components/BaseContent/BaseContent'
// eslint-disable-next-line no-unused-vars
import { asyncRoutesChildren } from '../../router/asyncRoutes'
import deepClone from '../../utils/CloneUtils'
import { getUserRouter } from '../../api/UserApi'
// eslint-disable-next-line no-unused-vars
import { handleAsyncRouterToJson, handleBaseRouterToRolesRouter } from '../../router/permissionUtils'

export default {
  name: 'AsyncRouter',
  components: { BaseContent },
  data () {
    return {
      thumbStyleOfMenu,
      rolesSelect: [],
      roles: '',
      // 基础路由数据
      baseRouter: {
        baseR: [],
        selected: [],
        ticked: []
      },
      // 角色路由数据
      rolesRouter: {
        baseR: [],
        selected: [],
        ticked: []
      },
      rolesRouterData: ''
    }
  },
  mounted () {
    this.getUserR()
    // 在控制台输出当前 asyncRoutes 转 json 的结果
    // handleAsyncRouterToJson(deepClone(asyncRoutesChildren)).then(res => {
    //   console.log(JSON.stringify(res))
    // })
  },
  watch: {
    rolesSelect (n, o) {
      // 每次选项改变时，都更新一次 RolesRouter
      this.rolesRouter.baseR = handleBaseRouterToRolesRouter(deepClone(this.baseRouter.baseR), n)
      // 显示 RolesRouter 的数据
      this.rolesRouterData = JSON.stringify(this.rolesRouter.baseR)
    },
    'rolesRouter.baseR': {
      handler (n) {
        // 每次 RolesRouter 的数据改变就改变文本框中的值
        this.rolesRouter.baseR = n
        this.rolesRouterData = JSON.stringify(this.rolesRouter.baseR)
      },
      deep: true
    }
  },
  methods: {
    /**
     * 模拟从后端请求权限路由
     */
    getUserR () {
      getUserRouter().then(res => {
        this.baseRouter.baseR = res.data
      }).catch(error => {
        console.log(error)
      })
    },
    handleSelect (e) {
      this.rolesRouter.selected = e.meta
    },
    handleReset () {
      this.rolesRouter = {
        baseR: [],
        selected: [],
        ticked: []
      }
    }
  }
}
</script>
