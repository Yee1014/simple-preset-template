/**
 * axios
 * @author  Yee
 * @date    2020/6/10
 * @desc    自定义请求
 */
export default function({ $axios, redirect }, inject) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $axios.onResponse((response) => {
    console.log('response ', response)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })

  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  })

  // Set baseURL to something different
  // Change URL only for client
  if (process.client) {
    api.setBaseURL('')
  }

  // Change URL only for server
  if (process.server) {
    api.setBaseURL('')
  }

  // Inject to context as $api
  inject('api', api)
}
