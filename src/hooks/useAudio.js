import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * 音频播放Hook - 完全重写，修复所有已知问题
 */
export const useAudio = (src) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolumeState] = useState(0.3);
  const audioRef = useRef(null);
  const isInitializedRef = useRef(false);

  // 清理函数
  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
      audioRef.current.removeEventListener('error', handleError);
      audioRef.current.removeEventListener('ended', handleEnded);
      audioRef.current.removeEventListener('play', handlePlay);
      audioRef.current.removeEventListener('pause', handlePause);
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.src = '';
      audioRef.current = null;
    }
  }, []);

  // 事件处理函数
  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleCanPlayThrough = useCallback(() => {
    setIsLoaded(true);
    setError(null);
  }, []);

  const handleError = useCallback((e) => {
    console.error('Audio error:', e);
    setError('音频加载失败，请检查文件路径');
    setIsLoaded(false);
    setIsPlaying(false);
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  // 初始化音频
  useEffect(() => {
    if (!src || isInitializedRef.current) return;

    cleanup(); // 清理之前的实例

    try {
      const audio = new Audio();
      audioRef.current = audio;
      isInitializedRef.current = true;

      // 设置音频属性
      audio.loop = true;
      audio.volume = volume;
      audio.preload = 'metadata';
      audio.crossOrigin = 'anonymous'; // 处理跨域问题

      // 添加事件监听器
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('canplaythrough', handleCanPlayThrough);
      audio.addEventListener('error', handleError);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('timeupdate', handleTimeUpdate);

      // 设置源地址
      audio.src = src;
      audio.load();

    } catch (err) {
      console.error('Failed to initialize audio:', err);
      setError('音频初始化失败');
    }

    return cleanup;
  }, [src, volume, cleanup, handleLoadedMetadata, handleCanPlayThrough, handleError, handleEnded, handlePlay, handlePause, handleTimeUpdate]);

  // 播放函数
  const play = useCallback(async () => {
    if (!audioRef.current || !isLoaded) {
      setError('音频尚未加载完成');
      return false;
    }

    try {
      // 处理浏览器的自动播放策略
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
      setError(null);
      return true;
    } catch (err) {
      console.error('Play failed:', err);
      if (err.name === 'NotAllowedError') {
        setError('浏览器阻止了自动播放，请点击播放按钮');
      } else {
        setError('播放失败：' + err.message);
      }
      setIsPlaying(false);
      return false;
    }
  }, [isLoaded]);

  // 暂停函数
  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  }, []);

  // 切换播放状态
  const toggle = useCallback(async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  }, [isPlaying, play, pause]);

  // 设置音量
  const setVolume = useCallback((newVolume) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  }, []);

  // 跳转到指定时间
  const seekTo = useCallback((time) => {
    if (audioRef.current && isLoaded) {
      audioRef.current.currentTime = Math.max(0, Math.min(duration, time));
    }
  }, [isLoaded, duration]);

  // 静音切换
  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      if (audioRef.current.volume > 0) {
        audioRef.current.volume = 0;
        setVolumeState(0);
      } else {
        audioRef.current.volume = 0.3;
        setVolumeState(0.3);
      }
    }
  }, []);

  return {
    isPlaying,
    isLoaded,
    error,
    duration,
    currentTime,
    volume,
    play,
    pause,
    toggle,
    setVolume,
    seekTo,
    toggleMute,
  };
};
