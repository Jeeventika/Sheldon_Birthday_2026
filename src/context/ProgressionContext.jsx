import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  loadProgressionState,
  saveProgressionState,
  getInitialProgressionState,
  deriveDestinationsStatus,
  isLetterUnlocked,
  IS_DEV
} from '../services/progressionStorage';
import { quizzesData } from '../data/quizzesData';
import { lettersData } from '../data/lettersData';
import { playlistData } from '../data/playlistData';

const ProgressionContext = createContext(null);

export function ProgressionProvider({ children }) {
  const [progression, setProgression] = useState(() => loadProgressionState());
  const [previewDestination, setPreviewDestinationState] = useState(null);

  // Synchronize state changes to localStorage
  useEffect(() => {
    saveProgressionState(progression);
  }, [progression]);

  // Derived status for destinations
  const derivedStatus = useMemo(() => {
    return deriveDestinationsStatus(progression);
  }, [progression]);

  // Helper to check if current view is a dev preview
  const isPreviewMode = Boolean(previewDestination);

  // User Actions (only update if NOT previewing a locked destination without simulation)
  const completeQuiz = (quizId, scoreData = null) => {
    if (isPreviewMode) return; // Prevent accidental completion in preview mode
    setProgression((prev) => {
      const current = new Set(prev.completedQuizIds);
      current.add(quizId);
      const updatedScores = scoreData
        ? {
            ...prev.quizScores,
            [quizId]: {
              ...scoreData,
              bestScore: Math.max(
                scoreData.score || 0,
                prev.quizScores?.[quizId]?.bestScore || 0
              )
            }
          }
        : prev.quizScores;

      return {
        ...prev,
        completedQuizIds: Array.from(current),
        quizScores: updatedScores
      };
    });
  };

  const recordAnswer = (quizId, questionId, value = true) => {
    if (isPreviewMode) return;
    setProgression((prev) => {
      const existingIds = prev.answeredQuestionIds?.[quizId] || [];
      const updatedIds = existingIds.includes(questionId)
        ? existingIds
        : [...existingIds, questionId];

      const currentQuizAnswers = prev.quizAnswers?.[quizId] || {};
      const updatedAnswers = {
        ...currentQuizAnswers,
        [questionId]: value
      };

      return {
        ...prev,
        answeredQuestionIds: {
          ...prev.answeredQuestionIds,
          [quizId]: updatedIds
        },
        quizAnswers: {
          ...prev.quizAnswers,
          [quizId]: updatedAnswers
        }
      };
    });
  };

  const markLetterAsRead = (letterId) => {
    if (isPreviewMode) return;
    setProgression((prev) => {
      const current = new Set(prev.readLetterIds);
      current.add(letterId);
      return {
        ...prev,
        readLetterIds: Array.from(current)
      };
    });
  };

  const recordTrackPlayed = (trackId) => {
    if (isPreviewMode) return;
    setProgression((prev) => {
      const current = new Set(prev.playedTrackIds);
      current.add(trackId);
      return {
        ...prev,
        playedTrackIds: Array.from(current)
      };
    });
  };

  const setBoxUnwrapped = (val) => {
    if (isPreviewMode) return;
    setProgression((prev) => ({
      ...prev,
      boxUnwrapped: Boolean(val)
    }));
  };

  const setCandlesBlown = (val) => {
    if (isPreviewMode) return;
    setProgression((prev) => ({
      ...prev,
      candlesBlown: Boolean(val),
      finalLetterRead: Boolean(val || prev.finalLetterRead)
    }));
  };

  const markFinalLetterRead = () => {
    if (isPreviewMode) return;
    setProgression((prev) => ({
      ...prev,
      finalLetterRead: true
    }));
  };

  // ==========================================
  // Developer Testing Controls (Enabled in DEV)
  // ==========================================

  const devSimulateCompleteQuiz = (quizId) => {
    if (!IS_DEV) return;
    setProgression((prev) => {
      const set = new Set(prev.completedQuizIds);
      set.add(quizId);
      return { ...prev, completedQuizIds: Array.from(set) };
    });
  };

  const devSimulateCompleteAllQuizzes = () => {
    if (!IS_DEV) return;
    setProgression((prev) => ({
      ...prev,
      completedQuizIds: quizzesData.map((q) => q.id)
    }));
  };

  const devSimulateMarkLetterRead = (letterId) => {
    if (!IS_DEV) return;
    setProgression((prev) => {
      const set = new Set(prev.readLetterIds);
      set.add(letterId);
      return { ...prev, readLetterIds: Array.from(set) };
    });
  };

  const devSimulateMarkAllLettersRead = () => {
    if (!IS_DEV) return;
    setProgression((prev) => ({
      ...prev,
      readLetterIds: lettersData.map((l) => l.id)
    }));
  };

  const devSimulatePlayTrack = (trackId) => {
    if (!IS_DEV) return;
    setProgression((prev) => {
      const set = new Set(prev.playedTrackIds);
      set.add(trackId);
      return { ...prev, playedTrackIds: Array.from(set) };
    });
  };

  const devSimulatePlayAllTracks = () => {
    if (!IS_DEV) return;
    setProgression((prev) => ({
      ...prev,
      playedTrackIds: playlistData.map((t) => t.id)
    }));
  };

  const devReplaySurpriseBox = () => {
    if (!IS_DEV) return;
    setProgression((prev) => ({
      ...prev,
      boxUnwrapped: false,
      candlesBlown: false
    }));
  };

  const devResetDestination = (destId) => {
    if (!IS_DEV) return;
    setProgression((prev) => {
      switch (destId) {
        case 'quizzes':
          return {
            ...prev,
            completedQuizIds: [],
            answeredQuestionIds: {},
            quizAnswers: {},
            quizScores: {}
          };
        case 'letters':
          return {
            ...prev,
            readLetterIds: []
          };
        case 'playlist':
          return {
            ...prev,
            playedTrackIds: []
          };
        case 'surprise-box':
          return {
            ...prev,
            boxUnwrapped: false,
            candlesBlown: false
          };
        default:
          return prev;
      }
    });
  };

  const devResetAllProgress = () => {
    if (!IS_DEV) return;
    const fresh = getInitialProgressionState();
    setProgression(fresh);
    setPreviewDestinationState(null);
  };

  const setPreview = (destId) => {
    if (!IS_DEV) return;
    setPreviewDestinationState(destId);
  };

  const clearPreview = () => {
    setPreviewDestinationState(null);
  };

  const checkLetterUnlocked = (letterId) => {
    return isLetterUnlocked(letterId, progression);
  };

  const value = {
    progression,
    derivedStatus,
    previewDestination,
    isPreviewMode,
    completeQuiz,
    recordAnswer,
    markLetterAsRead,
    recordTrackPlayed,
    setBoxUnwrapped,
    setCandlesBlown,
    markFinalLetterRead,
    checkLetterUnlocked,
    // Dev Testing Tools
    devSimulateCompleteQuiz,
    devSimulateCompleteAllQuizzes,
    devSimulateMarkLetterRead,
    devSimulateMarkAllLettersRead,
    devSimulatePlayTrack,
    devSimulatePlayAllTracks,
    devReplaySurpriseBox,
    devResetDestination,
    devResetAllProgress,
    setPreview,
    clearPreview
  };

  return (
    <ProgressionContext.Provider value={value}>
      {children}
    </ProgressionContext.Provider>
  );
}

export function useProgression() {
  const context = useContext(ProgressionContext);
  if (!context) {
    throw new Error('useProgression must be used within a ProgressionProvider');
  }
  return context;
}
