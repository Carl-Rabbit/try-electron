# -*- coding: utf-8 -*-

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# 创建 FastAPI 应用实例
app = FastAPI()

# 关键：配置 CORS 中间件
# 这允许我们的前端 (来自 file:// 协议) 向这个本地服务器发送请求
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源，在生产中可以更严格
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有 HTTP 方法
    allow_headers=["*"],  # 允许所有 HTTP 头
)

@app.get("/hello")
def read_root():
    """一个简单的 API 端点"""
    return {"status": "success", "message": "Hello from FastAPI! 🚀"}

# 这个部分是为了方便直接运行此脚本进行测试
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
    
    