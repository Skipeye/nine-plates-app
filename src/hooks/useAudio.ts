import { useCallback } from 'react';

export const useAudio = () => {
  // Create audio context for better browser compatibility
  const playSound = useCallback((frequency: number, duration: number, type: 'sine' | 'square' | 'sawtooth' = 'sine') => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.log('Audio not supported or blocked');
    }
  }, []);

  const playSmashSound = useCallback(() => {
    // WINDOW SMASH - sharp, crystalline, devastating
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Window smash duration
      const bufferSize = audioContext.sampleRate * 1.2; // 1.2 seconds of glass destruction
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const output = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        // Sharp glass decay
        const decay = Math.exp(-i / (audioContext.sampleRate * 0.2));
        const noise = (Math.random() * 2 - 1) * decay;
        
        // Window smash frequency stages
        if (i < bufferSize * 0.05) {
          // SHARP initial crack - high frequency glass break
          output[i] = noise * (1 + Math.sin(i * 0.05)) * 1.4;
        } else if (i < bufferSize * 0.1) {
          // Glass spider-webbing and initial shards
          output[i] = noise * (1 + Math.sin(i * 0.02)) * 1.1;
        } else if (i < bufferSize * 0.3) {
          // Major glass chunks falling
          output[i] = noise * Math.sin(i * 0.008) * 0.9;
        } else if (i < bufferSize * 0.7) {
          // Smaller glass shards cascading
          output[i] = noise * Math.sin(i * 0.004) * 0.6;
        } else {
          // Final glass pieces settling with high-frequency sparkle
          output[i] = noise * Math.sin(i * 0.001) * 0.3 * (1 + Math.sin(i * 0.01) * 0.5);
        }
      }
      
      const source = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();
      
      source.buffer = buffer;
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Sharp glass impact volume curve
      gainNode.gain.setValueAtTime(0.7, audioContext.currentTime); // Sharp initial impact
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.2); // Glass settling fade
      
      source.start(audioContext.currentTime);
      
      // Add crystalline echo - like glass in a large room
      setTimeout(() => {
        try {
          const echoSource = audioContext.createBufferSource();
          const echoGain = audioContext.createGain();
          
          echoSource.buffer = buffer;
          echoSource.connect(echoGain);
          echoGain.connect(audioContext.destination);
          
          // Crystalline reverb effect
          echoGain.gain.setValueAtTime(0.2, audioContext.currentTime);
          echoGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.6);
          
          echoSource.start(audioContext.currentTime);
        } catch (error) {
          // Silent fail for echo
        }
      }, 150);
      
    } catch (error) {
      console.log('Audio not supported or blocked');
    }
  }, [playSound]);

  const playWobbleSound = useCallback(() => {
    // Realistic wobbling sound - like a spinning plate losing balance
    // Oscillating frequency that gets more erratic
    const baseFreq = 220;
    
    // Smooth wobble getting more unstable
    playSound(baseFreq, 0.08, 'sine');
    setTimeout(() => playSound(baseFreq * 1.1, 0.08, 'sine'), 80);
    setTimeout(() => playSound(baseFreq * 0.9, 0.08, 'sine'), 160);
    setTimeout(() => playSound(baseFreq * 1.15, 0.08, 'sine'), 240);
    setTimeout(() => playSound(baseFreq * 0.85, 0.08, 'sine'), 320);
    setTimeout(() => playSound(baseFreq * 1.2, 0.08, 'sine'), 400);
    setTimeout(() => playSound(baseFreq * 0.8, 0.1, 'sine'), 480);
  }, [playSound]);

  const playCompleteSound = useCallback(() => {
    // Success sound - ascending notes
    playSound(523, 0.1, 'sine'); // C
    setTimeout(() => playSound(659, 0.1, 'sine'), 100); // E
    setTimeout(() => playSound(784, 0.2, 'sine'), 200); // G
  }, [playSound]);

  return {
    playSmashSound,
    playWobbleSound,
    playCompleteSound
  };
};
