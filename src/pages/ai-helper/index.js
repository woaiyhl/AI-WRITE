import { View, Text, ScrollView, Input } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtIcon, AtMessage } from "taro-ui";
import { useState, useEffect } from "react";
import classNames from "classnames";
import Navbar from "../../components/Navbar";
import { mockChat, mockVoiceToText } from "../../services/mockAI";
import "./index.less";

export default function AIHelper() {
  const tabs = ["解语文题", "AI 背诵", "问百科"];
  const [currentTab, setCurrentTab] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  // 页面加载时读取本地缓存
  useEffect(() => {
    const cachedHistory = Taro.getStorageSync("chat_history");
    if (cachedHistory) {
      setChatList(cachedHistory);
    }
  }, []);

  // 聊天记录更新时，滚动到底部并更新缓存
  useEffect(() => {
    setScrollTop(chatList.length * 1000); // 简单粗暴的滚动
    Taro.setStorageSync("chat_history", chatList);
  }, [chatList]);

  const handleSend = async () => {
    if (!inputVal.trim() || loading) return;

    const question = inputVal.trim();
    const newChatList = [...chatList, { role: "user", content: question }];
    setChatList(newChatList);
    setInputVal("");
    setLoading(true);

    try {
      const answer = await mockChat(tabs[currentTab], question);
      setChatList((prev) => [...prev, { role: "ai", content: answer }]);
    } catch (error) {
      Taro.atMessage({ message: "请求失败，请稍后重试", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = async () => {
    Taro.showLoading({ title: "正在听..." });
    try {
      const text = await mockVoiceToText();
      setInputVal(text);
      Taro.hideLoading();
    } catch (error) {
      Taro.hideLoading();
      Taro.atMessage({ message: "语音识别失败", type: "error" });
    }
  };

  const handleClear = () => {
    Taro.showModal({
      title: "提示",
      content: "确定要清空聊天记录吗？",
      success: (res) => {
        if (res.confirm) {
          setChatList([]);
          Taro.removeStorageSync("chat_history");
        }
      },
    });
  };

  return (
    <View className="ai-helper flex flex-col h-screen bg-white">
      <Navbar title="光子AI助手" back={true} />
      <AtMessage />

      {/* 顶部 Tabs */}
      <View className="flex items-center justify-between px-4 h-12 bg-white border-b border-gray-100">
        <View className="flex space-x-6">
          {tabs.map((tab, index) => (
            <View
              key={index}
              className="relative flex flex-col items-center h-12 justify-center"
              onClick={() => setCurrentTab(index)}
            >
              <Text
                className={classNames(
                  "text-base transition-all duration-200",
                  currentTab === index ? "text-gray-900 font-bold" : "text-gray-500 font-medium",
                )}
              >
                {tab}
              </Text>
              {currentTab === index && (
                <View className="absolute bottom-0 w-4 h-1 bg-[#4cd964] rounded-full" />
              )}
            </View>
          ))}
        </View>
        <View className="p-2" onClick={handleClear}>
          <AtIcon value="trash" size="18" color="#9ca3af" />
        </View>
      </View>

      {/* 聊天内容区 */}
      <ScrollView
        scrollY
        className="chat-content flex-1 bg-[#f9fafb]"
        scrollTop={scrollTop}
        scrollWithAnimation
      >
        <View className="min-h-full p-4 pb-20">
          {chatList.length === 0 ? (
            <View className="flex flex-col items-center justify-center h-[60vh] opacity-80">
              <View className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <AtIcon value="message" size="32" color="#e5e7eb" />
              </View>
              <Text className="text-gray-400 text-sm mb-2">
                我是你的光子AI助手，快来问我问题吧！
              </Text>
              <Text className="text-gray-300 text-xs">例如：“这道题怎么做”</Text>
            </View>
          ) : (
            <View className="space-y-6">
              {chatList.map((msg, index) => (
                <View
                  key={index}
                  className={classNames("flex w-full", {
                    "justify-end": msg.role === "user",
                    "justify-start": msg.role === "ai",
                  })}
                >
                  <View
                    className={classNames(
                      "max-w-[80%] rounded-2xl px-4 py-3 text-base leading-relaxed shadow-sm",
                      msg.role === "user"
                        ? "bg-[#4cd964] text-white rounded-tr-none"
                        : "bg-white text-gray-800 rounded-tl-none",
                    )}
                  >
                    <Text userSelect>{msg.content}</Text>
                  </View>
                </View>
              ))}
              {loading && (
                <View className="flex justify-start w-full">
                  <View className="bg-white text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center space-x-1">
                    <View
                      className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <View
                      className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <View
                      className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* 底部输入栏 */}
      <View className="bg-white px-4 py-3 border-t border-gray-100 flex items-center gap-3 pb-safe">
        <View
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 active:bg-gray-100 transition-colors"
          onClick={handleVoiceInput}
        >
          <AtIcon value="volume-plus" size="22" color="#6b7280" />
        </View>

        <View className="flex-1 bg-gray-50 rounded-lg px-4 py-2.5 flex items-center">
          <Input
            className="w-full text-base text-gray-800"
            value={inputVal}
            onInput={(e) => setInputVal(e.detail.value)}
            placeholder="请输入你的问题，如：咏物诗怎么赏析"
            placeholderClass="text-gray-400 text-sm"
            confirmType="send"
            onConfirm={handleSend}
            cursorSpacing={20}
          />
        </View>

        <View
          className={classNames(
            "px-4 py-2 rounded-lg transition-all duration-200",
            !inputVal.trim() && !loading ? "bg-gray-200" : "bg-gray-900 active:scale-95",
          )}
          onClick={handleSend}
        >
          <Text
            className={classNames(
              "text-sm font-bold",
              !inputVal.trim() && !loading ? "text-gray-400" : "text-white",
            )}
          >
            提问
          </Text>
        </View>
      </View>
    </View>
  );
}
