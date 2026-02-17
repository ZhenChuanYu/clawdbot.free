#!/bin/bash

# 项目停止脚本

# 获取脚本所在目录作为项目目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR"
PID_FILE="$PROJECT_DIR/.server.pid"
PORT=3004

echo "======================================"
echo "🛑 停止服务"
echo "======================================"

# 检查 PID 文件是否存在
if [ ! -f "$PID_FILE" ]; then
    echo "⚠️  未找到 PID 文件"
    
    # 尝试通过端口查找进程
    PID=$(lsof -ti:$PORT)
    if [ -z "$PID" ]; then
        echo "✅ 服务未在运行"
        exit 0
    else
        echo "🔍 发现端口 $PORT 上的进程 (PID: $PID)"
        echo "   正在停止..."
        kill $PID 2>/dev/null
        sleep 1
        
        # 强制杀死（如果还在运行）
        if ps -p $PID > /dev/null 2>&1; then
            echo "   使用强制停止..."
            kill -9 $PID 2>/dev/null
        fi
        
        echo "✅ 服务已停止"
        exit 0
    fi
fi

# 读取 PID
PID=$(cat "$PID_FILE")

# 检查进程是否存在
if ! ps -p $PID > /dev/null 2>&1; then
    echo "⚠️  进程不存在 (PID: $PID)"
    rm -f "$PID_FILE"
    echo "✅ 已清理 PID 文件"
    exit 0
fi

# 停止进程
echo "🔧 正在停止进程 (PID: $PID)..."
kill $PID 2>/dev/null

# 等待进程结束
for i in {1..5}; do
    if ! ps -p $PID > /dev/null 2>&1; then
        echo "✅ 服务已成功停止"
        rm -f "$PID_FILE"
        echo "======================================"
        exit 0
    fi
    sleep 1
done

# 如果进程还在运行，强制杀死
if ps -p $PID > /dev/null 2>&1; then
    echo "⚠️  进程未响应，使用强制停止..."
    kill -9 $PID 2>/dev/null
    sleep 1
    
    if ps -p $PID > /dev/null 2>&1; then
        echo "❌ 无法停止进程！"
        exit 1
    fi
fi

# 清理 PID 文件
rm -f "$PID_FILE"
echo "✅ 服务已强制停止"
echo "======================================"

