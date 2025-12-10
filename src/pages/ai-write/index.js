import { View, Text, Picker, Textarea, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtButton, AtIcon, AtMessage } from "taro-ui";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import { generateContent, checkContentSafety } from "../../services/mockAI";
import "./index.less";

export default function AIWrite() {
  const scenes = ["小红书文案", "教案设计", "研究报告", "作文仿写"];
  const [sceneIndex, setSceneIndex] = useState(0);
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("AI正在创作中...");

  const handleSceneChange = (e) => {
    setSceneIndex(e.detail.value);
  };

  const handleTopicChange = (e) => {
    setTopic(e.detail.value);
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setLoadingText("正在进行内容安全审核...");

    try {
      // 1. 安全审核
      const isSafe = await checkContentSafety(topic);
      if (!isSafe) {
        Taro.atMessage({
          message: "输入内容包含敏感信息，请修改后重试",
          type: "error",
        });
        setLoading(false);
        return;
      }

      setLoadingText("AI正在创作中...");

      // 2. 生成内容
      const content = await generateContent(scenes[sceneIndex], topic);
      setResult(content);

      // 3. 滚动到结果区域 (简单实现，通过设置 state 触发渲染后用户自行查看，或者使用 scrollIntoView)
    } catch (error) {
      console.error(error);
      Taro.atMessage({
        message: "生成失败，请稍后重试",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    Taro.setClipboardData({
      data: result,
      success: () => {
        Taro.showToast({ title: "复制成功", icon: "success" });
      },
    });
  };

  const handleClear = () => {
    setResult("");
  };

  return (
    <View className="ai-write flex flex-col h-screen bg-gray-50">
      <Navbar title="AI写作" back={true} />
      <AtMessage />
      <Loading show={loading} text={loadingText} />

      <ScrollView scrollY className="content flex-1 p-5 box-border">
        {/* 输入区域 */}
        <View className="input-section bg-white rounded-2xl p-5 shadow-sm mb-6">
          <View className="form-item mb-6">
            <Text className="label block text-base font-bold text-gray-800 mb-3">选择场景</Text>
            <Picker mode="selector" range={scenes} value={sceneIndex} onChange={handleSceneChange}>
              <View className="picker-wrapper flex items-center justify-between bg-gray-100 py-3 px-4 rounded-xl">
                <Text className="picker-text text-base text-gray-800">{scenes[sceneIndex]}</Text>
                <AtIcon value="chevron-down" size="18" color="#999" />
              </View>
            </Picker>
          </View>

          <View className="form-item mb-6">
            <Text className="label block text-base font-bold text-gray-800 mb-3">创作主题</Text>
            <View className="textarea-wrapper bg-gray-100 rounded-xl p-4 relative">
              <Textarea
                className="topic-input w-full min-h-[160px] text-base leading-normal text-gray-800 bg-transparent"
                value={topic}
                onInput={handleTopicChange}
                placeholder="请输入创作主题，如：我的校园、小预算旅行"
                placeholderClass="text-gray-400"
                maxlength={200}
                autoHeight
              />
              <Text className="char-count absolute bottom-3 right-4 text-xs text-gray-400">
                {topic.length}/200
              </Text>
            </View>
          </View>

          <AtButton
            type="primary"
            className="generate-btn mt-4 w-full bg-green-500 border-green-500 shadow-md"
            disabled={!topic.trim()}
            onClick={handleGenerate}
            circle
          >
            开始创作
          </AtButton>
        </View>

        {/* 结果区域 */}
        {result && (
          <View className="result-section bg-white rounded-2xl p-5 shadow-sm animate-fade-in mb-8">
            <View className="result-header flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
              <Text className="result-title text-lg font-bold text-gray-800">创作结果</Text>
              <View className="actions flex">
                <View className="action-btn flex items-center mr-4" onClick={handleCopy}>
                  <AtIcon value="copy" size="16" color="#666" />
                  <Text className="ml-1 text-sm text-gray-600">复制</Text>
                </View>
                <View className="action-btn flex items-center" onClick={handleClear}>
                  <AtIcon value="trash" size="16" color="#666" />
                  <Text className="ml-1 text-sm text-gray-600">清空</Text>
                </View>
              </View>
            </View>
            <View className="result-content">
              <Text userSelect className="text-base text-gray-700 leading-relaxed text-justify">
                {result}
              </Text>
            </View>
          </View>
        )}

        {/* 底部占位，防止内容被遮挡 */}
        <View style={{ height: "40px" }}></View>
      </ScrollView>
    </View>
  );
}
