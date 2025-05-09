import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useLocation } from "wouter";

// Mapeamento de caminhos para diferentes trilhas sonoras no estilo Indiana Jones/aventura
const pathToSoundtrack: Record<string, string> = {
  "/": "https://assets.mixkit.co/music/preview/mixkit-epical-drums-01-681.mp3", // Home - Tambores épicos
  "/products/mens": "https://assets.mixkit.co/music/preview/mixkit-adventure-ending-2307.mp3", // Men's - Tema inspirador de aventura
  "/products/womens": "https://assets.mixkit.co/music/preview/mixkit-african-safari-178.mp3", // Women's - Tema safari/aventura
  "/products/accessories": "https://assets.mixkit.co/music/preview/mixkit-forest-treasure-138.mp3", // Accessories - Tesouro escondido
  "/products/collections": "https://assets.mixkit.co/music/preview/mixkit-mysterious-forest-671.mp3", // Collections - Mistério da floresta
  "/about": "https://assets.mixkit.co/music/preview/mixkit-explorer-mode-2774.mp3", // About - Modo explorador
};

export default function AudioPlayer() {
  // Recuperar as preferências salvas no localStorage ou usar valores padrão
  const getSavedState = (key: string, defaultValue: any) => {
    const saved = localStorage.getItem(`audioPlayer_${key}`);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  };
  
  const [isPlaying, setIsPlaying] = useState(getSavedState('isPlaying', false));
  const [isMuted, setIsMuted] = useState(getSavedState('isMuted', false));
  const [volume, setVolume] = useState(getSavedState('volume', 0.2)); // 20% volume padrão
  const [location] = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState("");

  // Determinar qual trilha sonora tocar baseado na localização atual
  useEffect(() => {
    // Procurar pela trilha correspondente à rota exata
    let trackToPlay = pathToSoundtrack[location];
    
    // Se não houver uma trilha exata, tentar encontrar uma que comece com o mesmo padrão
    if (!trackToPlay) {
      for (const [path, track] of Object.entries(pathToSoundtrack)) {
        if (location.startsWith(path) && path !== "/") {
          trackToPlay = track;
          break;
        }
      }
      
      // Se ainda não encontrou, use a trilha da home
      if (!trackToPlay) {
        trackToPlay = pathToSoundtrack["/"];
      }
    }
    
    // Se a trilha mudou, atualize
    if (trackToPlay !== currentTrack) {
      setCurrentTrack(trackToPlay);
      
      // Reiniciar a reprodução se já estava tocando
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
  
  // Criar o elemento de áudio quando o componente for montado
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
  
  // Gerenciar mudanças no estado de reprodução
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
  
  // Gerenciar mudanças no estado de mudo
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = volume;
    }
  }, [isMuted, volume]);
  
  // Gerenciar mudanças no volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    saveState('volume', newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };
  
  // Salvar preferências no localStorage
  const saveState = (key: string, value: any) => {
    localStorage.setItem(`audioPlayer_${key}`, JSON.stringify(value));
  };
  
  // Alternar entre tocar e pausar
  const togglePlay = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    saveState('isPlaying', newState);
  };
  
  // Alternar entre mudo e som
  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    saveState('isMuted', newState);
  };
  
  // Obter o nome da trilha atual para exibir
  const getTrackName = () => {
    switch(location) {
      case '/':
        return "Tambores Épicos";
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
        // Verificar se começa com alguma rota específica
        if (location.startsWith('/products/mens')) return "Tema de Aventura";
        if (location.startsWith('/products/womens')) return "Safari Africano";
        if (location.startsWith('/products/accessories')) return "Tesouro Escondido";
        if (location.startsWith('/products/collections')) return "Floresta Misteriosa";
        if (location.startsWith('/about')) return "Modo Explorador";
        return "Tambores Épicos";
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