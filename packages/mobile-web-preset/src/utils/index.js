/**
 * index
 *
 * @Author
 * @DATE    create on
 * @DESC    工具类
 */
import store from '@/plugins/store'
import router from '@/plugins/router'
import { nextTick } from 'vue'
import { tI18n } from '@/plugins/i18n'
import { Notify } from 'vant'
import dayjs from 'dayjs'
import Decimal from 'decimal.js'
import { DestinationTypeMap, receiverTypeMap } from '@/data/DataVariables'

/**
 * 是否登录
 * @param autoLogin 自动跳到登录
 * @return {boolean}
 */
export function isLogin(autoLogin = true) {
  const status =
    !!store.getters['app/sessionId'] && !!store.getters['app/userInfo']
  if (autoLogin && !status) {
    nextTick(() => {
      Notify(tI18n('message.login'))
      router.push({ name: 'SignIn' })
    })
  }
  return status
}

// 检查用户状态
export function checkUserStatus() {
  // 黑名单
  if (store.getters['app/isForbid']) {
    Notify(tI18n('message.isForbid'))
    return false
  }
  // 审核中
  if (store.getters['app/isAuditing']) {
    Notify(tI18n('message.isAuditing'))
    return false
  }
  return true
}

/**
 * 获取fba名称
 * @param fba
 * @return {*}
 */
export function getFBAName(fba) {
  const fbaMap = {
    true: 'FBA',
    false: tI18n('label.noFBA'),
  }
  return fbaMap[fba]
}

/**
 * 获取收件信息类型名称
 * @param type
 * @return {*}
 */
export function getReceiverTypeName(type) {
  return receiverTypeMap()[type] || '-'
}

/**
 * 获取揽件类型名称
 * @return {*}
 */
export function getSendTypeName(sendType) {
  const sendTypeMap = {}
  store.getters['baseData/packageTypeRadioList'].forEach(p => {
    sendTypeMap[p.value] = p.label
  })
  return sendTypeMap[sendType]
}

/**
 * 排序的函数, 把对象根据首字母排序
 */
export function sortObjectKey(o) {
  const newkey = Object.keys(o).sort()
  // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  // 创建一个新的对象，用于存放排好序的键值对
  const newObj = {}
  // 遍历newkey数组
  for (let i = 0; i < newkey.length; i++) {
    // 向新创建的对象中按照排好的顺序依次增加键值对
    newObj[newkey[i]] = o[newkey[i]]
  }
  // 返回排好序的新对象
  return newObj
}

/**
 * 排序的函数, 把对象根据首字母排序
 */
export function sortObjectByKey(o) {
  let newkeys = Object.keys(o).sort()
  // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkeys是一个数组
  // 创建一个新的对象，用于存放排好序的键值对
  const newArr = []
  // 遍历newkeys数组
  for (let i = 0; i < newkeys.length; i++) {
    // 向新创建的对象中按照排好的顺序依次增加键值对
    // 拼接字符串-,防止纯数字的key排序不正确
    newArr[i] = o[newkeys[i]]
  }
  // 返回排好序的新对象
  return newArr
}

/**
 * 格式化揽件时间
 * @param row
 * @return {string}
 */
export const formatExpectedTime = row => {
  const { doorToDoorPickupInfo } = row
  if (!doorToDoorPickupInfo) return ''
  const { expectedStartTime, expectedEndTime } = doorToDoorPickupInfo
  if (!expectedStartTime || !expectedEndTime) return ''
  const start = dayjs(expectedStartTime).format('MM月DD日 HH:mm')
  const end = dayjs(expectedEndTime).format('HH:mm')
  return `${start} ~ ${end}`
}

/**
 * 计算应收合计
 * @param list
 * @param type 应付合计 0 应收  1 应付
 * @return {{str: number, localCurrency: (string|number), strHtml: string, stash: *[]}}
 */
