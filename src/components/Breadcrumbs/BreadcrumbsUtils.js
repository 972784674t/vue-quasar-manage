import store from '../../store/index'
import deepClone, { getFirst } from '../../utils/CloneUtils'

/**
 * 获取 matched 中的路径 title，并生成面包屑
 * @param matched to.matched[]
 * @param query 参数
 */
export function setBreadcrumbs (matched, query) {
  const temp = []
  for (let i = 0; i < matched.length; i++) {
    temp.push(deepClone(matched[i].meta))
  }
  const last = temp.length - 1
  // 如果有 query 则取第一个参数附加在 title 上
  Object.keys(query).length && (temp[last].title += '：' + getFirst(query))
  store.commit('SET_BREADCRUMBS', temp)
}
