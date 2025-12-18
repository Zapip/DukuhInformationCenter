import ExploreCard from "@/components/explore/explore-card";
import Image from "next/image";
import Link from "next/link";

const ExplorePage = () => {
    return (
        <article className="w-full min-h-screen flex flex-col p-4">
            <nav className="bg-white flex items-center gap-4 p-4 rounded-lg shadow-lg border border-gray-200 sticky top-5 z-50">
                <Image src="/logo.webp" alt="Logo Pedukuhan Dukuh" width={25} height={12.5}
                //  style={{ width: 'auto', height: 'auto' }}
                />
                <h1 className="text-xl sm:text-3xl text-primary font-bold"><Link href="/">Jelajahi Pedukuhan Dukuh</Link></h1>
            </nav>
            <article className="max-h-screen overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-4 rounded-lg">
                <ExploreCard />
            </article>
        </article>
    );
}
export default ExplorePage;