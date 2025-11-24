// import { createClient } from "@/lib/supabase/server";
// import { redirect } from "next/navigation";

// const AdminPage = () => {
//     const supabase = createClientServer();
//     const { data: { user } } = await supabase.auth.getUser();

//     // Only 1 admin allowed — replace with your admin email
//     const ADMIN_EMAIL = "admin@example.com";


//     if (!user || user.email !== ADMIN_EMAIL) {
//         redirect("/login");
//     }


//     const { data: umkm } = await supabase.from("umkm").select("*");


//     return (
//         <div className="p-8 max-w-5xl mx-auto">
//             <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
//             <AdminTable data={umkm || []} />
//         </div>
//     );
// }
// export default AdminPage;