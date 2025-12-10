import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { useEffect, useState } from "react";
import "./index.less";

export default function Navbar({
  title = "语文AI助手",
  back = false,
  background = "#fff",
  color = "#000",
}) {
  const [statusBarHeight, setStatusBarHeight] = useState(20);
  const navHeight = 44; // 标准导航栏内容高度

  useEffect(() => {
    const info = Taro.getSystemInfoSync();
    setStatusBarHeight(info.statusBarHeight || 20);
  }, []);

  const handleBack = () => {
    if (back) {
      Taro.navigateBack();
    }
  };

  const totalHeight = statusBarHeight + navHeight;

  return (
    <View className="navbar-wrapper" style={{ height: `${totalHeight}px` }}>
      <View
        className="navbar-fixed"
        style={{
          height: `${totalHeight}px`,
          paddingTop: `${statusBarHeight}px`,
          backgroundColor: background,
        }}
      >
        <View className="navbar-content" style={{ height: `${navHeight}px` }}>
          {back && (
            <View className="back-icon" onClick={handleBack}>
              <AtIcon value="chevron-left" size="24" color={color}></AtIcon>
            </View>
          )}
          <Text className="title" style={{ color, fontSize: "20px" }}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
}
