import { View, Text } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import './index.less'

export default function Loading({ show, text = '加载中...' }) {
  if (!show) return null

  return (
    <View className='loading-mask'>
      <View className='loading-content'>
        <AtActivityIndicator mode='center' content={text} />
      </View>
    </View>
  )
}
