import { Navbar, Button } from "../components";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        title="Product App"
        rightContent={
          <div className="flex items-center space-x-4">
            <a href="/auth/sign-in">
              <Button variant="primary" size="md">
                Sign In
              </Button>
            </a>
            <a href="/auth/register">
              <Button variant="success" size="md">
                Register
              </Button>
            </a>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Product App</h2>
          <p className="text-gray-600 text-lg mb-8">
            Manage your products and orders easily
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/auth/sign-in">
              <Button variant="primary" size="lg">
                Get Started
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
