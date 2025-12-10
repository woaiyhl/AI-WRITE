import { View, Text, Textarea, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtButton, AtIcon, AtMessage, AtProgress } from "taro-ui";
import { useState } from "react";
import classNames from "classnames";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import { checkContentSafety, mockOCR, mockCorrection } from "../../services/mockAI";
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
    <View className="ai-correct bg-gray-50 min-h-screen flex flex-col">
      <Navbar title="AI批改" back={true} />
      <AtMessage />
      <Loading show={loading} text={loadingText} />

      <ScrollView scrollY className="flex-1 p-4 box-border">
        {/* 输入区域 */}
        <View className="bg-white rounded-3xl p-5 shadow-sm mb-6">
          <View className="flex justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">作文内容</Text>
            <View
              className="flex items-center px-3 py-1.5 bg-green-50 rounded-full active:bg-green-100 transition-colors"
              onClick={handleOCR}
            >
              <AtIcon value="camera" size="16" color="#4cd964" />
              <Text className="text-sm font-medium text-[#4cd964] ml-1">拍照识别</Text>
            </View>
          </View>
          <View className="relative bg-gray-50 rounded-xl p-4 min-h-[240px]">
            <Textarea
              className="w-full h-full min-h-[200px] text-base leading-relaxed text-gray-800 bg-transparent"
              value={content}
              onInput={handleContentChange}
              placeholder="在此输入或粘贴作文，也可以拍照识别哦~"
              placeholderClass="text-gray-400"
              maxlength={-1}
            />
            <Text className="absolute bottom-3 right-4 text-xs text-gray-400">
              {content.length}字
            </Text>
          </View>
        </View>

        {/* 提交按钮 */}
        <View className="mb-8">
          <AtButton
            type="primary"
            circle
            disabled={!content.trim()}
            onClick={handleCorrect}
            className={classNames("w-full py-2 text-lg font-bold shadow-lg transition-all", {
              "shadow-blue-200": content.trim(),
              "opacity-60": !content.trim(),
            })}
          >
            提交批改
          </AtButton>
        </View>

        {/* 结果区域 */}
        {result && (
          <View className="result-container animate-fade-in pb-8">
            {/* 总分卡片 */}
            <View className="bg-white rounded-3xl p-6 shadow-sm mb-4 flex items-center justify-between">
              <View className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-blue-50 border-4 border-blue-100">
                <Text className="text-3xl font-bold text-blue-600 leading-none">
                  {result.totalScore}
                </Text>
                <Text className="text-xs text-blue-400 mt-1">总分</Text>
              </View>
              <View className="flex-1 ml-6 space-y-3">
                <View className="flex items-center">
                  <Text className="text-sm text-gray-500 w-16">内容 (40)</Text>
                  <View className="flex-1 mx-2">
                    <AtProgress
                      percent={(result.dimensions.content / 40) * 100}
                      color="#FFC107"
                      isHidePercent
                      strokeWidth={6}
                    />
                  </View>
                  <Text className="text-sm font-bold text-gray-700">
                    {result.dimensions.content}
                  </Text>
                </View>
                <View className="flex items-center">
                  <Text className="text-sm text-gray-500 w-16">语句 (30)</Text>
                  <View className="flex-1 mx-2">
                    <AtProgress
                      percent={(result.dimensions.sentences / 30) * 100}
                      color="#4cd964"
                      isHidePercent
                      strokeWidth={6}
                    />
                  </View>
                  <Text className="text-sm font-bold text-gray-700">
                    {result.dimensions.sentences}
                  </Text>
                </View>
                <View className="flex items-center">
                  <Text className="text-sm text-gray-500 w-16">结构 (30)</Text>
                  <View className="flex-1 mx-2">
                    <AtProgress
                      percent={(result.dimensions.structure / 30) * 100}
                      color="#2196F3"
                      isHidePercent
                      strokeWidth={6}
                    />
                  </View>
                  <Text className="text-sm font-bold text-gray-700">
                    {result.dimensions.structure}
                  </Text>
                </View>
              </View>
            </View>

            {/* 评语 */}
            <View className="bg-white rounded-3xl p-6 shadow-sm mb-4">
              <Text className="block text-lg font-bold text-gray-800 mb-3">💡 老师评语</Text>
              <Text className="text-base text-gray-600 leading-relaxed text-justify">
                {result.comment}
              </Text>
            </View>

            {/* 优点 */}
            <View className="bg-white rounded-3xl p-6 shadow-sm mb-4">
              <Text className="block text-lg font-bold text-gray-800 mb-3">🌟 亮点展示</Text>
              {result.pros.map((item, index) => (
                <View key={index} className="flex items-start mb-2 last:mb-0">
                  <View className="mt-0.5 mr-2">
                    <AtIcon value="check-circle" size="16" color="#4cd964" />
                  </View>
                  <Text className="text-base text-gray-600 flex-1">{item}</Text>
                </View>
              ))}
            </View>

            {/* 建议 */}
            <View className="bg-white rounded-3xl p-6 shadow-sm mb-8">
              <Text className="block text-lg font-bold text-gray-800 mb-3">🔧 提升建议</Text>
              {result.suggestions.map((item, index) => (
                <View key={index} className="flex items-start mb-2 last:mb-0">
                  <View className="mt-0.5 mr-2">
                    <AtIcon value="alert-circle" size="16" color="#FF9800" />
                  </View>
                  <Text className="text-base text-gray-600 flex-1">{item}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
