var colorList = [{
  type: 'linear',
  x: 0,
  y: 0,
  x2: 1,
  y2: 1,
  colorStops: [{
    offset: 0,
    color: 'rgba(51,192,205,0.01)' // 0% 处的颜色
  },
  {
    offset: 1,
    color: 'rgba(51,192,205,0.57)' // 100% 处的颜色
  }
  ],
  globalCoord: false // 缺省为 false
},
{
  type: 'linear',
  x: 1,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [{
    offset: 0,
    color: 'rgba(115,172,255,0.02)' // 0% 处的颜色
  },
  {
    offset: 1,
    color: 'rgba(115,172,255,0.67)' // 100% 处的颜色
  }
  ],
  globalCoord: false // 缺省为 false
},
{
  type: 'linear',
  x: 1,
  y: 0,
  x2: 0,
  y2: 0,
  colorStops: [{
    offset: 0,
    color: 'rgba(158,135,255,0.02)' // 0% 处的颜色
  },
  {
    offset: 1,
    color: 'rgba(158,135,255,0.57)' // 100% 处的颜色
  }
  ],
  globalCoord: false // 缺省为 false
},
{
  type: 'linear',
  x: 0,
  y: 1,
  x2: 0,
  y2: 0,
  colorStops: [{
    offset: 0,
    color: 'rgba(252,75,75,0.01)' // 0% 处的颜色
  },
  {
    offset: 1,
    color: 'rgba(252,75,75,0.57)' // 100% 处的颜色
  }
  ],
  globalCoord: false // 缺省为 false
},
{
  type: 'linear',
  x: 1,
  y: 1,
  x2: 1,
  y2: 0,
  colorStops: [{
    offset: 0,
    color: 'rgba(253,138,106,0.01)' // 0% 处的颜色
  },
  {
    offset: 1,
    color: '#FDB36ac2' // 100% 处的颜色
  }
  ],
  globalCoord: false // 缺省为 false
},
{
  type: 'linear',
  x: 0,
  y: 0,
  x2: 1,
  y2: 0,
  colorStops: [{
    offset: 0,
    color: 'rgba(254,206,67,0.12)' // 0% 处的颜色
  },
  {
    offset: 1,
    color: '#FECE4391' // 100% 处的颜色
  }
  ],
  globalCoord: false // 缺省为 false
}
]
var colorLine = ['#33C0CD', '#73ACFF', '#9E87FF', '#FE6969', '#FDB36A', '#FECE43']

function getRich () {
  const result = {}
  colorLine.forEach((v, i) => {
    result[`hr${i}`] = {
      backgroundColor: colorLine[i],
      borderRadius: 3,
      width: 3,
      height: 3,
      padding: [3, 3, 0, -12]
    }
    result[`a${i}`] = {
      padding: [8, -60, -20, -20],
      color: colorLine[i],
      fontSize: 12
    }
  })
  return result
}
const data = [{
  name: '北京',
  value: 25
}, {
  name: '上海',
  value: 20
}, {
  name: '广州',
  value: 18
}, {
  name: '深圳',
  value: 15
}, {
  name: '未知',
  value: 13
}, {
  name: '海外',
  value: 9
}].sort((a, b) => {
  return b.value - a.value
})
data.forEach((v, i) => {
  v.labelLine = {
    lineStyle: {
      width: 1,
      color: colorLine[i]
    }
  }
})
const option = {
  series: [{
    type: 'pie',
    radius: '60%',
    center: ['50%', '50%'],
    clockwise: true,
    avoidLabelOverlap: true,
    label: {
      show: true,
      position: 'outside',
      formatter: function (params) {
        const name = params.name
        const percent = params.percent + '%'
        const index = params.dataIndex
        return [`{a${index}|${name}：${percent}}`, `{hr${index}|}`].join('\n')
      },
      rich: getRich()
    },
    itemStyle: {
      normal: {
        color: function (params) {
          return colorList[params.dataIndex]
        }
      }
    },
    data,
    roseType: 'radius'
  }]
}

export default option
