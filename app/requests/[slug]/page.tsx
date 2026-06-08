"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function PublicRequestPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    console.log("slug being sent:", slug);

    const res = await fetch(`/requests/${slug}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          name,
          phone,
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
    console.log("company response:", responseText);
    console.log("response", responseText);

    setLoading(false);

    if (!res.ok) {
      alert("Something went wrong. Please try again.");
      return;
    }

    setSuccess(true);

    setName("");
    setPhone("");
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

  return (
    <main className="page-shell px-4 py-10">
      <section className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-xl md:px-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
            HVAC Service Request
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Request Heating or Cooling Service
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
            Tell us what is happening with your system. The more detail you
            provide, the faster the team can understand your request and follow
            up with the right next step.
          </p>
        </div>

        {success && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-800">
            Request submitted successfully. Someone will follow up with you
            shortly.
          </div>
        )}

        <form
          onSubmit={submit}
          className="space-y-6 rounded-3xl bg-white p-5 shadow-xl md:p-8"
        >
          <FormSection
            step="Step 1"
            title="Contact Information"
            description="Who should the company contact about this request?"
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
                value={phone}
                onChange={setPhone}
                placeholder="(555) 123-4567"
                type="tel"
                required
              />

              <TextInput
                label="Email Address"
                value={email}
                onChange={setEmail}
                placeholder="john@example.com"
                type="email"
              />
            </div>
          </FormSection>

          <FormSection
            step="Step 2"
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

              <div className="grid gap-4 md:grid-cols-2">
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

              <SelectInput
                label="Property Type"
                value={propertyType}
                onChange={setPropertyType}
                required
              >
                <option value="">Select property type</option>
                <option value="Single-family home">Single-family home</option>
                <option value="Townhome">Townhome</option>
                <option value="Condo">Condo</option>
                <option value="Apartment">Apartment</option>
                <option value="Commercial building">Commercial building</option>
                <option value="Other">Other</option>
              </SelectInput>
            </div>

            <CheckboxInput
              checked={authorized}
              onChange={setAuthorized}
              required
              label="I confirm that I am the owner, tenant, property manager, or otherwise authorized to request service at this address."
            />
          </FormSection>

          <FormSection
            step="Step 3"
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
                <option value="System maintenance">System maintenance</option>
                <option value="New system estimate">New system estimate</option>
                <option value="System replacement">System replacement</option>
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
                <option value="emergency">Emergency - No cooling/heating</option>
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
          </FormSection>

          <FormSection
            step="Step 4"
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
                <option value="Mini-split / ductless">Mini-split / ductless</option>
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
          </FormSection>

          <FormSection
            step="Step 5"
            title="Describe the Issue"
            description="What symptoms are you noticing?"
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
                <option value="Within the last week">Within the last week</option>
                <option value="More than a week ago">More than a week ago</option>
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
          </FormSection>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <CheckboxInput
              checked={smsConsent}
              onChange={setSmsConsent}
              required
              label="I agree to be contacted by phone, text, or email about my HVAC request. Message and data rates may apply. Message frequency may vary. Reply STOP to opt out of text messages or HELP for help. Consent is not a condition of purchase."
            />
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-500">
              Your information will only be used to respond to this service
              request.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-slate-950 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Service Request"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

function FormSection({
  step,
  title,
  description,
  children,
}: {
  step: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-600">
          {step}
        </p>

        <h2 className="text-xl font-bold text-slate-950">{title}</h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
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
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-blue-600"> *</span>}
      </span>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-blue-600"> *</span>}
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-blue-600"> *</span>}
      </span>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={5}
        className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
    <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required={required}
        className="mt-1 h-4 w-4 rounded border-slate-300"
      />

      <span>{label}</span>
    </label>
  );
}