import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          SavePlate India
        </h1>
        <p className="text-xl text-gray-600 max-w-md">
          Save food, save money, save the planet. Join India's largest community of food rescuers.
        </p>
        <div className="space-y-4">
          <Link
            href="/auth/login"
            className="block w-full bg-primary text-white py-3 px-6 rounded-full hover:bg-primary/90 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/auth/signup"
            className="block w-full bg-white text-primary py-3 px-6 rounded-full border border-primary hover:bg-gray-50 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
