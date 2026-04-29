'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form:', formData);
    alert("Thank you for your message. We'll get back to you soon.");
  };

  return (
    <div className="marketing-page">
      <section className="section-shell py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">Contact</span>
            <h1 className="mt-6 text-6xl leading-[0.95] text-[var(--foreground)] md:text-7xl">
              Questions about appeals, pricing, or rollout?
            </h1>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
              Reach out if you want help shaping the workflow for homeowners, investors, or multi-property use cases.
            </p>

            <div className="mt-10 space-y-6">
              <div className="soft-card rounded-[1.5rem] p-5">
                <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">Email</p>
                <p className="mt-2 text-xl text-[var(--foreground)]">support@lonestarappeals.ai</p>
              </div>
              <div className="soft-card rounded-[1.5rem] p-5">
                <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">Response Window</p>
                <p className="mt-2 text-xl text-[var(--foreground)]">Within 24 hours</p>
              </div>
              <div className="soft-card rounded-[1.5rem] p-5">
                <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">Best For</p>
                <p className="mt-2 text-xl text-[var(--foreground)]">Setup help, pricing, workflow questions</p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-8 md:p-10">
            <h2 className="text-4xl text-[var(--foreground)]">Send a message</h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="field" required />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="field" required />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Subject</label>
                <select id="subject" name="subject" value={formData.subject} onChange={handleChange} className="field" required>
                  <option value="">Select a subject</option>
                  <option value="general">General Question</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing &amp; Pricing</option>
                  <option value="appeal">Appeal Workflow</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={6} className="field" placeholder="How can we help?" required />
              </div>
              <button type="submit" className="button-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
