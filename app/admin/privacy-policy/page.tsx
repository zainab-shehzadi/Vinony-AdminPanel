"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LAST_UPDATED = "February 9, 2026"; // update as needed
const COMPANY_NAME = "Vinony"; // change if needed
const SUPPORT_EMAIL = "support@vinony.ai"; // change if needed

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-[calc(100vh-80px)]">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border bg-background">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative px-5 py-10 sm:px-10 sm:py-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Privacy Policy
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                This policy explains what we collect, why we collect it, and how you can
                control your information when using {COMPANY_NAME}.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                Last updated: {LAST_UPDATED}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Sticky TOC */}
        <aside className="lg:col-span-3">
          <Card className="lg:sticky lg:top-6">
            <CardHeader>
              <CardTitle className="text-base">On this page</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <TocLink href="#overview" label="Overview" />
              <TocLink href="#data-we-collect" label="Data we collect" />
              <TocLink href="#how-we-use" label="How we use data" />
              <TocLink href="#sharing" label="Sharing & disclosure" />
              <TocLink href="#retention" label="Data retention" />
              <TocLink href="#security" label="Security" />
              <TocLink href="#your-rights" label="Your rights" />
              <TocLink href="#children" label="Children’s privacy" />
              <TocLink href="#international" label="International transfers" />
              <TocLink href="#contact" label="Contact" />
            </CardContent>
          </Card>
        </aside>

        {/* Main Policy */}
        <main className="lg:col-span-9 space-y-6">
          <PolicyCard id="overview" title="1) Overview">
            <p>
              {COMPANY_NAME} (“we”, “us”, “our”) provides an AI workspace where users can
              access tools such as chat, image generation, and other features (“Services”).
              This Privacy Policy describes how we collect, use, and protect information
              when you use our Services.
            </p>
            <p className="mt-3">
              By using the Services, you agree to the practices described in this policy.
              If you do not agree, please do not use the Services.
            </p>
          </PolicyCard>

          <PolicyCard id="data-we-collect" title="2) Data we collect">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Account information:</span> name, email,
                password (hashed), profile details, and account preferences.
              </li>
              <li>
                <span className="font-medium">Usage data:</span> feature usage, request
                volume, model selections, timestamps, and basic diagnostics.
              </li>
              <li>
                <span className="font-medium">Content you provide:</span> prompts, files,
                and outputs generated through the Services (depending on settings and
                features used).
              </li>
              <li>
                <span className="font-medium">Payment and billing:</span> subscription
                status, invoices, and transaction identifiers handled by our payment
                processors (we do not store full card details).
              </li>
              <li>
                <span className="font-medium">Device and log data:</span> IP address,
                browser type, operating system, and crash logs.
              </li>
            </ul>

            <div className="mt-4 rounded-lg border bg-muted/30 p-4 text-sm">
              <p className="font-medium">Note</p>
              <p className="mt-1 text-muted-foreground">
                You should avoid uploading sensitive personal information unless it is
                necessary for your intended use. Some features may store content temporarily
                to provide history, exports, or troubleshooting.
              </p>
            </div>
          </PolicyCard>

          <PolicyCard id="how-we-use" title="3) How we use data">
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide, operate, and maintain the Services.</li>
              <li>To process subscriptions, credits, and billing actions.</li>
              <li>To improve reliability, performance, and user experience.</li>
              <li>To prevent abuse, fraud, and security incidents.</li>
              <li>To communicate updates, service notices, and support responses.</li>
            </ul>
          </PolicyCard>

          <PolicyCard id="sharing" title="4) Sharing & disclosure">
            <p>
              We do not sell your personal information. We may share information only in
              limited situations:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Service providers:</span> hosting, analytics,
                email delivery, payment processing, and customer support tools.
              </li>
              <li>
                <span className="font-medium">Legal reasons:</span> to comply with applicable
                laws, lawful requests, or to protect rights and safety.
              </li>
              <li>
                <span className="font-medium">Business transfers:</span> in a merger,
                acquisition, or asset sale, subject to continued protection of your data.
              </li>
            </ul>
          </PolicyCard>

          <PolicyCard id="retention" title="5) Data retention">
            <p>
              We retain information for as long as needed to provide the Services and fulfill
              legal, accounting, or security requirements.
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>
                Account data is retained while your account is active, and for a reasonable
                period after deletion to resolve disputes and enforce agreements.
              </li>
              <li>
                Logs and diagnostics are retained for security and operational purposes, then
                deleted or anonymized.
              </li>
            </ul>
          </PolicyCard>

          <PolicyCard id="security" title="6) Security">
            <p>
              We use reasonable administrative, technical, and physical safeguards designed
              to protect your information. However, no method of transmission or storage is
              100% secure, and we cannot guarantee absolute security.
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>Encryption in transit (HTTPS/TLS).</li>
              <li>Access controls and least-privilege policies.</li>
              <li>Monitoring and abuse prevention mechanisms.</li>
            </ul>
          </PolicyCard>

          <PolicyCard id="your-rights" title="7) Your rights & choices">
            <p>
              Depending on your location, you may have rights to access, correct, delete, or
              export your personal information. You can also object to certain processing or
              request restrictions.
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>Update profile and account settings from your dashboard.</li>
              <li>Request deletion by contacting support.</li>
              <li>Opt out of non-essential communications where available.</li>
            </ul>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-lg border bg-muted/30 p-4">
              <div>
                <p className="text-sm font-medium">Need a data request?</p>
                <p className="text-sm text-muted-foreground">
                  Email us and we’ll help you with access/export/deletion requests.
                </p>
              </div>
              <Link
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-sm font-medium underline underline-offset-4"
              >
                {SUPPORT_EMAIL}
              </Link>
            </div>
          </PolicyCard>

          <PolicyCard id="children" title="8) Children’s privacy">
            <p>
              The Services are not intended for children under 13 (or the minimum legal age
              in your jurisdiction). We do not knowingly collect personal information from
              children. If you believe a child provided data to us, contact us to remove it.
            </p>
          </PolicyCard>

          <PolicyCard id="international" title="9) International transfers">
            <p>
              Your information may be processed in countries other than your own. Where
              required, we use appropriate safeguards to protect data when transferred across
              borders.
            </p>
          </PolicyCard>

          <PolicyCard id="contact" title="10) Contact">
            <p>
              If you have questions about this Privacy Policy, contact us:
            </p>
            <div className="mt-3 rounded-lg border p-4 text-sm">
              <p className="font-medium">{COMPANY_NAME} Support</p>
              <p className="text-muted-foreground">
                Email:{" "}
                <Link
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="underline underline-offset-4 text-secondary font-bold"
                >
                  {SUPPORT_EMAIL}
                </Link>
              </p>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              We may update this policy from time to time. If changes are significant, we’ll
              provide a notice in the app or via email.
            </p>
          </PolicyCard>

          {/* Footer note */}
          <div className="pb-4 text-xs text-muted-foreground">
            This Privacy Policy template is provided for UI purposes and should be reviewed
            by legal counsel to ensure compliance with your jurisdiction and business model.
          </div>
        </main>
      </section>
    </div>
  );
}

function TocLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="block rounded-md px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-muted transition"
    >
      {label}
    </a>
  );
}

function PolicyCard({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card id={id} className="scroll-mt-24">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-sm max-w-none dark:prose-invert">
        {children}
      </CardContent>
    </Card>
  );
}
