# 🎮 Emoji Typing Challenge - Complete Package

AI-powered typing game with facial expression detection! Race against time while making silly faces! 😄

---

## ⚡ QUICK START

### 🐳 Option 1: Docker (EASIEST - Works on Any Python Version)

```bash
# Start the game
docker-compose up --build

# Open: http://localhost:5000
```

**First run takes 5-10 minutes (downloads dependencies). Future runs: instant!**

### 🐍 Option 2: Python 3.13+ (Lightweight Alternative)

```bash
# Install dependencies
pip install -r requirements_alternative.txt

# Run the game
python emoji_typing_game_fer.py

# Open: http://localhost:5000
```

---

## 📋 What You Need

### For Docker:
- ✅ Docker Desktop (https://www.docker.com/products/docker-desktop)
- ✅ Webcam
- ✅ Any OS (Windows, Mac, Linux)

### For Python Direct:
- ✅ Python 3.8+ (tested with 3.13)
- ✅ Webcam
- ✅ pip

---

## 🎯 Game Features

- **AI Face Detection** - Real facial expression recognition
- **Random Emoji Challenges** - Appear every 5-15 words
- **Smart Scheduling** - 1min=5 emojis, 3min=15, 10min=50
- **Multiple Modes** - 1, 3, 10 minutes, or custom
- **Real-time Stats** - WPM, accuracy, word count

---

## 📁 Repository Structure

```
emoji-typing-challenge/
├── 🐳 DOCKER VERSION (Recommended)
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── setup.sh / setup.bat
│   ├── emoji_typing_game.py (DeepFace)
│   └── requirements.txt
│
├── 🐍 PYTHON 3.13 VERSION (Alternative)
│   ├── emoji_typing_game_fer.py (FER)
│   └── requirements_alternative.txt
│
├── 🎨 FRONTEND
│   └── templates/index.html
│
├── 📚 DOCUMENTATION
│   ├── README.md (this file)
│   ├── PYTHON_313_COMPATIBILITY.md
│   ├── SETUP_INSTRUCTIONS.md
│   └── README_DOCKER.md
│
└── 🗑️ OLD FILES (can delete)
    ├── emoji-typing-test.html
    └── start.sh
```

---

## 🚀 Detailed Setup Instructions

### Docker Setup (All Operating Systems)

#### Windows:
```bash
# 1. Install Docker Desktop
# Download from: https://www.docker.com/products/docker-desktop

# 2. Run the game
setup.bat
```

#### Mac/Linux:
```bash
# 1. Install Docker Desktop (Mac) or Docker Engine (Linux)
# 2. Run the game
./setup.sh
```

### Python Direct Setup

```bash
# Python 3.13+ (uses FER library)
pip install -r requirements_alternative.txt
python emoji_typing_game_fer.py

# Python 3.10-3.11 (uses DeepFace - more accurate)
pip install -r requirements.txt
python emoji_typing_game.py
```

---

## 🎮 How to Play

1. **Choose Mode** - Select 1, 3, 10 minutes, or custom
2. **Start Typing** - Type the words shown on screen
3. **Emoji Challenge** - Randomly appears after 5-15 words
4. **Make Expression** - Match the emoji with your face
5. **Continue** - Keep typing after 3 successful detections!

### Supported Expressions:
- 😀 😃 😁 **Happy** - Big smile!
- 😢 😭 **Sad** - Frown
- 😠 😡 **Angry** - Mad face
- 😮 😯 😲 **Surprised** - Open mouth wide
- 😐 😑 **Neutral** - Blank face
- 😱 😨 **Fear** - Scared face

---

## 🔧 Technical Details

### Two Versions Available:

| Feature | DeepFace (Docker) | FER (Python 3.13) |
|---------|------------------|-------------------|
| Python Version | 3.10 (in Docker) | 3.8 - 3.13 |
| Accuracy | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Speed | Medium | Fast |
| Dependencies | TensorFlow, OpenCV | FER, OpenCV |
| File Size | ~500MB | ~100MB |
| Setup | Docker only | pip install |

### Why Two Versions?

**Python 3.13 is too new!** TensorFlow (used by DeepFace) doesn't support it yet. So I created:

1. **Docker version** - Uses Python 3.10 internally (works with your Python 3.13)
2. **FER version** - Lightweight, works natively with Python 3.13

---

## 🐛 Troubleshooting

### Docker Issues

**"Docker not found"**
```bash
# Install Docker Desktop
# https://www.docker.com/products/docker-desktop
```

**Camera not working in Docker**
- Grant Docker camera permissions in system settings
- On Linux: Run with `--privileged` flag (already set)

**Port 5000 already in use**
```yaml
# Edit docker-compose.yml:
ports:
  - "5001:5000"  # Change first number
```

### Python Issues

**"No module named 'tensorflow'"**
```bash
# Use Python 3.13 compatible version:
pip install -r requirements_alternative.txt
python emoji_typing_game_fer.py
```

**Camera not detected**
- Check browser permissions
- Try a different browser (Chrome recommended)
- Make sure no other app is using the camera

**Slow detection**
- Improve lighting
- Keep face centered
- Make exaggerated expressions

---

## 📊 Performance Tips

1. **Good Lighting** - Bright, even light works best
2. **Face Camera** - Keep face centered
3. **Clear Expressions** - Exaggerate for better detection
4. **Hold Expression** - Stay still for 1-2 seconds
5. **Chrome Browser** - Best compatibility

---

## 🌐 Network Access

### Local Only:
```
http://localhost:5000
```

### From Other Devices (same network):
```bash
# Find your IP:
# Windows: ipconfig
# Mac/Linux: ifconfig

# Access from phones/tablets:
http://YOUR_IP:5000
```

---

## 📝 For Developers

### Project Structure:
```python
# Backend (Python + Flask)
- Flask server
- SocketIO for real-time communication
- OpenCV for camera
- DeepFace/FER for emotion detection

# Frontend (HTML + JS)
- Vanilla JavaScript
- Socket.IO client
- Responsive CSS
```

### Running in Development:
```bash
# Docker
docker-compose up --build

# Python (with auto-reload)
FLASK_ENV=development python emoji_typing_game.py
```

### Customization:
- **Words**: Edit `templates/index.html` → `words` array
- **Emojis**: Edit both Python and HTML files
- **Detection threshold**: Change `requiredDetections` in HTML
- **Timing**: Edit `emojiSchedule` logic

---

## 🎨 Customization Examples

### Add More Words:
```javascript
// In templates/index.html
const words = [
    ...existing words...,
    'your', 'custom', 'words', 'here'
];
```

### Change Detection Sensitivity:
```javascript
// In templates/index.html
const requiredDetections = 5;  // Default: 3
```

### Adjust Emoji Frequency:
```javascript
// In templates/index.html, generateEmojiSchedule()
const interval = Math.floor(Math.random() * 11) + 10;  // 10-20 words
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Test with both Docker and Python versions
4. Submit a pull request

---

## 📄 License

Free to use and modify for personal and educational projects!

---

## 🎉 Have Fun!

Challenge your friends to see who can type the fastest while making silly faces! 

**Star the repo if you enjoyed it! ⭐**

---

## 📞 Support

Having issues? Check these docs:
- 🐳 Docker problems: `README_DOCKER.md`
- 🐍 Python 3.13: `PYTHON_313_COMPATIBILITY.md`
- ⚡ Quick setup: `SETUP_INSTRUCTIONS.md`

---

**Made with ❤️ using Python, OpenCV, DeepFace/FER, Flask, and Docker**
