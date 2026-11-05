/**
 * Progression Storage Service
 * 
 * Provides:
 * 1. Environment isolation between Development and Production localStorage keys.
 * 2. Fully dynamic progression derivation from stable unique IDs.
 * 3. Granular and global reset capabilities that never touch content or data files.
 * 4. Safe fallback for disabled or private browsing localStorage.
 */

import { quizzesData } from '../data/quizzesData.js';
import { lettersData } from '../data/lettersData.js';
import { playlistData } from '../data/playlistData.js';

// Storage keys isolated by environment
const STORAGE_KEY_DEV = 'sheldon_birthday_progress_dev_v2';
const STORAGE_KEY_PROD = 'sheldon_birthday_progress_prod_v2';

export const IS_DEV = Boolean(import.meta.env?.DEV);

export const ACTIVE_STORAGE_KEY = IS_DEV ? STORAGE_KEY_DEV : STORAGE_KEY_PROD;

/**
 * Clean initial first-visit state
 */
export function getInitialProgressionState() {
  return {
    completedQuizIds: [],
    answeredQuestionIds: {}, // { [quizId]: string[] of questionIds }
    quizAnswers: {}, // { [quizId]: { [questionId]: number | string } }
    quizScores: {}, // { [quizId]: { score: number, totalScored: number, percentage: number } }
    readLetterIds: [],
    playedTrackIds: [],
    boxUnwrapped: false,
    candlesBlown: false,
    finalLetterRead: false
  };
}

/**
 * Load persisted progression state from localStorage
 */
export function loadProgressionState() {
  try {
    let raw = localStorage.getItem(ACTIVE_STORAGE_KEY);
    // Backward-compatible fallback / safe migration if v2 doesn't exist yet but an earlier key did
    if (!raw && !IS_DEV) {
      raw = localStorage.getItem('sheldon_birthday_progress_prod') || localStorage.getItem('sheldon_birthday_progress');
    }
    if (!raw) return getInitialProgressionState();
    const parsed = JSON.parse(raw);
    return {
      completedQuizIds: Array.isArray(parsed.completedQuizIds) ? parsed.completedQuizIds : [],
      answeredQuestionIds: typeof parsed.answeredQuestionIds === 'object' && parsed.answeredQuestionIds !== null ? parsed.answeredQuestionIds : {},
      quizAnswers: typeof parsed.quizAnswers === 'object' && parsed.quizAnswers !== null ? parsed.quizAnswers : {},
      quizScores: typeof parsed.quizScores === 'object' && parsed.quizScores !== null ? parsed.quizScores : {},
      readLetterIds: Array.isArray(parsed.readLetterIds) ? parsed.readLetterIds : [],
      playedTrackIds: Array.isArray(parsed.playedTrackIds) ? parsed.playedTrackIds : [],
      boxUnwrapped: Boolean(parsed.boxUnwrapped),
      candlesBlown: Boolean(parsed.candlesBlown),
      finalLetterRead: Boolean(parsed.finalLetterRead || parsed.candlesBlown)
    };
  } catch (err) {
    console.warn('Could not read progression from localStorage:', err);
    return getInitialProgressionState();
  }
}

/**
 * Save progression state to localStorage
 */
export function saveProgressionState(state) {
  try {
    const serialized = JSON.stringify({
      completedQuizIds: state.completedQuizIds || [],
      answeredQuestionIds: state.answeredQuestionIds || {},
      quizAnswers: state.quizAnswers || {},
      quizScores: state.quizScores || {},
      readLetterIds: state.readLetterIds || [],
      playedTrackIds: state.playedTrackIds || [],
      boxUnwrapped: Boolean(state.boxUnwrapped),
      candlesBlown: Boolean(state.candlesBlown),
      finalLetterRead: Boolean(state.finalLetterRead || state.candlesBlown)
    });
    localStorage.setItem(ACTIVE_STORAGE_KEY, serialized);
  } catch (err) {
    console.warn('Could not save progression to localStorage:', err);
  }
}

/**
 * Check if all configured quizzes are completed
 */
export function areQuizzesCompleted(completedQuizIds = []) {
  if (!quizzesData || quizzesData.length === 0) return true;
  const completedSet = new Set(completedQuizIds);
  return quizzesData.every((quiz) => completedSet.has(quiz.id));
}

/**
 * Check if all configured regular letters have been read
 */
export function areLettersCompleted(readLetterIds = []) {
  if (!lettersData || lettersData.length === 0) return true;
  const readSet = new Set(readLetterIds);
  return lettersData.every((letter) => readSet.has(letter.id));
}

/**
 * Check if all configured playlist songs have been played
 */
export function isPlaylistCompleted(playedTrackIds = []) {
  if (!playlistData || playlistData.length === 0) return true;
  const playedSet = new Set(playedTrackIds);
  return playlistData.every((track) => playedSet.has(track.id));
}

/**
 * Dynamically derive unlock states for all 4 destinations from completion sets
 */
export function deriveDestinationsStatus(state) {
  const quizzesDone = areQuizzesCompleted(state.completedQuizIds);
  const lettersDone = quizzesDone && areLettersCompleted(state.readLetterIds);
  const playlistDone = lettersDone && isPlaylistCompleted(state.playedTrackIds);

  return {
    quizzes: {
      unlocked: true,
      completed: quizzesDone
    },
    letters: {
      unlocked: quizzesDone,
      completed: lettersDone
    },
    playlist: {
      unlocked: lettersDone,
      completed: playlistDone
    },
    'surprise-box': {
      unlocked: playlistDone,
      completed: Boolean(state.candlesBlown || state.finalLetterRead)
    }
  };
}

/**
 * Dynamically derive if a specific regular letter is unlocked
 * Rule:
 * 1. Letters destination must be unlocked (all quizzes completed).
 * 2. lettersData[0] is automatically unlocked once Letters destination is unlocked.
 * 3. lettersData[i] is unlocked only if lettersData[i-1].id is in readLetterIds.
 */
export function isLetterUnlocked(letterId, state) {
  const status = deriveDestinationsStatus(state);
  if (!status.letters.unlocked) return false;

  const letterIndex = lettersData.findIndex((l) => l.id === letterId);
  if (letterIndex === -1) return false;
  if (letterIndex === 0) return true;

  const prevLetter = lettersData[letterIndex - 1];
  const readSet = new Set(state.readLetterIds || []);
  return readSet.has(prevLetter.id);
}
