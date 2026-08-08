import { Suspense } from "react";
import { client } from "@/sanity/client";
import { LEAD_FORM_OPTIONS_QUERY } from "@/sanity/queries";
import { AuthForm } from "@/components/AuthForm";
import { AuthShell } from "@/components/AuthShell";

export const metadata = { title: "Sign In — AIMU Global" };

// Rendered per-request so the form (which reads ?next) is server-rendered
// rather than deferred to the client.
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const leadFormOptions = await client.fetch(LEAD_FORM_OPTIONS_QUERY);
  const countries = (leadFormOptions.countries ?? []).filter((c): c is string => Boolean(c));
  const courses = (leadFormOptions.courses ?? []).filter((c): c is string => Boolean(c));

  return (
    <AuthShell
      eyebrow="Welcome back"
      title={
        <>
          Sign in to <span className="text-gold">AIMU Global</span>
        </>
      }
      subtitle="Access your tools, shortlists and counsellor support."
    >
      <Suspense fallback={null}>
        <AuthForm mode="login" countries={countries} courses={courses} />
      </Suspense>
    </AuthShell>
  );
}
