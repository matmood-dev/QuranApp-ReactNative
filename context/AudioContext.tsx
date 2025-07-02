import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";

type AudioContextType = {
  isPlaying: boolean;
  currentSurah: string;
  reciterId: string;
  reciterName: string;
  play: (surahName: string, reciterId: string, reciterName: string) => void;
  pause: () => void;
  toggle: () => void;
  seekTo: (millis: number) => void;
  duration: number;
  position: number;
};



const AudioContext = createContext<AudioContextType | null>(null);
export const useAudio = () => useContext(AudioContext)!;

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1); // prevent division by zero
  const [currentSurah, setCurrentSurah] = useState(""); // was "الفاتحة"
  const [reciterId, setReciterId] = useState("");
  const [reciterName, setReciterName] = useState("");


  const testAudio = require("../assets/audio/test.mp3");

  const loadSound = async () => {
    if (soundRef.current) return;

    const { sound } = await Audio.Sound.createAsync(testAudio, {}, onPlaybackStatusUpdate);
    soundRef.current = sound;
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
    }
  };

  const play = async (surahName: string, reciterId: string, reciterName: string) => {
  await loadSound();
  setCurrentSurah(surahName);
  setReciterId(reciterId);
  setReciterName(reciterName);
  await soundRef.current?.playAsync();
  setIsPlaying(true);
};




  const pause = async () => {
    await soundRef.current?.pauseAsync();
    setIsPlaying(false);
  };

  const toggle = async () => {
  const status = await soundRef.current?.getStatusAsync();
  if (status?.isPlaying) {
    pause();
  } else {
    if (currentSurah && reciterId && reciterName) {
      play(currentSurah, reciterId, reciterName); // resume with last context
    }
  }
};



  const seekTo = async (millis: number) => {
    await soundRef.current?.setPositionAsync(millis);
  };

  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  return (
    <AudioContext.Provider
  value={{
    isPlaying,
    currentSurah,
    reciterId,
    reciterName,
    play,
    pause,
    toggle,
    seekTo,
    duration,
    position,
  }}
>
  {children}
</AudioContext.Provider>

  );
};
