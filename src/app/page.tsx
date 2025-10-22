import HomePage from "@/components/main";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <header>
      <nav className="p-6 bg-gray-800 text-white">
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">About</a></li>
          <li><a href="#" className="hover:underline">Services</a></li>
          <li><a href="#" className="hover:underline">Contact</a></li>
        </ul>
      </nav>
    </header>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <HomePage />
      <Image
        src="next.svg"
        alt="Logo"
        width={200}
        height={200}
      />
    </main>
    </>
    
  );
}
