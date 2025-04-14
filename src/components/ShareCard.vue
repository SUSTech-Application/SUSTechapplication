<script setup>
import { defineProps, onMounted, ref, watch } from "vue";

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

// Function to generate QR code
const generateQRCode = async () => {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (!document.getElementById("qrcode") || qrcodeGenerated.value) return;

  try {
    const QRCodeModule = await import("qrcodejs2");
    const QRCode = QRCodeModule.default;

    new QRCode(document.getElementById("qrcode"), {
      text: window.location.href,
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
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
      bgcolor: "#fff",
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
      <div class="share-card" ref="shareCardRef">
        <div class="share-content">
          <blockquote>{{ text }}</blockquote>
          <div class="share-source">
            <p>来源: 南方科技大学飞跃手册</p>
          </div>
        </div>
        <div class="share-qrcode">
          <div id="qrcode"></div>
          <p>扫描二维码访问原文</p>
        </div>
        <div class="share-actions">
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
  border: 1px solid #eee;
  border-radius: 8px;
  margin: 20px 0;
}

.share-content {
  flex: 1;
}

.share-content blockquote {
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  border-left: 4px solid #4285f4;
  padding-left: 15px;
  margin: 0 0 20px 0;
}

.share-source {
  font-size: 14px;
  color: #666;
}

.share-qrcode {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.share-qrcode p {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

@media (min-width: 768px) {
  .share-card {
    flex-direction: row;
  }

  .share-qrcode {
    margin-top: 0;
  }
}

.share-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.download-button {
  padding: 8px 16px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.download-button:hover {
  background-color: #3367d6;
}

.download-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
