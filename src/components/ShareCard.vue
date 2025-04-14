<script setup>
import { computed, defineProps, onMounted, ref, watch } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  "on-close": {
    type: Function,
    default: () => {},
  },
});

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
  if (qrcodeGenerated.value) {
    const qrcodeElement = document.getElementById("qrcode");
    if (qrcodeElement) {
      qrcodeElement.innerHTML = "";
      qrcodeGenerated.value = false;
      setTimeout(generateQRCode, 100);
    }
  }
};

// Function to generate QR code
const generateQRCode = async () => {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (!document.getElementById("qrcode") || qrcodeGenerated.value) return;

  try {
    const QRCodeModule = await import("qrcodejs2");
    const QRCode = QRCodeModule.default;

    // 获取当前主题颜色
    const theme =
      themes.find((t) => t.name === currentTheme.value) || themes[0];

    new QRCode(document.getElementById("qrcode"), {
      text: window.location.href,
      width: 128,
      height: 128,
      colorDark: theme.text,
      colorLight: theme.background,
      correctLevel: QRCode.CorrectLevel.H,
    });

    qrcodeGenerated.value = true;
  } catch (err) {
    console.error("Failed to load QRCode:", err);
  }
};

// Function to download share card as image
const downloadAsImage = async () => {
  if (!shareCardRef.value || typeof window === "undefined") return;

  isGeneratingImage.value = true;

  try {
    const domToImage = await import("dom-to-image-more");

    const dataUrl = await domToImage.toPng(shareCardRef.value, {
      quality: 0.95,
      bgcolor: "transparent",
    });

    // Create download link
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
    if (newValue && !qrcodeGenerated.value) {
      // Small delay to ensure DOM is ready
      setTimeout(generateQRCode, 100);
    }
  },
);

onMounted(() => {
  if (props.visible) {
    setTimeout(generateQRCode, 100);
  }
});
</script>

<template>
  <div v-if="visible" class="share-card-overlay" @click="props['on-close']">
    <div class="share-card-container" @click.stop>
      <div class="share-card-header">
        <h3>分享内容</h3>
        <button class="close-button" @click="props['on-close']">×</button>
      </div>

      <!-- 预览卡片 - 用于下载 -->
      <div
        class="share-card"
        ref="shareCardRef"
        :style="{
          backgroundColor: themeStyle.background,
          color: themeStyle.color,
          borderColor: themeStyle.borderColor,
        }"
      >
        <div class="share-content">
          <div class="share-text">
            <blockquote :style="{ borderLeftColor: themeStyle.borderColor }">
              {{ text }}
            </blockquote>
            <div class="share-source">
              <p>来源: 南方科技大学飞跃手册</p>
            </div>
          </div>
          <div
            class="share-qrcode"
            :style="{ backgroundColor: themeStyle.background }"
          >
            <div id="qrcode"></div>
            <p>扫描二维码访问原文</p>
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

.share-qrcode {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
}

.share-qrcode p {
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
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
</style>
