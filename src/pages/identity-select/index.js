import { View, Text, Image, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import classNames from "classnames";
import Navbar from "../../components/Navbar";
import "./index.less";

// Mock Data
const universityOptions = ["大一", "大二", "大三", "大四", "研究生", "博士"];

const workplaceOptions = ["上班族", "自由职业", "新媒体作者", "教师", "公职人员", "职业作家"];

const primaryOptions = ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"];
const juniorOptions = ["初一", "初二", "初三"];
const seniorOptions = ["高一", "高二", "高三"];

export default function IdentitySelect() {
  const [mainCategory, setMainCategory] = useState("k12"); // Default to k12 as per new image requirement context
  const [selectedSub, setSelectedSub] = useState("五年级"); // Default selection

  const handleConfirm = () => {
    // Save selection logic here (e.g., Taro.setStorageSync or Global State)
    Taro.setStorageSync("user_identity", selectedSub);
    Taro.navigateBack();
  };

  return (
    <View className="identity-select bg-[#f7f8fa] min-h-screen flex flex-col">
      <Navbar title="请选择身份年级" back={true} background="#f7f8fa" />

      <ScrollView scrollY className="flex-1">
        <View className="px-5 pt-4 pb-24">
          {/* Main Categories */}
          <View className="flex justify-between mb-8">
            {/* K12 Card */}
            <View
              className={classNames(
                "w-[48%] bg-white rounded-2xl p-6 flex flex-col items-center justify-center border-2 transition-all duration-200 h-40",
                mainCategory === "k12"
                  ? "border-[#00c777] bg-[#e0f2f1]"
                  : "border-transparent shadow-sm",
              )}
              onClick={() => setMainCategory("k12")}
            >
              {/* Avatar Placeholder - Boy */}
              <View className="w-16 h-16 mb-3 relative">
                {/* Face */}
                <View className="w-12 h-12 bg-[#ffccbc] rounded-full mx-auto relative z-10 overflow-hidden">
                  <View className="w-full h-4 bg-[#37474f] absolute top-0 left-0"></View>
                </View>
                {/* Body */}
                <View className="w-16 h-8 bg-[#26a69a] rounded-t-full absolute -bottom-1 left-0 mx-auto"></View>
              </View>
              <Text
                className={classNames(
                  "text-lg font-bold",
                  mainCategory === "k12" ? "text-[#00c777]" : "text-gray-800",
                )}
              >
                小初高
              </Text>
            </View>

            {/* Adult Card */}
            <View
              className={classNames(
                "w-[48%] bg-white rounded-2xl p-6 flex flex-col items-center justify-center border-2 transition-all duration-200 h-40",
                mainCategory === "adult"
                  ? "border-[#00fa9a] bg-[#e0f7fa]/30 shadow-[0_0_15px_rgba(0,250,154,0.2)]"
                  : "border-transparent shadow-sm",
              )}
              onClick={() => setMainCategory("adult")}
            >
              {/* Avatar Placeholder - Graduate */}
              <View className="w-16 h-16 mb-3 relative">
                {/* Cap */}
                <View className="w-16 h-1 bg-[#263238] absolute top-1 left-0 z-20 transform -rotate-6"></View>
                <View className="w-8 h-8 bg-[#263238] absolute top-1 left-4 z-20 transform rotate-45"></View>
                {/* Face */}
                <View className="w-10 h-10 bg-[#ffccbc] rounded-full mx-auto relative z-10 mt-4 overflow-hidden border border-[#ffccbc]">
                  <View className="w-full h-1 bg-black/10 absolute top-3"></View>{" "}
                  {/* Glasses bridge */}
                  <View className="w-3 h-3 border border-black/50 rounded-full absolute top-3 left-1"></View>
                  <View className="w-3 h-3 border border-black/50 rounded-full absolute top-3 right-1"></View>
                </View>
                {/* Body */}
                <View className="w-14 h-6 bg-[#37474f] rounded-t-full absolute bottom-0 left-1 mx-auto"></View>
              </View>
              <Text
                className={classNames(
                  "text-lg font-bold",
                  mainCategory === "adult" ? "text-gray-900" : "text-gray-800",
                )}
              >
                大学/职场/教师
              </Text>
            </View>
          </View>

          {/* Sub Categories Content */}
          {mainCategory === "adult" && (
            <>
              {/* University Section */}
              <View className="mb-6">
                <Text className="text-base font-bold text-gray-800 mb-3 block">大学</Text>
                <View className="grid grid-cols-3 gap-3">
                  {universityOptions.map((option, index) => (
                    <View
                      key={index}
                      className={classNames(
                        "h-12 rounded-xl flex items-center justify-center border transition-all duration-200",
                        selectedSub === option
                          ? "bg-[#e0f7fa] border-[#00e5ff] text-[#00bcd4] font-bold"
                          : "bg-white border-transparent text-gray-500 shadow-sm",
                      )}
                      onClick={() => setSelectedSub(option)}
                    >
                      <Text className="text-sm">{option}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Workplace Section */}
              <View>
                <Text className="text-base font-bold text-gray-800 mb-3 block">职场</Text>
                <View className="grid grid-cols-3 gap-3">
                  {workplaceOptions.map((option, index) => (
                    <View
                      key={index}
                      className={classNames(
                        "h-12 rounded-xl flex items-center justify-center border transition-all duration-200",
                        selectedSub === option
                          ? "bg-[#ccfbf1] border-[#5eead4] text-[#0f766e] font-bold shadow-sm" // Matching the "上班族" active style in image
                          : "bg-white border-transparent text-gray-500 shadow-sm",
                      )}
                      onClick={() => setSelectedSub(option)}
                    >
                      <Text className="text-sm">{option}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}

          {mainCategory === "k12" && (
            <>
              {/* Primary School Section */}
              <View className="mb-6">
                <Text className="text-base font-bold text-gray-800 mb-3 block">小学</Text>
                <View className="grid grid-cols-3 gap-3">
                  {primaryOptions.map((option, index) => (
                    <View
                      key={index}
                      className={classNames(
                        "h-12 rounded-xl flex items-center justify-center border transition-all duration-200",
                        selectedSub === option
                          ? "bg-[#ccfbf1] border-[#5eead4] text-[#0f766e] font-bold shadow-sm"
                          : "bg-white border-transparent text-gray-500 shadow-sm",
                      )}
                      onClick={() => setSelectedSub(option)}
                    >
                      <Text className="text-sm">{option}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Junior High Section */}
              <View className="mb-6">
                <Text className="text-base font-bold text-gray-800 mb-3 block">初中</Text>
                <View className="grid grid-cols-3 gap-3">
                  {juniorOptions.map((option, index) => (
                    <View
                      key={index}
                      className={classNames(
                        "h-12 rounded-xl flex items-center justify-center border transition-all duration-200",
                        selectedSub === option
                          ? "bg-[#ccfbf1] border-[#5eead4] text-[#0f766e] font-bold shadow-sm"
                          : "bg-white border-transparent text-gray-500 shadow-sm",
                      )}
                      onClick={() => setSelectedSub(option)}
                    >
                      <Text className="text-sm">{option}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Senior High Section */}
              <View>
                <Text className="text-base font-bold text-gray-800 mb-3 block">高中</Text>
                <View className="grid grid-cols-3 gap-3">
                  {seniorOptions.map((option, index) => (
                    <View
                      key={index}
                      className={classNames(
                        "h-12 rounded-xl flex items-center justify-center border transition-all duration-200",
                        selectedSub === option
                          ? "bg-[#ccfbf1] border-[#5eead4] text-[#0f766e] font-bold shadow-sm"
                          : "bg-white border-transparent text-gray-500 shadow-sm",
                      )}
                      onClick={() => setSelectedSub(option)}
                    >
                      <Text className="text-sm">{option}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View className="px-6 py-6 bg-[#f7f8fa] fixed bottom-0 left-0 right-0 z-50">
        <View
          className="w-full h-12 bg-gradient-to-r from-[#00e5ff] to-[#00f090] rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-lg shadow-cyan-500/20"
          onClick={handleConfirm}
        >
          <Text className="text-white text-base font-bold tracking-wide">确定</Text>
        </View>
      </View>
    </View>
  );
}
