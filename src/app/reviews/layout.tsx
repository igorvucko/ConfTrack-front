import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-900 text-white">
        {children}
      </main>
      <Footer />
    </>
  );
}