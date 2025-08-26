import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <section className="text-center py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Discover Amazing Festivals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Find, explore, and review the best festivals around the world. Connect with other festival enthusiasts and never miss out on the fun!
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/worldMap"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Explore Festivals
            </Link>
            <Link
              href="/about"
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </section>


        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose FestivalFinder?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Festivals</h3>
              <p className="text-gray-600">Discover festivals near you or in destinations you want to explore.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Read Reviews</h3>
              <p className="text-gray-600">Get honest opinions from people who have attended festivals.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Experiences</h3>
              <p className="text-gray-600">Create your own reviews and help others discover great festivals.</p>
            </div>
          </div>
        </section>


        <section className="bg-indigo-700 rounded-lg p-8 text-center text-white mb-16">
          <h2 className="text-3xl font-bold mb-4">Ready to explore festivals?</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Join our community of festival enthusiasts and never miss out on the best events.
          </p>
          <Link
            href="/register"
            className="bg-white text-indigo-700 px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-100 transition-colors"
          >
            Get Started
          </Link>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} FestivalFinder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}