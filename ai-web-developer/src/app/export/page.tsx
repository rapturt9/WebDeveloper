"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useState } from "react";

export default function ExportPage() {
  const [exportStatus, setExportStatus] = useState<string>(
    "No export activity yet."
  );
  const [testName, setTestName] = useState<string>("");
  const [trafficSplit, setTrafficSplit] = useState<number>(50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    setExportStatus(
      `Generating A/B test "${testName}" with ${trafficSplit}% traffic split...`
    );
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Export A/B Test</h1>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="testName" className="block text-sm font-medium">
              A/B Test Name
            </label>
            <input
              type="text"
              id="testName"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
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
              value={trafficSplit}
              onChange={(e) => setTrafficSplit(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Generate A/B Test Setup
          </button>
        </form>
        <div className="mt-6">
          <h2 className="text-lg font-medium">Export Status</h2>
          <div className="mt-2 p-2 bg-white rounded-md shadow h-32 overflow-y-auto">
            <p>{exportStatus}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
