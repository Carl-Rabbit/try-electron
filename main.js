// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { PythonShell } = require('python-shell');

// 判断是否为开发环境
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // __dirname 指向当前文件的路径
      // path.join 将路径片段正确地连接起来
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // 推荐的安全设置
      nodeIntegration: false, // 推荐的安全设置
    },
  });

  // 开发环境下加载 Vite 开发服务器，生产环境下加载构建好的文件
  if (isDev) {
    // Vite 默认端口是 5173
    win.loadURL('http://localhost:5173');
    // 打开开发者工具
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, 'frontend/dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// --- IPC 和 Python 调用 ---

// 设置 Python 脚本的路径
// 在开发环境中，我们直接指向 backend 文件夹
// 在打包后（生产环境），脚本会被复制到 app.asar 同级的 resources 文件夹下
const pythonScriptPath = isDev
  ? path.join(__dirname, 'backend')
  : path.join(process.resourcesPath, 'backend');

ipcMain.handle('run-python', async (event, args) => {
  const options = {
    mode: 'json', // 将 Python 的输出解析为 JSON
    pythonPath: 'python', // 或者指定你的 python.exe/python3 的绝对路径
    scriptPath: pythonScriptPath, // Python 脚本所在的目录
    args: [], // 如果需要向 Python 传递参数，放在这里
  };

  try {
    // 运行 python 脚本并等待结果
    const results = await PythonShell.run('api.py', options);
    // PythonShell.run 返回一个数组，包含所有 print 的输出
    // 因为我们只 print 了一次，所以取第一个元素
    return results[0];
  } catch (err) {
    console.error('Failed to run python script:', err);
    return { status: 'error', message: err.message };
  }
});
