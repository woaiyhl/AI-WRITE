export default {
  pages: [
    "pages/index/index",
    "pages/library/index",
    "pages/ai-helper/index",
    "pages/documents/index",
    "pages/mine/index",
    "pages/ai-write/index",
    "pages/ai-correct/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "语文AI助手",
    navigationBarTextStyle: "black",
    navigationStyle: "custom",
  },
  tabBar: {
    custom: true,
    color: "#999999",
    selectedColor: "#00c777",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        pagePath: "pages/library/index",
        text: "文库",
      },
      {
        pagePath: "pages/ai-helper/index",
        text: "AI助手",
      },
      {
        pagePath: "pages/documents/index",
        text: "文档",
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
      },
    ],
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
