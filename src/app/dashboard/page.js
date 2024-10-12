import { CardSummary } from "@/components/card-summary";
export default function Dashboard() {
  return (
    <main>
      <section className="p-5">
        <h1 className="text-5xl font-bold tracking-tight">
          Dash<span className="text-rose-500">board</span>
        </h1>
      </section>
      <section>
        <CardSummary />
      </section>
    </main>

  );
}
