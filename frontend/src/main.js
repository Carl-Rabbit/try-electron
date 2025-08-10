// frontend/main.js
import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Electron + Vite + Python</h1>
    <div class="card">
      <button id="py-button" type="button">Call Python</button>
    </div>
    <p id="py-result" class="read-the-docs">
      Click the button to see the result from Python.
    </p>
  </div>
`

const pyButton = document.getElementById('py-button');
const pyResult = document.getElementById('py-result');

pyButton.addEventListener('click', async () => {
  pyResult.textContent = 'Calling Python...';
  try {
    // 调用通过 preload.js 暴露的 'runPython' 函数
    // 'window.api' 是在 preload.js 中定义的
    const result = await window.api.runPython();
    
    if (result.status === 'success') {
        pyResult.textContent = `Result from Python: "${result.message}"`;
    } else {
        pyResult.textContent = `Error: ${result.message}`;
    }

  } catch (error) {
    console.error('Error calling Python:', error);
    pyResult.textContent = `Error: ${error.message}`;
  }
});
