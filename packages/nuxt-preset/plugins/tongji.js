/**
 * tongji
 * @author  Yee
 * @date    2020/6/10
 * @desc
 */
if (process.client && process.env.NODE_ENV === 'production') {
  const _hmt = _hmt || []
  ;(function() {
    const hm = document.createElement('script')
    // hm.src = 'https://hm.baidu.com/hm.js?[你的唯一标识，此处以片段为例]'
    hm.id = 'baidu_tj'
    const s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })()
}

export default ({ app: { router }, store }) => {
  router.afterEach((to, from) => {
    if (process.client && process.env.NODE_ENV === 'production') {
      const _hmt = _hmt || []
      ;(function() {
        document.getElementById('baidu_tj') &&
          document.getElementById('baidu_tj').remove()
        const hm = document.createElement('script')
        //   hm.src = 'https://hm.baidu.com/hm.js?[你的唯一标识，此处以片段为例]'
        // hm.src = 'https://hm.baidu.com/hm.js?61fb58293814d42803e9ef530137a8c0'
        hm.id = 'baidu_tj'
        const s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
      })()
    }
  })
}
