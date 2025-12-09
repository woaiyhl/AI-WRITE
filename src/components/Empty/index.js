import { View, Text } from '@tarojs/components'
import './index.less'

export default function Empty({ text = '暂无内容' }) {
  return (
    <View className='empty-container'>
      {/* 这里可以用一个占位图 */}
      <View className='empty-icon'>📦</View>
      <Text className='empty-text'>{text}</Text>
    </View>
  )
}
