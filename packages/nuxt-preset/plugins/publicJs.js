/**
 * publicJs
 * @author  Yee
 * @date    2020/6/11
 * @desc
 */
if (process.client) {
  ;(function() {
    const js = document.createElement('script')
    js.src = process.env.PUBLIC_JS
    const s = document.getElementsByTagName('body')[0]
    s.appendChild(js)
  })()
}
