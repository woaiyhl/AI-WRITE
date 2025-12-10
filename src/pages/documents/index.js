import React from "react";
import { View, Text } from "@tarojs/components";
import Navbar from "../../components/Navbar";
import "./index.less";

export default function Documents() {
  return (
    <View className="documents-page">
      <Navbar title="文档" />
      <View className="pt-[100px] px-4">
        <View className="flex flex-col items-center justify-center mt-20">
          <Text className="text-gray-500 text-lg">文档功能开发中...</Text>
        </View>
      </View>
    </View>
  );
}