export function calcTotal(list, type = 0) {
  if (!list.length) return { str: '-' }
  const stash = []
  let str = ''
  let strHtml = ''
  let localCurrency = new Decimal(0)
  list.forEach(item => {
    if (item.referenceRate && item.amount) {
      localCurrency = localCurrency.add(
        new Decimal(item.amount).mul(item.referenceRate)
      )
    }
    const findItem = stash.find(_ => _.currency === item.currency)
    if (item.amount || item.amount === 0) {
      if (findItem) {
        findItem.totalAmount = new Decimal(findItem.totalAmount)
          .add(item.amount)
          .toNumber()
      } else {
        stash.push({
          type,
          referenceRate: item.referenceRate,
          localCurrency: item.localCurrency,
          totalAmount: item.amount,
          currency: item.currency,
          amount: item.amount,
        })
      }
    }
  })

  stash.forEach((item, index) => {
    const totalAmount = item.totalAmount
    const currency = item.currency
    const absAmount = Math.abs(item.totalAmount)
    const symbol = totalAmount >= 0 ? '+' : '-'
    if (totalAmount || totalAmount === 0) {
      str =
        str + `${!index && symbol === '+' ? '' : symbol}${absAmount}${currency}`
      strHtml =
        strHtml +
        `<span class="symbol">${
          !index && symbol === '+' ? '' : symbol
        }</span><span class="amount">${absAmount}</span> <span class="currency">${currency}</span>`
    }
  })
  const num = localCurrency.toNumber()
  return {
    localCurrency: num ? numFixed(num) : num,
    stash,
    str: str || 0,
    strHtml: strHtml || '<span class="amount">-</span>',
  }
}

/**
 * 目的地分组数据生成
 * @param list
 */
export const genDestinationGroup = list => {
  const NOGROUPKEY = 'NONE'
  // 把数据分组，id/name为空属于未分组
  const sourceMap = new Map()
  list.forEach(item => {
    const { groupId, groupName, extendInfo, type, name, code, id } = item
    item.text = item.label = `${name}(${code})`
    item.value = id
    item.info = ''
    // 海外仓fba，自提点，拼接字符
    if (extendInfo && [1, 2].includes(type)) {
      item.info = `${extendInfo.countryArea || ''} ${extendInfo.address ||
        ''} ${extendInfo.postCode || ''}`
    }
    const isNoGroup = !groupId || !groupName
    const mapKey = isNoGroup ? NOGROUPKEY : groupId
    const mapLabel = isNoGroup ? '(未分组)' : groupName
    const mapCode = isNoGroup ? NOGROUPKEY : `GROUP_${groupId}`
    if (sourceMap.has(mapKey)) {
      const sub = sourceMap.get(mapKey)
      sub.children.push(item)
    } else {
      sourceMap.set(mapKey, {
        id: mapKey,
        label: mapLabel,
        text: mapLabel,
        code: mapCode,
        value: groupId,
        number: 0,
        children: [item],
      })
    }
  })
  const result = []
  const noGroupList = []
  sourceMap.forEach((value, key) => {
    value.number = value.children.length
    if (key === NOGROUPKEY) {
      noGroupList.push(value)
    } else {
      result.push(value)
    }
  })
  return [...result, ...noGroupList]
}

//处理数字  直接截取,
export function numFixed(num = 0, len = 2) {
  if (typeof num == 'number') {
    num = num
      .toFixed(18)
      .replace(/\.0+$/, '')
      .replace(/(\.\d+[1-9])0+$/, '$1')
  }
  let numStr = num.toString()
  let index = numStr.indexOf('.')
  if (index == -1) {
    index = numStr.length
    numStr += '.0000000000000'
  } else {
    numStr += '0000000000000'
  }
  const newNum = numStr.substring(0, index + len + 1)
  return newNum
}

/**
 * 生成运费试算目的地数据
 * @param list
 */
