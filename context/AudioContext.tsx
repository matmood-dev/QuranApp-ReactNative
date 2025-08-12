import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Audio } from "expo-av";
import { getSurahUrl } from "../utils/audioLinks";

type AudioContextType = {
  isPlaying: boolean;
  currentSurah: string; // display label: name or number as string
  reciterId: string;
  reciterName: string;
  play: (
    surah: string | number,
    reciterId: string,
    reciterName: string
  ) => Promise<void>;
  pause: () => Promise<void>;
  toggle: () => Promise<void>;
  seekTo: (millis: number) => Promise<void>;
  duration: number;
  position: number;
};

const AudioContext = createContext<AudioContextType | null>(null);
export const useAudio = () => useContext(AudioContext)!;

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const soundRef = useRef<Audio.Sound | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1); // prevent /0
  const [currentSurah, setCurrentSurah] = useState("");
  const [reciterId, setReciterId] = useState("");
  const [reciterName, setReciterName] = useState("");

  // keep last args so toggle() can start playback if nothing is loaded yet
  const lastArgs = useRef<{
    surah: string | number;
    rId: string;
    rName: string;
  } | null>(null);

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    }).catch(() => {});
  }, []);

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis ?? 0);
      setDuration(status.durationMillis ?? 1);
      setIsPlaying(!!status.isPlaying);
    } else if (status.error) {
      console.warn("Audio error:", status.error);
    }
  };

  const unloadCurrent = async () => {
    try {
      await soundRef.current?.unloadAsync();
    } catch {}
    soundRef.current = null;
  };

  const loadFromUrl = async (url: string) => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );
    soundRef.current = sound;
  };

  // Play by (surah name or number, reciterId, reciterName) using JSON links
  const play = async (surah: string | number, rId: string, rName: string) => {
    try {
      const url = getSurahUrl(rId, surah); // ✅ use the param directly
      await unloadCurrent();

      // remember args for resume
      lastArgs.current = { surah, rId, rName };

      // set display values
      setCurrentSurah(typeof surah === "number" ? String(surah) : surah);
      setReciterId(rId);
      setReciterName(rName);

      await loadFromUrl(url);
      setIsPlaying(true);
    } catch (e) {
      console.warn("Failed to play:", e);
      setIsPlaying(false);
    }
  };

  const getCurrentStatus = async () => {
    if (!soundRef.current) return null;
    try {
      const status = await soundRef.current.getStatusAsync();
      return status;
    } catch {
      return null;
    }
  };

  const pause = async () => {
    const s = soundRef.current;
    if (!s) return;

    const status = await s.getStatusAsync();
    if (!status.isLoaded) return; // not ready yet

    // If actually playing, pause. If not, just ensure shouldPlay=false.
    if (status.isPlaying) {
      await s.pauseAsync();
    } else {
      await s.setStatusAsync({ shouldPlay: false });
    }
    setIsPlaying(false);
  };

  const toggle = async () => {
    const s = soundRef.current;

    // Nothing loaded yet? Try last known args or bail
    if (!s) {
      if (lastArgs.current) {
        const { surah, rId, rName } = lastArgs.current;
        await play(surah, rId, rName);
      }
      return;
    }

    const status = await s.getStatusAsync();
    if (!status.isLoaded) return;

    if (status.isPlaying) {
      await s.setStatusAsync({ shouldPlay: false });
      setIsPlaying(false);
    } else {
      await s.setStatusAsync({ shouldPlay: true });
      setIsPlaying(true);
    }
  };

  const seekTo = async (millis: number) => {
    if (!soundRef.current) return;
    await soundRef.current.setPositionAsync(millis);
  };

  useEffect(() => {
    return () => {
      unloadCurrent();
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
