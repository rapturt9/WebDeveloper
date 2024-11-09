// src/components/WebsitePreview.tsx

import { useEffect, useState } from "react";

interface WebsitePreviewProps {
  websiteURL: string;
  instructions: string[];
}

export default function WebsitePreview({
  websiteURL,
  instructions,
}: WebsitePreviewProps) {
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    // Logic to update iframeSrc based on websiteURL and instructions
    // This could involve calling an API that returns the modified website
    setIframeSrc(websiteURL); // Placeholder
  }, [websiteURL, instructions]);

  return (
    <section className="w-full md:w-2/3 p-6 bg-gray-50">
      {websiteURL ? (
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <iframe
            src={iframeSrc}
            title="Website Preview"
            className="w-full h-screen"
          ></iframe>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full bg-white border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 text-center">
            Enter a website URL to preview it here.
          </p>
        </div>
      )}
    </section>
  );
}
