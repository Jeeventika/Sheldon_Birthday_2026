import React from 'react';
import QuizRoom from '../components/quizzes/QuizRoom';

export default function QuizPage({ onBack, onCompleteDestination }) {
  return (
    <QuizRoom
      onBack={onBack}
      onCompleteDestination={onCompleteDestination}
    />
  );
}
