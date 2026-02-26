export function CompactQuestionCard() {
  return (
    <aside
      id="contact-help"
      className="print-frame rounded-3xl bg-paper p-5 shadow-sm md:p-6"
      data-nav-section
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
        Ask a Question
      </p>
      <h3 className="mt-2 text-xl font-semibold text-ink md:text-2xl">Need quick guidance first?</h3>
      <p className="mt-2 text-sm text-muted">
        Share your question and we will advise on file setup, stock, or finishing before full
        quoting.
      </p>
      <form className="mt-4 space-y-3">
        <label className="form-field">
          Email
          <input type="email" name="email" autoComplete="email" required />
        </label>
        <label className="form-field">
          Message
          <textarea rows={4} name="message" placeholder="What do you need help with?" required />
        </label>
        <button
          type="submit"
          className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
        >
          Send
        </button>
      </form>
    </aside>
  );
}
