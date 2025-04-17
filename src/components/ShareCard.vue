<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

import { useData } from "vitepress";

// 定义Props类型
interface ShareCardProps {
  text: string;
  visible: boolean;
}

// 定义主题类型
interface Theme {
  name: string;
  background: string;
  text: string;
  border: string;
}

// 定义主题样式类型
interface ThemeStyle {
  background: string;
  color: string;
  borderColor: string;
}

// 定义dom-to-image-more选项类型
interface DomToImageOptions {
  quality?: number;
  bgcolor?: string;
  width?: number;
  height?: number;
  style?: Record<string, string>;
}

const props = defineProps<ShareCardProps>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

// 获取VitePress的主题设置
const { isDark } = useData();

const qrcodeGenerated = ref<boolean>(false);
const isGeneratingImage = ref<boolean>(false);
const shareCardRef = ref<HTMLElement | null>(null);
const currentTheme = ref<string>(isDark.value ? "dark" : "light"); // 根据网站主题设置默认值

// 监听网站主题变化
watch(isDark, (newValue: boolean) => {
  // 只有当当前主题是dark或light时才自动切换
  if (currentTheme.value === "dark" || currentTheme.value === "light") {
    currentTheme.value = newValue ? "dark" : "light";
  }
});

// 定义主题
const themes: Theme[] = [
  { name: "dark", background: "#333", text: "#fff", border: "#4285f4" },
  { name: "light", background: "#fff", text: "#333", border: "#4285f4" },
  { name: "blue", background: "#1a73e8", text: "#fff", border: "#fff" },
  { name: "green", background: "#0f9d58", text: "#fff", border: "#fff" },
  { name: "orange", background: "#ed6c00", text: "#ffffff", border: "#ffffff" },
  { name: "teal", background: "#2bb7b3", text: "#ffffff", border: "#ffffff" },
];

// 当前主题的样式
const themeStyle = computed<ThemeStyle>(() => {
  const theme = themes.find((t) => t.name === currentTheme.value) || themes[0];
  return {
    background: theme.background,
    color: theme.text,
    borderColor: theme.border,
  };
});

// 设置主题
const setTheme = (themeName: string): void => {
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
const generateQRCode = (): void => {
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
    qrCodeImg.alt = "扫码访问原文";
    qrCodeImg.style.width = "80px";
    qrCodeImg.style.height = "80px";

    // 处理主题颜色
    let bgColor = theme.background.replace("#", "");
    let fgColor = theme.text.replace("#", "");

    // 确保颜色格式正确
    if (!bgColor) bgColor = "ffffff";
    if (!fgColor) fgColor = "000000";

    // 使用QR Code API生成二维码
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(qrUrl)}&bgcolor=${bgColor}&color=${fgColor}`;

    // 设置加载事件
    qrCodeImg.onload = () => {
      qrcodeGenerated.value = true;
    };

    qrCodeImg.onerror = (e: Event) => {
      console.error("Failed to load QR code image:", e);
      // 尝试使用默认颜色
      qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(qrUrl)}`;
    };

    // 设置图片源
    qrCodeImg.src = qrCodeUrl;

    // 添加到DOM
    qrcodeElement.appendChild(qrCodeImg);
  } catch (err: unknown) {
    console.error(
      "Failed to generate QRCode:",
      err instanceof Error ? err.message : String(err),
    );
  }
};

