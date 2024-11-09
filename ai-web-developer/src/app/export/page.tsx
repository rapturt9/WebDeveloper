// src/app/export/page.tsx
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function ExportPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Export A/B Test</h1>
        {/* Export configuration form */}
        <form className="mt-4 space-y-4">
          <div>
            <label htmlFor="testName" className="block text-sm font-medium">
              A/B Test Name
            </label>
            <input
              type="text"
              id="testName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="trafficSplit" className="block text-sm font-medium">
              Traffic Split (%)
            </label>
            <input
              type="number"
              id="trafficSplit"
              min="0"
              max="100"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          {/* Additional configuration fields */}
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Generate A/B Test Setup
          </button>
        </form>
        {/* Logs or export status */}
        <div className="mt-6">
          <h2 className="text-lg font-medium">Export Status</h2>
          <div className="mt-2 p-2 bg-white rounded-md shadow h-32 overflow-y-auto">
            {/* Implement export status display */}
            <p>No export activity yet.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
