import { FloatingPetals } from './components/FloatingPetals';
import { HeroSection } from './components/HeroSection';
import { TimelineSection } from './components/TimelineSection';
import { ConfessionSection } from './components/ConfessionSection';
import { RomanticFooter } from './components/RomanticFooter';

export default function App() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: '#0f0a1e', fontFamily: "'Lato', sans-serif" }}
    >
      {/* Floating ambient petals */}
      <FloatingPetals />

      {/* Pages */}
      <HeroSection />
      <TimelineSection />
      <ConfessionSection />
      <RomanticFooter />
    </div>
  );
}
