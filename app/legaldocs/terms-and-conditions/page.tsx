import Navbar from "@/components/Navbarb";
import nextlink from "next";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
            ServiceWingman
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-slate-400">
            Last Updated: June 4, 2026
          </p>
        </div>

        <div className="space-y-8 leading-7 text-slate-300">
          <section>
            <p>
              Welcome to ServiceWingman. These Terms and Conditions govern your
              access to and use of our website, software, services, dashboards,
              forms, messaging tools, and related features, including any
              services provided through servicewingman.co.
            </p>
            <p className="mt-4">
              By accessing or using ServiceWingman, you agree to these Terms. If
              you do not agree, you may not use the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              1. About ServiceWingman
            </h2>
            <p>
              ServiceWingman provides lead-management tools for home service
              businesses, including HVAC, plumbing, electrical, roofing,
              landscaping, and similar service companies.
            </p>
            <p className="mt-4">
              Our Service may help businesses collect leads, organize customer
              inquiries, track follow-ups, manage sales opportunities, and
              communicate with customers or potential customers.
            </p>
            <p className="mt-4">
              ServiceWingman does not guarantee that any lead will become a
              paying customer or that use of the Service will result in a
              specific amount of revenue, sales, booked jobs, or business growth.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              2. Eligibility
            </h2>
            <p>
              You must be at least 18 years old and legally able to enter into a
              binding agreement to use the Service. If you use the Service on
              behalf of a business or organization, you represent that you have
              authority to bind that business or organization to these Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              3. Accounts and Access
            </h2>
            <p>
              To use certain features, you may need to create an account. You
              agree to provide accurate, current, and complete information and to
              keep your login credentials secure.
            </p>
            <p className="mt-4">
              You are responsible for all activity that occurs under your
              account. You agree to notify us promptly if you believe your
              account has been accessed without authorization.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              4. Customer and Lead Data
            </h2>
            <p>
              When you use ServiceWingman, you may submit or collect information
              about your customers, prospects, leads, employees, or business
              operations. This may include names, phone numbers, email addresses,
              service requests, addresses, appointment details, notes, lead
              status, and communication history.
            </p>
            <p className="mt-4">
              You are responsible for making sure you have the necessary rights,
              permissions, and legal basis to collect, upload, store, and use any
              information you submit to the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              5. SMS, Calls, and Electronic Communications
            </h2>
            <p>
              ServiceWingman may allow businesses to communicate with leads or
              customers through text messages, phone calls, emails, or other
              electronic communications.
            </p>
            <p className="mt-4">By using these features, you agree that:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                You are responsible for obtaining proper consent before sending
                marketing or promotional messages.
              </li>
              <li>
                You will only contact individuals who have provided permission or
                where communication is otherwise legally allowed.
              </li>
              <li>
                You will honor opt-out requests, including requests such as
                “STOP,” “UNSUBSCRIBE,” “CANCEL,” or similar language.
              </li>
              <li>
                You will not use the Service to send spam, deceptive messages,
                unlawful marketing, harassment, or abusive communications.
              </li>
              <li>
                You are responsible for complying with applicable communication
                laws and regulations, including laws related to SMS,
                telemarketing, email marketing, consent, and consumer privacy.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              6. Acceptable Use
            </h2>
            <p>You agree not to use the Service to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Violate any applicable law or regulation.</li>
              <li>Send spam, fraudulent, misleading, or unlawful messages.</li>
              <li>Harass, threaten, abuse, or harm others.</li>
              <li>
                Collect sensitive personal information unless legally permitted
                and necessary.
              </li>
              <li>Upload malicious code, viruses, or harmful software.</li>
              <li>
                Attempt to gain unauthorized access to the Service or another
                user’s account.
              </li>
              <li>
                Interfere with the security, availability, or performance of the
                Service.
              </li>
              <li>
                Reverse engineer, copy, resell, or misuse the Service.
              </li>
              <li>
                Use the Service for any unlawful, deceptive, or abusive business
                practice.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              7. Subscriptions, Billing, and Payments
            </h2>
            <p>
              Some parts of the Service may require payment. If you purchase a
              subscription or paid plan, you agree to pay all fees listed at the
              time of purchase.
            </p>
            <p className="mt-4">
              Unless otherwise stated, subscription fees are billed in advance
              and may renew automatically. You are responsible for keeping your
              payment information current.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              8. Cancellations and Refunds
            </h2>
            <p>
              You may cancel your subscription according to the instructions
              provided in your account dashboard or by contacting us.
            </p>
            <p className="mt-4">
              Unless otherwise stated in writing, payments are non-refundable
              after the billing period begins. We may choose to provide refunds
              at our discretion, but doing so does not create an obligation to
              provide refunds in the future.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              9. Third-Party Services
            </h2>
            <p>
              The Service may connect with or rely on third-party platforms,
              including hosting providers, database providers, payment
              processors, communication providers, analytics tools, or other
              software services.
            </p>
            <p className="mt-4">
              We are not responsible for the actions, availability, security, or
              terms of any third-party service. Your use of third-party services
              may be subject to separate terms and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              10. Intellectual Property
            </h2>
            <p>
              ServiceWingman, including its name, logo, website, software,
              design, content, features, and related materials, is owned by
              ServiceWingman or its licensors and is protected by intellectual
              property laws.
            </p>
            <p className="mt-4">
              You may not copy, modify, distribute, sell, lease, or create
              derivative works based on the Service unless we give you written
              permission.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              11. Service Availability
            </h2>
            <p>
              We work to keep the Service reliable, but we do not guarantee that
              it will always be available, uninterrupted, secure, or error-free.
              The Service may be unavailable due to maintenance, updates,
              technical issues, third-party outages, or events outside our
              control.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              12. No Professional Advice
            </h2>
            <p>
              ServiceWingman provides software tools and business workflow
              support. We do not provide legal, financial, tax, accounting,
              marketing, or compliance advice.
            </p>
            <p className="mt-4">
              You are responsible for consulting qualified professionals when
              needed, especially regarding privacy, advertising, SMS,
              telemarketing, and customer communication compliance.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              13. Disclaimers
            </h2>
            <p>
              The Service is provided “as is” and “as available.” To the fullest
              extent allowed by law, we disclaim all warranties, whether express,
              implied, or statutory, including warranties of merchantability,
              fitness for a particular purpose, title, and non-infringement.
            </p>
            <p className="mt-4">
              We do not guarantee that the Service will produce leads, sales,
              revenue, booked jobs, customer conversions, or any specific
              business result.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              14. Limitation of Liability
            </h2>
            <p>
              To the fullest extent allowed by law, ServiceWingman and its
              owners, employees, contractors, partners, and affiliates will not
              be liable for any indirect, incidental, special, consequential,
              exemplary, or punitive damages, including lost profits, lost
              revenue, lost data, business interruption, or loss of goodwill.
            </p>
            <p className="mt-4">
              To the fullest extent allowed by law, our total liability for any
              claim related to the Service will not exceed the amount you paid to
              ServiceWingman in the three months before the claim arose, or $100
              if you have not paid us.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              15. Indemnification
            </h2>
            <p>
              You agree to defend, indemnify, and hold harmless ServiceWingman
              and its owners, employees, contractors, partners, and affiliates
              from any claims, damages, liabilities, losses, costs, and expenses
              arising from your use of the Service, violation of these Terms,
              violation of law, customer communications, collection or use of
              customer data, or failure to obtain proper consent for calls,
              texts, emails, or marketing messages.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              16. Termination
            </h2>
            <p>
              We may suspend or terminate your access to the Service at any time
              if we believe you violated these Terms, created risk for
              ServiceWingman or others, failed to pay required fees, or used the
              Service in a harmful or unlawful way.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              17. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. When we do, we will
              update the “Last Updated” date above. Your continued use of the
              Service after changes become effective means you accept the updated
              Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              18. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of the State of Florida,
              without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              19. Contact Us
            </h2>
            <p>
              If you have questions about these Terms, contact us at:
            </p>
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="font-semibold text-white">ServiceWingman</p>
              <p>Website: servicewingman.co</p>
              <p>Email: support@servicewingman.co</p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}