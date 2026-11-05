import React, { useState } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AtmosphericBackground from './components/common/AtmosphericBackground';
import DashboardPage from './pages/DashboardPage';
import QuizPage from './pages/QuizPage';
import LettersPage from './pages/LettersPage';
import MusicPage from './pages/MusicPage';
import SurpriseBoxPage from './pages/SurpriseBoxPage';
import { ProgressionProvider, useProgression } from './context/ProgressionContext';

// DevToolbar is lazily imported ONLY in development mode and tree-shaken in production
const DevToolbar = import.meta.env.DEV
  ? React.lazy(() => import('./components/dev/DevToolbar'))
  : null;

function AppContent() {
  const [activeDestination, setActiveDestination] = useState('dashboard');
  const [isAmbiencePlaying, setIsAmbiencePlaying] = useState(true);
  const [initialLetterId, setInitialLetterId] = useState(null);

  const { previewDestination, clearPreview } = useProgression();

  // If a destination preview is active from Dev Toolbar, display that destination
  const effectiveDestination = previewDestination || activeDestination;

  // Determine dark vs light theme
  // Quizzes and Playlist are dark twilight rooms in the Stitch designs
  const isDarkTheme = effectiveDestination === 'quizzes' || effectiveDestination === 'playlist';

  const handleNavigate = (destId) => {
    // If user explicitly navigates, clear any temporary dev preview
    if (previewDestination) {
      clearPreview();
    }
    setInitialLetterId(null);
    setActiveDestination(destId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToFinalLetter = () => {
    if (previewDestination) {
      clearPreview();
    }
    setInitialLetterId('final');
    setActiveDestination('letters');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-body transition-colors duration-500 relative ${
        isDarkTheme
          ? 'bg-[#190924] text-[#f3dafe]'
          : 'bg-[#FFF8F8] text-[#25152F]'
      }`}
    >
      {/* Background Ethereal Mists & Butterflies */}
      <AtmosphericBackground isDark={isDarkTheme} />

      {/* Global Navigation Header */}
      <Header
        activeDestination={effectiveDestination}
        onNavigate={handleNavigate}
        isDark={isDarkTheme}
        isAmbiencePlaying={isAmbiencePlaying}
        onToggleAmbience={() => setIsAmbiencePlaying(!isAmbiencePlaying)}
      />

      {/* Main Content Area */}
      <main className="w-full flex-grow pt-16 sm:pt-20 relative z-10">
        {effectiveDestination === 'dashboard' && (
          <DashboardPage onSelectDestination={handleNavigate} />
        )}

        {effectiveDestination === 'quizzes' && (
          <QuizPage
            onBack={() => handleNavigate('dashboard')}
            onCompleteDestination={(nextDest) => handleNavigate(nextDest || 'letters')}
          />
        )}

        {effectiveDestination === 'letters' && (
          <LettersPage
            onBackToHub={() => handleNavigate('dashboard')}
            onNavigateDestination={handleNavigate}
            initialLetterId={initialLetterId}
          />
        )}

        {effectiveDestination === 'playlist' && (
          <MusicPage
            onBack={() => handleNavigate('dashboard')}
            onCompleteDestination={(nextDest) => handleNavigate(nextDest || 'surprise-box')}
          />
        )}

        {effectiveDestination === 'surprise-box' && (
          <SurpriseBoxPage
            onBackToHub={() => handleNavigate('dashboard')}
            onNavigateDestination={handleNavigate}
          />
        )}
      </main>

      {/* Developer Testing Toolbar (Active strictly in DEV mode; eliminated in production) */}
      {import.meta.env.DEV && DevToolbar && (
        <React.Suspense fallback={null}>
          <DevToolbar onNavigate={handleNavigate} />
        </React.Suspense>
      )}

      {/* Universal Footer */}
      <Footer
        isDark={isDarkTheme}
        destinationNum={
          effectiveDestination === 'quizzes'
            ? '01'
            : effectiveDestination === 'letters'
            ? '02'
            : effectiveDestination === 'playlist'
            ? '03'
            : effectiveDestination === 'surprise-box'
            ? '04'
            : null
        }
        destinationName={
          effectiveDestination === 'quizzes'
            ? 'QUIZZES'
            : effectiveDestination === 'letters'
            ? 'LETTERS'
            : effectiveDestination === 'playlist'
            ? 'PLAYLIST'
            : effectiveDestination === 'surprise-box'
            ? 'SURPRISE BOX'
            : null
        }
      />
    </div>
  );
}

export default function App() {
  return (
    <ProgressionProvider>
      <AppContent />
    </ProgressionProvider>
  );
}
