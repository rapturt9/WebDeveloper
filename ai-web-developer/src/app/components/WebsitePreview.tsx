// src/app/components/WebsitePreview.tsx

import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";

interface WebsitePreviewProps {
  websiteURL: string;
  instructions: string;
  modifiedHtml: string;
}

export default function WebsitePreview({
  websiteURL,
  instructions,
  modifiedHtml,
}: WebsitePreviewProps) {
  const [htmlContent, setHtmlContent] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (websiteURL) {
      fetch(`/api/fetch-html?url=${encodeURIComponent(websiteURL)}`)
        .then((response) => response.text())
        .then((html) => setHtmlContent(html))
        .catch((error) => console.error("Error fetching HTML:", error));
    }
  }, [websiteURL]);

  useEffect(() => {
    if (modifiedHtml) {
      setHtmlContent(modifiedHtml);
    }
  }, [modifiedHtml]);

  const captureScreenshot = async () => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      if (iframeDocument) {
        const canvas = await html2canvas(iframeDocument.documentElement);
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "screenshot.png";
        link.click();
      }
    }
  };

  return (
    <section className="w-full md:w-2/3 p-6 bg-gray-50">
      {websiteURL ? (
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <iframe
            ref={iframeRef}
            srcDoc={htmlContent}
            title="Website Preview"
            className="w-full h-screen"
          ></iframe>
          <button
            onClick={captureScreenshot}
            className="mt-2 p-2 bg-green-500 text-white rounded"
          >
            Capture Screenshot
          </button>
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
