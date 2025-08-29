import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <section className="text-center py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Discover Amazing IT Conferences
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Find, explore, and review the best IT conferences around the world. Connect with tech enthusiasts, learn from industry leaders, and advance your career.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/conferences"
              className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Explore Conferences
            </Link>
            <Link
              href="/about"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </section>


        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose ConfTrack?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Conferences</h3>
              <p className="text-gray-600">Discover IT conferences that match your interests, skills, and professional goals.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Read Reviews</h3>
              <p className="text-gray-600">Get honest opinions from attendees about conference quality, content, and organization.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Experiences</h3>
              <p className="text-gray-600">Create your own reviews and help others make informed decisions about which conferences to attend.</p>
            </div>
          </div>
        </section>


        <section className="py-16">
          <div className="bg-blue-50 rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">250+</div>
                <div className="text-gray-600">Conferences</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">5K+</div>
                <div className="text-gray-600">Reviews</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">20K+</div>
                <div className="text-gray-600">Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-gray-600">Countries</div>
              </div>
            </div>
          </div>
        </section>


        <section className="bg-blue-600 rounded-lg p-8 text-center text-white mb-16">
          <h2 className="text-3xl font-bold mb-4">Ready to explore IT conferences?</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Join our community of tech professionals and stay updated with the best conferences in the industry.
          </p>
          <Link
            href="/register"
            className="bg-white text-blue-600 px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-100 transition-colors"
          >
            Get Started
          </Link>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} ConfTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}