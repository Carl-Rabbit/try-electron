// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// 在 'window' 对象上暴露一个名为 'api' 的全局变量
// 这个 API 只能调用我们在这里定义的方法
contextBridge.exposeInMainWorld('api', {
  // 暴露一个名为 'runPython' 的函数给前端
  // 这个函数会调用主进程的 'run-python' 事件
  runPython: (args) => ipcRenderer.invoke('run-python', args),
});
