/**
 * selectOptions
 * @author  Yee
 * @date    2020/12/14
 * @desc    下拉选项混入
 */
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(
      'app',
      [],
    ),
  },
}
