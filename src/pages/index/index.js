import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { useEffect } from "react";
import classNames from "classnames";
import Navbar from "../../components/Navbar";
import "./index.less";

export default function Index() {
  const navigateTo = (url) => {
    Taro.navigateTo({ url });
  };

  useEffect(() => {
    // 首次进入首页弹出“使用指引”轻提示
    try {
      const hasShownGuide = Taro.getStorageSync("has_shown_guide");
      if (!hasShownGuide) {
        setTimeout(() => {
          Taro.showToast({
            title: "点击卡片即可开始使用 AI 功能哦 ~",
            icon: "none",
            duration: 3000,
          });
          Taro.setStorageSync("has_shown_guide", true);
        }, 500);
      }
    } catch (e) {
      console.error("Storage error", e);
    }
  }, []);

  return (
    <View className="index bg-white min-h-screen">
      <Navbar title=" " background="transparent" />

      {/* 顶部 Banner */}
      <View className="pt-4 px-6 pb-6">
        <View className="flex flex-row items-center mb-2">
          <Text className="text-[32px] font-bold text-[#1f2937] leading-none tracking-tight">
            语文AI助手
          </Text>
          <View className="ml-3 bg-[#e0f2fe] px-2 py-1 rounded-md">
            <Text className="text-[#0284c7] text-xs font-bold">五年级版</Text>
          </View>
        </View>
        <Text className="text-base text-gray-500 font-normal">你的专属语文学习伙伴</Text>
      </View>

      {/* 功能卡片区 */}
      <View className="px-5 space-y-5">
        {/* 第一行：双卡片布局 */}
        <View className="flex justify-between">
          {/* AI写作 */}
          <View
            className="w-[48%] h-40 bg-[#e8f5e9] rounded-2xl p-5 relative flex flex-col justify-between active:scale-95 transition-transform duration-200"
            onClick={() => navigateTo("/pages/ai-write/index")}
          >
            <View>
              <Text className="block text-2xl font-bold text-[#1b5e20] mb-1">AI写作</Text>
              <Text className="block text-sm text-[#4caf50] font-medium opacity-80">
                定制不重复
              </Text>
            </View>
            <View className="absolute bottom-4 right-4 bg-white/60 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <AtIcon value="edit" size="20" color="#4caf50" />
            </View>
          </View>

          {/* AI批改 */}
          <View
            className="w-[48%] h-40 bg-[#ffebee] rounded-2xl p-5 relative flex flex-col justify-between active:scale-95 transition-transform duration-200"
            onClick={() => navigateTo("/pages/ai-correct/index")}
          >
            <View>
              <Text className="block text-2xl font-bold text-[#b71c1c] mb-1">AI批改</Text>
              <Text className="block text-sm text-[#ef5350] font-medium opacity-80">
                得分秒知道
              </Text>
            </View>
            <View className="absolute bottom-4 right-4 bg-white/60 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <AtIcon value="check" size="20" color="#f44336" />
            </View>
          </View>
        </View>

        {/* 第二行：通栏卡片 */}
        <View
          className="w-full h-44 bg-[#e3f2fd] rounded-2xl p-6 flex flex-col items-center justify-center active:scale-95 transition-transform duration-200"
          onClick={() => navigateTo("/pages/ai-helper/index")}
        >
          <Text className="text-2xl font-bold text-[#0d47a1] mb-2">光子AI助手</Text>
          <Text className="text-sm text-[#42a5f5] font-medium mb-4 opacity-80">
            通晓百科，更懂语文
          </Text>
          <View className="bg-white/60 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <AtIcon value="message" size="20" color="#2196f3" />
          </View>
        </View>
      </View>
    </View>
  );
}
