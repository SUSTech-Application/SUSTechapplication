<script setup>
import { computed, defineEmits, defineProps, onMounted, ref, watch } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const qrcodeGenerated = ref(false);
const isGeneratingImage = ref(false);
const shareCardRef = ref(null);
const currentTheme = ref("dark"); // 默认暗色主题

// 定义主题
const themes = [
  { name: "dark", background: "#333", text: "#fff", border: "#4285f4" },
  { name: "light", background: "#fff", text: "#333", border: "#4285f4" },
  { name: "blue", background: "#1a73e8", text: "#fff", border: "#fff" },
  { name: "green", background: "#0f9d58", text: "#fff", border: "#fff" },
  { name: "red", background: "#ea4335", text: "#fff", border: "#fff" },
];

// 当前主题的样式
const themeStyle = computed(() => {
  const theme = themes.find((t) => t.name === currentTheme.value) || themes[0];
  return {
    background: theme.background,
    color: theme.text,
    borderColor: theme.border,
  };
});

// 设置主题
const setTheme = (themeName) => {
  currentTheme.value = themeName;
  // 重新生成二维码以匹配主题颜色
  qrcodeGenerated.value = false;

  // 清除之前的二维码
  const qrcodeElement = document.getElementById("qrcode");
  if (qrcodeElement) {
    qrcodeElement.innerHTML = "";
  }

  setTimeout(generateQRCode, 100);
};

// Function to generate QR code
const generateQRCode = () => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  try {
    // 获取QR码容器元素
    const qrcodeElement = document.getElementById("qrcode");
    if (!qrcodeElement) return;

    // 清除之前的内容
    qrcodeElement.innerHTML = "";

    // 获取当前主题颜色
    const theme =
      themes.find((t) => t.name === currentTheme.value) ?? themes[0];

    // 生成正确的URL
    // 使用绝对URL确保在任何页面都能正确生成
    const baseUrl = "https://sustech-application.com";
    const currentPath = window.location.pathname;
    const qrUrl = `${baseUrl}${currentPath}`;

    // 创建图片元素
    const qrCodeImg = document.createElement("img");
    qrCodeImg.alt = "扫描二维码访问原文";
    qrCodeImg.style.width = "128px";
    qrCodeImg.style.height = "128px";

    // 处理主题颜色
    let bgColor = theme.background.replace("#", "");
    let fgColor = theme.text.replace("#", "");

    // 确保颜色格式正确
    if (!bgColor) bgColor = "ffffff";
    if (!fgColor) fgColor = "000000";

    // 使用QR Code API生成二维码
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(qrUrl)}&bgcolor=${bgColor}&color=${fgColor}`;

    // 设置加载事件
    qrCodeImg.onload = () => {
      qrcodeGenerated.value = true;
    };

    qrCodeImg.onerror = (e) => {
      console.error("Failed to load QR code image:", e);
      // 尝试使用默认颜色
      qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(qrUrl)}`;
    };

    // 设置图片源
    qrCodeImg.src = qrCodeUrl;

    // 添加到DOM
    qrcodeElement.appendChild(qrCodeImg);
  } catch (err) {
    console.error("Failed to generate QRCode:", err);
  }
};

// Function to download share card as image
const downloadAsImage = async () => {
  if (!shareCardRef.value || typeof window === "undefined") return;

  isGeneratingImage.value = true;

  try {
    const domToImage = await import("dom-to-image-more");

    // 创建一个新的div元素，用于生成图片
    const cloneContainer = document.createElement("div");
    cloneContainer.style.position = "absolute";
    cloneContainer.style.left = "-9999px";
    cloneContainer.style.top = "-9999px";
    document.body.appendChild(cloneContainer);

    // 克隆分享卡片
    const clone = shareCardRef.value.cloneNode(true);

    // 确保 HTML 格式在克隆中保留
    const blockquote = clone.querySelector(".formatted-text");
    if (blockquote) {
      blockquote.innerHTML = props.text;
    }

    // 确保背景色正确应用
    const theme =
      themes.find((t) => t.name === currentTheme.value) || themes[0];

    // 计算厚度分辨率的尺寸
    const originalWidth = shareCardRef.value.offsetWidth;
    const originalHeight = shareCardRef.value.offsetHeight;
    const scale = 3; // 3倍分辨率
    const scaledWidth = originalWidth * scale;
    const scaledHeight = originalHeight * scale;

    // 设置克隆元素的样式
    clone.style.width = `${originalWidth}px`;
    clone.style.height = `${originalHeight}px`;
    clone.style.backgroundColor = theme.background;
    clone.style.color = theme.text;
    clone.style.padding = "20px";
    clone.style.borderRadius = "8px";
    clone.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";

    // 添加到临时容器
    cloneContainer.appendChild(clone);

    // 使用toPng生成高分辨率图片
    const dataUrl = await domToImage.toPng(clone, {
      quality: 1,
      bgcolor: theme.background,
      width: scaledWidth, // 使用放大后的宽度
      height: scaledHeight, // 使用放大后的高度
      style: {
        margin: "0",
        padding: "20px",
        "border-radius": "8px",
        "background-color": theme.background,
        color: theme.text,
        transform: `scale(${scale})`,
        "transform-origin": "top left",
      },
    });

    // 移除临时元素
    document.body.removeChild(cloneContainer);

    // 创建下载链接
    const link = document.createElement("a");
    link.download = `share-${new Date().getTime()}.png`;
    link.href = dataUrl;
    link.click();

    isGeneratingImage.value = false;
  } catch (err) {
    console.error("Failed to generate image:", err);
    isGeneratingImage.value = false;
  }
};

