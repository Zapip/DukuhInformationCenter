import MainContent from "@/components/main-content";

export default function Home() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center bg-whit">
      <section
        className="absolute inset-0 bg-size-[40px_40px] bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
      />
      <section className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"></section>
      <section className="relative z-20 min-h-screen">

        <MainContent />
      </section>
    </section>

  );
}
