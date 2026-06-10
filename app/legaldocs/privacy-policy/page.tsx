import Navbar from "@/components/Navbarb";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
            ServiceWingman
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-slate-400">
            Last Updated: June 4, 2026
          </p>
        </div>

        <div className="space-y-8 leading-7 text-slate-300">
          <section>
            <p>
              This Privacy Policy explains how ServiceWingman collects, uses,
              stores, shares, and protects information when you visit our
              website, use our software, submit a form, communicate with us, or
              interact with our services.
            </p>
            <p className="mt-4">
              By using ServiceWingman, you agree to the practices described in
              this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              1. Information We Collect
            </h2>
            <p>
              We may collect information directly from you, automatically through
              your use of the Service, or from businesses that use
              ServiceWingman to manage their leads.
            </p>

            <h3 className="mt-5 text-lg font-semibold text-white">
              Information You Provide
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Name</li>
              <li>Business name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Login credentials</li>
              <li>Billing information</li>
              <li>Service area or business location</li>
              <li>Messages, notes, or support requests</li>
              <li>Information submitted through forms</li>
              <li>Customer or lead information entered into the Service</li>
            </ul>

            <h3 className="mt-5 text-lg font-semibold text-white">
              Lead and Customer Information
            </h3>
            <p className="mt-3">
              Businesses using ServiceWingman may collect and manage lead or
              customer information through our platform. This may include lead
              names, phone numbers, email addresses, service addresses, service
              requests, appointment details, lead status, follow-up notes, and
              communication history.
            </p>

            <h3 className="mt-5 text-lg font-semibold text-white">
              Information Collected Automatically
            </h3>
            <p className="mt-3">
              When you use our website or Service, we may collect certain
              technical information, including IP address, browser type, device
              type, operating system, pages viewed, referring website, date and
              time of access, usage activity, cookies, and similar technologies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              2. How We Use Information
            </h2>
            <p>We may use information to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Provide, operate, and improve ServiceWingman.</li>
              <li>Create and manage user accounts.</li>
              <li>Capture, organize, and display leads.</li>
              <li>Help businesses manage customer inquiries and follow-ups.</li>
              <li>Send service-related messages.</li>
              <li>Provide customer support.</li>
              <li>Process payments and subscriptions.</li>
              <li>Improve website performance and user experience.</li>
              <li>Monitor security and prevent fraud or abuse.</li>
              <li>Comply with legal obligations.</li>
              <li>Enforce our Terms and Conditions.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              3. SMS and Communication Consent
            </h2>
            <p>
              If you provide your phone number through a ServiceWingman-powered
              form, website, or communication flow, you may be contacted by the
              business you submitted your information to regarding your inquiry,
              appointment, estimate, service request, or related follow-up.
            </p>
            <p className="mt-4">
              Message frequency may vary. Message and data rates may apply. You
              may opt out of SMS communications at any time by replying{" "}
              <strong className="text-white">STOP</strong>. You may request help
              by replying <strong className="text-white">HELP</strong> or by
              contacting the business directly.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              4. No Sharing of Mobile Opt-In Data for Marketing
            </h2>
            <p>
              ServiceWingman does not sell or share mobile phone numbers, SMS
              opt-in data, or SMS consent information with third parties or
              affiliates for their marketing or promotional purposes.
            </p>
            <p className="mt-4">
              This includes text messaging originator opt-in data and consent.
              Such information will not be shared with any third parties,
              affiliates, or partners for marketing or promotional purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              5. How We Share Information
            </h2>
            <p>
              We may share information only as needed to operate our business and
              provide the Service. This may include service providers that help
              us host, operate, secure, process payments, deliver
              communications, provide analytics, or support business operations.
            </p>
            <p className="mt-4">
              We do not sell personal information. We do not share SMS opt-in
              data or consent information with third parties or affiliates for
              marketing or promotional purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              6. Business Customers and Their Leads
            </h2>
            <p>
              If you submit information to a business that uses ServiceWingman,
              that business may control how your information is used. For
              example, an HVAC company using ServiceWingman may use your
              information to contact you, schedule service, provide an estimate,
              or follow up on your request.
            </p>
            <p className="mt-4">
              ServiceWingman acts as a software provider that helps businesses
              manage this information. We are not responsible for the independent
              privacy practices of businesses that use our Service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              7. Cookies and Tracking Technologies
            </h2>
            <p>
              We may use cookies and similar technologies to keep users signed
              in, remember preferences, improve website performance, understand
              website usage, protect against fraud, and improve the user
              experience.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              8. Data Security
            </h2>
            <p>
              We use reasonable administrative, technical, and organizational
              safeguards to protect information from unauthorized access, misuse,
              loss, disclosure, alteration, or destruction. However, no system
              can be guaranteed to be completely secure.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              9. Data Retention
            </h2>
            <p>
              We keep information for as long as reasonably necessary to provide
              the Service, operate our business, comply with legal obligations,
              resolve disputes, enforce agreements, and maintain security.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              10. Your Choices
            </h2>
            <p>
              Depending on your relationship with ServiceWingman, you may be able
              to access, update, or delete certain account information, opt out
              of marketing emails, opt out of SMS messages by replying STOP,
              request help by replying HELP, request deletion of certain
              information, or disable cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              11. Children&apos;s Privacy
            </h2>
            <p>
              ServiceWingman is not intended for children under 13 years old. We
              do not knowingly collect personal information from children under
              13. If we learn that we collected personal information from a child
              under 13, we will take reasonable steps to delete it.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              12. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. When we make
              changes, we will update the “Last Updated” date above. Your
              continued use of ServiceWingman after changes become effective
              means you accept the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              13. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy or how your
              information is handled, contact us at:
            </p>
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="font-semibold text-white">ServiceWingman</p>
              <p>Website: servicewingman.co</p>
              <p>Email: wingmancrm@servicewingman.co</p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}