# -*- coding: utf-8 -*-
# # backend/api.py
import sys
import json
import numpy as np

def get_python_version():
    return sys.version

def get_numpy_matmul_result():
    a = np.array([[1, 2], [3, 4]])
    b = np.array([[5, 6], [7, 8]])
    return a.dot(b)

if __name__ == "__main__":
    # python-shell 会通过 stdin 发送数据，我们这里暂时用不到
    # 我们只执行函数并把结果打印到 stdout
    # python-shell 会捕获这个输出
    try:
        message = ''
        message += 'Hello from python, your version is: %s\n' % get_python_version()
        message += 'This is from numpy:\n%s\n' % get_numpy_matmul_result()
        # 将结果以 JSON 格式打印，方便 Node.js 解析
        print(json.dumps({"status": "success", "message": message}))
    except Exception as e:
        print(json.dumps({"status": "error", "message": str(e)}))
    
    sys.stdout.flush()

