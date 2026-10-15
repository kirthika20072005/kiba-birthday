import { ProgressProvider } from './context/ProgressContext.jsx';
import { MusicProvider } from './context/MusicContext.jsx';
import StarField from './components/effects/StarField.jsx';
import FloatingHearts from './components/effects/FloatingHearts.jsx';
import Nav from './components/layout/Nav.jsx';
import MusicPlayer from './components/layout/MusicPlayer.jsx';
import CursorSparkles from './components/layout/CursorSparkles.jsx';

import Portal from './components/sections/Portal.jsx';
import Countdown from './components/sections/Countdown.jsx';
import Cake from './components/sections/Cake.jsx';
import Gallery from './components/sections/Gallery.jsx';
import Videos from './components/sections/Videos.jsx';
import Letter from './components/sections/Letter.jsx';
import OpenWhen from './components/sections/OpenWhen.jsx';
import Gifts from './components/sections/Gifts.jsx';
import FinalReveal from './components/sections/FinalReveal.jsx';
import Footer from './components/layout/Footer.jsx';
import ConfettiLayer from './components/effects/ConfettiLayer.jsx';
import ScrollReset from './components/layout/ScrollReset.jsx';

export default function App() {
  return (
    <ProgressProvider>
      <MusicProvider>
        <StarField />
        <FloatingHearts count={10} opacity={0.35} />
        <Nav />
        <MusicPlayer />
        <CursorSparkles />
        <ScrollReset />
        <ConfettiLayer />

        <main id="universe">
          <Portal />
          <Countdown />
          <Cake />
          <Gallery />
          <Videos />
          <Letter />
          <OpenWhen />
          <Gifts />
          <FinalReveal />
        </main>

        <Footer />
      </MusicProvider>
    </ProgressProvider>
  );
}
