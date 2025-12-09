import { View, Text, Textarea, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtButton, AtIcon, AtMessage, AtProgress } from "taro-ui";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import {
  checkContentSafety,
  mockOCR,
  mockCorrection,
} from "../../services/mockAI";
import "./index.less";

export default function AICorrect() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [result, setResult] = useState(null);

  const handleContentChange = (e) => {
    setContent(e.detail.value);
  };

  const handleOCR = async () => {
    try {
      const res = await Taro.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
      });

      const filePath = res.tempFilePaths[0];
      setLoading(true);
      setLoadingText("正在识别图片内容...");

      const text = await mockOCR(filePath);
      setContent(text);

      Taro.showToast({ title: "识别成功", icon: "success" });
    } catch (error) {
      console.error("OCR Error:", error);
      // 用户取消选择不报错
      if (error.errMsg !== "chooseImage:fail cancel") {
        Taro.atMessage({ message: "图片识别失败，请重试", type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCorrect = async () => {
    if (!content.trim()) return;

    setLoading(true);
    setLoadingText("正在进行内容安全审核...");
    setResult(null); // 清空旧结果

    try {
      // 1. 安全审核
      const isSafe = await checkContentSafety(content);
      if (!isSafe) {
        Taro.atMessage({
          message: "作文包含敏感信息，请修改后重试",
          type: "error",
        });
        setLoading(false);
        return;
      }

      setLoadingText("AI老师正在批改中...");

      // 2. 批改
      const correctionRes = await mockCorrection(content);
      setResult(correctionRes);

      // 滚动到结果区 (可选优化)
    } catch (error) {
      console.error(error);
      Taro.atMessage({ message: "批改失败，请稍后重试", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="ai-correct">
      <Navbar title="AI批改" back={true} />
      <AtMessage />
      <Loading show={loading} text={loadingText} />

      <ScrollView scrollY className="content">
        {/* 输入区域 */}
        <View className="input-card">
          <View className="card-header">
            <Text className="card-title">作文内容</Text>
            <View className="ocr-btn" onClick={handleOCR}>
              <AtIcon value="camera" size="18" color="#4cd964" />
              <Text className="btn-text">拍照识别</Text>
            </View>
          </View>
          <View className="textarea-wrapper">
            <Textarea
              className="input-area"
              value={content}
              onInput={handleContentChange}
              placeholder="在此输入或粘贴作文，也可以拍照识别哦~"
              maxlength={-1}
            />
            <Text className="char-count">{content.length}字</Text>
          </View>
        </View>

        {/* 提交按钮 */}
        <View className="action-area">
          <AtButton
            type="primary"
            circle
            disabled={!content.trim()}
            onClick={handleCorrect}
            className="submit-btn"
          >
            提交批改
          </AtButton>
        </View>

        {/* 结果区域 */}
        {result && (
          <View className="result-container">
            {/* 总分卡片 */}
            <View className="score-card">
              <View className="score-circle">
                <Text className="score-num">{result.totalScore}</Text>
                <Text className="score-label">总分</Text>
              </View>
              <View className="dimensions">
                <View className="dim-item">
                  <Text className="dim-label">内容 (40)</Text>
                  <View style={{ flex: 1 }}>
                    <AtProgress
                      percent={(result.dimensions.content / 40) * 100}
                      color="#FFC107"
                      isHidePercent
                    />
                  </View>
                  <Text className="dim-score">{result.dimensions.content}</Text>
                </View>
                <View className="dim-item">
                  <Text className="dim-label">语句 (30)</Text>
                  <View style={{ flex: 1 }}>
                    <AtProgress
                      percent={(result.dimensions.sentences / 30) * 100}
                      color="#4cd964"
                      isHidePercent
                    />
                  </View>
                  <Text className="dim-score">{result.dimensions.sentences}</Text>
                </View>
                <View className="dim-item">
                  <Text className="dim-label">结构 (30)</Text>
                  <View style={{ flex: 1 }}>
                    <AtProgress
                      percent={(result.dimensions.structure / 30) * 100}
                      color="#2196F3"
                      isHidePercent
                    />
                  </View>
                  <Text className="dim-score">{result.dimensions.structure}</Text>
                </View>
              </View>
            </View>

            {/* 评语 */}
            <View className="feedback-card">
              <Text className="card-title">💡 老师评语</Text>
              <Text className="feedback-text">{result.comment}</Text>
            </View>

            {/* 优点 */}
            <View className="feedback-card">
              <Text className="card-title">🌟 亮点展示</Text>
              {result.pros.map((item, index) => (
                <View key={index} className="list-item">
                  <AtIcon value="check-circle" size="16" color="#4cd964" />
                  <Text className="item-text">{item}</Text>
                </View>
              ))}
            </View>

            {/* 建议 */}
            <View className="feedback-card">
              <Text className="card-title">🔧 提升建议</Text>
              {result.suggestions.map((item, index) => (
                <View key={index} className="list-item">
                  <AtIcon value="alert-circle" size="16" color="#FF9800" />
                  <Text className="item-text">{item}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
