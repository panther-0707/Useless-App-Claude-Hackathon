import cv2
import numpy as np
from flask import Flask, render_template, Response, jsonify, request
from flask_socketio import SocketIO, emit
import threading
import time
from deepface import DeepFace
import base64

app = Flask(__name__)
app.config['SECRET_KEY'] = 'emoji_typing_secret'
socketio = SocketIO(app, cors_allowed_origins="*")

# Global variables
camera = None
camera_lock = threading.Lock()
current_target_emotion = None
detection_active = False
last_detections = []

# Emotion mapping
EMOTION_MAP = {
    'happy': ['😀', '😃', '😁', '😆', '😊'],
    'sad': ['😢', '😭'],
    'angry': ['😠', '😡'],
    'surprise': ['😮', '😯', '😲'],
    'neutral': ['😐', '😑'],
    'fear': ['😱', '😨']
}

# Reverse mapping
EMOJI_TO_EMOTION = {}
for emotion, emojis in EMOTION_MAP.items():
    for emoji in emojis:
        EMOJI_TO_EMOTION[emoji] = emotion

def get_camera():
    """Get or initialize the camera"""
    global camera
    with camera_lock:
        if camera is None:
            camera = cv2.VideoCapture(0)
            camera.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
            camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    return camera

def release_camera():
    """Release the camera"""
    global camera
    with camera_lock:
        if camera is not None:
            camera.release()
            camera = None

def detect_emotion(frame):
    """Detect emotion from a frame using DeepFace"""
    try:
        # Convert BGR to RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Analyze face
        result = DeepFace.analyze(rgb_frame, actions=['emotion'], enforce_detection=False)
        
        if isinstance(result, list):
            result = result[0]
        
        dominant_emotion = result['dominant_emotion']
        emotion_scores = result['emotion']
        
        return dominant_emotion, emotion_scores
    except Exception as e:
        print(f"Detection error: {e}")
        return None, None

def generate_frames():
    """Generate frames for video streaming"""
    camera = get_camera()
    
    while True:
        with camera_lock:
            success, frame = camera.read()
        
        if not success:
            break
        
        # Flip frame horizontally (mirror effect)
        frame = cv2.flip(frame, 1)
        
        # If detection is active, analyze the frame
        if detection_active and current_target_emotion:
            try:
                emotion, scores = detect_emotion(frame)
                
                if emotion:
                    # Add text overlay
                    cv2.putText(frame, f"Detected: {emotion}", (10, 30),
                              cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
                    
                    # Send detection result via SocketIO
                    socketio.emit('emotion_detected', {
                        'emotion': emotion,
                        'target': current_target_emotion,
                        'scores': scores
                    })
            except Exception as e:
                print(f"Frame analysis error: {e}")
        
        # Encode frame
        ret, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
        
        time.sleep(0.05)  # ~20 FPS

@app.route('/')
def index():
    """Serve the main page"""
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    """Video streaming route"""
    return Response(generate_frames(),
                   mimetype='multipart/x-mixed-replace; boundary=frame')

@socketio.on('connect')
def handle_connect():
    """Handle client connection"""
    print('Client connected')
    emit('connection_response', {'status': 'connected'})

@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnection"""
    print('Client disconnected')
    global detection_active
    detection_active = False

@socketio.on('start_detection')
def handle_start_detection(data):
    """Start emotion detection for a specific emoji"""
    global current_target_emotion, detection_active, last_detections
    
    emoji = data.get('emoji')
    target_emotion = EMOJI_TO_EMOTION.get(emoji)
    
    if target_emotion:
        current_target_emotion = target_emotion
        detection_active = True
        last_detections = []
        print(f"Started detection for {emoji} (emotion: {target_emotion})")
        emit('detection_started', {'emoji': emoji, 'emotion': target_emotion})
    else:
        emit('detection_error', {'message': 'Unknown emoji'})

@socketio.on('stop_detection')
def handle_stop_detection():
    """Stop emotion detection"""
    global detection_active, current_target_emotion
    detection_active = False
    current_target_emotion = None
    print("Stopped detection")
    emit('detection_stopped')

@socketio.on('emotion_detected')
def handle_emotion_detected(data):
    """Handle emotion detection result"""
    global last_detections
    
    detected = data.get('emotion')
    target = data.get('target')
    
    # Keep track of last detections
    last_detections.append(detected == target)
    if len(last_detections) > 5:
        last_detections.pop(0)
    
    # Check if we have 3 consecutive correct detections
    if len(last_detections) >= 3 and all(last_detections[-3:]):
        emit('expression_matched', {'success': True})
        last_detections = []

if __name__ == '__main__':
    print("=" * 50)
    print("🎮 Emoji Typing Challenge Server Starting...")
    print("=" * 50)
    print("📹 Initializing camera support...")
    print("🤖 Loading AI models (first run may take 2-3 minutes)...")
    print("")
    print("✅ Server will be ready at: http://localhost:5000")
    print("🌐 Access from other devices: http://YOUR_IP:5000")
    print("")
    print("Press Ctrl+C to stop the server")
    print("=" * 50)
    try:
        socketio.run(app, host='0.0.0.0', port=5000, debug=False, allow_unsafe_werkzeug=True)
    finally:
        release_camera()
        print("\n👋 Server stopped. Thanks for playing!")
