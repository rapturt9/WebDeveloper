// src/app/components/InstructionPanel.tsx

import { Dispatch, SetStateAction, useState } from "react";

interface InstructionPanelProps {
  websiteURL: string;
  setWebsiteURL: Dispatch<SetStateAction<string>>;
  instructions: string;
  setInstructions: Dispatch<SetStateAction<string>>;
  setModifiedHtml: Dispatch<SetStateAction<string>>;
}

export default function InstructionPanel({
  websiteURL,
  setWebsiteURL,
  instructions,
  setInstructions,
  setModifiedHtml,
}: InstructionPanelProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const input = event.currentTarget.value.trim();
      if (input) {
        setWebsiteURL(input);
        fetchAndModifyHtml(input, instructions);
      }
    }
  };

  const fetchAndModifyHtml = async (url: string, instructions: string) => {
    try {
      const response = await fetch(
        `/api/fetch-html?url=${encodeURIComponent(url)}`
      );
      const html = await response.text();

      console.log("Fetched HTML:", html);

      setModifiedHtml(html);

      const modifyResponse = await fetch("/api/modify-html", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, instructions }),
      });

      const data = await modifyResponse.json();
      console.log("Modified HTML:", data);
      if (!data.error) {
        setModifiedHtml(data.modifiedHtml);
      }
    } catch (error) {
      console.error("Error modifying HTML:", error);
    }
  };

  return (
    <section className="w-full md:w-1/3 p-6 bg-white border-r border-gray-200">
      {/* URL Input Form */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Website Modification
        </h2>
        <div className="space-y-2">
          <label
            htmlFor="websiteURL"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Website URL
          </label>
          <input
            type="url"
            id="websiteURL"
            placeholder="https://example.com"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="instructions"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Instructions
          </label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter instructions here..."
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
          />
        </div>
      </div>

      <button
        onClick={() => fetchAndModifyHtml(websiteURL, instructions)}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Apply Instructions
      </button>
    </section>
  );
}
