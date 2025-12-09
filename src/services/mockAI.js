// 模拟内容安全审核
export const checkContentSafety = async (text) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 简单模拟：如果包含敏感词则不通过
      const sensitiveWords = ["违禁", "敏感", "暴力", "色情"];
      const hasSensitive = sensitiveWords.some((word) => text.includes(word));
      resolve(!hasSensitive);
    }, 500);
  });
};

// 模拟 AI 生成
export const generateContent = async (scene, topic) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let content = "";
      switch (scene) {
        case "小红书文案":
          content = `✨${topic}✨\n\n家人们！今天我要分享关于${topic}的宝藏体验！💖\n\n👉 真的太绝了，必须安利给你们！\n🌟 亮点1：超乎想象的细节\n🌟 亮点2：独特的感受\n\n#${topic} #宝藏分享 #小学生日常 #五年级生活`;
          break;
        case "教案设计":
          content = `【${topic}】教学设计\n\n一、教学目标\n1. 知识与技能：学生能够理解${topic}的核心概念。\n2. 过程与方法：通过小组讨论，掌握${topic}的运用。\n3. 情感态度与价值观：培养学生对${topic}的兴趣。\n\n二、教学重难点\n重点：掌握${topic}的基本特征。\n难点：如何灵活运用${topic}。\n\n三、教学过程\n1. 导入（5分钟）：通过趣味故事引入${topic}。\n2. 新授（15分钟）：讲解${topic}的关键点。\n3. 练习（15分钟）：分组进行${topic}相关练习。\n4. 总结（5分钟）：回顾本节课重点。`;
          break;
        case "研究报告":
          content = `关于${topic}的研究报告\n\n一、研究背景\n随着生活水平的提高，${topic}逐渐成为大家关注的焦点。为了深入了解${topic}，我们开展了本次研究。\n\n二、研究方法\n本次研究主要采用问卷调查法和观察法。\n\n三、研究结果\n1. 80%的同学对${topic}表示感兴趣。\n2. 在实际生活中，${topic}的应用非常广泛。\n\n四、结论与建议\n${topic}对我们的学习和生活有积极影响。建议大家多多关注${topic}，合理利用资源。`;
          break;
        case "作文仿写":
          content = `《${topic}》\n\n在我的记忆深处，${topic}就像一颗璀璨的星星，照亮了我的童年。\n\n记得那是一个阳光明媚的下午，我第一次接触到了${topic}。它那独特的样子深深吸引了我。虽然一开始我并不懂它，但随着时间的推移，我逐渐发现了它的魅力。\n\n${topic}不仅带给我快乐，更教会了我坚持和努力。每当我遇到困难时，想到${topic}，我就充满了力量。\n\n这就是我的${topic}，它将永远陪伴我成长。`;
          break;
        default:
          content = `这是关于${topic}的生成内容。AI 正在努力思考中...`;
      }
      resolve(content);
    }, 1500);
  });
};

// 模拟 OCR 识别
export const mockOCR = async (filePath) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟识别出的作文文本
      const text = `    今天，阳光明媚，我和爸爸妈妈一起去了公园。\n    公园里的人真多啊！有的人在放风筝，有的人在跑步，还有的人在野餐。我看到了一只可爱的小狗，它在草地上跑来跑去，真有趣。\n    我们找了一块空地，铺上垫子，开始吃东西。妈妈准备了很多好吃的，有三明治、水果，还有我最爱喝的果汁。\n    吃完东西，我和爸爸去放风筝。风筝飞得很高很高，像一只自由的小鸟。我开心极了！\n    太阳快下山了，我们依依不舍地回家了。今天真是快乐的一天！`;
      resolve(text);
    }, 2000);
  });
};

// 模拟 AI 批改
export const mockCorrection = async (content) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 简单根据长度生成一些随机分数，模拟真实感
      const lengthScore = Math.min(content.length / 10, 5);
      const baseScore = 80;

      const result = {
        totalScore: Math.floor(baseScore + lengthScore + Math.random() * 10),
        dimensions: {
          content: 35 + Math.floor(Math.random() * 5),
          sentences: 25 + Math.floor(Math.random() * 5),
          structure: 25 + Math.floor(Math.random() * 5),
        },
        comment:
          "这篇作文选材生活化，情感真挚，描写生动。通过对公园游玩的细节描写，表现了作者愉快的心情。但在词汇运用上可以更加丰富一些。",
        pros: [
          "选材贴近生活，情感流露自然。",
          "运用了排比句式（有的人...有的人...），增强了语言气势。",
          "结尾直抒胸臆，点明了中心思想。",
        ],
        suggestions: [
          "尝试使用更多成语或修辞手法，让语言更生动。",
          "可以增加一些心理描写，让人物形象更丰满。",
        ],
      };
      resolve(result);
    }, 2000);
  });
};

// 模拟语音转文字
export const mockVoiceToText = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("帮我背诵一下《静夜思》");
    }, 1500);
  });
};

// 模拟 AI 助手问答
export const mockChat = async (tag, question) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let answer = "";
      if (tag === "解语文题") {
        answer = `【AI老师解析】\n\n小朋友，针对"${question}"这道题，我们可以这样思考：\n\n1. **审题**：首先要看清楚题目问的是什么。\n2. **知识点回顾**：这道题考察了五年级语文中的xxx知识点。\n3. **解题步骤**：\n   - 第一步：...\n   - 第二步：...\n\n希望这个思路能帮到你！加油！`;
      } else if (tag === "AI 背诵") {
        answer = `没问题！我们一起来背诵吧。\n\n"${question}" 相关的诗句/课文如下：\n\n（此处模拟背诵内容）\n床前明月光，疑是地上霜。\n举头望明月，低头思故乡。\n\n你背得怎么样？有没有哪里卡住了？`;
      } else if (tag === "问百科") {
        answer = `你好呀！关于"${question}"，我是这样理解的：\n\n它其实就像我们在生活中见到的...（用通俗易懂的比喻解释）。\n\n比如说... \n\n这就好比... \n\n是不是很有趣呢？`;
      } else {
        answer = `我是你的语文AI助手，关于"${question}"，我觉得...`;
      }
      resolve(answer);
    }, 1500);
  });
};
