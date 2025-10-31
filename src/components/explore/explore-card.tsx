'use client';
import { getAllUMKM } from "@/lib/firestore";
import { umkm } from "@/types/umkm";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";


const ExploreCard = () => {
    const [umkmList, setUmkmList] = useState<umkm[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUMKM, setSelectedUMKM] = useState<umkm | null>(null);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllUMKM();
            setUmkmList(data as umkm[]);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg animate-pulse">Memuat data UMKM...</p>
            </div>
        );
    return (
        <>
            {/* {umkmList.map((umkmItem) => (
                <Card key={umkmItem.id}>
                    <CardHeader>
                        <CardTitle>{umkmItem.nama_usaha}</CardTitle>
                        <CardDescription>
                            <article className="flex flex-col gap-2">
                                <section className="flex flex-col gap-2">
                                    <p className="text-justify line-clamp-2">{umkmItem.deskripsi}</p>
                                    <p className="text-justify line-clamp-2">Alamat: {umkmItem.lokasi.alamat}</p>
                                </section>
                                <section className="flex gap-2 flex-wrap">
                                    <Badge className="text-white">{umkmItem.kontak}</Badge>
                                    <Badge className="text-white">{umkmItem.kategori_usaha}</Badge>
                                </section>
                            </article>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Image src={umkmItem.image} alt={umkmItem.nama_usaha} width={50} height={30} />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button>Tampilkan Detail</Button>
                    </CardFooter>
                </Card>

            ))} */}
            {umkmList.map((umkmItem) => (
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
                                <CardTitle>{umkmItem.nama_usaha}</CardTitle>
                                <CardDescription>
                                    <article className="flex flex-col gap-2">
                                        <section className="flex flex-col gap-2">
                                            <p className="text-justify line-clamp-2">{umkmItem.deskripsi}</p>
                                            <p className="text-justify line-clamp-2">Alamat: {umkmItem.lokasi.alamat}</p>
                                        </section>
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
                            <DialogDescription>{selectedUMKM?.kategori_usaha}</DialogDescription>
                        </DialogHeader>
                        <article className="flex flex-col gap-4">
                            <Image
                                src={selectedUMKM?.image ?? ""}
                                alt={selectedUMKM?.nama_usaha ?? ""}
                                width={600}
                                height={400}
                                className="rounded-md object-cover w-full h-60"
                            />
                            <p className="text-sm text-gray-700">{selectedUMKM?.deskripsi}</p>
                            <p className="text-sm text-gray-700">
                                <strong>Alamat:</strong> {selectedUMKM?.lokasi.alamat}
                            </p>
                            <p className="text-sm text-gray-700">
                                <strong>Kontak:</strong> {selectedUMKM?.kontak}
                            </p>
                        </article>
                    </DialogContent>
                </Dialog>
            ))}


        </>
    );
}
export default ExploreCard;