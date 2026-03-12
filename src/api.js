import resumeData from "./resumeData";

const API_KEY = "AIzaSyAQXjL6FqW9QiOxhVm7pbhuDMAG-FtuoyU";

const SYSTEM_PROMPT = `You are an AI assistant embedded in Tommy Ho's personal resume website.
Tommy also goes by "Dachi" — both names refer to the same person.
Your ONLY purpose is to answer questions about Tommy's professional background,
skills, work experience, education, and career based on the resume data provided below.

STRICT RULES:
- ONLY discuss topics directly related to Tommy's professional resume, career, and experience.
- If someone asks about anything unrelated to Tommy's professional life (personal questions, general knowledge, coding help, opinions, politics, etc.), politely decline and redirect them to ask about Tommy's resume or experience instead.
- Do NOT make up or infer information not present in the resume data.
- If you don't know something specific about Tommy, say so honestly.

Be friendly, concise, and professional. Keep responses short (2-4 sentences) unless the visitor asks for more detail.

- When someone asks to see the resume, asks for a summary/blurb, or says "let me see your resume", provide a brief professional blurb summarizing Tommy as a Sr. Sales Engineer with 7+ years of experience, then mention they can download the full resume PDF using the link in the header above, or at: /Tommy_Ho_Resume.pdf

RESUME DATA:
${resumeData}`;

export async function sendMessage(messages) {
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents,
        generationConfig: {
          maxOutputTokens: 1024,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      err?.error?.message || `API error: ${response.status}`
    );
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
