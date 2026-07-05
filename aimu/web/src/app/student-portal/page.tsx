import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export const metadata = { title: "Student Portal — AIMU Global" };

const FEATURES = [
  { icon: "📋", title: "Application Tracking", description: "Follow your application status in real time, from submission to decision." },
  { icon: "📄", title: "View Offers & Letters", description: "Access offer letters and official university communications in one place." },
  { icon: "📤", title: "Upload Documents", description: "Securely upload transcripts, passports, SOPs, and other required documents." },
  { icon: "📅", title: "Book Appointments", description: "Schedule sessions with your counsellor at a time that works for you." },
  { icon: "💬", title: "Direct Call / Chat", description: "Message or call your counsellor directly whenever you need guidance." },
];

export default function StudentPortalPage() {
  return (
    <>
      <PageHeader
        title="Student Portal"
        subtitle="Your personal dashboard for tracking applications, documents, and counsellor support."
      />
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10 rounded-2xl bg-gold/10 p-6 text-center">
          <p className="font-heading text-lg font-semibold text-navy">Coming Soon</p>
          <p className="mt-2 text-sm text-navy/70">
            The Student Portal is currently in development. Book a free consultation and your counsellor will
            keep you updated every step of the way in the meantime.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="hover-lift rounded-2xl border border-light-gray p-6">
              <span className="text-2xl">{feature.icon}</span>
              <h3 className="mt-3 font-heading font-semibold text-navy">{feature.title}</h3>
              <p className="mt-2 text-sm text-navy/70">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/contact"
            className="rounded-full bg-navy px-8 py-4 text-center text-sm font-semibold text-white hover:bg-navy/90"
          >
            Book a Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
