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
        // 延迟一点显示，提升体验
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

  const cards = [
    {
      id: "write",
      title: "AI写作",
      desc: "定制不重复",
      icon: "edit",
      color: "#4CD964", // Green
      bg: "linear-gradient(135deg, #E8FAF0 0%, #D1F2DC 100%)",
      path: "/pages/ai-write/index",
    },
    {
      id: "correct",
      title: "AI批改",
      desc: "得分秒知道",
      icon: "check",
      color: "#FF3B30", // Red/Pink
      bg: "linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)",
      path: "/pages/ai-correct/index",
    },
    {
      id: "helper",
      title: "光子AI助手",
      desc: "通晓百科，更懂语文",
      icon: "message",
      color: "#007AFF", // Blue
      bg: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
      path: "/pages/ai-helper/index",
      fullWidth: true,
    },
  ];

  return (
    <View className="index bg-gray-50 min-h-screen">
      <Navbar title=" " background="transparent" />

      {/* 顶部 Banner */}
      <View className={classNames("banner-section", "pt-4 px-4")}>
        <View className="banner-content flex flex-col items-center">
          <Text className="app-title text-2xl font-bold text-gray-800">语文AI助手</Text>
          <View className="badge mt-2 bg-blue-100 px-2 py-1 rounded">
            <Text className="badge-text text-blue-500 text-xs">五年级版</Text>
          </View>
        </View>
        <Text className="banner-subtitle text-center text-gray-500 mt-2 block">
          你的专属语文学习伙伴
        </Text>
      </View>

      {/* 功能卡片区 */}
      <View className="card-container">
        <View className="grid-row">
          {cards.slice(0, 2).map((card) => (
            <View
              key={card.id}
              className="feature-card hover-scale"
              style={{ background: card.bg }}
              onClick={() => navigateTo(card.path)}
            >
              <View className="card-info">
                <Text className="card-title" style={{ color: card.color }}>
                  {card.title}
                </Text>
                <Text className="card-desc">{card.desc}</Text>
              </View>
              <View className="card-icon" style={{ backgroundColor: "rgba(255,255,255,0.6)" }}>
                <AtIcon value={card.icon} size="24" color={card.color} />
              </View>
            </View>
          ))}
        </View>

        {/* 通栏卡片 */}
        {cards.slice(2).map((card) => (
          <View
            key={card.id}
            className="feature-card full-width hover-scale"
            style={{ background: card.bg }}
            onClick={() => navigateTo(card.path)}
          >
            <View className="card-content-row">
              <View className="card-info">
                <Text className="card-title" style={{ color: card.color }}>
                  {card.title}
                </Text>
                <Text className="card-desc">{card.desc}</Text>
              </View>
              <View className="card-icon" style={{ backgroundColor: "rgba(255,255,255,0.6)" }}>
                <AtIcon value={card.icon} size="28" color={card.color} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
