import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>('pt');
  
  useEffect(() => {
    setCurrentLanguage(i18n.language || 'pt');
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-2">
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t('language.selectLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => changeLanguage('pt')}
          className={currentLanguage === 'pt' ? 'bg-accent' : ''}
        >
          <span className="mr-2">🇧🇷</span> {t('language.pt')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage('en')}
          className={currentLanguage === 'en' ? 'bg-accent' : ''}
        >
          <span className="mr-2">🇺🇸</span> {t('language.en')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}