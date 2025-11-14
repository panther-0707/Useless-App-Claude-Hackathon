import React, { useState, useEffect, useRef } from 'react'
import Footer from '../components/Footer'
import './TestTypingPage.css'

const TestTypingPage = () => {
  // Words list for typing test
  const words = [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it',
    'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this',
    'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or',
    'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so',
    'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when',
    'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people',
    'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than',
    'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back',
    'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even',
    'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'thing'
  ];

  const emojiList = ['😀', '😃', '😁', '😆', '😊', '😢', '😭', '😠', '😡', '😮', '😯', '😲', '😐', '😑', '😱', '😨'];

  const [gameState, setGameState] = useState('setup'); // setup, playing, emoji, results
  const [selectedTime, setSelectedTime] = useState(60);
  const [customTime, setCustomTime] = useState(5);
  const [showCustomInput, setShowCustomInput] = useState(false);
  
  // Game stats
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [currentWord, setCurrentWord] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [wordsTyped, setWordsTyped] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [emojisCompleted, setEmojisCompleted] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState('');
  const [emojiSchedule, setEmojiSchedule] = useState([]);
  const [totalEmojisNeeded, setTotalEmojisNeeded] = useState(0);
  const [emojiCountdown, setEmojiCountdown] = useState(0);
  const [wordStatus, setWordStatus] = useState(''); // '', 'correct', 'incorrect'

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const emojiTimerRef = useRef(null);

  // Calculate stats
  const elapsedTime = selectedTime - timeRemaining;
  const elapsedMinutes = elapsedTime / 60;
  const wpm = elapsedMinutes > 0 ? Math.round(correctWords / elapsedMinutes) : 0;
  const totalAttempts = correctWords + incorrectWords;
  const accuracy = totalAttempts > 0 ? Math.round((correctWords / totalAttempts) * 100) : 100;

  // Generate random word
  const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
  };

  // Generate emoji schedule
  const generateEmojiSchedule = (timeInSeconds) => {
    const minutes = timeInSeconds / 60;
    const totalEmojis = Math.round(5 * minutes);
    const schedule = [];
    
    let wordCount = 0;
    for (let i = 0; i < totalEmojis; i++) {
      const interval = Math.floor(Math.random() * 11) + 5; // 5-15 words
      wordCount += interval;
      schedule.push(wordCount);
    }
    
    setEmojiSchedule(schedule);
    setTotalEmojisNeeded(totalEmojis);
  };

  // Start game
  const startGame = () => {
    setGameState('playing');
    setTimeRemaining(selectedTime);
    setWordsTyped(0);
    setCorrectWords(0);
    setIncorrectWords(0);
    setEmojisCompleted(0);
    setCurrentWord(getRandomWord());
    setInputValue('');
    setWordStatus('');
    generateEmojiSchedule(selectedTime);
    
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Game timer
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState]);

  // Emoji timer
  useEffect(() => {
    if (gameState === 'emoji') {
      setEmojiCountdown(5);
      emojiTimerRef.current = setInterval(() => {
        setEmojiCountdown(prev => {
          if (prev <= 1) {
            endEmojiChallenge();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (emojiTimerRef.current) {
        clearInterval(emojiTimerRef.current);
      }
    };
  }, [gameState]);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === currentWord) {
      setWordStatus('correct');
    } else if (currentWord.startsWith(value)) {
      setWordStatus('');
    } else {
      setWordStatus('incorrect');
    }
  };

  // Handle space key or word completion
  const handleKeyPress = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      checkWord();
    }
  };

  // Check typed word
  const checkWord = () => {
    const typed = inputValue.trim();
    
    if (typed === currentWord) {
      setCorrectWords(prev => prev + 1);
      setWordsTyped(prev => prev + 1);
      
      // Check if emoji challenge should appear
      if (emojiSchedule.includes(correctWords + 1)) {
        showEmojiChallenge();
      } else {
        nextWord();
      }
    } else if (typed !== '') {
      setIncorrectWords(prev => prev + 1);
      setWordsTyped(prev => prev + 1);
      nextWord();
    }
  };

  // Next word
  const nextWord = () => {
    setCurrentWord(getRandomWord());
    setInputValue('');
    setWordStatus('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  // Show emoji challenge
  const showEmojiChallenge = () => {
    const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
    setCurrentEmoji(randomEmoji);
    setGameState('emoji');
  };

  // Handle emoji click (simulating making the expression)
  const handleEmojiClick = () => {
    setEmojisCompleted(prev => prev + 1);
    endEmojiChallenge();
  };

  // End emoji challenge
  const endEmojiChallenge = () => {
    if (emojiTimerRef.current) {
      clearInterval(emojiTimerRef.current);
    }
    setGameState('playing');
    nextWord();
  };

  // End game
  const endGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setGameState('results');
  };

  // Restart game
  const restartGame = () => {
    setGameState('setup');
    setShowCustomInput(false);
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="test-typing-page">
      <div className="typing-hero">
        <h1>⌨️ Emoji Typing Challenge</h1>
        <p>Test your typing speed with fun emoji interruptions!</p>
      </div>
      
      <div className="typing-game-container">
        {/* Setup Screen */}
        {gameState === 'setup' && (
          <div className="game-setup">
            <h2>Choose Your Challenge Duration</h2>
            <div className="mode-selection">
              <button 
                className={`mode-btn ${selectedTime === 60 && !showCustomInput ? 'active' : ''}`}
                onClick={() => {
                  setSelectedTime(60);
                  setShowCustomInput(false);
                }}
              >
                1 Minute
              </button>
              <button 
                className={`mode-btn ${selectedTime === 180 && !showCustomInput ? 'active' : ''}`}
                onClick={() => {
                  setSelectedTime(180);
                  setShowCustomInput(false);
                }}
              >
                3 Minutes
              </button>
              <button 
                className={`mode-btn ${selectedTime === 600 && !showCustomInput ? 'active' : ''}`}
                onClick={() => {
                  setSelectedTime(600);
                  setShowCustomInput(false);
                }}
              >
                10 Minutes
              </button>
              <button 
                className={`mode-btn ${showCustomInput ? 'active' : ''}`}
                onClick={() => setShowCustomInput(!showCustomInput)}
              >
                Custom
              </button>
            </div>

            {showCustomInput && (
              <div className="custom-time-input">
                <label>Minutes (1-10):</label>
                <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  value={customTime}
                  onChange={(e) => setCustomTime(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                />
                <button 
                  className="mode-btn"
                  onClick={() => {
                    setSelectedTime(customTime * 60);
                  }}
                >
                  Set Time
                </button>
              </div>
            )}

            <div className="info-box">
              💡 Emoji challenges appear randomly every 5-15 words! Click the emoji to continue.
            </div>

            <button className="start-btn" onClick={startGame}>
              Start Challenge!
            </button>
          </div>
        )}

        {/* Game Stats */}
        {(gameState === 'playing' || gameState === 'emoji') && (
          <>
            <div className="game-stats">
              <div className="stat">
                <div className="stat-label">Time</div>
                <div className="stat-value">{formatTime(timeRemaining)}</div>
              </div>
              <div className="stat">
                <div className="stat-label">WPM</div>
                <div className="stat-value">{wpm}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Words</div>
                <div className="stat-value">{wordsTyped}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Accuracy</div>
                <div className="stat-value">{accuracy}%</div>
              </div>
            </div>

            {/* Playing State */}
            {gameState === 'playing' && (
              <div className="typing-area">
                <div className={`word-display ${wordStatus}`}>
                  {currentWord}
                </div>
                <input 
                  ref={inputRef}
                  type="text"
                  className="typing-input"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type the word above..."
                  autoFocus
                />
              </div>
            )}

            {/* Emoji Challenge */}
            {gameState === 'emoji' && (
              <div className="emoji-challenge-overlay">
                <div className="emoji-challenge-box">
                  <div className="emoji-display">{currentEmoji}</div>
                  <div className="emoji-instruction">Click the emoji to continue!</div>
                  <div className="emoji-timer">Time remaining: {emojiCountdown}s</div>
                  <button className="emoji-btn" onClick={handleEmojiClick}>
                    {currentEmoji}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Results Screen */}
        {gameState === 'results' && (
          <div className="game-results">
            <h2>🎉 Challenge Complete!</h2>
            <div className="final-stats">
              <div className="final-stat">
                <div className="stat-label">Words Per Minute</div>
                <div className="stat-value">{wpm}</div>
              </div>
              <div className="final-stat">
                <div className="stat-label">Total Words</div>
                <div className="stat-value">{wordsTyped}</div>
              </div>
              <div className="final-stat">
                <div className="stat-label">Accuracy</div>
                <div className="stat-value">{accuracy}%</div>
              </div>
              <div className="final-stat">
                <div className="stat-label">Emojis Completed</div>
                <div className="stat-value">{emojisCompleted}/{totalEmojisNeeded}</div>
              </div>
            </div>
            <button className="restart-btn" onClick={restartGame}>
              Play Again
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  )
}

export default TestTypingPage
