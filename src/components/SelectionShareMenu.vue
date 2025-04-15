<script setup>
import { onMounted, onUnmounted, ref } from "vue";

import ShareCard from "./ShareCard.vue";

const menuVisible = ref(false);
const menuPosition = ref({ x: 0, y: 0 });
const selectedText = ref("");
const shareCardVisible = ref(false);

// Function to show the menu
const showMenu = (x, y, text) => {
  if (text && text.trim() !== "") {
    selectedText.value = text;
    menuPosition.value = { x, y };
    menuVisible.value = true;
  }
};

// Function to hide the menu
const hideMenu = () => {
  menuVisible.value = false;
};

// Handle text selection
const handleSelection = () => {
  if (typeof window === "undefined") return;

  const selection = window.getSelection();
  if (selection && selection.toString().trim() !== "") {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Position the menu above the selection
    const x = rect.left + rect.width / 2;
    const y = rect.top - 10; // Position above the selection

    // 获取选中文本的HTML内容
    const container = document.createElement("div");
    const clonedSelection = range.cloneContents();
    container.appendChild(clonedSelection);
    const htmlContent = container.innerHTML;

    // 使用HTML内容而不是纯文本
    showMenu(x, y, htmlContent);
  }
};

// Handle mouseup event to detect selection
const handleMouseUp = () => {
  // 如果分享卡片已显示，不再监听选择变化
  if (typeof window === "undefined" || shareCardVisible.value) return;
  setTimeout(handleSelection, 10); // Small delay to ensure selection is complete
};

// Copy selected text to clipboard
const copyText = async () => {
  if (typeof navigator === "undefined") return;

  try {
    await navigator.clipboard.writeText(selectedText.value);
    // Use a non-blocking notification instead of alert
    console.log("文本已复制到剪贴板");
    hideMenu();
  } catch (err) {
    console.error("复制失败:", err);
  }
};

// Share selected text
const shareText = () => {
  // Show share card in the current page
  shareCardVisible.value = true;
  hideMenu();
};

// Close share card
const closeShareCard = () => {
  shareCardVisible.value = false;
  // 清空选中的文本，以便用户可以重新选择
  setTimeout(() => {
    if (typeof window !== "undefined") {
      window.getSelection()?.removeAllRanges();
    }
  }, 100);
};

// Click outside to hide menu
const handleClickOutside = (event) => {
  if (menuVisible.value && !event.target.closest(".selection-menu")) {
    hideMenu();
  }
};

onMounted(() => {
  if (typeof document === "undefined") return;

  document.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
  if (typeof document === "undefined") return;

  document.removeEventListener("mouseup", handleMouseUp);
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>

<template>
  <div>
    <div
      v-if="menuVisible"
      class="selection-menu"
      :style="{
        left: `${menuPosition.x}px`,
        top: `${menuPosition.y}px`,
        transform: 'translate(-50%, -100%)',
      }"
    >
      <button @click="copyText" class="menu-button copy-button" title="复制">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path
            d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
          ></path>
        </svg>
      </button>
      <button @click="shareText" class="menu-button share-button" title="分享">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
      </button>
    </div>

    <!-- Share Card Component -->
    <ShareCard
      :text="selectedText"
      :visible="shareCardVisible"
      @close="closeShareCard"
    />
  </div>
</template>

<style scoped>
.selection-menu {
  position: fixed;
  display: flex;
  background-color: #333;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  padding: 8px;
}

.menu-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin: 0 4px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
  color: white;
  transition: background-color 0.2s;
}

.menu-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
