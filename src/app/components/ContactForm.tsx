"use client";

import { useState } from "react";

type FormState = { name: string; email: string; message: string };
type Status = "idle" | "loading" | "success";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 700));
    const subject = encodeURIComponent(`Message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.email}`);
    window.location.href = `mailto:sonny@mail.andyou.ph?subject=${subject}&body=${body}`;
    setStatus("success");
  }

  const inputClass =
    "w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow";
  const labelClass = "block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5";

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-6 text-center space-y-2">
        <p className="font-semibold text-green-700 dark:text-green-400">Message sent!</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Your email client should have opened. I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
          className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors mt-2"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={set("name")}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={set("email")}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={set("message")}
          className={`${inputClass} resize-none`}
          placeholder="What are you working on?"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-white" />
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}