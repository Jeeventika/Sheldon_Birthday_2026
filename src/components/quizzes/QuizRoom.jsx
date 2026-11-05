import React, { useState, useEffect } from 'react';
import QuizOption from './QuizOption';
import { quizzesData, optionThemes } from '../../data/quizzesData';
import { useProgression } from '../../context/ProgressionContext';

/**
 * Quiz Room Component
 * 100% Data-Driven:
 * - Supports any number of configured quizzes (Quiz 1: 11 questions, Quiz 2: 10 questions).
 * - Handles both multiple-choice and written text responses.
 * - Shows immediate correct/incorrect feedback for multiple-choice questions.
 * - Preserves written text responses in state and localStorage across navigation.
 * - Independent scoring per quiz (MC questions only; written responses are not auto-graded).
 * - Review view with written response showcase and unlimited retries.
 */
export default function QuizRoom({ onBack, onCompleteDestination }) {
  const { progression, completeQuiz, recordAnswer } = useProgression();

  // Selected quiz index (defaults to 0, or first uncompleted quiz)
  const [selectedQuizIdx, setSelectedQuizIdx] = useState(() => {
    const uncompletedIdx = quizzesData.findIndex(
      (q) => !progression.completedQuizIds.includes(q.id)
    );
    return uncompletedIdx !== -1 ? uncompletedIdx : 0;
  });

  const totalQuizzes = quizzesData.length;
  const currentQuiz = quizzesData[selectedQuizIdx] || quizzesData[0];
  const questions = currentQuiz ? currentQuiz.questions : [];
  const totalQuestions = questions.length;

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const currentQuestion = questions[currentQIndex];

  // Local answers loaded from progression context
  const [localAnswers, setLocalAnswers] = useState(() => {
    return progression.quizAnswers?.[currentQuiz.id] || {};
  });

  // Track if current quiz results review mode is open
  const [showResults, setShowResults] = useState(() => {
    return progression.completedQuizIds.includes(currentQuiz.id);
  });

  // Synchronize when switching quizzes
  useEffect(() => {
    setLocalAnswers(progression.quizAnswers?.[currentQuiz.id] || {});
    setCurrentQIndex(0);
    setShowResults(progression.completedQuizIds.includes(currentQuiz.id));
  }, [selectedQuizIdx, currentQuiz.id]);

  const letters = ['A', 'B', 'C', 'D'];

  // Calculate dynamic quiz status
  const completedQuizzesCount = quizzesData.filter((q) =>
    progression.completedQuizIds.includes(q.id)
  ).length;

  const allQuizzesCompleted = totalQuizzes > 0 && completedQuizzesCount >= totalQuizzes;

  const handleSelectQuiz = (idx) => {
    setSelectedQuizIdx(idx);
    setCurrentQIndex(0);
  };

  const handleSelectOption = (optIdx) => {
    if (!currentQuestion) return;
    const updated = {
      ...localAnswers,
      [currentQuestion.id]: optIdx
    };
    setLocalAnswers(updated);
    recordAnswer(currentQuiz.id, currentQuestion.id, optIdx);
  };

  const handleTextChange = (e) => {
    if (!currentQuestion) return;
    const value = e.target.value;
    const updated = {
      ...localAnswers,
      [currentQuestion.id]: value
    };
    setLocalAnswers(updated);
    recordAnswer(currentQuiz.id, currentQuestion.id, value);
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  const calculateScore = () => {
    const mcQuestions = questions.filter((q) => q.type === 'multiple-choice');
    let correctCount = 0;
    mcQuestions.forEach((q) => {
      if (localAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });
    return {
      score: correctCount,
      totalScored: mcQuestions.length,
      percentage: mcQuestions.length > 0 ? Math.round((correctCount / mcQuestions.length) * 100) : 100
    };
  };

  const handleNext = () => {
    if (currentQIndex < totalQuestions - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Complete current quiz
      const scoreData = calculateScore();
      completeQuiz(currentQuiz.id, scoreData);
      setShowResults(true);
    }
  };

  const handleRetryQuiz = () => {
    setShowResults(false);
    setCurrentQIndex(0);
  };

  if (!currentQuestion) {
    return (
      <div className="w-full max-w-4xl mx-auto p-12 text-center text-[#f3dafe]">
        <p className="font-display italic text-2xl">No questions configured in this quiz.</p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2 rounded-full bg-[#34233e] text-[#d4bbff] border border-[#B99BEF]"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Answer state for current question
  const isCurrentAnswered = localAnswers.hasOwnProperty(currentQuestion.id) &&
    (currentQuestion.type === 'text'
      ? String(localAnswers[currentQuestion.id]).trim().length > 0
      : localAnswers[currentQuestion.id] !== undefined);

  const currentScore = progression.quizScores?.[currentQuiz.id] || calculateScore();
  const isMcQuestion = currentQuestion.type === 'multiple-choice';
  const isTextQuestion = currentQuestion.type === 'text';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">
      {/* Destination Ambient Journey Info Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-3 px-5 sm:px-6 rounded-2xl sm:rounded-full bg-[#25152f]/90 border border-[#45245F] shadow-[0_4px_20px_rgba(25,9,36,0.6)] backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#9BD9D0] shadow-[0_0_10px_#9BD9D0] animate-pulse"></div>
          <span className="font-body text-[12px] uppercase tracking-wider text-[#f3dafe] font-bold">
            Destination 01: Quizzes <span className="text-[#8050A8] mx-1.5">•</span>{' '}
            {completedQuizzesCount} of {totalQuizzes} Completed
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 font-body text-[11px] px-3.5 py-1 rounded-full bg-[#34233e]/80 text-[#fcafdb] font-semibold border border-[#6d3257]/80 shadow-[0_0_10px_rgba(252,175,219,0.15)]">
            <span className="material-symbols-outlined text-[14px] text-[#9BD9D0]">lock_clock</span>
            <span>
              {allQuizzesCompleted
                ? 'All quizzes completed • Letters unlocked!'
                : 'Both quizzes must be completed to unlock Letters'}
            </span>
          </span>
        </div>
      </div>

      {/* Quiz Switcher Navigation Pills */}
      {totalQuizzes > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#cbc4d1] mr-1">
            Choose Quiz:
          </span>
          {quizzesData.map((quiz, idx) => {
            const isSelected = idx === selectedQuizIdx;
            const isDone = progression.completedQuizIds.includes(quiz.id);

            return (
              <button
                key={quiz.id}
                type="button"
                onClick={() => handleSelectQuiz(idx)}
                className={`px-4 py-2 rounded-full font-body text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#B99BEF] to-[#fcafdb] text-[#25152F] shadow-md ring-2 ring-white/40'
                    : 'bg-[#25152f] hover:bg-[#34233e] text-[#cbc4d1] border border-[#45245F]'
                }`}
              >
                <span>
                  {quiz.number ? `Quiz ${quiz.number}` : `Quiz ${idx + 1}`}: {quiz.title}
                </span>
                {isDone && (
                  <span className="material-symbols-outlined text-[15px] text-[#1e8a7b]">
                    check_circle
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW A: Quiz Question Presentation Mode                   */}
      {/* ========================================================= */}
      {!showResults ? (
        <section className="flex flex-col gap-6 sm:gap-8">
          {/* Header Track */}
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={onBack}
                  className="w-9 h-9 rounded-full bg-[#25152f] hover:bg-[#34233e] border border-[#3f2e4a] flex items-center justify-center transition-all text-[#d4bbff] hover:text-[#ffffff] hover:border-[#B99BEF] shrink-0 cursor-pointer"
                  title="Back to Dashboard"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                </button>
                <div className="min-w-0">
                  <span className="font-body text-[11px] uppercase tracking-wider text-[#F3A7D2] font-bold block truncate flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#9BD9D0]">
                      local_florist
                    </span>
                    {currentQuiz.title} • {currentQuiz.subtitle}
                  </span>
                  <h2 className="font-display italic text-lg sm:text-[22px] text-[#f3dafe] font-semibold truncate tracking-tight">
                    {currentQuiz.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="font-body text-[12px] text-[#f3dafe] font-bold bg-[#291933] px-4 py-1.5 rounded-full border border-[#8050A8]/60 shadow-[0_0_15px_rgba(185,155,239,0.2)] flex items-center gap-1.5">
                  Question{' '}
                  <span className="text-[#9BD9D0] font-black">
                    {String(currentQIndex + 1).padStart(2, '0')}
                  </span>{' '}
                  of {totalQuestions}
                </span>
              </div>
            </div>

            {/* Segment Track Bar with Floating Butterfly */}
            <div className="w-full flex items-center gap-1 sm:gap-1.5 pt-1">
              {questions.map((q, idx) => {
                const isActive = idx === currentQIndex;
                const isAnswered = localAnswers.hasOwnProperty(q.id) &&
                  (q.type === 'text'
                    ? String(localAnswers[q.id]).trim().length > 0
                    : localAnswers[q.id] !== undefined);

                return (
                  <div
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 relative cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#B99BEF] to-[#9BD9D0] shadow-[0_0_12px_#B99BEF] h-2.5'
                        : isAnswered
                        ? 'bg-[#fcafdb] shadow-[0_0_6px_rgba(252,175,219,0.5)]'
                        : 'bg-[#34233e]/80 hover:bg-[#45245F]'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center justify-center text-[#9BD9D0] animate-bounce">
                        <span className="material-symbols-outlined text-[16px] drop-shadow-[0_0_8px_#9BD9D0]">
                          flutter_dash
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question Glass Canvas */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#25152f]/95 via-[#291933]/90 to-[#1e0d29]/95 p-6 sm:p-10 md:p-12 shadow-[0_12px_45px_rgba(15,5,22,0.7)] border border-[#45245F] overflow-hidden backdrop-blur-xl">
            <div className="absolute -top-16 -right-16 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-bl from-[#F3A7D2]/20 via-[#B99BEF]/15 to-transparent blur-3xl pointer-events-none animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#9BD9D0]/20 via-[#8050A8]/20 to-transparent blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col gap-6 sm:gap-8 max-w-4xl mx-auto">
              {/* Category Marker & Memory Entry Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#34233e]/90 text-[#fcafdb] font-body text-[11px] font-bold uppercase tracking-wider border border-[#6d3257] shadow-sm">
                  <span className="material-symbols-outlined text-[15px] text-[#9BD9D0]">
                    psychology_alt
                  </span>
                  <span>{currentQuestion.category}</span>
                </span>
                <span className="font-body text-[11px] text-[#d4bbff] font-semibold tracking-widest uppercase bg-[#25152f] px-3.5 py-1 rounded-full border border-[#45245F] shadow-inner">
                  {currentQuestion.tag}
                </span>
              </div>

              {/* Question Heading */}
              <h3 className="font-display italic text-2xl sm:text-3xl text-[#f3dafe] tracking-tight font-normal leading-snug sm:leading-tight drop-shadow-sm">
                {currentQuestion.question}
              </h3>

              {/* CASE 1: Multiple Choice Options Grid */}
              {isMcQuestion && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 pt-2">
                  {currentQuestion.options.map((optText, idx) => {
                    const theme = optionThemes[idx % optionThemes.length];
                    const isSelected = localAnswers[currentQuestion.id] === idx;
                    const isAnswered = localAnswers.hasOwnProperty(currentQuestion.id);
                    const isCorrect = idx === currentQuestion.correctAnswerIndex;

                    return (
                      <QuizOption
                        key={idx}
                        letter={letters[idx]}
                        text={optText}
                        theme={theme}
                        isSelected={isSelected}
                        isAnswered={isAnswered}
                        isCorrect={isCorrect}
                        onSelect={() => handleSelectOption(idx)}
                      />
                    );
                  })}
                </div>
              )}

              {/* CASE 2: Written Response Textarea */}
              {isTextQuestion && (
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center justify-between text-xs text-[#d4bbff]">
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#fcafdb]">
                      <span className="material-symbols-outlined text-[15px]">edit_note</span>
                      A Written Memory from Sheldon
                    </span>
                    <span className="text-[#cbc4d1]/80">
                      {(localAnswers[currentQuestion.id] || '').length} characters written
                    </span>
                  </div>

                  <div className="relative rounded-2xl bg-[#1c0c26]/90 border-2 border-[#B99BEF]/40 focus-within:border-[#fcafdb] focus-within:ring-2 focus-within:ring-[#fcafdb]/30 transition-all p-4 shadow-inner">
                    <textarea
                      value={localAnswers[currentQuestion.id] || ''}
                      onChange={handleTextChange}
                      placeholder={currentQuestion.placeholder || 'Write freely from the heart...'}
                      rows={5}
                      className="w-full bg-transparent text-[#f3dafe] placeholder-[#8050A8]/80 text-[15px] sm:text-[16px] leading-relaxed resize-y focus:outline-none font-body"
                    />
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#34233e]/60 border border-[#6d3257]/50 text-xs text-[#cbc4d1]">
                    <span className="material-symbols-outlined text-[16px] text-[#9BD9D0] shrink-0">
                      favorite
                    </span>
                    <span>
                      Take your time. Written memories are preserved in your keepsake collection and will be read by Claret later ♡
                    </span>
                  </div>
                </div>
              )}

              {/* Tender Hint Footer */}
              {currentQuestion.hint && (
                <div className="flex items-center gap-2.5 pt-3 border-t border-[#3f2e4a]/60">
                  <span className="material-symbols-outlined text-[18px] text-[#9BD9D0] shrink-0 animate-pulse">
                    flutter_dash
                  </span>
                  <p className="font-body text-[13px] italic text-[#d4bbff] font-medium">
                    {currentQuestion.hint}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Bar & Pagination Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1 pb-4">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentQIndex === 0}
              className="w-full sm:w-auto flex items-center justify-center gap-2 font-body text-[12px] font-semibold uppercase tracking-wider text-[#f3dafe] hover:text-[#9BD9D0] transition-all px-6 py-3 rounded-full bg-[#25152f] hover:bg-[#34233e] border border-[#45245F] hover:border-[#9BD9D0]/50 hover:shadow-[0_0_18px_rgba(155,217,208,0.25)] disabled:opacity-35 disabled:pointer-events-none cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Previous Question</span>
            </button>

            {/* Pagination Numbers / Pills */}
            <div className="flex items-center flex-wrap justify-center gap-1.5 p-1.5 rounded-full bg-[#25152f]/95 border border-[#3f2e4a] shadow-inner">
              {questions.map((q, idx) => {
                const isActive = idx === currentQIndex;
                const isAnswered = localAnswers.hasOwnProperty(q.id) &&
                  (q.type === 'text'
                    ? String(localAnswers[q.id]).trim().length > 0
                    : localAnswers[q.id] !== undefined);

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentQIndex(idx)}
                    className={`w-8 h-8 rounded-full text-[11px] transition-all flex items-center justify-center cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-tr from-[#B99BEF] to-[#9BD9D0] text-[#25152F] font-bold shadow-[0_0_14px_rgba(185,155,239,0.7)] transform scale-110 ring-2 ring-[#ffffff]/50'
                        : isAnswered
                        ? 'bg-[#6d3257] text-[#fcafdb] font-semibold border border-[#fcafdb]/50 hover:bg-[#8050A8] shadow-sm'
                        : 'bg-transparent hover:bg-[#34233e] text-[#cbc4d1] font-medium border border-[#45245F]'
                    }`}
                    title={`Question ${idx + 1}`}
                  >
                    {isAnswered && !isActive ? (
                      <span className="material-symbols-outlined text-[15px] text-[#9BD9D0]">
                        check
                      </span>
                    ) : (
                      idx + 1
                    )}
                  </button>
                );
              })}
            </div>

            {/* Next / Submit Button */}
            <button
              type="button"
              onClick={handleNext}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 font-body text-[12px] tracking-wider uppercase px-8 py-3 rounded-full transition-all cursor-pointer font-bold shrink-0 ${
                currentQIndex === totalQuestions - 1
                  ? 'bg-gradient-to-r from-[#fcafdb] to-[#B99BEF] text-[#25152F] shadow-[0_0_20px_rgba(252,175,219,0.5)] hover:shadow-[0_0_28px_rgba(155,217,208,0.7)]'
                  : 'bg-[#25152F] text-[#d4bbff] border-2 border-[#8050A8] hover:border-[#9BD9D0] hover:text-[#ffffff] shadow-[0_4px_20px_rgba(128,80,168,0.4)] hover:shadow-[0_0_24px_rgba(155,217,208,0.45)]'
              }`}
            >
              <span>
                {currentQIndex === totalQuestions - 1
                  ? `Submit ${currentQuiz.title.split('?')[0]} ✨`
                  : 'Next Question'}
              </span>
              <span className="material-symbols-outlined text-[18px] text-[#9BD9D0]">
                {currentQIndex === totalQuestions - 1 ? 'auto_awesome' : 'arrow_forward'}
              </span>
            </button>
          </div>
        </section>
      ) : (
        /* ========================================================= */
        /* VIEW B: Results & Written Responses Review Showcase       */
        /* ========================================================= */
        <section className="flex flex-col gap-8 max-w-4xl mx-auto w-full animate-float-slow">
          {/* Main Score Plaque */}
          <div className="rounded-3xl bg-gradient-to-br from-[#2b1739] via-[#25152f] to-[#1e0d29] p-8 sm:p-12 border-2 border-[#B99BEF]/50 shadow-[0_0_40px_rgba(185,155,239,0.25)] flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#fcafdb] via-[#B99BEF] to-[#9BD9D0] text-[#25152F] flex items-center justify-center shadow-lg ring-4 ring-white/20">
              <span className="material-symbols-outlined text-[32px]">auto_awesome</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#34233e] border border-[#fcafdb]/40 text-[#fcafdb] text-xs font-bold uppercase tracking-wider">
              <span>Memory Archive Sealed</span>
            </div>

            <h2 className="font-display italic text-3xl sm:text-5xl text-[#f3dafe] tracking-tight">
              {currentQuiz.title} Completed!
            </h2>

            {/* Score Display (MC questions automatically scored) */}
            <div className="my-2 p-6 rounded-2xl bg-[#170721]/80 border border-[#45245F] max-w-md w-full flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[#9BD9D0] font-bold">
                {currentQuiz.id === 'quiz-me' ? 'Score' : 'Multiple Choice Score'}
              </span>
              <div className="font-display italic text-4xl sm:text-5xl text-[#ffd8eb]">
                {currentScore.score} / {currentScore.totalScored}
              </div>
              <span className="text-xs text-[#cbc4d1]">
                {currentScore.percentage}% Accuracy on auto-scored memory questions
              </span>
              {currentQuiz.id === 'quiz-us' && (
                <div className="mt-2 pt-2 border-t border-[#3f2e4a] text-xs text-[#fcafdb] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-[#9BD9D0]">favorite</span>
                  <span>Plus 6 personal written memories saved for Claret ♡</span>
                </div>
              )}
            </div>

            <p className="font-editorial italic text-lg sm:text-xl text-[#d4bbff] max-w-xl">
              {allQuizzesCompleted
                ? '“Every memory recorded here brings us one step closer to unlocking the secret letters.”'
                : '“One chapter completed. Complete the remaining quiz to unlock the secret letters.”'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={handleRetryQuiz}
                className="px-6 py-3 rounded-full bg-[#34233e] hover:bg-[#45245F] text-[#f3dafe] font-body text-xs font-bold uppercase tracking-wider border border-[#B99BEF]/40 hover:border-[#fcafdb] transition-all cursor-pointer flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                <span>Retry Quiz ↺</span>
              </button>

              {allQuizzesCompleted ? (
                <button
                  type="button"
                  onClick={() => onCompleteDestination('letters')}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#fcafdb] via-[#B99BEF] to-[#9BD9D0] text-[#25152F] font-body text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(252,175,219,0.5)] hover:shadow-[0_0_35px_rgba(155,217,208,0.7)] transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Open Letters ✉️</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const nextQuizIdx = (selectedQuizIdx + 1) % totalQuizzes;
                    handleSelectQuiz(nextQuizIdx);
                  }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#fcafdb] to-[#B99BEF] text-[#25152F] font-body text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Proceed to Next Quiz</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              )}
            </div>
          </div>

          {/* Written Responses Showcase (for Quiz 2 or any text questions) */}
          {questions.some((q) => q.type === 'text') && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#3f2e4a] pb-3">
                <div>
                  <span className="font-body text-[11px] uppercase tracking-widest text-[#fcafdb] font-bold">
                    Personal Keepsake Ledger
                  </span>
                  <h3 className="font-display italic text-2xl text-[#f3dafe]">
                    Sheldon's Written Answers for Claret
                  </h3>
                </div>
                <span className="text-xs text-[#9BD9D0] bg-[#175B51]/30 border border-[#175B51] px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  Saved Permanently
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {questions
                  .filter((q) => q.type === 'text')
                  .map((q, idx) => {
                    const text = localAnswers[q.id] || '(No written answer provided yet)';
                    return (
                      <div
                        key={q.id}
                        className="rounded-2xl bg-[#25152f]/90 border border-[#B99BEF]/30 p-5 sm:p-6 flex flex-col gap-2.5 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#fcafdb]">
                            Memory #{idx + 1} • {q.category}
                          </span>
                          <span className="text-[11px] text-[#cbc4d1]/70">{q.tag}</span>
                        </div>
                        <h4 className="font-display italic text-lg text-[#f3dafe]">
                          {q.question}
                        </h4>
                        <div className="p-4 rounded-xl bg-[#1c0c26] border border-[#45245F] text-[#ffd8eb] font-body text-[15px] leading-relaxed italic whitespace-pre-wrap">
                          “{text}”
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
