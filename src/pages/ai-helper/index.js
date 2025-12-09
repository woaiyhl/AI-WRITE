import { View, Text, ScrollView, Input } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtButton, AtIcon, AtMessage } from "taro-ui";
import { useState, useRef, useEffect } from "react";
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
    <View className="ai-helper">
      <Navbar title="光子AI助手" back={true} />
      <AtMessage />

      {/* 顶部 Tabs */}
      <View className="tabs-header">
        {tabs.map((tab, index) => (
          <View
            key={index}
            className={`tab-item ${currentTab === index ? "active" : ""}`}
            onClick={() => setCurrentTab(index)}
          >
            <Text className="tab-text">{tab}</Text>
            {currentTab === index && <View className="tab-line" />}
          </View>
        ))}
        <View className="clear-btn" onClick={handleClear}>
          <AtIcon value="trash" size="16" color="#999" />
        </View>
      </View>

      {/* 聊天内容区 */}
      <ScrollView scrollY className="chat-content" scrollTop={scrollTop} scrollWithAnimation>
        {chatList.length === 0 ? (
          <View className="empty-state">
            <AtIcon value="message" size="48" color="#eee" />
            <Text className="empty-text">
              我是你的光子AI助手，快来问我问题吧！
              {"\n"}例如："
              {tabs[currentTab] === "解语文题"
                ? "这道题怎么做"
                : tabs[currentTab] === "AI 背诵"
                ? "背诵静夜思"
                : "为什么天是蓝的"}
              "
            </Text>
          </View>
        ) : (
          chatList.map((msg, index) => (
            <View key={index} className={`chat-item ${msg.role}`}>
              <View className="avatar">
                {msg.role === "ai" ? (
                  <AtIcon value="lightning-bolt" size="20" color="#fff" />
                ) : (
                  <AtIcon value="user" size="20" color="#fff" />
                )}
              </View>
              <View className="bubble">
                <Text userSelect>{msg.content}</Text>
              </View>
            </View>
          ))
        )}
        {loading && (
          <View className="chat-item ai">
            <View className="avatar">
              <AtIcon value="lightning-bolt" size="20" color="#fff" />
            </View>
            <View className="bubble loading-bubble">
              <View className="dot"></View>
              <View className="dot"></View>
              <View className="dot"></View>
            </View>
          </View>
        )}
        <View className="bottom-spacer" />
      </ScrollView>

      {/* 底部输入栏 */}
      <View className="input-bar">
        <View className="voice-btn" onClick={handleVoiceInput}>
          <AtIcon value="volume-plus" size="24" color="#666" />
        </View>
        <Input
          className="chat-input"
          value={inputVal}
          onInput={(e) => setInputVal(e.detail.value)}
          placeholder="请输入你的问题，如：咏物诗怎么赏析"
          confirmType="send"
          onConfirm={handleSend}
        />
        <View
          className={`send-btn ${!inputVal.trim() && !loading ? "disabled" : ""}`}
          onClick={handleSend}
        >
          <Text className="send-text">提问</Text>
        </View>
      </View>
    </View>
  );
}