// Watch for visibility changes to generate QR code when component becomes visible
watch(
  () => props.visible,
  (newValue) => {
    // 当组件变为可见时，重置状态并生成新的二维码
    if (newValue) {
      // 重置状态
      qrcodeGenerated.value = false;

      // 清除之前的二维码
      const qrcodeElement = document.getElementById("qrcode");
      if (qrcodeElement) {
        qrcodeElement.innerHTML = "";
      }

      // 小延迟确保 DOM 准备就绪
      setTimeout(generateQRCode, 100);
    }
  },
  { immediate: true }, // 立即触发一次
);

// 当组件挂载时，如果可见则生成二维码
onMounted(() => {
  // 组件挂载时不需要额外生成二维码，因为 watch 中的 immediate: true 会处理
});
</script>

<template>
  <div v-if="visible" class="share-card-overlay" @click="emit('close')">
    <div class="share-card-container" @click.stop>
      <div class="share-card-header">
        <h3>分享内容</h3>
        <button class="close-button" @click="emit('close')">×</button>
      </div>

      <!-- 预览卡片 - 用于下载 -->
      <div
        class="share-card"
        ref="shareCardRef"
        :style="{
          backgroundColor: themeStyle.background,
          color: themeStyle.color,
          borderColor: themeStyle.borderColor,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }"
      >
        <div class="share-content">
          <div class="share-text">
            <blockquote
              :style="{ borderLeftColor: themeStyle.borderColor }"
              v-html="text"
              class="formatted-text"
            ></blockquote>
            <div class="share-source">
              <p>南方科技大学飞跃手册</p>
            </div>
          </div>
          <div class="share-qrcode-container">
            <div
              class="share-qrcode"
              :style="{
                backgroundColor: themeStyle.background,
                borderColor: themeStyle.borderColor,
              }"
            >
              <div id="qrcode"></div>
              <p class="qrcode-text">扫描二维码访问原文</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 控制按钮 - 不包含在下载图片中 -->
      <div class="share-controls">
        <div class="theme-selector">
          <span>主题：</span>
          <button
            v-for="theme in themes"
            :key="theme.name"
            class="theme-button"
            :class="{ active: currentTheme === theme.name }"
            :style="{ backgroundColor: theme.background, color: theme.text }"
            @click="setTheme(theme.name)"
          >
            A
          </button>
        </div>
        <button
          class="download-button"
          @click="downloadAsImage"
          :disabled="isGeneratingImage"
        >
          {{ isGeneratingImage ? "生成中..." : "下载分享图片" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.share-card-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.share-card-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 20px;
}

.share-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.share-card-header h3 {
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.share-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  position: relative;
  overflow: hidden;
}

.share-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.share-text {
  flex: 1;
}

.share-content blockquote {
  font-size: 18px;
  line-height: 1.6;
  padding-left: 15px;
  margin: 0 0 20px 0;
  border-left-width: 4px;
  border-left-style: solid;
}

.share-source {
  font-size: 14px;
}

.share-qrcode-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.share-qrcode {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 160px;
}

.share-qrcode img {
  display: block;
  border-radius: 4px;
}

.qrcode-text {
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
  line-height: 1.4;
}

/* 控制按钮样式 */
.share-controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.theme-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.theme-button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.theme-button.active {
  border-color: #000;
}

.download-button {
  padding: 10px 16px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
  align-self: center;
}

.download-button:hover {
  background-color: #3367d6;
}

.download-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media (min-width: 768px) {
  .share-card {
    flex-direction: row;
  }

  .share-qrcode {
    margin-top: 0;
    min-width: 150px;
  }

  .theme-selector {
    justify-content: center;
  }
}

.formatted-text {
  white-space: pre-wrap;
  word-break: break-word;
}

.formatted-text p {
  margin: 0.5em 0;
}

.formatted-text strong,
.formatted-text b {
  font-weight: bold;
}

.formatted-text em,
.formatted-text i {
  font-style: italic;
}

.formatted-text a {
  color: inherit;
  text-decoration: underline;
}

.formatted-text ul,
.formatted-text ol {
  padding-left: 1.5em;
  margin: 0.5em 0;
}

.formatted-text code {
  font-family: monospace;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.1em 0.3em;
  border-radius: 3px;
}
</style>
