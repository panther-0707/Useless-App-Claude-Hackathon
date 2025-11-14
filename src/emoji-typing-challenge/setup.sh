#!/bin/bash

echo "🎮 EMOJI TYPING CHALLENGE - AUTO SETUP"
echo "======================================"
echo ""

# Detect OS
OS="unknown"
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="mac"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    OS="windows"
fi

echo "🖥️  Detected OS: $OS"
echo ""

# Check if Docker is installed
if command -v docker &> /dev/null; then
    echo "✅ Docker is already installed!"
    echo ""
    echo "🚀 Starting the game with Docker..."
    echo "   (First run will download ~500MB of dependencies)"
    echo ""
    docker-compose up --build
else
    echo "❌ Docker is not installed"
    echo ""
    echo "📦 Docker is required to run this game automatically."
    echo "   It will handle all dependencies for you!"
    echo ""
    echo "🔗 Installation instructions:"
    echo ""
    
    if [ "$OS" == "mac" ]; then
        echo "   For macOS:"
        echo "   1. Download Docker Desktop from: https://www.docker.com/products/docker-desktop"
        echo "   2. Install and run Docker Desktop"
        echo "   3. Run this script again: ./setup.sh"
    elif [ "$OS" == "linux" ]; then
        echo "   For Linux:"
        echo "   Run these commands:"
        echo ""
        echo "   curl -fsSL https://get.docker.com -o get-docker.sh"
        echo "   sudo sh get-docker.sh"
        echo "   sudo usermod -aG docker $USER"
        echo "   newgrp docker"
        echo ""
        echo "   Then run this script again: ./setup.sh"
    elif [ "$OS" == "windows" ]; then
        echo "   For Windows:"
        echo "   1. Download Docker Desktop from: https://www.docker.com/products/docker-desktop"
        echo "   2. Install and run Docker Desktop"
        echo "   3. Run this script again in Git Bash or WSL"
    else
        echo "   Visit: https://docs.docker.com/get-docker/"
    fi
    echo ""
    echo "After installing Docker, run: ./setup.sh"
    exit 1
fi
