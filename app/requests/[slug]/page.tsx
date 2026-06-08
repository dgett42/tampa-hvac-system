"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

const steps = [
  "Contact",
  "Address",
  "Service",
  "System",
  "Issue",
  "Review",
];

export default function PublicRequestPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [client_phone, setClientPhone] = useState("");
  const [email, setEmail] = useState("");

  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateValue, setStateValue] = useState("FL");
  const [zipCode, setZipCode] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const [serviceType, setServiceType] = useState("");
  const [priority, setPriority] = useState("medium");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  const [systemType, setSystemType] = useState("");
  const [systemAge, setSystemAge] = useState("");
  const [systemBrand, setSystemBrand] = useState("");
  const [lastMaintenance, setLastMaintenance] = useState("");

  const [issue, setIssue] = useState("");
  const [issueStarted, setIssueStarted] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");
  const [accessNotes, setAccessNotes] = useState("");

  const [smsConsent, setSmsConsent] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validateCurrentStep() {
    if (step === 1 && (!name || !client_phone)) {
      alert("Please enter your name and phone number.");
      return false;
    }

    if (
      step === 2 &&
      (!streetAddress || !city || !stateValue || !zipCode || !propertyType)
    ) {
      alert("Please complete the service address section.");
      return false;
    }

    if (step === 2 && !authorized) {
      alert("Please confirm you are authorized to request service.");
      return false;
    }

    if (step === 3 && !serviceType) {
      alert("Please select the type of service needed.");
      return false;
    }

    if (step === 5 && !issue) {
      alert("Please describe what is going on with the system.");
      return false;
    }

    return true;
  }

  function nextStep() {
    if (!validateCurrentStep()) return;
    setStep((current) => Math.min(current + 1, steps.length));
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 1));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!smsConsent) {
      alert("Please agree to be contacted about your HVAC request.");
      return;
    }

    setLoading(true);

    const cleanSlug = String(slug).trim().toLowerCase();

    const res = await fetch(`/requests/${encodeURIComponent(cleanSlug)}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        client_phone,
        email,

        streetAddress,
        city,
        state: stateValue,
        zipCode,
        propertyType,

        serviceType,
        priority,
        preferredDate,
        preferredTime,

        systemType,
        systemAge,
        systemBrand,
        lastMaintenance,

        issue,
        issueStarted,
        currentTemp,
        accessNotes,

        smsConsent,
        authorized,
      }),
    });

    const responseText = await res.text();

    console.log("status", res.status);
    console.log("response", responseText);

    setLoading(false);

    if (!res.ok) {
      alert("Something went wrong. Please try again.");
      return;
    }

    setSuccess(true);
  }

  function startNewRequest() {
    setStep(1);
    setSuccess(false);

    setName("");
    setClientPhone("");
    setEmail("");
    setStreetAddress("");
    setCity("");
    setStateValue("FL");
    setZipCode("");
    setPropertyType("");
    setServiceType("");
    setPriority("medium");
    setPreferredDate("");
    setPreferredTime("");
    setSystemType("");
    setSystemAge("");
    setSystemBrand("");
    setLastMaintenance("");
    setIssue("");
    setIssueStarted("");
    setCurrentTemp("");
    setAccessNotes("");
    setSmsConsent(false);
    setAuthorized(false);
  }

  if (success) {
    return (
      <main className="page-shell flex min-h-screen items-center justify-center px-4 py-10">
        <section className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/90 p-8 text-center shadow-2xl shadow-black/30">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 text-3xl text-green-300">
            ✓
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
            Request Submitted
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Your HVAC request has been received.
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-300">
            Thanks, {name || "there"}. The service team has received your
            request and will follow up with you soon using the contact
            information you provided.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-5 text-left">
            <h2 className="font-semibold text-white">What happens next?</h2>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-400">
              <li>• Your request is added to the company’s lead dashboard.</li>
              <li>• A team member reviews your service details.</li>
              <li>• You may be contacted by phone, text, or email.</li>
            </ul>
          </div>

          <button
            type="button"
            onClick={startNewRequest}
            className="mt-8 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            Submit Another Request
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell px-4 py-10">
      <section className="mx-auto max-w-4xl">
        <div className="mb-6 rounded-3xl border border-slate-800 bg-slate-900/90 px-6 py-8 text-white shadow-2xl shadow-black/30 md:px-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
            HVAC Service Request
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Request Heating or Cooling Service
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
            Complete this short step-by-step form so the service team can
            understand your request and follow up quickly.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-2xl shadow-black/30 md:p-8"
        >
          <Progress step={step} steps={steps} />

          <div className="mt-8">
            {step === 1 && (
              <StepSection
                title="Contact Information"
                description="Tell us who the service company should contact."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <TextInput
                    label="Full Name"
                    value={name}
                    onChange={setName}
                    placeholder="John Smith"
                    required
                  />

                  <TextInput
                    label="Phone Number"
                    value={client_phone}
                    onChange={setClientPhone}
                    placeholder="(555) 123-4567"
                    type="tel"
                    required
                  />

                  <div className="md:col-span-2">
                    <TextInput
                      label="Email Address"
                      value={email}
                      onChange={setEmail}
                      placeholder="john@example.com"
                      type="email"
                    />
                  </div>
                </div>
              </StepSection>
            )}

            {step === 2 && (
              <StepSection
                title="Service Address"
                description="Where is the HVAC system located?"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <TextInput
                      label="Street Address"
                      value={streetAddress}
                      onChange={setStreetAddress}
                      placeholder="123 Main Street"
                      required
                    />
                  </div>

                  <TextInput
                    label="City"
                    value={city}
                    onChange={setCity}
                    placeholder="Tampa"
                    required
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <SelectInput
                      label="State"
                      value={stateValue}
                      onChange={setStateValue}
                      required
                    >
                      <option value="FL">Florida</option>
                      <option value="AL">Alabama</option>
                      <option value="GA">Georgia</option>
                      <option value="SC">South Carolina</option>
                      <option value="NC">North Carolina</option>
                      <option value="Other">Other</option>
                    </SelectInput>

                    <TextInput
                      label="ZIP Code"
                      value={zipCode}
                      onChange={setZipCode}
                      placeholder="33602"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <SelectInput
                      label="Property Type"
                      value={propertyType}
                      onChange={setPropertyType}
                      required
                    >
                      <option value="">Select property type</option>
                      <option value="Single-family home">
                        Single-family home
                      </option>
                      <option value="Townhome">Townhome</option>
                      <option value="Condo">Condo</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Commercial building">
                        Commercial building
                      </option>
                      <option value="Other">Other</option>
                    </SelectInput>
                  </div>
                </div>

                <div className="mt-5">
                  <CheckboxInput
                    checked={authorized}
                    onChange={setAuthorized}
                    required
                    label="I confirm that I am the owner, tenant, property manager, or otherwise authorized to request service at this address."
                  />
                </div>
              </StepSection>
            )}

            {step === 3 && (
              <StepSection
                title="Service Needed"
                description="Tell us what type of HVAC help you need."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <SelectInput
                    label="Service Type"
                    value={serviceType}
                    onChange={setServiceType}
                    required
                  >
                    <option value="">Select service type</option>
                    <option value="AC repair">AC repair</option>
                    <option value="Heating repair">Heating repair</option>
                    <option value="System maintenance">
                      System maintenance
                    </option>
                    <option value="New system estimate">
                      New system estimate
                    </option>
                    <option value="System replacement">
                      System replacement
                    </option>
                    <option value="Thermostat issue">Thermostat issue</option>
                    <option value="Indoor air quality">Indoor air quality</option>
                    <option value="Other">Other</option>
                  </SelectInput>

                  <SelectInput
                    label="Priority"
                    value={priority}
                    onChange={setPriority}
                    required
                  >
                    <option value="low">Low - Not urgent</option>
                    <option value="medium">Medium - Soon</option>
                    <option value="high">High - Today if possible</option>
                    <option value="emergency">
                      Emergency - No cooling/heating
                    </option>
                  </SelectInput>

                  <TextInput
                    label="Preferred Service Date"
                    value={preferredDate}
                    onChange={setPreferredDate}
                    type="date"
                  />

                  <SelectInput
                    label="Preferred Time Window"
                    value={preferredTime}
                    onChange={setPreferredTime}
                  >
                    <option value="">Select time window</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Anytime">Anytime</option>
                  </SelectInput>
                </div>
              </StepSection>
            )}

            {step === 4 && (
              <StepSection
                title="HVAC System Details"
                description="These details help the contractor understand your equipment before calling."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <SelectInput
                    label="System Type"
                    value={systemType}
                    onChange={setSystemType}
                  >
                    <option value="">Select system type</option>
                    <option value="Central AC / split system">
                      Central AC / split system
                    </option>
                    <option value="Heat pump">Heat pump</option>
                    <option value="Gas furnace">Gas furnace</option>
                    <option value="Electric furnace">Electric furnace</option>
                    <option value="Mini-split / ductless">
                      Mini-split / ductless
                    </option>
                    <option value="Package unit">Package unit</option>
                    <option value="Not sure">Not sure</option>
                    <option value="Other">Other</option>
                  </SelectInput>

                  <SelectInput
                    label="Approximate System Age"
                    value={systemAge}
                    onChange={setSystemAge}
                  >
                    <option value="">Select age</option>
                    <option value="Less than 1 year">Less than 1 year</option>
                    <option value="1-5 years">1-5 years</option>
                    <option value="6-10 years">6-10 years</option>
                    <option value="11-15 years">11-15 years</option>
                    <option value="16+ years">16+ years</option>
                    <option value="Not sure">Not sure</option>
                  </SelectInput>

                  <TextInput
                    label="System Brand"
                    value={systemBrand}
                    onChange={setSystemBrand}
                    placeholder="Carrier, Trane, Lennox, Goodman, etc."
                  />

                  <SelectInput
                    label="Last Maintenance"
                    value={lastMaintenance}
                    onChange={setLastMaintenance}
                  >
                    <option value="">Select one</option>
                    <option value="Within 6 months">Within 6 months</option>
                    <option value="6-12 months ago">6-12 months ago</option>
                    <option value="Over 1 year ago">Over 1 year ago</option>
                    <option value="Never / not sure">Never / not sure</option>
                  </SelectInput>
                </div>
              </StepSection>
            )}

            {step === 5 && (
              <StepSection
                title="Describe the Issue"
                description="Tell us what symptoms you are noticing."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <SelectInput
                    label="When Did the Issue Start?"
                    value={issueStarted}
                    onChange={setIssueStarted}
                  >
                    <option value="">Select one</option>
                    <option value="Today">Today</option>
                    <option value="Within the last few days">
                      Within the last few days
                    </option>
                    <option value="Within the last week">
                      Within the last week
                    </option>
                    <option value="More than a week ago">
                      More than a week ago
                    </option>
                    <option value="Ongoing issue">Ongoing issue</option>
                  </SelectInput>

                  <TextInput
                    label="Current Indoor Temperature"
                    value={currentTemp}
                    onChange={setCurrentTemp}
                    placeholder="Example: 82°F"
                  />

                  <div className="md:col-span-2">
                    <TextAreaInput
                      label="What is going on?"
                      value={issue}
                      onChange={setIssue}
                      placeholder="Example: AC is running but not cooling, outdoor unit is making a loud noise, thermostat is blank, system is leaking water, etc."
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <TextAreaInput
                      label="Access Notes or Special Instructions"
                      value={accessNotes}
                      onChange={setAccessNotes}
                      placeholder="Gate code, pets, parking instructions, attic access, landlord details, etc."
                    />
                  </div>
                </div>
              </StepSection>
            )}

            {step === 6 && (
              <StepSection
                title="Review & Submit"
                description="Review your request and confirm how the company may contact you."
              >
                <div className="grid gap-4 lg:grid-cols-2">
                  <ReviewCard title="Contact">
                    <ReviewRow label="Name" value={name} />
                    <ReviewRow label="Phone" value={client_phone} />
                    <ReviewRow label="Email" value={email || "Not provided"} />
                  </ReviewCard>

                  <ReviewCard title="Address">
                    <ReviewRow label="Street" value={streetAddress} />
                    <ReviewRow
                      label="City/State"
                      value={`${city}, ${stateValue} ${zipCode}`}
                    />
                    <ReviewRow label="Property" value={propertyType} />
                  </ReviewCard>

                  <ReviewCard title="Service">
                    <ReviewRow label="Type" value={serviceType} />
                    <ReviewRow label="Priority" value={priority} />
                    <ReviewRow
                      label="Preferred"
                      value={
                        preferredDate || preferredTime
                          ? `${preferredDate || "No date"} ${
                              preferredTime || ""
                            }`
                          : "Not provided"
                      }
                    />
                  </ReviewCard>

                  <ReviewCard title="System">
                    <ReviewRow
                      label="System Type"
                      value={systemType || "Not provided"}
                    />
                    <ReviewRow
                      label="System Age"
                      value={systemAge || "Not provided"}
                    />
                    <ReviewRow
                      label="Brand"
                      value={systemBrand || "Not provided"}
                    />
                  </ReviewCard>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <h3 className="mb-2 font-semibold text-white">
                    Issue Description
                  </h3>
                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-300">
                    {issue || "Not provided"}
                  </p>
                </div>

                {accessNotes && (
                  <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <h3 className="mb-2 font-semibold text-white">
                      Access Notes
                    </h3>
                    <p className="whitespace-pre-wrap text-sm leading-6 text-slate-300">
                      {accessNotes}
                    </p>
                  </div>
                )}

                <div className="mt-5">
                  <CheckboxInput
                    checked={smsConsent}
                    onChange={setSmsConsent}
                    required
                    label="I agree to be contacted by phone, text, or email about my HVAC request. Message and data rates may apply. Message frequency may vary. Reply STOP to opt out of text messages or HELP for help. Consent is not a condition of purchase."
                  />
                </div>
              </StepSection>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={previousStep}
              disabled={step === 1 || loading}
              className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>

            <p className="text-center text-sm text-slate-500">
              Step {step} of {steps.length}
            </p>

            {step < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}

function Progress({ step, steps }: { step: number; steps: string[] }) {
  const percent = (step / steps.length) * 100;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-300">
          {steps[step - 1]}
        </span>
        <span className="text-slate-500">
          {step} / {steps.length}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-blue-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-4 hidden grid-cols-6 gap-2 text-xs text-slate-500 md:grid">
        {steps.map((label, index) => (
          <div
            key={label}
            className={index + 1 <= step ? "text-blue-300" : ""}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}

function TextInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
        {required && <span className="text-blue-400"> *</span>}
      </span>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20"
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  required = false,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
        {required && <span className="text-blue-400"> *</span>}
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20"
      >
        {children}
      </select>
    </label>
  );
}

function TextAreaInput({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
        {required && <span className="text-blue-400"> *</span>}
      </span>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={5}
        className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20"
      />
    </label>
  );
}

function CheckboxInput({
  checked,
  onChange,
  label,
  required = false,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-300">
      <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required={required}
          className="mt-1 !h-4 !w-4 shrink-0 rounded border-slate-600"
        />

      <span>{label}</span>
    </label>
  );
}

function ReviewCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <h3 className="mb-3 font-semibold text-white">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-medium text-slate-300">
        {value || "Not provided"}
      </span>
    </div>
  );
}