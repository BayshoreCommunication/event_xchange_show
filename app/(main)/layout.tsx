import Navbar from "components/layout/Navbar";
import Footer from "components/layout/Footer";
import AudioPlayerProvider from "components/podcast/AudioPlayerProvider";
import SuggestGuestProvider from "components/podcast/SuggestGuestProvider";
import MotionProvider from "components/layout/MotionProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionProvider>
      <AudioPlayerProvider>
        <SuggestGuestProvider>
          <Navbar />
          {children}
          <Footer />
        </SuggestGuestProvider>
      </AudioPlayerProvider>
    </MotionProvider>
  );
}
