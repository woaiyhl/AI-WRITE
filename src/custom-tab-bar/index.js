import Taro from "@tarojs/taro";
import React, { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import "./index.less";
import classNames from "classnames";

// SVG Icons components
const IconHome = ({ active }) => (
  <View className="svg-icon">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path
        d="M2 12L12 2L22 12"
        stroke={active ? "#00c777" : "#999999"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V12"
        stroke={active ? "#00c777" : "#999999"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </View>
);

const IconLibrary = ({ active }) => (
  <View className="svg-icon">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
        stroke={active ? "#00c777" : "#999999"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2Z"
        stroke={active ? "#00c777" : "#999999"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </View>
);

const IconDocument = ({ active }) => (
  <View className="svg-icon">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path
        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
        stroke={active ? "#00c777" : "#999999"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 2V8H20"
        stroke={active ? "#00c777" : "#999999"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 13H8"
        stroke={active ? "#00c777" : "#999999"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 17H8"
        stroke={active ? "#00c777" : "#999999"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9H8"
        stroke={active ? "#00c777" : "#999999"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </View>
);

const IconMine = ({ active }) => (
  <View className="svg-icon">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={active ? "#00c777" : "#999999"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
        stroke={active ? "#00c777" : "#999999"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9H9.01"
        stroke={active ? "#00c777" : "#999999"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 9H15.01"
        stroke={active ? "#00c777" : "#999999"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </View>
);

const list = [
  {
    pagePath: "/pages/index/index",
    text: "首页",
    icon: IconHome,
  },
  {
    pagePath: "/pages/library/index",
    text: "文库",
    icon: IconLibrary,
  },
  {
    pagePath: "/pages/ai-helper/index",
    text: "AI助手",
    icon: null,
    special: true,
  },
  {
    pagePath: "/pages/documents/index",
    text: "文档",
    icon: IconDocument,
  },
  {
    pagePath: "/pages/mine/index",
    text: "我的",
    icon: IconMine,
  },
];

export default function CustomTabBar() {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const path = currentPage ? `/${currentPage.route}` : "";

    const index = list.findIndex((item) => item.pagePath === path);
    if (index !== -1) {
      setSelected(index);
    }
  }, []);

  const switchTab = (item, index) => {
    const url = item.pagePath;
    Taro.switchTab({
      url,
    });
    setSelected(index);
  };

  return (
    <View className="custom-tab-bar">
      {/* 移除顶部的生硬细线，改用 box-shadow 实现柔和分割 */}
      {list.map((item, index) => {
        const isSelected = selected === index;
        const IconComponent = item.icon;

        return (
          <View
            key={index}
            className={classNames("tab-bar-item", {
              "tab-bar-item-special": item.special,
            })}
            onClick={() => switchTab(item, index)}
          >
            {item.special ? (
              <View className="special-icon-wrapper">
                <View className="special-icon">
                  <Text className="special-text-en">AI</Text>
                  <Text className="special-text-cn">助手</Text>
                </View>
              </View>
            ) : (
              <>
                <View className={classNames("tab-icon", isSelected ? "active" : "")}>
                  className={classNames(
                    styles["tab-text"],
                    isSelected ? "text-[#00c777] font-medium" : "text-gray-400",
                  )}
                    "tab-text",
                    isSelected ? "text-[#00c777] font-medium" : "text-gray-400",
                </Text>
              </>
            )}
          </View>
        );
      })}
    </View>
  );
}
