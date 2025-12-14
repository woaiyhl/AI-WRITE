import { View, Text, ScrollView, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { useState, useEffect } from "react";
import classNames from "classnames";
import Navbar from "../../components/Navbar";
import "./index.less";

// Mock Data
const quickActions = [
  { title: "改写润色", icon: "edit" },
  { title: "文章续写", icon: "file-text" },
  { title: "降低重复", icon: "reload" },
  { title: "单句扩写", icon: "add" },
  { title: "摘要总结", icon: "bullet-list" },
];

const featuredFunctions = [
  {
    title: "图片生成",
    subtitle: "人像·风景",
    icon: "image",
    color: "#f3e5f5",
    iconColor: "#ab47bc",
  },
  {
    title: "AI阅读",
    subtitle: "总结·提问·翻译",
    icon: "message",
    color: "#ffebee",
    iconColor: "#ef5350",
  },
  {
    title: "万能创作",
    subtitle: "自定义类型",
    icon: "star",
    color: "#e3f2fd",
    iconColor: "#42a5f5",
  },
  {
    title: "光速文库",
    subtitle: "文档免费下载",
    icon: "folder",
    color: "#e0f2f1",
    iconColor: "#26a69a",
  },
];

const categories = ["职场", "创作", "活动", "日常", "就业", "大学"];

const categoryItems = {
  职场: [
    { title: "心得体会", icon: "star", color: "#e0f7fa" },
    { title: "年终总结", icon: "file-text", color: "#f3e5f5" },
    { title: "工作汇报", icon: "file-generic", color: "#e8f5e9" },
    { title: "述职报告", icon: "user", color: "#fff3e0" },
    { title: "发言讲话", icon: "sound", color: "#fce4ec" },
    { title: "思想汇报", icon: "bookmark", color: "#e8eaf6" },
  ],
  创作: [
    { title: "万能创作", icon: "edit", color: "#e3f2fd" },
    { title: "小说创作", icon: "bookmark", color: "#f3e5f5" },
    { title: "黄金三章", icon: "star", color: "#fff3e0" },
    { title: "新闻稿件", icon: "file-text", color: "#e8f5e9" },
    { title: "小红书文案", icon: "heart", color: "#ffebee" },
  ],
  活动: [],
  日常: [],
  就业: [],
  大学: [],
};

// Custom SVG Icons
const IconPPT = () => (
  <View className="w-10 h-10 bg-[#3f4555] rounded-lg flex items-center justify-center">
    <Text className="text-white font-bold text-lg">P</Text>
  </View>
);

const IconWord = () => (
  <View className="w-10 h-10 bg-[#3f4555] rounded-lg flex items-center justify-center">
    <Text className="text-white font-bold text-lg">W</Text>
  </View>
);

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("职场");
  const [userIdentity, setUserIdentity] = useState("上班族");

  // Load identity from storage on show
  Taro.useDidShow(() => {
    const storedIdentity = Taro.getStorageSync("user_identity");
    if (storedIdentity) {
      setUserIdentity(storedIdentity);
    }
  });

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
    <View className="index bg-[#f7f8fa] min-h-screen pb-24">
      <Navbar title=" " background="transparent" />

      {/* Top Header */}
      <View className="px-5 pt-2 flex justify-between items-center">
        <View
          className="flex items-center active:opacity-60 transition-opacity"
          onClick={() => navigateTo("/pages/identity-select/index")}
        >
          <Text className="text-xl font-bold text-gray-800 mr-1">{userIdentity}</Text>
          <AtIcon value="chevron-down" size="16" color="#333" />
        </View>
        <View className="flex items-center space-x-4">
          <AtIcon value="bell" size="20" color="#333" />
          <AtIcon value="search" size="20" color="#333" />
        </View>
      </View>

      <ScrollView scrollY className="h-full">
        {/* Hero Cards */}
        <View className="px-4 py-4 flex justify-between">
          {/* Full Text Generation */}
          <View className="w-[48%] h-40 bg-gradient-to-br from-[#e3f2fd] to-[#bbdefb] rounded-3xl p-5 relative flex flex-col justify-between shadow-sm">
            <View>
              <Text className="block text-xl font-extrabold text-[#1a237e] mb-1">全文生成</Text>
              <Text className="block text-xs text-[#5c6bc0]">一键生成大纲和全文</Text>
            </View>
            <View className="self-end mt-auto">
              <View className="w-12 h-12 bg-[#5c6bc0] rounded-xl flex items-center justify-center shadow-md">
                <Text className="text-white font-bold text-xl">W</Text>
              </View>
            </View>
          </View>

          {/* PPT Generation */}
          <View className="w-[48%] h-40 bg-gradient-to-br from-[#ffccbc] to-[#ffab91] rounded-3xl p-5 relative flex flex-col justify-between shadow-sm">
            <View>
              <Text className="block text-xl font-extrabold text-[#bf360c] mb-1">PPT生成</Text>
              <Text className="block text-xs text-[#d84315]">模板丰富多场景原创</Text>
            </View>
            <View className="self-end mt-auto">
              <View className="w-12 h-12 bg-[#37474f] rounded-xl flex items-center justify-center shadow-md">
                <Text className="text-white font-bold text-xl">P</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-4 mb-6">
          <View className="flex justify-between">
            {quickActions.map((action, index) => (
              <View key={index} className="flex flex-col items-center">
                <View className="w-10 h-10 mb-2 flex items-center justify-center">
                  {/* Placeholder for icons - in real app, use SVGs */}
                  <AtIcon value={action.icon} size="24" color="#333" />
                </View>
                <Text className="text-xs text-gray-600 font-medium">{action.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Featured Functions */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-3 block">精选功能</Text>
          <View className="grid grid-cols-2 gap-3">
            {featuredFunctions.map((item, index) => (
              <View
                key={index}
                className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm"
              >
                <View>
                  <Text className="block text-base font-bold text-gray-800 mb-1">{item.title}</Text>
                  <Text className="block text-xs text-gray-400">{item.subtitle}</Text>
                </View>
                <View
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                >
                  <AtIcon value={item.icon} size="20" color={item.iconColor} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Category Tabs */}
        <View className="mb-2 sticky top-0 z-10 bg-[#f7f8fa] py-2">
          <ScrollView scrollX className="whitespace-nowrap px-4" showScrollbar={false}>
            <View className="flex space-x-6 px-4 items-end">
              {categories.map((cat, index) => {
                const isActive = activeCategory === cat;
                return (
                  <View
                    key={index}
                    className="flex flex-col items-center relative py-2"
                    onClick={() => setActiveCategory(cat)}
                  >
                    <Text
                      className={classNames(
                        "transition-all duration-200 leading-none",
                        isActive
                          ? "font-bold text-gray-900 text-xl scale-110"
                          : "text-gray-500 font-normal text-base",
                      )}
                    >
                      {cat}
                    </Text>
                    {isActive && (
                      // Wave underline simulation
                      <View className="absolute -bottom-1 w-6 h-1.5">
                        <Image
                          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDI0IDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yIDIuNEM0LjQgMS4yIDYuNCAxLjIgOC44IDIuNEMxMS4yIDMuNiAxMy4yIDMuNiAxNS42IDIuNEMxOCAxLjIgMjAgMS4yIDIyLjQgMi40IiBzdHJva2U9IiMwMGM3NzciIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo="
                          className="w-full h-full"
                        />
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Category Content - Render All Sections */}
        <View className="px-4 pb-6 space-y-6">
          {/* 职场 Section */}
          <View>
            {/* We don't show the title "职场" here because it's the first tab and implied? 
                 Actually Image 2 doesn't show a "职场" title below the tabs, just the grid. 
             */}
            <View className="grid grid-cols-2 gap-3">
              {categoryItems["职场"].map((item, index) => (
                <View
                  key={index}
                  className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm h-20"
                >
                  <Text className="text-base font-bold text-gray-700">{item.title}</Text>
                  <View className="opacity-80">
                    <AtIcon value={item.icon} size="24" color="#555" />
                  </View>
                </View>
              ))}
            </View>

            {/* Banner Ad */}
            <View className="mt-4 bg-[#e0f7fa] rounded-2xl p-4 relative overflow-hidden">
              <View className="flex items-start justify-between">
                <View className="flex-1 mr-2">
                  <View className="flex items-center mb-1">
                    <View className="bg-[#4dd0e1] p-1 rounded-md mr-2">
                      <AtIcon value="monitor" size="16" color="#fff" />
                    </View>
                    <Text className="font-bold text-sm text-gray-800">
                      电脑浏览器搜索“光速写作官网”
                    </Text>
                  </View>
                  <Text className="text-xs text-gray-500 block mb-2">
                    方便快捷写长文，手机电脑时时同步
                  </Text>
                  <Text className="text-xs text-gray-400 block">www.guangsuxie.com</Text>
                </View>
                <AtIcon value="close" size="14" color="#b2dfdb" />
              </View>
            </View>
          </View>

          {/* 创作 Section */}
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-3 block">创作</Text>
            <View className="grid grid-cols-2 gap-3">
              {categoryItems["创作"].map((item, index) => (
                <View
                  key={index}
                  className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm h-20"
                >
                  <Text className="text-base font-bold text-gray-700">{item.title}</Text>
                  <View className="opacity-80">
                    <AtIcon value={item.icon} size="24" color="#555" />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
