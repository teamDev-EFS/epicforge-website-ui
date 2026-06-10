import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FileText, Scale, MessageSquare, CreditCard, Code2, Shield,
  Globe, AlertTriangle, CheckCircle, Mail, Lock, Handshake,
} from "lucide-react";

const LAST_UPDATED  = "June 10, 2026";
const EFFECTIVE_DATE = "June 10, 2026";
const COMPANY        = "EpicForge Software";
const EMAIL_LEGAL    = "legal@epicforgesoftware.com";
const EMAIL_PRIVACY  = "privacy@epicforgesoftware.com";
const WEBSITE        = "https://epicforgesoftware.com";

const SECTIONS = [
  { id: "acceptance",    title: "1. Acceptance of Terms" },
  { id: "definitions",   title: "2. Definitions" },
  { id: "sms-consent",   title: "3. SMS Consent & TCPA" },
  { id: "services",      title: "4. Services & Scope of Work" },
  { id: "payment",       title: "5. Payment Terms" },
  { id: "ip",            title: "6. Intellectual Property" },
  { id: "confidential",  title: "7. Confidentiality" },
  { id: "warranties",    title: "8. Warranties & Representations" },
  { id: "liability",     title: "9. Limitation of Liability" },
  { id: "indemnification", title: "10. Indemnification" },
  { id: "termination",   title: "11. Term & Termination" },
  { id: "governing",     title: "12. Governing Law & Jurisdiction" },
  { id: "rights",        title: "13. Consumer / Data Subject Rights" },
  { id: "general",       title: "14. General Provisions" },
  { id: "contact",       title: "15. Contact & Legal Notices" },
];

const Badge: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <span
    className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase"
    style={{ background: `${color}20`, border: `1px solid ${color}40`, color }}
  >
    {label}
  </span>
);

