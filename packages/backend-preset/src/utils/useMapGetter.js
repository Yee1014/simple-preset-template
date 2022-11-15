/**
 * useMapGetter
 * @author  Yee
 * @date    2020/5/18
 * @desc
 */
import { useStore } from '../plugins/store'
import { computed } from '@vue/composition-api'

function useMapGetter (status = []) {
  const store = useStore()

  let maps = {}

  status.forEach(stateName => {
    maps[stateName] = computed(() => store.getters[stateName])
  })
  return maps
}

export default useMapGetter
