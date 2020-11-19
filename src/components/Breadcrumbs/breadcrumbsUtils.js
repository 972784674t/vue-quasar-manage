import store from '../../store/index'

/**
 * 获取 matched 中的路径 title，并生成面包屑
 * @param matched to.matched[]
 */
export function setBreadcrumbs (matched) {
  const temp = []
  for (let i = 0; i < matched.length; i++) {
    temp.push(matched[i].meta)
  }
  store.commit('SET_BREADCRUMBS', temp)
}
