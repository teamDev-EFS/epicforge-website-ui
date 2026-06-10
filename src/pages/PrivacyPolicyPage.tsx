import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Shield, Lock, Phone, MessageSquare, Globe, Eye, Trash2,
  Download, AlertCircle, CheckCircle, FileText, Mail,
} from "lucide-react";

const LAST_UPDATED = "June 10, 2026";
const EFFECTIVE_DATE = "June 10, 2026";
const COMPANY = "EpicForge Software";
const EMAIL = "privacy@epicforgesoftware.com";
const WEBSITE = "https://epicforgesoftware.com";

const SECTIONS = [
  { id: "overview",       title: "1. Overview & Identity" },
  { id: "collection",     title: "2. Information We Collect" },
  { id: "sms",            title: "3. SMS Communications (TCPA)" },
  { id: "cookies",        title: "4. Cookies & Analytics" },
  { id: "use",            title: "5. How We Use Information" },
  { id: "sharing",        title: "6. Sharing & Disclosure" },
  { id: "retention",      title: "7. Data Retention" },
  { id: "security",       title: "8. Security" },
  { id: "international",  title: "9. International Transfers" },
  { id: "california",     title: "10. California Residents (CCPA/CPRA)" },
  { id: "uk",             title: "11. UK Residents (UK GDPR)" },
  { id: "eu",             title: "12. EU Residents (GDPR)" },
  { id: "canada",         title: "13. Canada (PIPEDA / Law 25)" },
  { id: "india",          title: "14. India (DPDPA 2023 / IT Act)" },
  { id: "children",       title: "15. Children's Privacy" },
  { id: "contact",        title: "16. Contact & DPO" },
  { id: "changes",        title: "17. Policy Changes" },
];

const Badge: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <span
    className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase"
    style={{ background: `${color}20`, border: `1px solid ${color}40`, color }}
  >
    {label}
  </span>
);

