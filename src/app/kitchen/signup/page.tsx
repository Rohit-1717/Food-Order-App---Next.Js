import KitchenSignupForm from "@/components/KitchenSignupForm";

export default function KitchenSignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-xl shadow-md px-6 py-8 space-y-6">
        <KitchenSignupForm />
      </div>
    </main>
  );
}
