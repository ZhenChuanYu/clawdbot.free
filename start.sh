#!/bin/bash

# Grok API 项目启动脚本
# 在 3004 端口启动生产预览服务器

# 获取脚本所在目录作为项目目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR"
PORT=3004
PID_FILE="$PROJECT_DIR/.server.pid"
LOG_FILE="$PROJECT_DIR/server.log"

echo "======================================"
echo "🚀 启动 Grok API 服务"
echo "======================================"

# 检查是否已经在运行
if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat "$PID_FILE")
    if ps -p "$OLD_PID" > /dev/null 2>&1; then
        echo "⚠️  服务已在运行中 (PID: $OLD_PID)"
        echo "   如需重启，请先运行 ./stop.sh"
        exit 1
    else
        echo "🧹 清理旧的 PID 文件..."
        rm -f "$PID_FILE"
    fi
fi

# 进入项目目录
cd "$PROJECT_DIR" || exit 1

# 检查是否已构建
if [ ! -d "dist" ]; then
    echo "📦 未找到 dist 目录，开始构建项目..."
    pnpm install
    pnpm build
    if [ $? -ne 0 ]; then
        echo "❌ 构建失败！"
        exit 1
    fi
    echo "✅ 构建完成"
fi

# 检查端口是否被占用
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "❌ 端口 $PORT 已被占用！"
    echo "   占用进程信息："
    lsof -i :$PORT
    exit 1
fi

# 启动服务器（后台运行，完全脱离终端）
echo "🔧 启动服务器在端口 $PORT..."
nohup pnpm preview --port $PORT --host > "$LOG_FILE" 2>&1 &
SERVER_PID=$!

# 将进程从当前 shell 的作业列表中移除，确保退出终端时进程继续运行
disown

# 保存 PID
echo $SERVER_PID > "$PID_FILE"

# 等待服务器启动
sleep 2

# 检查服务器是否成功启动
if ps -p $SERVER_PID > /dev/null 2>&1; then
    echo "✅ 服务器启动成功！"
    echo "   PID: $SERVER_PID"
    echo "   端口: $PORT"
    echo "   日志: $LOG_FILE"
    echo "   本地访问: http://localhost:$PORT"
    echo ""
    echo "💡 使用 ./stop.sh 停止服务"
    echo "💡 使用 tail -f $LOG_FILE 查看日志"
else
    echo "❌ 服务器启动失败！"
    echo "   请查看日志: $LOG_FILE"
    rm -f "$PID_FILE"
    exit 1
fi

echo "======================================"

