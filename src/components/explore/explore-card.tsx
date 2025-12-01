'use client';
import { supabase } from '@/lib/supabase/client';
import { JelajahDukuh } from "@/types/JelajahDukuh";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Link from 'next/link';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Loader2, Search } from 'lucide-react';


const ExploreCard = () => {
    const [jelajah, setJelajah] = useState<JelajahDukuh[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedJelajah, setSelectedJelajah] = useState<JelajahDukuh | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchJelajah() {
            setLoading(true);
            const supabaseClient = supabase;
            const { data, error } = await supabaseClient.from('umkm').select('*');
            if (error) console.log('Error fetching data:', error);
            else setJelajah(data);
            setLoading(false);
        }
        fetchJelajah();
    }, []);

    const filteredJelajah = jelajah.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
            item.nama_usaha.toLowerCase().includes(query) ||
            item.deskripsi.toLowerCase().includes(query) ||
            item.kategori_usaha.toLowerCase().includes(query)
        );
    });

    if (loading)
        return (
            <section className="w-full flex justify-center gap-2 items-center h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-gray-500 text-lg animate-pulse">Memuat data UMKM...</p>
            </section>
        );
    return (
        <>
            {/* Search Bar */}
            <section className="col-span-full">
                <article className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
                    <Input
                        type="text"
                        placeholder="Cari berdasarkan nama, deskripsi, atau kategori..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-full bg-background"
                    />
                </article>
                {searchQuery && (
                    <p className="text-sm text-gray-500 mt-2">
                        Menampilkan {filteredJelajah.length} dari {jelajah.length} hasil
                    </p>
                )}
            </section>

            {/* Display message if no results */}
            {filteredJelajah.length === 0 && (
                <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">Tidak ada hasil yang ditemukan untuk &quot;{searchQuery}&quot;</p>
                </div>
            )}

            {/* Cards */}
            {filteredJelajah.map((jelajahItem) => (
                <Dialog key={jelajahItem.id} open={open && selectedJelajah?.id === jelajahItem.id} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Card
                            onClick={() => {
                                setSelectedJelajah(jelajahItem);
                                setOpen(true);
                            }}
                            className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                        >
                            <CardHeader>
                                <CardTitle className="text-lg sm:text-2xl">{jelajahItem.nama_usaha}</CardTitle>
                                <CardDescription>
                                    <article className="flex flex-col gap-2">
                                        <p className="text-justify line-clamp-3">{jelajahItem.deskripsi}</p>
                                        <section className="flex gap-2 flex-wrap">
                                            <Badge className="text-white">{jelajahItem.kontak}</Badge>
                                            <Badge className="text-white">{jelajahItem.kategori_usaha}</Badge>
                                        </section>
                                    </article>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Image
                                    src={jelajahItem.image_url ?? "/placeholder.webp"}
                                    alt={jelajahItem.nama_usaha}
                                    width={400}
                                    height={240}
                                    className="rounded-md object-cover w-full h-48"
                                />
                            </CardContent>
                        </Card>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedJelajah?.nama_usaha}</DialogTitle>
                            <DialogDescription><Badge className="text-white">{selectedJelajah?.kategori_usaha}</Badge></DialogDescription>
                        </DialogHeader>
                        <article className="flex flex-col gap-4">
                            <Image
                                src={selectedJelajah?.image_url ?? "/placeholder.webp"}
                                alt={selectedJelajah?.nama_usaha ?? ""}
                                width={600}
                                height={400}
                                className="rounded-md object-cover w-full h-60"
                            />
                            <p className="text-sm text-gray-700 text-justify">{selectedJelajah?.deskripsi}</p>
                            <p className="text-sm text-gray-700">
                                <strong>Kontak:</strong> {selectedJelajah?.kontak}
                            </p>
                            <Link href={selectedJelajah?.lokasi ?? "-"} target="_blank" rel="noopener noreferrer"><Button className='w-full hover:cursor-pointer'>Lihat di Maps</Button></Link>
                        </article>
                    </DialogContent>
                </Dialog>
            ))}


        </>
    );
}
export default ExploreCard;