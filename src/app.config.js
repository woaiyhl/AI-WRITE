export default {
  pages: [
    "pages/index/index",
    "pages/ai-write/index",
    "pages/ai-correct/index",
    "pages/ai-helper/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "语文AI助手",
    navigationBarTextStyle: "black",
    navigationStyle: "custom",
  },
  permission: {
    "scope.camera": {
      desc: "用于拍照识别作文",
    },
    "scope.writePhotosAlbum": {
      desc: "用于保存作文图片",
    },
  },
};
