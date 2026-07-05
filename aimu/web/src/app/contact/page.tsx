import { client } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { PageHeader } from "@/components/PageHeader";

export const metadata = { title: "Contact — AIMU Global" };

export default async function ContactPage() {
  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY);

  return (
    <>
      <PageHeader
        title="Book Your Free Consultation"
        subtitle="Get in touch and one of our counsellors will guide you through the next step."
      />
      <section className="mx-auto grid max-w-4xl gap-8 px-6 py-16 sm:grid-cols-2">
        {siteSettings?.phone && (
          <div className="rounded-2xl border border-light-gray p-6">
            <p className="text-xs font-semibold uppercase text-gold">Phone</p>
            <a href={`tel:${siteSettings.phone}`} className="mt-2 block text-lg font-semibold text-navy">
              {siteSettings.phone}
            </a>
          </div>
        )}
        {siteSettings?.email && (
          <div className="rounded-2xl border border-light-gray p-6">
            <p className="text-xs font-semibold uppercase text-gold">Email</p>
            <a href={`mailto:${siteSettings.email}`} className="mt-2 block text-lg font-semibold text-navy">
              {siteSettings.email}
            </a>
          </div>
        )}
        {siteSettings?.whatsappNumber && (
          <div className="rounded-2xl border border-light-gray p-6">
            <p className="text-xs font-semibold uppercase text-gold">WhatsApp</p>
            <a
              href={`https://wa.me/${siteSettings.whatsappNumber.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-lg font-semibold text-navy"
            >
              Message us
            </a>
          </div>
        )}
        {siteSettings?.address && (
          <div className="rounded-2xl border border-light-gray p-6">
            <p className="text-xs font-semibold uppercase text-gold">Address</p>
            <p className="mt-2 text-lg font-semibold text-navy">{siteSettings.address}</p>
          </div>
        )}
        {!siteSettings?.phone && !siteSettings?.email && !siteSettings?.whatsappNumber && !siteSettings?.address && (
          <p className="text-navy/60 sm:col-span-2">
            Add contact details in Site Settings within the Sanity Studio.
          </p>
        )}
      </section>
    </>
  );
}
