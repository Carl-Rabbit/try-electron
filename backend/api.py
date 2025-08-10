# -*- coding: utf-8 -*-
# # backend/api.py
import sys
import json

def get_hello_message():
    """一个简单的函数，返回一个问候消息。"""
    return "Hello from Python! 🐍"

if __name__ == "__main__":
    # python-shell 会通过 stdin 发送数据，我们这里暂时用不到
    # 我们只执行函数并把结果打印到 stdout
    # python-shell 会捕获这个输出
    try:
        message = get_hello_message()
        # 将结果以 JSON 格式打印，方便 Node.js 解析
        print(json.dumps({"status": "success", "message": message}))
    except Exception as e:
        print(json.dumps({"status": "error", "message": str(e)}))
    
    sys.stdout.flush()

