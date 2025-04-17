import rawMapping from "../src/mapping.yaml";
const fs = require('fs');
const path = require('path');

/**
 * 递归解析文件结构
 * @param {string} basePath 当前路径
 * @param {object} structure 文件结构
 */
function parseFiles(basePath, structure,newPath) {
  for (const key in structure) {
    const value = structure[key];
    const currentPath = path.join(basePath, key);

    if (typeof value === 'string') {
      const destinationPath = path.join(newPath, value);
      moveFile(currentPath, destinationPath); // 移动文件
    } else if (typeof value === 'object' && value !== null) {
      parseFiles(currentPath, value);
    }
  }
}

/**
 * 移动文件
 * @param {string} sourcePath 源文件路径
 * @param {string} destinationPath 目标文件路径
 */
function moveFile(sourcePath, destinationPath) {
    // 确保目标目录存在
    const destinationDir = path.dirname(destinationPath);
    if (!fs.existsSync(sourcePath)) {
      sourcePath = `${sourcePath}.md`;
      destinationPath = `${destinationPath}.md`;
    }
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true }); // 创建目标目录
    }
    // 移动文件
    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) {
        console.error(`Failed to move file: ${err.message}`);
      } else {
        console.log(`File moved from ${sourcePath} to ${destinationPath}`);
      }
    });
  }
// 调用函数解析文件结构
const rootPath = path.resolve(__dirname, '../content');
const newPath = path.resolve(__dirname, '../content/post');
parseFiles(rootPath, rawMapping,newPath);