// 声明dom-to-image-more模块
interface DomToImage {
  toPng(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
}

// 生成分享卡片图片
const generateShareImage = async (): Promise<string | null> => {
  if (!shareCardRef.value || typeof window === "undefined") return null;

  try {
    const domToImage = (await import("dom-to-image-more")) as unknown as {
      default: DomToImage;
    };

    // 创建一个新的div元素，用于生成图片
    const cloneContainer = document.createElement("div");
    cloneContainer.style.position = "absolute";
    cloneContainer.style.left = "-9999px";
    cloneContainer.style.top = "-9999px";
    document.body.appendChild(cloneContainer);

    // 克隆分享卡片
    const clone = shareCardRef.value.cloneNode(true) as HTMLElement;

    // 确保 HTML 格式在克隆中保留
    const blockquote = clone.querySelector(".formatted-text");
    if (blockquote instanceof HTMLElement) {
      blockquote.innerHTML = props.text;
    }

    // 确保背景色正确应用
    const theme =
      themes.find((t) => t.name === currentTheme.value) || themes[0];

    // 计算高分辨率的尺寸
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
    clone.style.borderRadius = "12px";
    clone.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";

    // 添加到临时容器
    cloneContainer.appendChild(clone);

    // 使用toPng生成高分辨率图片
    const dataUrl = await domToImage.default.toPng(clone, {
      quality: 1,
      bgcolor: theme.background,
      width: scaledWidth, // 使用放大后的宽度
      height: scaledHeight, // 使用放大后的高度
      style: {
        margin: "0",
        padding: "20px",
        "border-radius": "12px",
        "background-color": theme.background,
        color: theme.text,
        transform: `scale(${scale})`,
        "transform-origin": "top left",
      },
    });

    // 移除临时元素
    document.body.removeChild(cloneContainer);

    return dataUrl;
  } catch (err: unknown) {
    console.error(
      "Failed to generate image:",
      err instanceof Error ? err.message : String(err),
    );
    return null;
  }
};

// Function to download share card as image
const downloadAsImage = async (): Promise<void> => {
  if (!shareCardRef.value || typeof window === "undefined") return;

  isGeneratingImage.value = true;

  try {
    const dataUrl = await generateShareImage();

    if (!dataUrl) {
      throw new Error("Failed to generate image");
    }

    // 创建下载链接
    const link = document.createElement("a");
    link.download = `share-${new Date().getTime()}.png`;
    link.href = dataUrl;
    link.click();

    isGeneratingImage.value = false;
  } catch (err: unknown) {
    console.error(
      "Failed to download image:",
      err instanceof Error ? err.message : String(err),
    );
    isGeneratingImage.value = false;
  }
};

// 声明ClipboardItem接口
interface ClipboardItems {
  [key: string]: Blob;
}

interface ClipboardItemConstructor {
  new (items: ClipboardItems): ClipboardItem;
}

declare global {
  interface Navigator {
    clipboard: {
      write(items: ClipboardItem[]): Promise<void>;
    };
  }

  var ClipboardItem: ClipboardItemConstructor;
}

// 复制图片到剪贴板
const copyToClipboard = async (): Promise<void> => {
  if (!shareCardRef.value || typeof window === "undefined") return;

  isGeneratingImage.value = true;

  try {
    const dataUrl = await generateShareImage();

    if (!dataUrl) {
      throw new Error("Failed to generate image");
    }

    // 将dataUrl转换为Blob
    const res = await fetch(dataUrl);
    const blob = await res.blob();

    // 创建ClipboardItem并复制到剪贴板
    const item = new ClipboardItem({ "image/png": blob });
    await navigator.clipboard.write([item]);

    // 显示成功消息
    alert("图片已复制到剪贴板！");

    isGeneratingImage.value = false;
  } catch (err: unknown) {
    console.error(
      "Failed to copy image to clipboard:",
      err instanceof Error ? err.message : String(err),
    );
    alert("复制图片失败，请尝试下载图片后手动分享。");
    isGeneratingImage.value = false;
  }
};

// Watch for visibility changes to generate QR code when component becomes visible
watch(
  () => props.visible,
  (newValue: boolean) => {
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
          </div>
          <div class="share-footer">
            <div class="share-footer-left">
              <p class="share-website">南科飞跃手册</p>
              <p class="share-url">sustech-application.com</p>
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
                <p class="qrcode-text">扫码访问原文</p>
              </div>
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
        <div class="button-group">
          <button
            class="copy-button"
            @click="copyToClipboard"
            :disabled="isGeneratingImage"
          >
            {{ isGeneratingImage ? "生成中..." : "复制到剪贴板" }}
          </button>
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
  background-color: var(--vp-c-bg);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 20px;
  color: var(--vp-c-text-1);
}

.share-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.share-card-header h3 {
  margin: 0;
  color: var(--vp-c-text-1);
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

.share-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 15px;
}

.share-footer-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.share-website {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 5px 0;
}

.share-url {
  font-size: 14px;
  opacity: 0.8;
  margin: 0;
}

.share-qrcode-container {
  display: flex;
  justify-content: flex-end;
}

.share-qrcode {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 100px;
}

.share-qrcode img {
  display: block;
  border-radius: 4px;
  width: 80px;
  height: 80px;
}

.qrcode-text {
  margin-top: 5px;
  font-size: 12px;
  text-align: center;
  line-height: 1.2;
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

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
}

.download-button,
.copy-button {
  padding: 10px 16px;
  color: var(--vp-c-white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  flex: 1;
  max-width: 200px;
  background-color: var(--vp-c-brand);
  position: relative;
  overflow: hidden;
}

.download-button:hover,
.copy-button:hover {
  background-color: var(--vp-c-brand-dark);
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.download-button:active,
.copy-button:active {
  transform: translateY(0);
  box-shadow: none;
}

.download-button:disabled,
.copy-button:disabled {
  background-color: var(--vp-c-gray);
  cursor: not-allowed;
  opacity: 0.7;
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
