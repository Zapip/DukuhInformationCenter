import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Store, Users, UserStarIcon } from "lucide-react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";
import Link from "next/link";

const profile = () => {
    return (
        <article>
            <article className="w-full min-h-screen flex flex-col p-4">
                <nav className="bg-white flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg shadow-lg border border-gray-200 sticky top-5 z-50">
                    <section className="flex gap-4">
                        <Image src="/logo.webp" alt="Descriptive alt text" width={25} height={12.5} />
                        <h1 className="text-xl sm:text-3xl text-primary font-bold"><Link href="/">Profil Pedukuhan Dukuh</Link></h1>
                    </section>
                    <Button className="flex gap-2 font-semibold w-full sm:w-fit">
                        <UserStarIcon className="size-6" />
                        <Link href="/auth" target="_blank">Masuk Sebagai Admin</Link>
                    </Button>
                </nav>
                <article className="max-h-screen overflow-y-scroll flex flex-col md:flex-row gap-4 p-4 mt-4 rounded-lg">
                    <Card className="w-full md:w-2/3">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-primary">Profil Pedukuhan Dukuh</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-center gap-4 items-center">
                            <Carousel className="max-w-sm md:max-w-4xl">
                                <CarouselContent>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <CarouselItem key={index}>
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex aspect-video items-center justify-center p-6">
                                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                            <article>
                                <p className="text-justify mb-2">
                                    Pedukuhan Dukuh adalah sebuah komunitas yang terletak di wilayah Yogyakarta, Indonesia.
                                    Pedukuhan ini dikenal dengan kekayaan budaya dan tradisi yang masih dijaga hingga saat ini.
                                    Pedukuhan Dukuh adalah sebuah komunitas yang terletak di wilayah Yogyakarta, Indonesia.
                                    Pedukuhan ini dikenal dengan kekayaan budaya dan tradisi yang masih dijaga hingga saat ini.
                                    Pedukuhan Dukuh adalah sebuah komunitas yang terletak di wilayah Yogyakarta, Indonesia.
                                    Pedukuhan ini dikenal dengan kekayaan budaya dan tradisi yang masih dijaga hingga saat ini.
                                    Pedukuhan Dukuh adalah sebuah komunitas yang terletak di wilayah Yogyakarta, Indonesia.
                                    Pedukuhan ini dikenal dengan kekayaan budaya dan tradisi yang masih dijaga hingga saat ini.
                                </p>
                                <p className="text-justify">
                                    Dukuh memiliki berbagai potensi wisata, termasuk wisata alam, budaya, dan kuliner yang menarik untuk dieksplorasi oleh pengunjung.
                                </p>
                            </article>
                        </CardContent>
                    </Card>
                    <article className="flex-1 flex gap-4 flex-col">
                        <Card className="h-full">
                            <CardContent className="flex gap-4 justify-between items-center">
                                <section className="flex flex-col gap-2 justify-between">
                                    <h1 className="text-2xl font-bold text-primary text-nowrap">Total Penduduk</h1>
                                    <p className="text-4xl md:text-6xl font-extrabold  text-secondary">1,250</p>
                                </section>
                                <Users className="size-24 mt-2 text-primary" />
                            </CardContent>
                        </Card>

                        <Card className="h-full">
                            <CardContent className="flex gap-4 justify-between items-center">
                                <section className="flex flex-col gap-2 justify-between">
                                    <h1 className="text-2xl font-bold text-primary text">Total Pelaku UMKM</h1>
                                    <p className="text-4xl md:text-6xl font-extrabold  text-secondary">6</p>
                                </section>
                                <Store className="size-24 text-primary" />
                            </CardContent>
                        </Card>

                        <Card className="h-full">
                            <CardContent className="flex gap-4 justify-between items-center">
                                <section className="flex flex-col gap-2 justify-between">
                                    <h1 className="text-2xl font-bold text-primary text-nowrap">Fasilitas Umum</h1>
                                    <p className="text-4xl md:text-6xl font-extrabold  text-secondary">3</p>
                                </section>
                                <Building className="size-24 text-primary" />
                            </CardContent>
                        </Card>

                    </article>
                </article>
                <article className="max-h-screen overflow-y-scroll flex flex-col md:flex-row gap-4 p-4 mt-4 rounded-lg">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2656.240027688494!2d109.78895498887638!3d-7.739490798069785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7ac67660d8c573%3A0x76b00744ed8edfa4!2sDukuh%2C%20Ngabean%2C%20Kec.%20Mirit%2C%20Kabupaten%20Kebumen%2C%20Jawa%20Tengah!5e1!3m2!1sid!2sid!4v1763476750725!5m2!1sid!2sid" className="h-full md:h-auto md:w-2/3 rounded-xl" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    <article className="flex-1 flex gap-4 flex-col">
                        <Card className="size-full">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-primary text-wrap">Narahubung Pedukuhan Dukuh</CardTitle>
                            </CardHeader>
                            <CardContent className="flex gap-4 justify-between items-center">
                                <Link href="https://wa.me/6281327540306" className="w-full py-2 px-4 duration-500 animate-bounce hover:bg-gray-300 rounded-lg flex items-center gap-2">  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 1024 1024" id="whatsapp">
                                    <defs>
                                        <path id="b" d="M1023.941 765.153c0 5.606-.171 17.766-.508 27.159-.824 22.982-2.646 52.639-5.401 66.151-4.141 20.306-10.392 39.472-18.542 55.425-9.643 18.871-21.943 35.775-36.559 50.364-14.584 14.56-31.472 26.812-50.315 36.416-16.036 8.172-35.322 14.426-55.744 18.549-13.378 2.701-42.812 4.488-65.648 5.3-9.402.336-21.564.505-27.15.505l-504.226-.081c-5.607 0-17.765-.172-27.158-.509-22.983-.824-52.639-2.646-66.152-5.4-20.306-4.142-39.473-10.392-55.425-18.542-18.872-9.644-35.775-21.944-50.364-36.56-14.56-14.584-26.812-31.471-36.415-50.314-8.174-16.037-14.428-35.323-18.551-55.744-2.7-13.378-4.487-42.812-5.3-65.649-.334-9.401-.503-21.563-.503-27.148l.08-504.228c0-5.607.171-17.766.508-27.159.825-22.983 2.646-52.639 5.401-66.151 4.141-20.306 10.391-39.473 18.542-55.426C34.154 93.24 46.455 76.336 61.07 61.747c14.584-14.559 31.472-26.812 50.315-36.416 16.037-8.172 35.324-14.426 55.745-18.549 13.377-2.701 42.812-4.488 65.648-5.3 9.402-.335 21.565-.504 27.149-.504l504.227.081c5.608 0 17.766.171 27.159.508 22.983.825 52.638 2.646 66.152 5.401 20.305 4.141 39.472 10.391 55.425 18.542 18.871 9.643 35.774 21.944 50.363 36.559 14.559 14.584 26.812 31.471 36.415 50.315 8.174 16.037 14.428 35.323 18.551 55.744 2.7 13.378 4.486 42.812 5.3 65.649.335 9.402.504 21.564.504 27.15l-.082 504.226z"></path>
                                    </defs>
                                    <linearGradient id="a" x1="512.001" x2="512.001" y1=".978" y2="1025.023" gradientUnits="userSpaceOnUse">
                                        <stop offset="0" stopColor="#61fd7d"></stop>
                                        <stop offset="1" stopColor="#2bb826"></stop>
                                    </linearGradient>
                                    <use xlinkHref="#b" fill="url(#a)" overflow="visible"></use>
                                    <path fill="#FFF" d="M783.302 243.246c-69.329-69.387-161.529-107.619-259.763-107.658-202.402 0-367.133 164.668-367.214 367.072-.026 64.699 16.883 127.854 49.017 183.522l-52.096 190.229 194.665-51.047c53.636 29.244 114.022 44.656 175.482 44.682h.151c202.382 0 367.128-164.688 367.21-367.094.039-98.087-38.121-190.319-107.452-259.706zM523.544 808.047h-.125c-54.767-.021-108.483-14.729-155.344-42.529l-11.146-6.612-115.517 30.293 30.834-112.592-7.259-11.544c-30.552-48.579-46.688-104.729-46.664-162.379.066-168.229 136.985-305.096 305.339-305.096 81.521.031 158.154 31.811 215.779 89.482s89.342 134.332 89.312 215.859c-.066 168.243-136.984 305.118-305.209 305.118zm167.415-228.515c-9.177-4.591-54.286-26.782-62.697-29.843-8.41-3.062-14.526-4.592-20.645 4.592-6.115 9.182-23.699 29.843-29.053 35.964-5.352 6.122-10.704 6.888-19.879 2.296-9.176-4.591-38.74-14.277-73.786-45.526-27.275-24.319-45.691-54.359-51.043-63.543-5.352-9.183-.569-14.146 4.024-18.72 4.127-4.109 9.175-10.713 13.763-16.069 4.587-5.355 6.117-9.183 9.175-15.304 3.059-6.122 1.529-11.479-.765-16.07-2.293-4.591-20.644-49.739-28.29-68.104-7.447-17.886-15.013-15.466-20.645-15.747-5.346-.266-11.469-.322-17.585-.322s-16.057 2.295-24.467 11.478-32.113 31.374-32.113 76.521c0 45.147 32.877 88.764 37.465 94.885 4.588 6.122 64.699 98.771 156.741 138.502 21.892 9.45 38.982 15.094 52.308 19.322 21.98 6.979 41.982 5.995 57.793 3.634 17.628-2.633 54.284-22.189 61.932-43.615 7.646-21.427 7.646-39.791 5.352-43.617-2.294-3.826-8.41-6.122-17.585-10.714z"></path>
                                </svg><p>+62 813-2754-0306 <span className="font-semibold">(Ibu Cici)</span></p></Link>
                            </CardContent>
                        </Card>
                        <Card className="size-full">
                            <CardContent className="flex gap-4 justify-between items-center">
                                <Button variant="ghost" className="size-full text-primary font-semibold flex items-center gap-2 p-4">
                                    <svg className="size-12" viewBox="0 0 3364.7 3364.7" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><radialGradient id="0" cx="217.76" cy="3290.99" r="4271.92" gradientUnits="userSpaceOnUse"><stop offset=".09" stopColor="#fa8f21"></stop><stop offset=".78" stopColor="#d82d7e"></stop></radialGradient><radialGradient id="1" cx="2330.61" cy="3182.95" r="3759.33" gradientUnits="userSpaceOnUse"><stop offset=".64" stopColor="#8c3aaa" stopOpacity="0"></stop><stop offset="1" stopColor="#8c3aaa"></stop></radialGradient></defs><path d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9" fill="url(#0)"></path><path d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9" fill="url(#1)"></path><path d="M1269.25,1689.52c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7-416.6-186.59-416.6-416.7m-225.26,0c0,354.5,287.36,641.86,641.86,641.86s641.86-287.36,641.86-641.86-287.36-641.86-641.86-641.86S1044,1335,1044,1689.52m1159.13-667.31a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M1180.85,2707c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27S2059.13,666,2191,672c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M1170.5,447.09c-133.07,6.06-224,27.16-303.41,58.06-82.19,31.91-151.86,74.72-221.43,144.18S533.39,788.47,501.48,870.76c-30.9,79.46-52,170.34-58.06,303.41-6.16,133.28-7.57,175.89-7.57,515.35s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43s139.14,112.18,221.43,144.18c79.56,30.9,170.34,52,303.41,58.06,133.35,6.06,175.89,7.57,515.35,7.57s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2586.8,537.06,2504.71,505.15c-79.56-30.9-170.44-52.1-303.41-58.06C2068,441,2025.41,439.52,1686,439.52s-382.1,1.41-515.45,7.57" fill="#ffffff"></path></g></svg>

                                    <p className="text-2xl font-bold text-primary text-nowrap">@dukuh_ngabean</p></Button>
                            </CardContent>
                        </Card>
                    </article>
                </article>
            </article>
        </article>
    );
}
export default profile;