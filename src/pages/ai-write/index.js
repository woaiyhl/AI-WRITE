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
    <View className="ai-write">
      <Navbar title="AI写作" back={true} />
      <AtMessage />
      <Loading show={loading} text={loadingText} />

      <ScrollView scrollY className="content">
        {/* 输入区域 */}
        <View className="input-section">
          <View className="form-item">
            <Text className="label">选择场景</Text>
            <Picker mode="selector" range={scenes} value={sceneIndex} onChange={handleSceneChange}>
              <View className="picker-wrapper">
                <Text className="picker-text">{scenes[sceneIndex]}</Text>
                <AtIcon value="chevron-down" size="16" color="#999" />
              </View>
            </Picker>
          </View>

          <View className="form-item">
            <Text className="label">创作主题</Text>
            <View className="textarea-wrapper">
              <Textarea
                className="topic-input"
                value={topic}
                onInput={handleTopicChange}
                placeholder="请输入创作主题，如：我的校园、小预算旅行"
                maxlength={200}
                autoHeight
              />
              <Text className="char-count">{topic.length}/200</Text>
            </View>
          </View>

          <AtButton
            type="primary"
            className="generate-btn"
            disabled={!topic.trim()}
            onClick={handleGenerate}
            circle
          >
            开始生成
          </AtButton>
        </View>

        {/* 结果区域 */}
        {result && (
          <View className="result-section">
            <View className="result-header">
              <Text className="result-title">生成结果</Text>
              <View className="actions">
                <View className="action-btn" onClick={handleCopy}>
                  <AtIcon value="copy" size="16" color="#007AFF" />
                  <Text style={{ color: "#007AFF" }}>复制</Text>
                </View>
                <View className="action-btn" onClick={handleClear}>
                  <AtIcon value="trash" size="16" color="#FF3B30" />
                  <Text style={{ color: "#FF3B30" }}>清空</Text>
                </View>
              </View>
            </View>
            <View className="result-content">
              <Text userSelect>{result}</Text>
            </View>
          </View>
        )}

        {/* 底部占位，防止内容被遮挡 */}
        <View style={{ height: "40px" }}></View>
      </ScrollView>
    </View>
  );
}
