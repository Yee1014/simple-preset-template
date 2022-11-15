/**
 * useMapAction
 * @author  Yee
 * @date    2020/5/18
 * @desc
 */
import { useStore } from '../plugins/store'

function useMapAction (functions = []) {
  const store = useStore()

  let maps = {}

  functions.forEach(funName => {
    maps[funName] = function () {
      return store.dispatch(funName, ...arguments)
    }
  })
  return maps
}

export default useMapAction
