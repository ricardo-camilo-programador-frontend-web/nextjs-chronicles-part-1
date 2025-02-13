"use client";

import { useState, useRef, useEffect } from "react";
import { FaVolumeUp, FaVolumeMute, FaStepForward, FaStepBackward, FaPlay, FaPause } from "react-icons/fa";
import { ambientSounds } from "@/static/ambientSounds";

interface AmbientSoundProps {
  initialVolume?: number;
}

export function AmbientSound({ initialVolume = 0.3 }: AmbientSoundProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(initialVolume);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex]);

  return (
    <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg shadow-lg z-50 min-w-[300px]">
      <div className="flex flex-col gap-3">
        <div className="text-center">
          <p className="text-sm opacity-80">
            {isPlaying ? "Now Playing" : "Paused"}
          </p>
          <p className="font-medium">{currentTrack.altText}</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={playPrevious}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Previous track"
          >
            <FaStepBackward size={16} />
          </button>

          <button
            onClick={togglePlay}
            className="p-3 hover:bg-white/20 rounded-full transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
            disabled={isLoading}
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>

          <button
            onClick={playNext}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Next track"
          >
            <FaStepForward size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <FaVolumeMute size={16} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full"
            aria-label="Volume control"
          />
          <FaVolumeUp size={16} />
        </div>

        <div className="max-h-32 overflow-y-auto">
          <ul className="text-sm">
            {ambientSounds.map((sound, index) => (
              <li
                key={`${sound.altText}-${index}`}
                className={`p-2 cursor-pointer hover:bg-white/20 rounded transition-colors ${
                  currentTrackIndex === index ? "bg-white/20" : ""
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
  );
}
