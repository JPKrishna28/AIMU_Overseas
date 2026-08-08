import { Suspense } from "react";
import { client } from "@/sanity/client";
import { LEAD_FORM_OPTIONS_QUERY } from "@/sanity/queries";
import { AuthForm } from "@/components/AuthForm";
import { AuthShell } from "@/components/AuthShell";

export const metadata = { title: "Create Account — AIMU Global" };

// Rendered per-request so the form (which reads ?next) is server-rendered
// rather than deferred to the client.
export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const leadFormOptions = await client.fetch(LEAD_FORM_OPTIONS_QUERY);
  const countries = (leadFormOptions.countries ?? []).filter((c): c is string => Boolean(c));
  const courses = (leadFormOptions.courses ?? []).filter((c): c is string => Boolean(c));

  return (
    <AuthShell
      eyebrow="Create your account"
      title={
        <>
          Start your <span className="text-gold">global journey</span>
        </>
      }
      subtitle="Tell us a little about your goals so we can tailor your guidance."
    >
      <Suspense fallback={null}>
        <AuthForm mode="register" countries={countries} courses={courses} />
      </Suspense>
    </AuthShell>
  );
}
