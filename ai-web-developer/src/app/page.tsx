// src/app/page.tsx

"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import InstructionPanel from "@/app/components/InstructionPanel";
import WebsitePreview from "@/app/components/WebsitePreview";

export default function HomePage() {
  const [websiteURL, setWebsiteURL] = useState("");
  const [instructions, setInstructions] = useState("");
  const [modifiedHtml, setModifiedHtml] = useState("");

  return (
    <>
      <Header />
      <main className="flex flex-col md:flex-row h-[calc(100vh-128px)] overflow-hidden">
        <InstructionPanel
          websiteURL={websiteURL}
          setWebsiteURL={setWebsiteURL}
          instructions={instructions}
          setInstructions={setInstructions}
          setModifiedHtml={setModifiedHtml}
          modifiedHtml={modifiedHtml}
        />
        <WebsitePreview
          websiteURL={websiteURL}
          instructions={instructions}
          modifiedHtml={modifiedHtml}
        />
      </main>
      <Footer />
    </>
  );
}
