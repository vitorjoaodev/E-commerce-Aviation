import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useLocation } from "wouter";

// Trilha sonora no estilo Indiana Jones / Jurassic Park
const pathToSoundtrack: Record<string, string> = {
  "/": "https://audio-previews.elements.envatousercontent.com/files/181606169/preview.mp3", // Epic Adventure
  "/products/mens": "https://audio-previews.elements.envatousercontent.com/files/154493327/preview.mp3", // Jungle Adventure
  "/products/womens": "https://audio-previews.elements.envatousercontent.com/files/150655208/preview.mp3", // Epic Journey
  "/products/accessories": "https://audio-previews.elements.envatousercontent.com/files/275102330/preview.mp3", // Exploration
  "/products/collections": "https://audio-previews.elements.envatousercontent.com/files/107730279/preview.mp3", // Adventure Soundtrack
  "/about": "https://audio-previews.elements.envatousercontent.com/files/303064255/preview.mp3", // Cinematic Adventure
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
    // Determina qual faixa deve ser tocada com base na localização atual
    let trackToPlay = pathToSoundtrack[location];

    if (!trackToPlay) {
      // Procura por caminhos que correspondam ao início da localização atual
      for (const [path, track] of Object.entries(pathToSoundtrack)) {
        if (location.startsWith(path) && path !== "/") {
          trackToPlay = track;
          break;
        }
      }

      // Se nenhuma correspondência for encontrada, use a faixa padrão
      if (!trackToPlay) {
        trackToPlay = pathToSoundtrack["/"];
      }
    }

    // Só atualiza se a faixa for diferente da atual
    if (trackToPlay !== currentTrack) {
      setCurrentTrack(trackToPlay);
    }
  }, [location, currentTrack]);

  useEffect(() => {
    // Só cria uma nova instância de áudio se ainda não existir
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    
    // Atualiza a faixa atual
    if (currentTrack) {
      audioRef.current.src = currentTrack;
      audioRef.current.load();
      
      // Só tenta tocar se o estado for "playing"
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Erro ao reproduzir áudio:", error);
            // Não altere o estado isPlaying aqui para permitir que o usuário tente novamente
          });
        }
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentTrack, isPlaying, volume, isMuted]);

  // Controle de play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    const handlePlay = () => {
      if (isPlaying) {
        // Usa uma Promise para tratar erros corretamente
        const playPromise = audioRef.current?.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Erro ao reproduzir áudio:", error);
            // Não alteramos o estado aqui para permitir que o usuário tente novamente
            // com um clique no botão de play
          });
        }
      } else {
        audioRef.current?.pause();
      }
    };
    
    handlePlay();
    
    // Adiciona um event listener para permitir que o usuário inicie a reprodução
    // após interação com a página (requisito dos navegadores modernos)
    const handleUserInteraction = () => {
      if (isPlaying && audioRef.current?.paused) {
        handlePlay();
      }
    };
    
    document.addEventListener('click', handleUserInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
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
        return "Aventura Épica";
      case '/products/mens':
        return "Aventura na Selva";
      case '/products/womens':
        return "Jornada Épica";
      case '/products/accessories':
        return "Exploração";
      case '/products/collections':
        return "Trilha de Aventura";
      case '/about':
        return "Aventura Cinematográfica";
      default:
        if (location.startsWith('/products/mens')) return "Aventura na Selva";
        if (location.startsWith('/products/womens')) return "Jornada Épica";
        if (location.startsWith('/products/accessories')) return "Exploração";
        if (location.startsWith('/products/collections')) return "Trilha de Aventura";
        if (location.startsWith('/about')) return "Aventura Cinematográfica";
        return "Aventura Épica";
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