export const genCalcDestOptions = list => {
  /*const genDestGroup = dsts => {
    const sourceMap = new Map()
    dsts.forEach(dest => {
      const { groupId, groupName, extendInfo, type, dst, dstId, dstName } = dest
      dest.text = dest.label = `${dstName}(${dst})`
      dest.value = dstId
      dest.info = ''
      // 海外仓fba，自提点，拼接字符
      if ([1, 2].includes(type) && extendInfo) {
        dest.info = `${extendInfo.countryArea || ''} ${extendInfo.address ||
          ''} ${extendInfo.postCode || ''}`
      }
      const isNoGroup = !groupId || !groupName
      const mapItemLabel = isNoGroup ? '(未分组)' : groupName
      const mapItemValue = isNoGroup ? '$NONE$' : `GROUP_${groupId}`
      if (sourceMap.has(mapItemLabel)) {
        const sub = sourceMap.get(mapItemLabel)
        sub.children.push(dest)
      } else {
        sourceMap.set(mapItemLabel, {
          id: mapItemValue,
          label: mapItemLabel,
          text: mapItemLabel,
          code: mapItemValue,
          value: mapItemValue,
          number: 0,
          children: [dest],
        })
      }
    })
    const result = []
    const noGroupList = []
    sourceMap.forEach((value, key) => {
      value.number = value.children.length
      if (key === '(未分组)') {
        noGroupList.push(value)
      } else {
        result.push(value)
      }
    })
    return [...result, ...noGroupList]
  }*/

  const dealDests = dsts => {
    dsts.forEach(dest => {
      const { extendInfo, type, dst, dstId, dstName } = dest
      dest.text = dest.label = `${dstName}(${dst})`
      dest.value = dstId
      dest.info = ''
      // 海外仓fba，自提点，拼接字符
      if ([1, 2].includes(type) && extendInfo) {
        dest.info = `${extendInfo.countryArea || ''} ${extendInfo.address ||
          ''} ${extendInfo.postCode || ''}`
      }
    })
  }

  list.forEach(group => {
    group.text = group.label = DestinationTypeMap()[group.type]
    group.value = group.type
    dealDests(group.dsts)
    group.children = group.dsts
  })
  return list
}
export function listToMap(list, key = 'id', valueKey) {
  if (!Array.isArray(list)) return {}
  const map = {}
  const getValue =
    typeof valueKey === 'function'
      ? valueKey
      : typeof valueKey === 'string'
      ? item => item[valueKey]
      : item => item
  list.forEach(item => {
    map[item[key]] = getValue(item)
  })
  return map
}

// 计算总重量
export function calcTotalWeight(list, key = 'weight') {
  if (list && list.length) {
    return list.reduce((total, item) => {
      if (total === '-' && (item[key] === '' || item[key] === null)) return '-'
      const cWeight = new Decimal(item.count).mul(item[key] || '0').toNumber()
      const t = total === '-' ? 0 : total
      return new Decimal(t).plus(cWeight)
    }, '-')
  } else {
    return '-'
  }
}

// 计算总体积
export function calcTotalVolume(
  list,
  entryType,
  lengthKey = 'length',
  widthKey = 'width',
  heightKey = 'height'
) {
  if (list && list.length) {
    const keys = [lengthKey, widthKey, heightKey]

    const isEmptyRow = item => {
      return keys.some(key => {
        return item[key] === '' || item[key] === null
      })
    }

    const value = list.reduce((total, item) => {
      if (total === '-' && isEmptyRow(item)) return '-'
      const itemCount = item.count || 0
      const cVolume = new Decimal(item[lengthKey] || 0)
        .mul(item[widthKey] || 0)
        .mul(item[heightKey] || 0)
        .div(1000000)
        .toNumber()
      let volume
      if (entryType === 1) {
        volume = new Decimal(item.volume).mul(itemCount).toFixed(6)
      } else if (entryType === 0) {
        volume = new Decimal(cVolume).mul(itemCount).toFixed(6)
      } else {
        volume = new Decimal(Math.max(item.volume, cVolume))
          .mul(itemCount)
          .toFixed(6)
      }
      const t = total === '-' ? 0 : total
      return new Decimal(t)
        .plus(volume)
        .toFixed(6)
        .toString()
    }, '-')
    return value === '-' ? '-' : new Decimal(value).toNumber()
  } else {
    return '-'
  }
}
