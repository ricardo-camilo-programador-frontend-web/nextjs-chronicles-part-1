"use client";

import { FC } from "react";
import { useState, useRef, useEffect } from "react";
import {
  FaVolumeUp,
  FaVolumeMute,
  FaStepForward,
  FaStepBackward,
  FaPlay,
  FaPause,
} from "react-icons/fa";
import { ambientSounds } from "@/static/ambientSounds";

interface AmbientSoundProps {
  initialVolume?: number;
  showVolumeControl?: boolean;
}

export const AmbientSound: FC<AmbientSoundProps> = ({ initialVolume = 1, showVolumeControl = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(initialVolume);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = ambientSounds[currentTrackIndex];

  const togglePlay = async () => {
    if (!audioRef.current || isLoading) return;

    setIsLoading(true);
    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Erro ao controlar áudio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const playNext = () => {
    setCurrentTrackIndex((prev) =>
      prev === ambientSounds.length - 1 ? 0 : prev + 1
    );
  };

  const playPrevious = () => {
    setCurrentTrackIndex((prev) =>
      prev === 0 ? ambientSounds.length - 1 : prev - 1
    );
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex]);

  return (
    <>
      {!isVisible ? (
        <button
          onClick={() => setIsVisible(true)}
          className="bg-white/10 backdrop-blur-lg p-3 rounded-full shadow-lg transition-colors hover:bg-white/20 border border-emerald-400/20"
          aria-label="Show ambient sound player"
        >
          <FaVolumeUp size={20} className="text-emerald-50" />
        </button>
      ) : (
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-emerald-400/20 z-50 min-w-[320px] relative">
          <div className="absolute -top-8 -left-8 text-4xl opacity-20 rotate-45">
            🌿
          </div>
          <div className="absolute -bottom-8 -right-8 text-4xl opacity-20 -rotate-45">
            🌱
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p className="text-emerald-100/80 text-sm">
                {isPlaying ? "Now Playing" : "Paused"}
              </p>
              <button
                onClick={() => setIsVisible(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-emerald-50"
                aria-label="Close player"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>

            <p className="font-medium text-center text-emerald-50">
              {currentTrack.altText}
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={playPrevious}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-emerald-50"
                aria-label="Previous track"
              >
                <FaStepBackward size={16} />
              </button>

              <button
                onClick={togglePlay}
                className="p-4 rounded-full hover:bg-white/10 transition-colors text-emerald-50"
                aria-label={isPlaying ? "Pause" : "Play"}
                disabled={isLoading}
              >
                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
              </button>

              <button
                onClick={playNext}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-emerald-50"
                aria-label="Next track"
              >
                <FaStepForward size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2 text-emerald-50 text-xs">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full accent-emerald-400"
                aria-label="Progress bar"
              />
              <span>{formatTime(duration)}</span>
            </div>

            {showVolumeControl && (
              <div className="flex items-center gap-2 text-emerald-50">
                <FaVolumeMute size={16} />
                <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full accent-emerald-400"
                aria-label="Volume control"
              />
                <FaVolumeUp size={16} />
              </div>
            )}

            <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-400/20 scrollbar-track-transparent">
              <ul className="text-sm space-y-1">
                {ambientSounds.map((sound, index) => (
                  <li
                    key={`${sound.altText}-${index}`}
                    className={`text-center p-2 cursor-pointer rounded-lg transition-colors hover:bg-white/10 text-emerald-50
                      ${currentTrackIndex === index
                        ? "bg-white/20 border border-emerald-400/20"
                        : ""
                      }`}
                    onClick={() => setCurrentTrackIndex(index)}
                  >
                    {sound.altText}
                  </li>
                ))}
              </ul>
            </div>

            <audio
              ref={audioRef}
              preload="metadata"
              onError={(e) => console.error("Erro no áudio:", e)}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            >
              <source src={currentTrack.url} type="audio/mpeg" />
              <source
                src={currentTrack.url.replace(".mp3", ".ogg")}
                type="audio/ogg"
              />
              <source
                src={currentTrack.url.replace(".mp3", ".wav")}
                type="audio/wav"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      )}
    </>
  );
}
