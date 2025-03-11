import { ArrowRight, MessageSquare, Zap, Target } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="w-full py-4 px-6 flex justify-between items-center bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">AI Interview Mocker</h1>
        <div className="space-x-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-800 transition-colors">
            Login
          </Link>
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 md:px-10 py-12 md:py-20">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Ace Your Interviews with AI-Powered Mock Sessions
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Prepare confidently for your dream job with our cutting-edge AI interview simulator.
          </p>
          <Link
            href="/get-started"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            Get Started <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
        <div className="md:w-1/2">
          <Image
            src="https://www.ttnews.com/articles/using-ai-for-job-interviews"
            alt="AI Interview Platform Illustration"
            width={600}
            height={400}
            className="rounded-lg shadow-2xl"
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-4 md:px-10">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose AI Interview Mocker?</h3>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<MessageSquare size={32} />}
            title="Realistic Mock Interviews"
            description="Experience lifelike interview scenarios tailored to your specific job position and industry."
          />
          <FeatureCard
            icon={<Zap size={32} />}
            title="Instant Feedback & Suggestions"
            description="Receive detailed, actionable feedback on your responses to improve your interview skills."
          />
          <FeatureCard
            icon={<Target size={32} />}
            title="Customizable Questions"
            description="Focus your practice on specific areas with our customizable question sets and difficulty levels."
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16 px-4 md:px-10 text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Boost Your Interview Confidence?</h3>
        <p className="text-xl mb-8">
          Join thousands of job seekers who have improved their interview skills with AI Interview Mocker.
        </p>
        <Link
          href="/signup"
          className="bg-white text-blue-600 px-8 py-3 rounded-md shadow hover:bg-gray-100 transition-colors text-lg font-semibold"
        >
          Start Your Free Trial
        </Link>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

