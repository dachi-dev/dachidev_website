const RESUME_DATA = `
NAME: Tommy Ho
LOCATION: Houston, Texas USA
CITIZENSHIP: US Citizen
PHONE: (337)-381-6846
EMAIL: TommyHoJobs@gmail.com

WORK EXPERIENCE:

- Sales Engineer at Socket (May 2025 — Nov 2025)
  • Partnered with 4 AEs to drive enterprise and commercial deals in developer tooling/code security, leading cross-functional discovery, tailored demos, PoCs/POVs, and security reviews.
  • Drove 3x revenue growth and 5x close-rate improvement, reducing deal losses by 80% through tighter technical alignment and stronger POV execution.
  • Closed multiple strategic accounts within the first 90 days by translating security requirements into an implementation plan that fit customer SDLC constraints.

- Sales Engineer at Nodies (Dec 2024 — May 2025)
  • Collaborated with 4 AEs to drive $10M+ revenue, owning discovery, demos, PoCs/POVs, and post-sale technical enablement across the customer lifecycle.
  • Established 30+ strategic partnerships, expanding distribution channels and accelerating pipeline growth.
  • Designed reference architectures and shipped customer-driven code and integrations to support production deployments.

- Solutions Architect at Amazon Web Services (Jan 2022 — Dec 2024)
  • Partnered with account teams to run customer-facing technical engagements owning discovery, architecture reviews, and executive-ready readouts aligning business goals with scalable cloud designs.
  • Led whiteboarding sessions, demos, and hands-on workshops for engineering teams to accelerate adoption and unblock implementation.
  • Advised on SDLC and CI/CD modernization (build/release workflows, deployment patterns, environment strategy), helping teams ship faster with stronger operational guardrails.

- Technical Sales Consultant at CGI Federal (Feb 2021 — Jan 2022)
  • Led technical discovery with stakeholders and wrote concise summaries of constraints (security/compliance, hosting, data, integrations) to shape scope, milestones, and risks.
  • Built and delivered customer-facing demos/technical briefings, answering deep technical questions and aligning solution tradeoffs to mission outcomes.
  • Coordinated inputs across engineering, security, and program teams to produce proposal technical volumes and ensure consistency between proposed architecture, staffing, and delivery assumptions.

- Sales Engineer at Pocket Network (May 2018 — Feb 2021)
  • Led technical GTM and presales for an experimental prototype (pre-product).
  • Secured $300K in pre-release commitments, 12 months before GA launch.

SKILLS:
Pre-sales execution (discovery, solution design, demos, POV/PoCs, security reviews, workshops, exec readouts) • AWS • SDLC/CI/CD (GitHub Actions, GitLab, Jenkins, CircleCI, Buildkite) • Linux/networking • DevSecOps/AppSec (SAST/SCA, vuln mgmt, SBOM/secrets concepts) • Observability • Python/Bash • APIs (REST, webhooks, OAuth, JSON/YAML)

EDUCATION:
Bachelor of Science in Computer Science, Western Governors University, GPA: 3.77, July 2020

LINKS:
- LinkedIn: https://www.linkedin.com/in/tommy-ho-se/
- GitHub: https://github.com/dachi-dev
- Resume PDF: Available for download on the website
`;

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
${RESUME_DATA}`;

const ALLOWED_ORIGINS = [
  "https://dachi-dev.github.io",
  "http://localhost:5173",
  "http://localhost:4173",
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const headers = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    try {
      const { messages } = await request.json();

      const contents = messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents,
            generationConfig: { maxOutputTokens: 1024 },
          }),
        }
      );

      if (!geminiResponse.ok) {
        const err = await geminiResponse.json().catch(() => ({}));
        return new Response(
          JSON.stringify({ error: err?.error?.message || `Gemini API error: ${geminiResponse.status}` }),
          { status: 502, headers: { ...headers, "Content-Type": "application/json" } }
        );
      }

      const data = await geminiResponse.json();
      const text = data.candidates[0].content.parts[0].text;

      return new Response(JSON.stringify({ text }), {
        headers: { ...headers, "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }
  },
};
