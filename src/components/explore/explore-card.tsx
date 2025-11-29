'use client';
import { supabase } from '@/lib/supabase/client';
import { umkm } from "@/types/JelajahDukuh";
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


const ExploreCard = () => {
    const [umkms, setUmkms] = useState<umkm[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedUMKM, setSelectedUMKM] = useState<umkm | null>(null);

    useEffect(() => {
        async function fetchUmkms() {
            setLoading(true);
            const supabaseClient = supabase;
            const { data, error } = await supabaseClient.from('umkm').select('*');
            if (error) console.log('Error fetching data:', error);
            else setUmkms(data);
            setLoading(false);
        }
        fetchUmkms();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg animate-pulse">Memuat data UMKM...</p>
            </div>
        );
    return (
        <>
            {umkms.map((umkmItem) => (
                <Dialog key={umkmItem.id} open={open && selectedUMKM?.id === umkmItem.id} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Card
                            onClick={() => {
                                setSelectedUMKM(umkmItem);
                                setOpen(true);
                            }}
                            className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                        >
                            <CardHeader>
                                <CardTitle className="text-lg sm:text-2xl">{umkmItem.nama_usaha}</CardTitle>
                                <CardDescription>
                                    <article className="flex flex-col gap-2">
                                        <p className="text-justify line-clamp-3">{umkmItem.deskripsi}</p>
                                        <section className="flex gap-2 flex-wrap">
                                            <Badge className="text-white">{umkmItem.kontak}</Badge>
                                            <Badge className="text-white">{umkmItem.kategori_usaha}</Badge>
                                        </section>
                                    </article>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Image
                                    src={umkmItem.image}
                                    alt={umkmItem.nama_usaha}
                                    width={400}
                                    height={240}
                                    className="rounded-md object-cover w-full h-48"
                                />
                            </CardContent>
                        </Card>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedUMKM?.nama_usaha}</DialogTitle>
                            <DialogDescription><Badge className="text-white">{selectedUMKM?.kategori_usaha}</Badge></DialogDescription>
                        </DialogHeader>
                        <article className="flex flex-col gap-4">
                            <Image
                                src={selectedUMKM?.image ?? ""}
                                alt={selectedUMKM?.nama_usaha ?? ""}
                                width={600}
                                height={400}
                                className="rounded-md object-cover w-full h-60"
                            />
                            <p className="text-sm text-gray-700 text-justify">{selectedUMKM?.deskripsi}</p>
                            <p className="text-sm text-gray-700">
                                <strong>Kontak:</strong> {selectedUMKM?.kontak}
                            </p>
                            <Link href={selectedUMKM?.lokasi ?? "-"} target="_blank" rel="noopener noreferrer"><Button className='w-full hover:cursor-pointer'>Lihat di Maps</Button></Link>
                        </article>
                    </DialogContent>
                </Dialog>
            ))}


        </>
    );
}
export default ExploreCard;