const SectionCard: React.FC<{
  id: string; title: string; children: React.ReactNode; icon?: React.ElementType
}> = ({ id, title, children, icon: Icon }) => (
  <section id={id} className="scroll-mt-24 mb-10">
    <div
      className="rounded-2xl p-8"
      style={{ background: "rgba(17,24,39,0.9)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center gap-3 mb-6">
        {Icon && (
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(99,102,241,0.15)" }}
          >
            <Icon className="w-5 h-5 text-indigo-400" />
          </div>
        )}
        <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
          {title}
        </h2>
      </div>
      <div className="text-slate-300 text-[15px] leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  </section>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-slate-300 text-[15px] leading-[1.75]">{children}</p>
);

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-white font-semibold text-base mt-6 mb-2">{children}</h3>
);

const Ul: React.FC<{ items: (string | React.ReactNode)[] }> = ({ items }) => (
  <ul className="space-y-2 mt-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-slate-300 text-[15px]">
        <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const InfoBox: React.FC<{ children: React.ReactNode; type?: "info" | "warning" }> = ({ children, type = "info" }) => (
  <div
    className="flex items-start gap-3 rounded-xl p-4 mt-4"
    style={{
      background: type === "warning" ? "rgba(245,158,11,0.08)" : "rgba(99,102,241,0.08)",
      border: `1px solid ${type === "warning" ? "rgba(245,158,11,0.2)" : "rgba(99,102,241,0.2)"}`,
    }}
  >
    <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${type === "warning" ? "text-amber-400" : "text-indigo-400"}`} />
    <p className="text-sm text-slate-300 leading-relaxed">{children}</p>
  </div>
);

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("acceptance");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#0f172a", paddingTop: "80px" }}>
      {/* Hero */}
      <div
        className="relative py-16 px-4 text-center overflow-hidden"
        style={{ background: "rgba(10,15,26,0.8)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.12),transparent_60%)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto"
        >
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}
          >
            <Scale className="w-4 h-4 text-violet-400" />
            <span className="text-[13px] font-semibold text-violet-300">Legal Document</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
          >
            Terms &amp; Conditions
          </h1>
          <p className="text-slate-400 text-base mb-6">
            Last Updated: <span className="text-slate-300 font-semibold">{LAST_UPDATED}</span>
            {" · "}Effective: <span className="text-slate-300 font-semibold">{EFFECTIVE_DATE}</span>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge label="TCPA Compliant"  color="#818cf8" />
            <Badge label="CCPA"            color="#34d399" />
            <Badge label="UK GDPR"         color="#60a5fa" />
            <Badge label="PIPEDA"          color="#f59e0b" />
            <Badge label="India DPDPA"     color="#fb923c" />
            <Badge label="B2B SMS Terms"   color="#c084fc" />
          </div>
        </motion.div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-12">
        <div className="flex gap-10 relative">

          {/* Sticky TOC */}
          <aside className="hidden xl:block w-72 flex-shrink-0">
            <div
              className="sticky top-24 rounded-2xl p-5"
              style={{ background: "rgba(17,24,39,0.9)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">Contents</p>
              <nav className="space-y-1">
                {SECTIONS.map(({ id, title }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="block text-[13px] py-1.5 px-3 rounded-lg transition-all duration-200"
                    style={{
                      color:      activeSection === id ? "#a78bfa" : "#64748b",
                      background: activeSection === id ? "rgba(124,58,237,0.12)" : "transparent",
                      fontWeight: activeSection === id ? 600 : 400,
                    }}
                  >
                    {title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main ref={contentRef} className="flex-1 min-w-0">

            <SectionCard id="acceptance" title="1. Acceptance of Terms" icon={FileText}>
              <P>
                These Terms and Conditions ("Terms") constitute a legally binding agreement between{" "}
                <strong className="text-white">{COMPANY}</strong> ("EpicForge," "Company," "we," "our," or "us")
                and any individual or entity ("you," "Client," or "User") that: (a) accesses or uses our website
                at {WEBSITE}; (b) inquires about, orders, or engages our software development, AI automation,
                mobile app, web development, or related services; (c) receives SMS communications from us; or
                (d) signs a separate Statement of Work (SOW) or Project Agreement that incorporates these Terms.
              </P>
              <P>
                By accessing our website, submitting an inquiry, engaging our services, or verbally agreeing
                during a phone call to receive communications from us, <strong className="text-white">you
                acknowledge that you have read, understood, and agree to be bound by these Terms</strong> and
                our{" "}
                <a href="/privacy-policy" className="text-indigo-400 hover:text-indigo-300">
                  Privacy Policy
                </a>
                , which is incorporated herein by reference.
              </P>
              <P>
                If you do not agree to these Terms, do not access our website or engage our services. If you are
                entering these Terms on behalf of a business entity, you represent that you have authority to bind
                that entity to these Terms.
              </P>
              <InfoBox>
                These Terms were last updated on {LAST_UPDATED} and supersede all prior versions. We reserve
                the right to update these Terms at any time with notice as described in Section 14.
              </InfoBox>
            </SectionCard>

            <SectionCard id="definitions" title="2. Definitions" icon={FileText}>
              <Ul items={[
                <><strong className="text-white">"Services"</strong> means all software development, AI automation, mobile application development, web development, UI/UX design, digital transformation consulting, and related professional services provided by EpicForge Software.</>,
                <><strong className="text-white">"Statement of Work (SOW)"</strong> or <strong className="text-white">"Project Agreement"</strong> means any written document (email, PDF, or electronic agreement) describing a specific project scope, deliverables, timeline, and payment terms agreed between EpicForge and Client.</>,
                <><strong className="text-white">"Deliverables"</strong> means all source code, designs, documentation, and other work product produced by EpicForge specifically for Client under a SOW.</>,
                <><strong className="text-white">"Intellectual Property"</strong> means all patents, copyrights, trademarks, trade secrets, know-how, and other intellectual property rights.</>,
                <><strong className="text-white">"Confidential Information"</strong> means any non-public information disclosed by one party to the other, including business strategies, source code, client lists, technical specifications, pricing, and financial data.</>,
                <><strong className="text-white">"SMS Program"</strong> means EpicForge's business-to-business text message communications as described in Section 3 below.</>,
                <><strong className="text-white">"TCPA"</strong> means the Telephone Consumer Protection Act, 47 U.S.C. § 227, and implementing FCC regulations.</>,
                <><strong className="text-white">"CCPA/CPRA"</strong> means the California Consumer Privacy Act and California Privacy Rights Act.</>,
              ]} />
            </SectionCard>

            <SectionCard id="sms-consent" title="3. SMS Text Messaging — Consent, Program Description & TCPA Terms" icon={MessageSquare}>
              <InfoBox>
                This section constitutes the legally required disclosure for EpicForge Software's SMS
                messaging program under the TCPA (47 U.S.C. § 227), FCC rules, and CTIA Messaging
                Principles. These terms are required for Twilio carrier registration and A2P 10DLC compliance.
              </InfoBox>

              <H3>3.1 Program Description</H3>
              <P>
                <strong className="text-white">Program Name:</strong> EpicForge Software — B2B Meeting Link Delivery
              </P>
              <P>
                <strong className="text-white">Program Description:</strong> EpicForge Software contacts
                US-based small business owners and decision-makers (including but not limited to plumbers,
                HVAC contractors, landscapers, electricians, and other trades professionals) via outbound
                phone call. When a business owner verbally agrees during the call to receive a follow-up
                text message containing a Zoom meeting link for a website or mobile app consultation demo,
                we send one or more SMS messages containing that link and any related scheduling
                confirmations or reminders.
              </P>
              <P>
                <strong className="text-white">Message Types:</strong> Transactional only —
                Zoom meeting links; meeting confirmations; rescheduling notifications; follow-up reminders
                for agreed-upon demos. No promotional blasts or marketing messages.
              </P>
              <P>
                <strong className="text-white">Sending Phone Numbers:</strong> Messages originate from
                the following US long-code numbers provided by Twilio:
              </P>
              <Ul items={[
                "Miami, Florida — Area Code 305 (serving Florida leads)",
                "Houston, Texas — Area Code 713 (serving Texas leads)",
                "Los Angeles, California — Area Code 213 (serving California leads)",
              ]} />

              <H3>3.2 How Consent Is Obtained</H3>
              <P>
                Consent to receive SMS messages is obtained <strong className="text-white">verbally
                during an outbound phone call</strong>. Our representative asks: "May I send you the
                Zoom meeting link by text message?" Consent is logged in our CRM with timestamp, agent
                identity, and a description of what was agreed. This verbal consent is <strong className="text-white">
                not a condition of purchase</strong>. You may engage our services without consenting to
                SMS.
              </P>

              <H3>3.3 Opt-Out (How to Stop Messages)</H3>
              <P>
                To stop receiving SMS messages, reply <strong className="text-white">STOP</strong> to
                any message we send. We will send one final confirmation message: "You have been
                unsubscribed from EpicForge Software messages. No further messages will be sent."
                Opt-outs are honoured within 10 business days and maintained for a minimum of 5 years.
                To re-subscribe after opting out, you must provide new verbal consent during a phone call.
              </P>

              <H3>3.4 Help</H3>
              <P>
                Reply <strong className="text-white">HELP</strong> to any message for assistance.
                We will reply: "EpicForge Software B2B demo scheduling. Questions: {EMAIL_PRIVACY}.
                Reply STOP to opt out."
              </P>

              <H3>3.5 Message Frequency &amp; Rates</H3>
              <P>
                Message frequency: up to 3 messages per engagement (Zoom link + 1–2 reminders).
                <strong className="text-white"> Message and data rates may apply</strong> based on
                your mobile carrier plan. EpicForge does not charge separately for SMS.
              </P>

              <H3>3.6 Privacy of SMS Data</H3>
              <P>
                Phone numbers and SMS opt-in/opt-out status collected for this program are not shared
                with third parties for marketing purposes. See our{" "}
                <a href="/privacy-policy" className="text-indigo-400 hover:text-indigo-300">
                  Privacy Policy
                </a>{" "}
                for full details on how we handle your personal information.
              </P>

              <H3>3.7 Do Not Call / Internal DNC</H3>
              <P>
                EpicForge maintains an internal Do Not Call list. To be added to our DNC list and cease
                all contact (calls and texts), email {EMAIL_LEGAL} or reply STOP to any SMS. Requests
                are honoured within 30 days and maintained permanently.
              </P>

              <InfoBox type="warning">
                Standard text messaging rates from your mobile carrier apply. Consult your carrier for
                details. EpicForge Software is not responsible for carrier fees.
              </InfoBox>
            </SectionCard>

            <SectionCard id="services" title="4. Services & Scope of Work" icon={Code2}>
              <H3>4.1 Services Offered</H3>
              <P>EpicForge Software provides professional B2B technology services including:</P>
              <Ul items={[
                "Custom software development (web applications, SaaS platforms, enterprise tools)",
                "AI automation — workflow automation, intelligent agents, ML integrations",
                "Mobile app development — native iOS (Swift), Android (Kotlin), and cross-platform (React Native / Flutter)",
                "Web development — React, Next.js, Node.js, and full-stack solutions",
                "UI/UX design — Figma-based prototyping, design systems, and interface design",
                "Digital transformation consulting — technology audits, architecture design, roadmap planning",
                "E-commerce development — custom stores, integrations, and conversion optimisation",
              ]} />

              <H3>4.2 Statement of Work</H3>
              <P>
                Each project engagement begins with a written SOW or Project Agreement that defines:
                project scope and objectives; deliverables and acceptance criteria; timeline and
                milestones; payment schedule; and any third-party integrations or dependencies.
                These Terms apply to all SOWs unless explicitly superseded in writing. In the event
                of conflict between an SOW and these Terms, the SOW governs for that project.
              </P>

              <H3>4.3 Project Changes</H3>
              <P>
                Any material changes to scope, timeline, or deliverables after SOW execution require
                a written change order agreed by both parties. EpicForge reserves the right to adjust
                pricing and timeline when client-requested scope changes add material work. Verbal
                scope changes are not binding on EpicForge.
              </P>

              <H3>4.4 Client Responsibilities</H3>
              <Ul items={[
                "Provide timely feedback and approvals within agreed review windows (typically 5 business days unless otherwise specified)",
                "Supply required credentials, assets, content, and third-party access in a timely manner",
                "Ensure a designated point of contact is available for project communications",
                "Review and test deliverables promptly and report defects within the acceptance window",
                "Not engage EpicForge in any project that violates applicable law or third-party intellectual property rights",
              ]} />

              <H3>4.5 Timeline &amp; Delays</H3>
              <P>
                Project timelines are estimates based on agreed scope. Delays caused by: (a) client
                failure to provide timely feedback, assets, or approvals; (b) third-party service
                outages outside EpicForge's control; (c) client-requested scope changes; or
                (d) force majeure events — do not constitute breach by EpicForge, and may result
                in revised delivery dates without penalty.
              </P>
            </SectionCard>

            <SectionCard id="payment" title="5. Payment Terms" icon={CreditCard}>
              <H3>5.1 Project Pricing</H3>
              <P>
                Fees are specified in the applicable SOW. All fees are in US dollars (USD) unless
                otherwise specified. Pricing is fixed per milestone as agreed in the SOW, except
                for scope changes governed by change orders.
              </P>

              <H3>5.2 Milestone-Based Payment Structure</H3>
              <P>EpicForge typically uses a milestone payment model:</P>
              <Ul items={[
                "Deposit (typically 30–50%) — due before project commencement to secure development capacity",
                "Mid-project milestone payments — tied to delivery of agreed intermediate deliverables",
                "Final payment — due upon delivery of final deliverables and client sign-off",
              ]} />

              <H3>5.3 Payment Methods</H3>
              <P>
                EpicForge accepts payment via bank transfer (wire), Stripe, PayPal, Wise, and other
                methods agreed in the SOW. Payments must be received before the commencement of each
                new milestone. Work may be paused if a milestone payment is overdue by more than
                10 business days.
              </P>

              <H3>5.4 Late Payments</H3>
              <P>
                Invoices not paid within 30 days of the due date are subject to a late fee of
                1.5% per month (18% per annum), or the maximum rate permitted by applicable law,
                whichever is lower. EpicForge may suspend work and withhold delivery of source code
                until outstanding balances are cleared.
              </P>

              <H3>5.5 Refunds &amp; Cancellation</H3>
              <P>
                Deposits are non-refundable once development work has commenced. If a project is
                cancelled by the Client after commencement, Client is responsible for payment of
                all work completed to date, calculated at EpicForge's standard hourly rate for
                time-and-materials engagements, or a pro-rated share of the fixed fee for fixed-price
                engagements. EpicForge will deliver all completed work product upon receipt of
                final payment owed.
              </P>

              <H3>5.6 Taxes</H3>
              <P>
                Fees quoted by EpicForge are exclusive of any applicable taxes (including GST, VAT,
                HST, or US sales tax). Where applicable law requires EpicForge to collect taxes,
                these will be added to invoices. Clients are responsible for any withholding taxes
                applicable in their jurisdiction and should inform EpicForge in advance.
              </P>
            </SectionCard>

            <SectionCard id="ip" title="6. Intellectual Property Ownership" icon={Lock}>
              <H3>6.1 Client Owns the Deliverables</H3>
              <P>
                Upon receipt of full and final payment for a project, <strong className="text-white">
                EpicForge assigns to Client all rights, title, and interest in and to the Deliverables
                </strong>, including all copyrights, to the extent such rights can be assigned under
                applicable law. Client obtains 100% ownership of the custom source code, designs, and
                documentation created specifically for their project.
              </P>

              <H3>6.2 EpicForge Retained IP</H3>
              <P>
                EpicForge retains ownership of: (a) its pre-existing proprietary tools, libraries,
                frameworks, and methodologies used in delivery ("Background IP"); (b) generalisable
                know-how and expertise developed during the engagement; and (c) open-source components
                used in the project (governed by their respective open-source licences). EpicForge
                grants Client a perpetual, worldwide, royalty-free licence to use Background IP as
                incorporated into the Deliverables.
              </P>

              <H3>6.3 Third-Party Licences</H3>
              <P>
                Where Deliverables incorporate third-party licensed software, EpicForge will identify
                such components in the project documentation. Client is responsible for complying with
                applicable third-party licence terms.
              </P>

              <H3>6.4 Portfolio Rights</H3>
              <P>
                Unless expressly restricted in the SOW, EpicForge reserves the right to display
                publicly available aspects of completed projects (screenshots, general descriptions)
                in its portfolio and marketing materials, without disclosing confidential information.
              </P>
            </SectionCard>

            <SectionCard id="confidential" title="7. Confidentiality" icon={Shield}>
              <P>
                Each party agrees to maintain the confidentiality of the other party's Confidential
                Information and not to disclose it to third parties without prior written consent.
                Each party will protect the other's Confidential Information with at least the same
                degree of care it uses to protect its own confidential information, but no less than
                reasonable care.
              </P>
              <P>
                Confidentiality obligations do not apply to information that: (a) is or becomes
                publicly known through no breach of this agreement; (b) was already known to the
                receiving party before disclosure; (c) is independently developed by the receiving
                party without use of Confidential Information; or (d) is required to be disclosed
                by applicable law, regulation, or court order, provided the receiving party gives
                prompt written notice to the disclosing party.
              </P>
              <P>
                Confidentiality obligations survive termination of the service relationship for a
                period of three (3) years, except for trade secrets, which remain protected
                indefinitely under applicable law.
              </P>
            </SectionCard>

            <SectionCard id="warranties" title="8. Warranties & Representations" icon={Handshake}>
              <H3>8.1 EpicForge Warranties</H3>
              <P>EpicForge warrants that:</P>
              <Ul items={[
                "Deliverables will materially conform to the specifications in the applicable SOW",
                "Work will be performed in a professional and workmanlike manner by qualified personnel",
                "To EpicForge's knowledge, Deliverables will not infringe third-party intellectual property rights (excluding third-party libraries incorporated at Client's direction)",
                "EpicForge has the right to enter these Terms and grant the IP licences herein",
              ]} />

              <H3>8.2 Client Warranties</H3>
              <P>Client warrants that:</P>
              <Ul items={[
                "Client has the authority to enter these Terms and any applicable SOW",
                "All materials, content, and data provided to EpicForge for use in the project are owned or licenced by Client and do not violate third-party rights",
                "The project and its intended use comply with all applicable laws, including without limitation privacy laws, export controls, and industry-specific regulations",
              ]} />

              <H3>8.3 Disclaimer of Implied Warranties</H3>
              <P>
                EXCEPT AS EXPRESSLY SET FORTH IN SECTION 8.1, EPICFORGE PROVIDES SERVICES "AS IS"
                AND DISCLAIMS ALL IMPLIED WARRANTIES INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS
                FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT, TO THE MAXIMUM EXTENT PERMITTED BY
                APPLICABLE LAW. EPICFORGE DOES NOT WARRANT UNINTERRUPTED, ERROR-FREE, OR COMPLETELY
                SECURE OPERATION OF DELIVERABLES.
              </P>
            </SectionCard>

            <SectionCard id="liability" title="9. Limitation of Liability" icon={AlertTriangle}>
              <InfoBox type="warning">
                Please read this section carefully. It limits EpicForge's liability to you.
                Some jurisdictions do not allow certain limitations; to the extent prohibited,
                they do not apply to you.
              </InfoBox>

              <H3>9.1 Cap on Liability</H3>
              <P>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, EPICFORGE'S TOTAL AGGREGATE
                LIABILITY ARISING OUT OF OR RELATED TO ANY PROJECT, SOW, OR THESE TERMS SHALL NOT
                EXCEED THE TOTAL FEES PAID BY CLIENT TO EPICFORGE FOR THE SPECIFIC PROJECT GIVING
                RISE TO THE CLAIM IN THE THREE (3) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING
                RISE TO LIABILITY.
              </P>

              <H3>9.2 Exclusion of Consequential Damages</H3>
              <P>
                IN NO EVENT SHALL EPICFORGE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                EXEMPLARY, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, LOSS OF
                REVENUE, LOSS OF DATA, LOSS OF BUSINESS, OR LOSS OF GOODWILL, ARISING OUT OF
                OR IN CONNECTION WITH THESE TERMS OR THE SERVICES, EVEN IF EPICFORGE HAS BEEN
                ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </P>

              <H3>9.3 Exceptions</H3>
              <P>
                The limitations in Sections 9.1 and 9.2 do not apply to: (a) death or personal injury
                caused by EpicForge's gross negligence; (b) fraud or fraudulent misrepresentation;
                or (c) any liability that cannot be excluded by applicable mandatory law (including
                UK Consumer Rights Act 2015 rights for UK consumers, though note our services
                are B2B).
              </P>
            </SectionCard>

            <SectionCard id="indemnification" title="10. Indemnification" icon={Shield}>
              <P>
                Client agrees to indemnify, defend, and hold harmless EpicForge Software, its
                directors, officers, employees, contractors, and agents from and against any claims,
                damages, losses, liabilities, costs, and expenses (including reasonable legal fees)
                arising out of or relating to:
              </P>
              <Ul items={[
                "Client's breach of these Terms or any applicable SOW",
                "Client's use of the Deliverables in violation of applicable law",
                "Third-party claims that materials or content provided by Client to EpicForge infringe intellectual property or other rights",
                "Client's violation of any third-party rights or applicable regulations in connection with the project",
              ]} />
              <P>
                EpicForge agrees to indemnify Client against third-party claims that Deliverables
                developed solely by EpicForge (excluding Client-provided content) infringe any
                third-party intellectual property right, subject to the liability cap in Section 9.1.
              </P>
            </SectionCard>

            <SectionCard id="termination" title="11. Term & Termination" icon={FileText}>
              <H3>11.1 Term</H3>
              <P>
                These Terms are effective upon your first access to our website or engagement with
                EpicForge and continue until all active SOWs are completed or earlier terminated.
                Individual SOWs expire upon completion of deliverables and final payment, or earlier
                termination.
              </P>

              <H3>11.2 Termination for Cause</H3>
              <P>
                Either party may terminate an active SOW if the other party materially breaches
                these Terms or the SOW and fails to cure such breach within fifteen (15) business
                days of written notice describing the breach in reasonable detail. Material breach
                includes: non-payment of invoices; persistent non-delivery of agreed deliverables;
                violation of confidentiality obligations; or infringement of intellectual property.
              </P>

              <H3>11.3 Effect of Termination</H3>
              <P>
                Upon termination: (a) Client must pay for all work completed to the date of
                termination; (b) EpicForge will deliver all completed work product upon receipt
                of final payment; (c) each party will return or destroy the other's Confidential
                Information upon request; and (d) Sections 6, 7, 9, 10, 12, and 14 survive
                termination indefinitely.
              </P>
            </SectionCard>

            <SectionCard id="governing" title="12. Governing Law & Dispute Resolution" icon={Scale}>
              <H3>12.1 Governing Law</H3>
              <P>
                These Terms are governed by and construed in accordance with the laws of the State
                of <strong className="text-white">Delaware, USA</strong> and applicable federal US
                law (including TCPA and federal intellectual property law), without regard to
                conflict of law principles.
              </P>
              <P>
                Notwithstanding the above, the following mandatory consumer/data protection laws
                apply to residents of their respective jurisdictions regardless of governing law:
              </P>
              <Ul items={[
                "California (USA) — CCPA/CPRA, California Civil Code provisions that cannot be waived by contract",
                "United Kingdom — UK GDPR, DPA 2018, Consumer Rights Act 2015 (for any applicable B2C matters)",
                "Canada — PIPEDA, Quebec Law 25, and applicable provincial privacy legislation",
                "India — DPDPA 2023, IT Act 2000, and applicable consumer protection legislation",
                "European Union — EU GDPR (for EU residents), mandatory EU consumer protection directives",
              ]} />

              <H3>12.2 Dispute Resolution</H3>
              <P>
                In the event of any dispute, controversy, or claim arising out of or relating to
                these Terms or any SOW ("Dispute"), the parties agree to first attempt resolution
                through good faith negotiation for a period of thirty (30) days following written
                notice of the Dispute.
              </P>
              <P>
                If negotiation fails, Disputes shall be resolved by binding arbitration administered
                by the American Arbitration Association (AAA) under its Commercial Arbitration Rules,
                with proceedings conducted in English. The seat of arbitration shall be Delaware, USA.
                The arbitrator's award shall be final and binding, and judgment may be entered
                in any court of competent jurisdiction.
              </P>
              <P>
                Either party may seek preliminary injunctive relief in any court of competent
                jurisdiction to protect intellectual property or confidential information pending
                arbitration.
              </P>

              <H3>12.3 UK / EU Clients</H3>
              <P>
                For clients located in the UK or EU, disputes relating to UK GDPR or EU GDPR rights
                may also be brought before the UK Information Commissioner's Office (ICO) or the
                relevant EU data protection supervisory authority, as applicable.
              </P>

              <H3>12.4 Class Action Waiver</H3>
              <P>
                TO THE EXTENT PERMITTED BY APPLICABLE LAW, YOU AGREE TO BRING CLAIMS AGAINST
                EPICFORGE ONLY IN YOUR INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS
                MEMBER IN ANY PURPORTED CLASS ACTION OR REPRESENTATIVE PROCEEDING.
              </P>
            </SectionCard>

            <SectionCard id="rights" title="13. Data Subject & Consumer Rights Summary" icon={Shield}>
              <P>
                Your privacy rights are detailed in our{" "}
                <a href="/privacy-policy" className="text-indigo-400 hover:text-indigo-300">
                  Privacy Policy
                </a>
                . In summary:
              </P>
              <Ul items={[
                "California (CCPA/CPRA) — Right to know, delete, correct, opt-out of sale, non-discrimination. Contact: privacy@epicforgesoftware.com",
                "United Kingdom (UK GDPR) — Right to access, rectification, erasure, restriction, portability, objection. Supervisory authority: ICO (ico.org.uk)",
                "Canada (PIPEDA) — Right to access and correct personal information. Supervisory: OPC (priv.gc.ca)",
                "India (DPDPA 2023) — Right to access, correction, erasure, and nominate a representative. Grievance Officer: privacy@epicforgesoftware.com",
                "EU (GDPR) — Full GDPR rights. Lodge complaints with your national supervisory authority.",
                "SMS opt-out — Reply STOP to any SMS. All contact ceases within 10 business days.",
                "Phone/call DNC — Email legal@epicforgesoftware.com or reply STOP. Honoured permanently.",
              ]} />
            </SectionCard>

            <SectionCard id="general" title="14. General Provisions" icon={FileText}>
              <H3>14.1 Entire Agreement</H3>
              <P>
                These Terms, together with any applicable SOW, Privacy Policy, and any other
                written agreement between the parties, constitute the entire agreement between
                the parties with respect to the subject matter hereof and supersede all prior
                and contemporaneous agreements, representations, and understandings.
              </P>

              <H3>14.2 Amendments</H3>
              <P>
                EpicForge may update these Terms by posting the revised version at {WEBSITE}/terms
                with an updated "Last Updated" date. For material changes, we will provide at least
                30 days' notice to existing clients via email. Continued engagement with EpicForge
                services after the effective date of changes constitutes acceptance.
              </P>

              <H3>14.3 Severability</H3>
              <P>
                If any provision of these Terms is found to be unenforceable or invalid under
                applicable law, that provision shall be modified to the minimum extent necessary
                to make it enforceable, or severed if modification is not possible, without
                affecting the validity of the remaining provisions.
              </P>

              <H3>14.4 No Waiver</H3>
              <P>
                Failure by either party to enforce any provision of these Terms shall not
                constitute a waiver of the right to enforce that or any other provision in
                the future.
              </P>

              <H3>14.5 Force Majeure</H3>
              <P>
                Neither party shall be liable for delays or failure to perform obligations
                caused by circumstances beyond their reasonable control, including natural
                disasters, government actions, internet outages, or pandemic-related disruptions.
                The affected party must notify the other promptly and resume performance as
                soon as practicable.
              </P>

              <H3>14.6 Independent Contractors</H3>
              <P>
                The parties are independent contractors. Nothing in these Terms creates any
                partnership, joint venture, employment, or agency relationship between EpicForge
                and Client.
              </P>

              <H3>14.7 Assignment</H3>
              <P>
                Client may not assign these Terms or any SOW without EpicForge's prior written
                consent. EpicForge may assign these Terms in connection with a merger, acquisition,
                or sale of all or substantially all of its assets, provided the assignee agrees
                to be bound by these Terms.
              </P>
            </SectionCard>

            <SectionCard id="contact" title="15. Contact & Legal Notices" icon={Mail}>
              <P>For all legal notices, disputes, and formal communications:</P>
              <div
                className="rounded-xl p-6 mt-4 space-y-3"
                style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)" }}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-violet-400" />
                  <span className="text-slate-300 text-sm">
                    <strong className="text-white">Legal:</strong>{" "}
                    <a href={`mailto:${EMAIL_LEGAL}`} className="text-violet-400 hover:text-violet-300">{EMAIL_LEGAL}</a>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-violet-400" />
                  <span className="text-slate-300 text-sm">
                    <strong className="text-white">Privacy:</strong>{" "}
                    <a href={`mailto:${EMAIL_PRIVACY}`} className="text-violet-400 hover:text-violet-300">{EMAIL_PRIVACY}</a>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-violet-400" />
                  <span className="text-slate-300 text-sm">
                    <strong className="text-white">Website:</strong>{" "}
                    <a href={`${WEBSITE}/contact`} className="text-violet-400 hover:text-violet-300">{WEBSITE}/contact</a>
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-4 h-4 text-violet-400 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    <strong className="text-white">Registered Address:</strong><br />
                    EpicForge Software<br />
                    301, Atulya IT Park, Bhawarkua Main Road<br />
                    Indore, Madhya Pradesh 452010, India
                  </span>
                </div>
              </div>
              <P>
                Legal notices delivered by email are effective upon confirmed receipt. Notices sent
                by certified mail are effective 5 business days after dispatch to the registered address above.
              </P>
            </SectionCard>

          </main>
        </div>
      </div>
    </div>
  );
}