const SectionCard: React.FC<{ id: string; title: string; children: React.ReactNode; icon?: React.ElementType }> = ({
  id, title, children, icon: Icon,
}) => (
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
        <h2
          className="text-xl font-bold text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
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

const Ul: React.FC<{ items: string[] }> = ({ items }) => (
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
    <AlertCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${type === "warning" ? "text-amber-400" : "text-indigo-400"}`} />
    <p className="text-sm text-slate-300 leading-relaxed">{children}</p>
  </div>
);

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.12),transparent_60%)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto"
        >
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}
          >
            <Shield className="w-4 h-4 text-indigo-400" />
            <span className="text-[13px] font-semibold text-indigo-300">Legal Document</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
          >
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-base mb-6">
            Last Updated: <span className="text-slate-300 font-semibold">{LAST_UPDATED}</span>
            {" · "}Effective: <span className="text-slate-300 font-semibold">{EFFECTIVE_DATE}</span>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge label="TCPA Compliant"  color="#818cf8" />
            <Badge label="CCPA / CPRA"     color="#34d399" />
            <Badge label="UK GDPR"         color="#60a5fa" />
            <Badge label="GDPR"            color="#a78bfa" />
            <Badge label="PIPEDA"          color="#f59e0b" />
            <Badge label="India DPDPA"     color="#fb923c" />
          </div>
        </motion.div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-12">
        <div className="flex gap-10 relative">

          {/* Sticky TOC — desktop */}
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
                      color:      activeSection === id ? "#818cf8" : "#64748b",
                      background: activeSection === id ? "rgba(99,102,241,0.12)" : "transparent",
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

            <SectionCard id="overview" title="1. Overview & Identity" icon={Shield}>
              <P>
                {COMPANY} ("EpicForge," "we," "our," or "us") is a software development company incorporated and
                operating internationally, with development operations headquartered in Indore, Madhya Pradesh, India,
                and serving clients in the United States, United Kingdom, Canada, India, South Korea, and globally.
              </P>
              <P>
                This Privacy Policy describes how we collect, use, disclose, and protect personal information when
                you: (a) visit our website at {WEBSITE}; (b) contact us or submit an inquiry; (c) engage with us
                via phone, email, SMS, or other communications; (d) become a client or prospective client; or
                (e) interact with any of our services, including AI automation, software development, mobile app
                development, web development, and digital transformation services.
              </P>
              <P>
                By using our website or services, you acknowledge that you have read and understood this Privacy Policy.
                If you do not agree, please discontinue use of our services and contact us at{" "}
                <a href={`mailto:${EMAIL}`} className="text-indigo-400 hover:text-indigo-300">{EMAIL}</a> to
                have your data removed.
              </P>
              <InfoBox>
                This policy is specifically designed to comply with US TCPA/CCPA requirements for our SMS
                outreach program, UK GDPR for UK-based contacts, PIPEDA for Canadian contacts, and India's
                Digital Personal Data Protection Act 2023 (DPDPA). Where requirements differ by jurisdiction,
                the stricter standard applies.
              </InfoBox>
            </SectionCard>

            <SectionCard id="collection" title="2. Information We Collect" icon={Eye}>
              <H3>2.1 Information You Provide Directly</H3>
              <Ul items={[
                "Name, job title, company name, and professional role",
                "Phone number (mobile and/or business landline)",
                "Email address and mailing address",
                "Project description, budget range, and timeline",
                "Information submitted via contact forms, chat, or email",
                "Verbal consent to receive SMS messages (recorded in our CRM with date/time/agent)",
              ]} />

              <H3>2.2 Information We Collect Automatically</H3>
              <Ul items={[
                "IP address, browser type, operating system, and device identifiers",
                "Pages visited, time on page, scroll depth, and click interactions",
                "Referral source (which website or search engine directed you here)",
                "Session duration and bounce behavior",
                "Approximate geolocation derived from IP address (city/region level only)",
              ]} />

              <H3>2.3 Information from Third Parties</H3>
              <Ul items={[
                "Business contact information from publicly available sources (website, LinkedIn, directories)",
                "Phone numbers dialed during cold-call outreach to B2B prospects who verbally consent to follow-up",
                "Referrals from existing clients or business partners",
                "Information verified through business registries or public filings",
              ]} />

              <H3>2.4 Categories of Personal Information (CCPA)</H3>
              <P>
                Under the California Consumer Privacy Act, we collect: Identifiers (name, phone, email, IP);
                Commercial information (service interests, project scope); Internet activity (website interactions);
                Professional/employment information (company name, title); and Inferences (service fit, project readiness).
                We do not collect sensitive personal information as defined under CPRA.
              </P>
            </SectionCard>

            <SectionCard id="sms" title="3. SMS Text Message Communications (TCPA Compliance)" icon={MessageSquare}>
              <InfoBox>
                This section governs all SMS/text message communications sent by EpicForge Software and is
                required for compliance with the Telephone Consumer Protection Act (TCPA), 47 U.S.C. § 227,
                and applicable FCC regulations.
              </InfoBox>

              <H3>3.1 Nature of Our SMS Program</H3>
              <P>
                EpicForge Software sends SMS text messages exclusively to <strong className="text-white">B2B business
                owners and decision-makers</strong> (including but not limited to plumbers, HVAC contractors,
                landscapers, electricians, and other small business owners in the United States) who have
                <strong className="text-white"> verbally agreed during a prior phone call</strong> to receive
                a follow-up Zoom meeting link or scheduling information for a website/mobile app demo.
              </P>

              <H3>3.2 Message Content</H3>
              <P>Messages we send are limited to:</P>
              <Ul items={[
                "Zoom meeting links for scheduled website or mobile app demo sessions",
                "Follow-up reminders for previously agreed-upon meetings",
                "Responses to inbound inquiries you initiated",
                "Rescheduling or confirmation notifications for booked calls",
              ]} />
              <P>
                We do <strong className="text-white">not</strong> send promotional marketing messages, bulk
                blast campaigns, or unsolicited advertisements via SMS.
              </P>

              <H3>3.3 Consent Mechanism</H3>
              <P>
                Consent is obtained <strong className="text-white">verbally during a phone call</strong> in
                which our representative asks the business owner: "Would it be okay if I send you the Zoom
                meeting link via text message?" Consent is recorded in our CRM system with the date, time,
                phone agent name, and nature of consent. We maintain these records for a minimum of four (4)
                years in compliance with TCPA requirements.
              </P>
              <P>
                By providing verbal consent, you agree to receive transactional SMS messages from EpicForge
                Software at the phone number you provided. Consent to receive SMS is <strong className="text-white">not
                a condition of any purchase or service</strong>.
              </P>

              <H3>3.4 Message Frequency &amp; Carrier Fees</H3>
              <P>
                Message frequency varies. Typically, you will receive no more than 2–3 SMS messages per
                active engagement. <strong className="text-white">Message and data rates may apply.</strong>{" "}
                Contact your mobile carrier for details about your SMS plan.
              </P>

              <H3>3.5 How to Opt Out (STOP)</H3>
              <P>
                You may opt out of receiving SMS messages from EpicForge Software <strong className="text-white">
                at any time</strong> by replying <strong className="text-white">STOP</strong> to any SMS message
                we send. After receiving your STOP request, we will send one final confirmation message and then
                cease all SMS communications to that number within 10 business days (typically within 24 hours).
                We will honor opt-out requests for a minimum of five (5) years.
              </P>
              <P>
                To re-subscribe after opting out, you must provide fresh verbal consent during a new phone call.
              </P>

              <H3>3.6 HELP Command</H3>
              <P>
                Reply <strong className="text-white">HELP</strong> to any of our SMS messages to receive
                assistance. We will respond with our company name, a brief description of the messaging program,
                and contact information ({EMAIL}).
              </P>

              <H3>3.7 Supported Carriers</H3>
              <P>
                Our SMS program operates with all major US carriers including AT&amp;T, Verizon, T-Mobile,
                Sprint, US Cellular, and associated MVNOs. Carrier liability is not assumed by EpicForge.
              </P>

              <H3>3.8 Do Not Call Registry</H3>
              <P>
                EpicForge Software respects the National Do Not Call Registry (DNC). Our outbound calling
                program targets B2B business owners, which are generally exempt from residential DNC
                protections; however, we maintain an internal DNC list and will honor any individual request
                to cease contact at any time and by any means.
              </P>

              <InfoBox type="warning">
                Standard text messaging rates from your mobile carrier may apply to messages sent or received.
                EpicForge Software does not charge for its SMS communications separately.
              </InfoBox>
            </SectionCard>

            <SectionCard id="cookies" title="4. Cookies, Tracking & Analytics" icon={FileText}>
              <H3>4.1 What We Use</H3>
              <Ul items={[
                "Google Analytics 4 (GA4) — website traffic analysis and user behaviour (Measurement ID: G-BDLH9L0EKK)",
                "Google Tag Manager (GTM-MF6QPZS5) — tag management container",
                "Calendly — scheduling widget for strategy call bookings",
                "Session cookies — essential for site functionality",
                "Preference cookies — remembering your cookie consent choice (epicforge_consent_v2)",
              ]} />

              <H3>4.2 Cookie Consent</H3>
              <P>
                We operate Google Consent Mode v2, meaning analytics and marketing cookies are only activated
                after you grant consent via our cookie banner. By default, all non-essential cookies are denied
                until you explicitly accept them. You may withdraw consent at any time by clearing your browser
                cookies and re-visiting the site.
              </P>

              <H3>4.3 Opting Out of Analytics</H3>
              <P>
                You may opt out of Google Analytics tracking by installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                {" "}or by selecting "Necessary Only" in our cookie consent banner.
              </P>
            </SectionCard>

            <SectionCard id="use" title="5. How We Use Your Information" icon={CheckCircle}>
              <P>We use personal information for the following purposes:</P>
              <Ul items={[
                "Responding to inquiries, contact form submissions, and project requests",
                "Sending Zoom meeting links and scheduling confirmations via SMS (B2B, with prior verbal consent)",
                "Delivering software development, AI automation, mobile app, and web development services",
                "Providing project updates, milestone notifications, and delivery reports to clients",
                "Sending invoices, payment reminders, and service agreements",
                "Improving our website through analytics (only with your consent)",
                "Complying with legal obligations including TCPA, CCPA, UK GDPR, and PIPEDA",
                "Maintaining consent records as required by law",
                "Internal record-keeping, fraud prevention, and security",
                "Communicating service updates, new offerings, or policy changes to existing clients",
              ]} />
              <P>
                We do <strong className="text-white">not</strong> use your personal information to build
                advertising profiles, sell your data, engage in behavioural advertising, or make automated
                decisions that produce legal or similarly significant effects.
              </P>
            </SectionCard>

            <SectionCard id="sharing" title="6. Sharing & Disclosure" icon={Globe}>
              <H3>6.1 We Do Not Sell Your Data</H3>
              <P>
                EpicForge Software does <strong className="text-white">not</strong> sell, rent, or trade
                personal information to third parties for monetary consideration or any other valuable
                consideration, consistent with the CCPA "Do Not Sell" requirement.
              </P>

              <H3>6.2 Service Providers We Share Data With</H3>
              <Ul items={[
                "Google LLC (Analytics, Tag Manager) — analytics and tag management; EU-US Data Privacy Framework",
                "Calendly LLC — meeting scheduling platform; processes name, email, and time zone",
                "Zoom Video Communications, Inc. — meeting links shared via SMS; their privacy policy applies to meeting data",
                "SMS/telecom carriers — phone numbers routed through for delivery",
                "Payment processors (Stripe, Wise, PayPal) — billing data for client invoices",
                "CRM software — stores contact records and consent logs (internal use only)",
              ]} />

              <H3>6.3 Legal Disclosure</H3>
              <P>
                We may disclose personal information when required by: court order or legal process;
                regulatory investigation (FTC, FCC, ICO, MEITY); compliance with TCPA, GDPR, or other
                applicable law; or to protect the rights, safety, or property of EpicForge, our clients,
                or the public.
              </P>
            </SectionCard>

            <SectionCard id="retention" title="7. Data Retention" icon={FileText}>
              <Ul items={[
                "Consent records (SMS verbal opt-in): 4 years minimum (TCPA requirement)",
                "Opt-out records (STOP requests): 5 years minimum",
                "Client project files and communications: 7 years (standard business records)",
                "Website analytics data (GA4): 14 months (Google's default retention setting)",
                "Cookie consent records: 1 year (or until withdrawn)",
                "Invoices and financial records: 7 years (tax compliance)",
                "Dormant prospect records (no engagement in 24 months): deleted or anonymised",
              ]} />
              <P>
                You may request early deletion of your personal data by contacting us at {EMAIL}.
                Deletion will be completed within 45 days for CCPA requests, 30 days for UK/EU GDPR
                requests (extendable to 90 days for complex requests), and 30 days for PIPEDA requests,
                subject to legal retention obligations.
              </P>
            </SectionCard>

            <SectionCard id="security" title="8. Security Measures" icon={Lock}>
              <P>
                We implement industry-standard technical and organisational security measures including:
              </P>
              <Ul items={[
                "TLS 1.3 encryption for all data in transit",
                "AES-256 encryption for sensitive data at rest",
                "Role-based access control — minimum necessary access principle",
                "Multi-factor authentication on all systems containing personal data",
                "Regular security audits and vulnerability assessments (OWASP framework)",
                "CRM access logs with anomaly detection",
                "Incident response procedure with 72-hour breach notification (UK/EU GDPR requirement)",
                "ISO 27001-aligned security practices",
              ]} />
              <InfoBox type="warning">
                No method of electronic storage or transmission is 100% secure. While we use
                commercially reasonable measures, we cannot guarantee absolute security.
                Please contact us immediately at {EMAIL} if you suspect a security incident.
              </InfoBox>
            </SectionCard>

            <SectionCard id="international" title="9. International Data Transfers" icon={Globe}>
              <P>
                EpicForge Software's development team is based in India. We serve clients in the US, UK,
                Canada, and globally. Personal data may be transferred to and processed in India, the US,
                and other countries where our service providers operate (including Google LLC in the US).
              </P>
              <P>
                For transfers of UK/EU personal data to countries without an adequacy decision (including India),
                we rely on <strong className="text-white">Standard Contractual Clauses (SCCs)</strong> approved by
                the European Commission and the ICO, supplemented by appropriate technical safeguards.
                For US–India transfers, we apply contractual protections aligned with CCPA and India's DPDPA.
              </P>
            </SectionCard>

            <SectionCard id="california" title="10. California Residents — CCPA / CPRA Rights" icon={Shield}>
              <InfoBox>
                This section applies to residents of California, USA, under the California Consumer Privacy Act
                (CCPA) as amended by the California Privacy Rights Act (CPRA). It also applies to California
                cities including Los Angeles, San Francisco, San Diego, and Sacramento.
              </InfoBox>

              <H3>Your Rights Under CCPA/CPRA</H3>
              <Ul items={[
                "Right to Know — request disclosure of personal information we have collected about you",
                "Right to Delete — request deletion of personal information we hold (subject to legal exceptions)",
                "Right to Correct — request correction of inaccurate personal information",
                "Right to Opt-Out of Sale/Sharing — we do not sell or share personal information for cross-context behavioural advertising",
                "Right to Limit Use of Sensitive Personal Information — we do not collect or process sensitive PI as defined under CPRA",
                "Right to Non-Discrimination — exercising your rights will not result in denial of service or different pricing",
              ]} />

              <H3>Shine the Light (California Civil Code § 1798.83)</H3>
              <P>
                California residents may request information about personal information disclosed to third parties
                for direct marketing purposes in the preceding calendar year. We do not disclose personal information
                to third parties for their own direct marketing purposes.
              </P>

              <H3>How to Exercise Your Rights</H3>
              <P>
                Submit requests by email to <a href={`mailto:${EMAIL}`} className="text-indigo-400">{EMAIL}</a>{" "}
                with subject line "CCPA Privacy Request" or by visiting our contact page at {WEBSITE}/contact.
                We will verify your identity and respond within 45 calendar days (extendable to 90 days
                with notice for complex requests). No fee is charged for up to two requests per 12-month period.
              </P>
            </SectionCard>

            <SectionCard id="uk" title="11. UK Residents — UK GDPR Rights" icon={Shield}>
              <InfoBox>
                This section applies to individuals in the United Kingdom under the UK General Data Protection
                Regulation (UK GDPR) and the Data Protection Act 2018 (DPA 2018), as retained post-Brexit.
              </InfoBox>

              <H3>Legal Basis for Processing</H3>
              <Ul items={[
                "Art. 6(1)(b) — Performance of a contract (delivering services to UK clients)",
                "Art. 6(1)(c) — Legal obligation (TCPA-equivalent UK compliance, financial records)",
                "Art. 6(1)(f) — Legitimate interests (B2B prospecting, where balanced against your rights)",
                "Art. 6(1)(a) — Consent (for analytics cookies, marketing, and SMS)",
              ]} />

              <H3>Your UK GDPR Rights</H3>
              <Ul items={[
                "Right of Access (Article 15) — obtain a copy of your personal data",
                "Right to Rectification (Article 16) — correct inaccurate or incomplete data",
                "Right to Erasure (Article 17) — 'right to be forgotten' for certain categories",
                "Right to Restriction of Processing (Article 18)",
                "Right to Data Portability (Article 20) — receive your data in a structured, machine-readable format",
                "Right to Object (Article 21) — object to processing based on legitimate interests",
              ]} />

              <H3>UK Data Protection Officer</H3>
              <P>
                As a non-UK company processing UK residents' data, we handle all UK data subject requests
                at {EMAIL}. Responses will be provided within 30 calendar days. You may also lodge a
                complaint with the UK Information Commissioner's Office (ICO) at{" "}
                <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-indigo-400">ico.org.uk</a>.
              </P>
            </SectionCard>

            <SectionCard id="eu" title="12. EU/EEA Residents — GDPR Rights" icon={Shield}>
              <P>
                For residents of the European Union and European Economic Area, we process personal data
                under the same legal bases as listed in Section 11 above. All rights under the EU GDPR apply.
                You may lodge a complaint with your national supervisory authority (e.g., BfDI in Germany,
                CNIL in France, DPC in Ireland).
              </P>
              <P>
                EpicForge Software does not operate an EU establishment but processes EU residents' data
                via our website and services. Our Data Protection contact is {EMAIL}.
              </P>
            </SectionCard>

            <SectionCard id="canada" title="13. Canadian Residents — PIPEDA / Quebec Law 25" icon={Shield}>
              <InfoBox>
                This section applies to Canadian residents, including those in Ontario, British Columbia,
                Alberta, and Quebec (where Law 25 / Act Respecting the Protection of Personal Information
                in the Private Sector applies additional requirements).
              </InfoBox>

              <H3>PIPEDA Principles We Follow</H3>
              <Ul items={[
                "Accountability — we designate a Privacy Officer responsible for PIPEDA compliance",
                "Identifying purposes — clearly stating why we collect personal information",
                "Consent — obtaining meaningful consent before or at time of collection",
                "Limiting collection — collecting only what is necessary for identified purposes",
                "Limiting use/disclosure — using data only for stated purposes",
                "Accuracy — keeping personal information accurate and up-to-date",
                "Safeguards — protecting personal information with appropriate security",
                "Openness — making our privacy practices available (this policy)",
                "Individual access — providing access to personal information on request",
                "Challenging compliance — providing a process to address privacy complaints",
              ]} />

              <H3>Quebec Law 25 (as of Sept. 2023)</H3>
              <P>
                For Quebec residents, we comply with additional requirements including: conducting privacy
                impact assessments for high-risk processing; maintaining a register of personal information
                holdings; notifying the Commission d'accès à l'information (CAI) of any incident involving
                a serious risk of harm.
              </P>

              <H3>Your PIPEDA Rights</H3>
              <P>
                You have the right to access personal information we hold about you and to challenge its
                accuracy. Requests should be submitted to {EMAIL}. We will respond within 30 days.
                For complaints, contact the Office of the Privacy Commissioner of Canada (OPC) at{" "}
                <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer" className="text-indigo-400">priv.gc.ca</a>.
              </P>
            </SectionCard>

            <SectionCard id="india" title="14. Indian Residents — DPDPA 2023 / IT Act 2000" icon={Shield}>
              <InfoBox>
                This section applies to individuals in India under the Digital Personal Data Protection Act,
                2023 (DPDPA) and the Information Technology Act, 2000 (IT Act), including the IT
                (Amendment) Act, 2008.
              </InfoBox>

              <H3>Processing of Indian Personal Data</H3>
              <P>
                EpicForge Software's operations are headquartered in India. We process personal data of
                Indian residents primarily in connection with: employment and contractor relationships,
                client service delivery, internal business operations, and compliance with Indian laws.
              </P>

              <H3>Your Rights Under DPDPA 2023</H3>
              <Ul items={[
                "Right to access information about personal data processed and purpose of processing",
                "Right to correction and erasure of personal data",
                "Right to grievance redressal — raise concerns with our Data Fiduciary within 48 hours",
                "Right to nominate another individual to exercise rights on your behalf",
              ]} />

              <H3>Grievance Officer (India)</H3>
              <P>
                Pursuant to Rule 5 of the IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021,
                our Grievance Officer is reachable at {EMAIL}. Grievances will be acknowledged within 24 hours
                and resolved within 15 days.
              </P>
            </SectionCard>

            <SectionCard id="children" title="15. Children's Privacy" icon={AlertCircle}>
              <P>
                Our services are directed exclusively at B2B business owners and professional clients.
                We do not knowingly collect personal information from individuals under 18 years of age.
                If you are a parent or guardian and believe your child has provided us with personal
                information, please contact us at {EMAIL} and we will promptly delete it.
              </P>
            </SectionCard>

            <SectionCard id="contact" title="16. Contact Us & Data Requests" icon={Mail}>
              <P>For all privacy-related requests, questions, or complaints:</P>
              <div
                className="rounded-xl p-6 mt-4 space-y-3"
                style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span className="text-slate-300 text-sm">
                    <strong className="text-white">Privacy Email:</strong>{" "}
                    <a href={`mailto:${EMAIL}`} className="text-indigo-400 hover:text-indigo-300">{EMAIL}</a>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-indigo-400" />
                  <span className="text-slate-300 text-sm">
                    <strong className="text-white">Website:</strong>{" "}
                    <a href={`${WEBSITE}/contact`} className="text-indigo-400 hover:text-indigo-300">{WEBSITE}/contact</a>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  <span className="text-slate-300 text-sm">
                    <strong className="text-white">SMS Opt-Out:</strong> Reply STOP to any SMS message we send
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="w-4 h-4 text-indigo-400 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    <strong className="text-white">Mailing Address:</strong><br />
                    EpicForge Software<br />
                    301, Atulya IT Park, Bhawarkua Main Road<br />
                    Indore, Madhya Pradesh 452010, India
                  </span>
                </div>
              </div>
              <P>
                Response times: CCPA requests — 45 days; UK/EU GDPR — 30 days; PIPEDA — 30 days;
                DPDPA — 15 days; General inquiries — 5 business days.
              </P>
            </SectionCard>

            <SectionCard id="changes" title="17. Changes to This Policy" icon={FileText}>
              <P>
                We may update this Privacy Policy periodically to reflect changes in our practices,
                technology, legal requirements, or other factors. We will notify you of material changes by:
                posting the updated policy at {WEBSITE}/privacy-policy with a new "Last Updated" date;
                for existing clients, sending an email notification to your registered email address;
                and for SMS recipients, sending a one-time notification text message (where applicable).
              </P>
              <P>
                Your continued use of our website or services after the effective date of any changes
                constitutes acceptance of the updated policy.
              </P>
            </SectionCard>

          </main>
        </div>
      </div>
    </div>
  );
}
