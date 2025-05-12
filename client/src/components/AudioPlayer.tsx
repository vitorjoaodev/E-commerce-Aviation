import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useLocation } from "wouter";

const pathToSoundtrack: Record<string, string> = {
  "/": "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Lobo_Loco/Adventure/Lobo_Loco_-_Traveling_to_Louisiana_Soft_Delay_ID_1174.mp3",
  "/products/mens": "https://assets.mixkit.co/music/preview/mixkit-adventure-ending-2307.mp3",
  "/products/womens": "https://assets.mixkit.co/music/preview/mixkit-african-safari-178.mp3",
  "/products/accessories": "https://assets.mixkit.co/music/preview/mixkit-forest-treasure-138.mp3",
  "/products/collections": "https://assets.mixkit.co/music/preview/mixkit-mysterious-forest-671.mp3",
  "/about": "https://assets.mixkit.co/music/preview/mixkit-explorer-mode-2774.mp3",
};

export default function AudioPlayer() {
  const getSavedState = (key: string, defaultValue: any) => {
    const saved = localStorage.getItem(`audioPlayer_${key}`);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  };

  const [isPlaying, setIsPlaying] = useState(getSavedState('isPlaying', false));
  const [isMuted, setIsMuted] = useState(getSavedState('isMuted', false));
  const [volume, setVolume] = useState(getSavedState('volume', 0.2));
  const [location] = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState("");

  useEffect(() => {
    let trackToPlay = pathToSoundtrack[location];

    if (!trackToPlay) {
      for (const [path, track] of Object.entries(pathToSoundtrack)) {
        if (location.startsWith(path) && path !== "/") {
          trackToPlay = track;
          break;
        }
      }

      if (!trackToPlay) {
        trackToPlay = pathToSoundtrack["/"];
      }
    }

    if (trackToPlay !== currentTrack) {
      setCurrentTrack(trackToPlay);

      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = trackToPlay;
        audioRef.current.load();
        audioRef.current.play().catch(error => {
          console.error("Erro ao reproduzir áudio:", error);
        });
      }
    }
  }, [location, isPlaying, currentTrack]);

  useEffect(() => {
    audioRef.current = new Audio(currentTrack);
    audioRef.current.volume = volume;
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Erro ao reproduzir áudio:", error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = volume;
    }
  }, [isMuted, volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    saveState('volume', newVolume);

    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  const saveState = (key: string, value: any) => {
    localStorage.setItem(`audioPlayer_${key}`, JSON.stringify(value));
  };

  const togglePlay = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    saveState('isPlaying', newState);
  };

  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    saveState('isMuted', newState);
  };

  const getTrackName = () => {
    switch (location) {
      case '/':
        return "Viagem à Louisiana";
      case '/products/mens':
        return "Tema de Aventura";
      case '/products/womens':
        return "Safari Africano";
      case '/products/accessories':
        return "Tesouro Escondido";
      case '/products/collections':
        return "Floresta Misteriosa";
      case '/about':
        return "Modo Explorador";
      default:
        if (location.startsWith('/products/mens')) return "Tema de Aventura";
        if (location.startsWith('/products/womens')) return "Safari Africano";
        if (location.startsWith('/products/accessories')) return "Tesouro Escondido";
        if (location.startsWith('/products/collections')) return "Floresta Misteriosa";
        if (location.startsWith('/about')) return "Modo Explorador";
        return "Viagem à Louisiana";
    }
  };

  const trackName = getTrackName();

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/70 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg flex items-center space-x-2">
      <button
        onClick={togglePlay}
        className="p-2 rounded-full hover:bg-primary/20 transition-colors text-white"
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      {isPlaying && (
        <span className="text-primary text-xs font-medium hidden md:inline-block">
          {trackName}
        </span>
      )}

      <div className="hidden sm:flex items-center space-x-2">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-1 appearance-none bg-gray-600 rounded outline-none accent-primary cursor-pointer"
          aria-label="Volume control"
        />

        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-primary/20 transition-colors text-white"
          aria-label={isMuted ? "Unmute" : "Mute"}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      <div className="sm:hidden">
        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-primary/20 transition-colors text-white"
          aria-label={isMuted ? "Unmute" : "Mute"}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
}
