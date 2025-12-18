"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import SplitText from "./SplitText";
import AnimatedContent from "./AnimatedContent";

export default function MainContent() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      <AnimatedContent
        distance={150}
        direction="vertical"
        reverse={true}
        duration={1.2}
        ease="bounce.out"
        initialOpacity={0.2}
        animateOpacity
        scale={1.1}
        threshold={0.2}
        delay={0.3}
      >
        <Image src="/logo.webp" alt="Logo Pedukuhan Dukuh" width={200} height={100}
          // style={{ width: 'auto', height: 'auto' }} 
          />
      </AnimatedContent>
      <article className="flex flex-col gap-2 my-4">

        <SplitText
          text="Selamat datang di Dukuh Information Center"
          className="text-primary text-3xl sm:text-4xl font-extrabold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        // onLetterAnimationComplete={handleAnimationComplete}
        />
        <h2 className="text-center text-sm sm:text-2xl">
          <SplitText
            text="Pusat segala informasi yang berhubungan dengan pedukuhan Dukuh, Desa Ngabean Kecamatan Mirit, Kabupaten Kebumen."
            className="text-center text-sm sm:text-2xl sm:w-2/3"
            delay={100}
            duration={0.3}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          // onLetterAnimationComplete={handleAnimationComplete}
          />
        </h2>
      </article>
      <AnimatedContent
        distance={150}
        direction="vertical"
        reverse={true}
        duration={1.2}
        ease="bounce.out"
        initialOpacity={0.2}
        animateOpacity
        scale={1.1}
        threshold={0.2}
        delay={0.3}
      >
        <article className="flex gap-2 items-center justify-center">
          <Button variant="default" size="lg" className="mt-4">
            <Link href="/explore" className="text-white font-bold">
              Jelajahi Dukuh
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="mt-4 border-primary border-2">
            <Link href="/profile" className="text-primary font-bold">Tentang Kami</Link>
          </Button>
        </article>
      </AnimatedContent>
    </main>
  );
}
