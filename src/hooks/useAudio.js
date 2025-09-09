import { useState, useRef, useEffect } from 'react';

/**
 * 音频播放Hook
 */
export const useAudio = (src) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!src) return;

    const audio = new Audio(src);
    audioRef.current = audio;

    // 设置音频属性
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = 'metadata';

    // 事件监听
    const handleCanPlayThrough = () => {
      setIsLoaded(true);
      setError(null);
    };

    const handleError = (e) => {
      setError('音频加载失败');
      setIsLoaded(false);
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, [src]);

  const play = async () => {
    if (!audioRef.current || !isLoaded) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      setError('播放失败，可能需要用户交互');
      setIsPlaying(false);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const setVolume = (volume) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  };

  return {
    isPlaying,
    isLoaded,
    error,
    play,
    pause,
    toggle,
    setVolume,
  };
};
