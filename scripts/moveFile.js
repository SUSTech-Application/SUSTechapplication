import rawMapping from "../src/mapping.yaml";
/**
 * 根据层级结构递归寻找文件
 * @param {string} basePath 当前路径
 * @param {object} structure 层级结构
 */
function findFiles(basePath, structure,rootPath) {
    for (const key in structure) {
        const value = structure[key];
        const currentPath = path.join(basePath, key);

        if (typeof value === 'string') {
            // 如果是文件，打印文件路径
            const newPath = path.join(rootPath, value);
            moveFile(currentPath, newPath);
        } else if (typeof value === 'object' && value !== null) {
            // 如果是文件夹，递归处理
            findFiles(currentPath, value);
        }
    }
}
/**
 * 移动文件或文件夹
 * @param {string} sourcePath 源路径
 * @param {string} destinationPath 目标路径
 */
function moveFile(sourcePath, destinationPath) {
    // 检查源路径是否存在
    if (!fs.existsSync(sourcePath)) {
        // 如果文件不存在，尝试在路径后添加 .md
        const mdSourcePath = `${sourcePath}.md`;
        const mdDestinationPath = `${destinationPath}.md`; 
        sourcePath = mdSourcePath; // 更新 sourcePath 为带 .md 的路径
        destinationPath = mdDestinationPath; // 更新 destinationPath 为带 .md 的路径
    }
    // 确保目标目录存在
    const destinationDir = path.dirname(destinationPath);
    if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true }); // 创建目标目录
    }

    // 移动文件或文件夹
    fs.rename(sourcePath, destinationPath, (err) => {
        if (err) {
            console.error(`Failed to move: ${err.message}`);
        } else {
            console.log(`Moved from ${sourcePath} to ${destinationPath}`);
        }
    });
}

// 从根目录开始寻找文件
const rootPath = path.resolve(__dirname, '../content/post');
findFiles(rootPath, rawMapping,rootPath);
