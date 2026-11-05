import React, { useState, useEffect } from 'react';
import LetterGallery from '../components/letters/LetterGallery';
import LetterReader from '../components/letters/LetterReader';
import FinalLetterView from '../components/letters/FinalLetterView';
import { lettersData } from '../data/lettersData';

export default function LettersPage({ onBackToHub, onNavigateDestination, initialLetterId = null }) {
  const [isFinalView, setIsFinalView] = useState(
    initialLetterId === 'final' || initialLetterId === 'final-letter'
  );
  const [selectedLetter, setSelectedLetter] = useState(() => {
    if (initialLetterId && initialLetterId !== 'final' && initialLetterId !== 'final-letter') {
      return lettersData.find((l) => l.id === initialLetterId) || null;
    }
    return null;
  });

  useEffect(() => {
    if (initialLetterId === 'final' || initialLetterId === 'final-letter') {
      setIsFinalView(true);
      setSelectedLetter(null);
    } else if (initialLetterId) {
      setIsFinalView(false);
      setSelectedLetter(lettersData.find((l) => l.id === initialLetterId) || null);
    }
  }, [initialLetterId]);

  const handleOpenLetter = (letter) => {
    setIsFinalView(false);
    setSelectedLetter(letter);
  };

  const handleBackToGallery = () => {
    setIsFinalView(false);
    setSelectedLetter(null);
  };

  const handleUnlockNext = () => {
    // Return to gallery after marking read
    setSelectedLetter(null);
  };

  if (isFinalView) {
    return (
      <FinalLetterView
        onBackToHub={onBackToHub}
        onNavigateDestination={onNavigateDestination}
      />
    );
  }

  if (selectedLetter) {
    return (
      <LetterReader
        letter={selectedLetter}
        onBackToGallery={handleBackToGallery}
        onUnlockNext={handleUnlockNext}
      />
    );
  }

  return (
    <LetterGallery
      onSelectLetter={handleOpenLetter}
      onNavigateToPlaylist={() => onNavigateDestination && onNavigateDestination('playlist')}
    />
  );
}
