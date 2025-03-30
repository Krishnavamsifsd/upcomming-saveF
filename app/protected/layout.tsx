import BottomNav from '@/components/BottomNav';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <main className="container mx-auto px-4 py-4">
        {children}
      </main>
      <BottomNav />
    </div>
  );
} 