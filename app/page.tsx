import BootSequence from "@/components/BootSequence";
import Content from "@/components/Content";
import Spotlight from "@/components/Spotlight";
import Track from "@/components/Track";

export default function Home() {
  return (
    <>
      <BootSequence />
      <div className="bg-glow" />
      <div className="bg-grid" />
      <Spotlight />
      <Content />
      <Track />
    </>
  );
}
