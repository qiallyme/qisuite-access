import { useEffect } from "react";

export default function Support() {
  useEffect(() => {
    const existing = document.getElementById("elevenlabs-convai-script");
    if (!existing) {
      const s = document.createElement("script");
      s.id = "elevenlabs-convai-script";
      s.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      s.async = true;
      s.type = "text/javascript";
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Support</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Chat with our support assistant or visit the knowledge base.
      </p>
      {/* ElevenLabs Conversational AI Widget */}
      <elevenlabs-convai agent-id="agent_7301k4h7g38afxy8t3q8q3a56qnr"></elevenlabs-convai>
    </div>
  );
}


