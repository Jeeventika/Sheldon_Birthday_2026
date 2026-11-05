import React from 'react';
import MusicRoom from '../components/music/MusicRoom';

export default function MusicPage({ onBack, onCompleteDestination }) {
  return (
    <MusicRoom
      onBack={onBack}
      onCompleteDestination={onCompleteDestination}
    />
  );
}
