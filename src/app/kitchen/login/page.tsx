import KitchenLoginForm from "@/components/KitchenLoginForm";

export default function KitchenLogin() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full space-y-6 p-6 border rounded-xl shadow-md bg-white dark:bg-zinc-900">
        <KitchenLoginForm />
      </div>
    </main>
  );
}
