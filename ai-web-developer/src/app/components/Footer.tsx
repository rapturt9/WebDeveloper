// src/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-white shadow-sm">
      <div className="container mx-auto p-6 text-center space-y-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AI Web Developer. All rights
          reserved.
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="/docs"
            className="text-sm text-gray-600 hover:text-indigo-600"
          >
            Documentation
          </a>
          <a
            href="/support"
            className="text-sm text-gray-600 hover:text-indigo-600"
          >
            Support
          </a>
          <a
            href="/license"
            className="text-sm text-gray-600 hover:text-indigo-600"
          >
            License
          </a>
        </div>
      </div>
    </footer>
  );
}
