import { redirect } from "next/navigation";

export default function Home() {
  // return (
  //   <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 to-gray-800">
  //     <h1 className="text-9xl font-bold tracking-tight text-slate-50">
  //       Poin<span className="text-rose-500">thread</span>
  //     </h1>
  //   </main>
  // );
  redirect("/all-summaries");
}
