"use client";

import { useState, useMemo, type ChangeEvent, type FormEvent } from "react";

// ─── Types ────────────────────────────────────
type SemesterKey =
  | "sem1"
  | "sem2"
  | "sr-inter"
  | "sem3"
  | "sem5";

type BookEntry = { code: string; title: string };

const BOOKS_BY_SEMESTER: Record<SemesterKey, BookEntry[]> = {
  "sem1": [
    { code: "LANG-ENG", title: "English" },
    { code: "LANG-TEL", title: "Telugu" },
    { code: "LANG-SAN", title: "Sanskrit" },
    { code: "LANG-HIN", title: "Hindi" },
    { code: "LANG-URD", title: "Urdu" },
    { code: "SEC-AI", title: "AI Fundamentals" },
    { code: "BCG-FA1", title: "Financial Accounting-I" },
    { code: "BCC-ITOA", title: "Fundamentals of IT & Office Automation" },
    { code: "BCC-BOM", title: "Business Organization & Management" },
    { code: "BCC-BOMSVU", title: "Business Organization & Management-SVU" },
    { code: "BSC-M1DE", title: "M1E: Differential Equations" },
    { code: "BSC-M1SG", title: "M1E Solid Geometry" },
    { code: "BSC-P1MP", title: "P1E Introduction to Mathematical Physics" },
    { code: "BSC-P1MPM", title: "P1E Mechanics and Properties of Matter" },
    { code: "BSC-C1GC", title: "C1E General Chemistry" },
    { code: "BSC-C1IC", title: "C1E Inorganic Chemistry" },
    { code: "BSC-B1DM", title: "B1E Diversity of Microbes" },
    { code: "BSC-B1DT", title: "B1E Diversity of Thallophytes" },
    { code: "BSC-Z1NC", title: "Z1E AD-I Biology of Non-Chordates" },
    { code: "BSC-Z1AC", title: "Z1E Animal Diversity-II Biology of Chordates" },
    { code: "BSC-CS1CF", title: "CS1E/DS/BCA Computer Fundamentals and OA (BCA)" },
    { code: "BSC-CS1PS", title: "CS1E/DS/BCA Problem Solving Using C (BCA)" },
    { code: "BSC-AI1MF", title: "AI1E Mathematical Foundation for AI" },
    { code: "BA-BAH1IH", title: "BAH1E Introduction to Indian History" },
    { code: "BA-BAH1EI", title: "BAH1E Early India - Enlightenment and SF" },
    { code: "BA-BAE1IE", title: "BAECO1E Introduction to Economics" },
    { code: "BA-BAE1ME", title: "BAECO1E Microeconomics" },
    { code: "BA-BAP1IP", title: "BAPS1E Introduction to Political Science" },
    { code: "BA-BAP1CI", title: "BAPS1E Concepts & Ideologies of PS" },
    { code: "BBA-BBA1AM", title: "BBAGDMKT1E Accounting for Managers" },
    { code: "BBA-BBA1PM", title: "BBAGDMKT1E Principles of Management" },
  ],
  "sem2": [],
  "sr-inter": [],
  "sem3": [],
  "sem5": [],
};

const SEMESTER_TABS: Record<SemesterKey, string> = {
  "sem1": "Semester I",
  "sem2": "Semester II",
  "sr-inter": "Sr Inter(AP)",
  "sem3": "Semester III",
  "sem5": "Semester V",
};

// ─── Helpers ─────────────────────────────────
function groupBooksBySubject(books: BookEntry[]) {
  const groups: Record<string, BookEntry[]> = {
    Languages: [],
    "Skill Enhancement Courses": [],
    "BCom General": [],
    "BCom Comp/General": [],
    "B.Sc.,": [],
    BA: [],
    BBA: [],
  };

  for (const book of books) {
    if (book.code.startsWith("LANG-")) groups["Languages"].push(book);
    else if (book.code.startsWith("SEC-")) groups["Skill Enhancement Courses"].push(book);
    else if (book.code.startsWith("BCG-")) groups["BCom General"].push(book);
    else if (book.code.startsWith("BCC-")) groups["BCom Comp/General"].push(book);
    else if (book.code.startsWith("BSC-")) groups["B.Sc.,"].push(book);
    else if (book.code.startsWith("BA-")) groups["BA"].push(book);
    else if (book.code.startsWith("BBA-")) groups["BBA"].push(book);
  }
  return groups;
}

// ─── Component ───────────────────────────────
export default function BulkOrderForm() {
  const [activeSemester, setActiveSemester] = useState<SemesterKey>("sem1");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [date] = useState(
    new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  );
  const [submitted, setSubmitted] = useState(false);

  const books = BOOKS_BY_SEMESTER[activeSemester];
  const grouped = useMemo(() => groupBooksBySubject(books), [books]);

  const handleQty = (code: string, event: ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(0, Number(event.target.value) || 0);
    setQuantities((prev) => ({ ...prev, [code]: val }));
  };

  const selectedCount = useMemo(() => {
    const nonZero = Object.entries(quantities).filter(([, qty]) => qty > 0);
    return {
      books: nonZero.length,
      copies: nonZero.reduce((acc, [, qty]) => acc + qty, 0),
    };
  }, [quantities]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !contact.trim()) return;

    const order = Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([code, qty]) => ({ code, title: books.find((b) => b.code === code)?.title || code, qty }));

    setSubmitted(true);
    if (order.length === 0) return;

    const message = `Order from ${name}%0A%0A${order.map((b) => `${b.title}: ${b.qty}`).join("%0A")}%0A%0AContact: ${contact}`;
    window.open(`https://wa.me/918885414000?text=${message}`, "_blank");
  };

  return (
    <>
      <style>{`
        .bulk-order-root {
          --cream: #f9f6ef;
          --gold: #8b6914;
          --gold-light: #b9975b;
          --ink: #1a1814;
          --muted: #5c5548;
          --card-bg: #fcfaf6;
          --border: rgba(139, 105, 20, 0.2);
          background: linear-gradient(170deg, #fcfaf6 0%, #f7f0e3 100%);
          color: var(--ink);
          min-height: 100vh;
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
          padding: clamp(28px, 5vw, 64px) clamp(16px, 4vw, 40px);
        }

        .bulk-order-root .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .bulk-order-root .header {
          text-align: center;
          margin-bottom: 38px;
        }

        .bulk-order-root .header h1 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(34px, 4.5vw, 52px);
          font-weight: 500;
          letter-spacing: -0.03em;
          margin: 0 0 10px;
          color: var(--ink);
        }
        .bulk-order-root .header p {
          margin: 0 auto;
          max-width: 640px;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.7;
        }

        .bulk-order-root .contact-banner {
          display: flex;
          flex-wrap: wrap;
          gap: 20px 40px;
          justify-content: center;
          align-items: flex-start;
          background: linear-gradient(135deg, #2d2318, #1a1814);
          border: 1px solid rgba(139, 105, 20, 0.3);
          border-radius: 18px;
          padding: 22px 28px;
          margin-bottom: 36px;
          box-shadow: 0 14px 36px rgba(45, 35, 24, 0.12);
          color: #f0ede5;
        }
        .bulk-order-root .contact-banner h3 {
          margin: 0 0 6px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--gold-light);
        }
        .bulk-order-root .contact-banner p {
          margin: 0;
          font-size: 14px;
          color: #d4c9b8;
        }
        .bulk-order-root .contact-banner a {
          color: #d4b95a;
          text-decoration: none;
          font-weight: 650;
        }

        .bulk-order-root .semester-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-bottom: 30px;
        }
        .bulk-order-root .semester-tab {
          padding: 12px 22px;
          border-radius: 12px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          cursor: pointer;
          font-size: 13px;
          font-weight: 700;
          color: var(--muted);
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .bulk-order-root .semester-tab:hover {
          border-color: var(--gold-light);
          background: #fffbed;
          transform: translateY(-2px);
        }
        .bulk-order-root .semester-tab.active {
          background: linear-gradient(135deg, #8b6914, #5c4410);
          color: #fff;
          border-color: #8b6914;
          box-shadow: 0 9px 26px rgba(139, 105, 20, 0.25);
        }

        .bulk-order-root .form-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 22px;
          align-items: flex-end;
        }
        .bulk-order-root .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .bulk-order-root .form-group label {
          font-size: 11px;
          font-weight: 750;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #7d6b45;
        }
        .bulk-order-root .form-group input {
          height: 46px;
          padding: 0 14px;
          border: 1px solid var(--border);
          border-radius: 11px;
          background: var(--card-bg);
          font-size: 14px;
          color: var(--ink);
          min-width: 180px;
        }

        .bulk-order-root .summary-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 20px;
          border-radius: 40px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          font-size: 13px;
          font-weight: 650;
          color: var(--muted);
          margin-left: auto;
        }

        .bulk-order-root .book-grid {
          display: grid;
          gap: 28px;
        }

        .bulk-order-root .subject-section h3 {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--gold);
          margin: 0 0 10px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 8px;
        }

        .bulk-order-root .book-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(226, 212, 184, 0.4);
        }
        .bulk-order-root .book-row .title {
          flex: 1 1 auto;
          font-size: 14px;
          color: var(--ink);
        }
        .bulk-order-root .book-row .qty {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .bulk-order-root .book-row .qty label {
          font-size: 10px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .bulk-order-root .book-row .qty input {
          width: 56px;
          height: 36px;
          text-align: center;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--card-bg);
          font-weight: 650;
          font-size: 14px;
          color: var(--ink);
        }

        .bulk-order-root .empty-semester {
          padding: 60px 20px;
          text-align: center;
          color: var(--muted);
          font-style: italic;
          border: 2px dashed var(--border);
          border-radius: 18px;
        }

        .bulk-order-root .submit-area {
          display: flex;
          justify-content: flex-end;
          margin-top: 32px;
        }
        .bulk-order-root .submit-btn {
          height: 54px;
          padding: 0 38px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #8b6914, #5c4410);
          color: #fff;
          font-size: 15px;
          font-weight: 750;
          letter-spacing: 0.04em;
          cursor: pointer;
          box-shadow: 0 11px 28px rgba(107, 75, 22, 0.3);
          transition: all 0.3s ease;
        }
        .bulk-order-root .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 38px rgba(107, 75, 22, 0.4);
        }

        @media (max-width: 640px) {
          .bulk-order-root .form-row { flex-direction: column; }
          .bulk-order-root .summary-badge { margin-left: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bulk-order-root *, .bulk-order-root *::before, .bulk-order-root *::after {
            animation: none !important; transition: none !important; scroll-behavior: auto !important;
          }
        }
      `}</style>

      <div className="bulk-order-root">
        <div className="container">
          <header className="header">
            <h1>Book Order Form</h1>
            <p>Select a semester below and enter the Required Copies for each book you&apos;d like to order. Only books with a quantity entered will be included in your order.</p>
          </header>

          <div className="contact-banner">
            <div>
              <h3>For queries, contact</h3>
              <p><strong>Vijayam Publications</strong></p>
            </div>
            <div>
              <h3>Phone</h3>
              <p><a href="tel:+918885414000">88854 14000</a></p>
            </div>
            <div>
              <h3>Email</h3>
              <p><a href="mailto:vijayampublicationsonline@gmail.com">vijayampublicationsonline@gmail.com</a></p>
            </div>
            <div>
              <h3>Address</h3>
              <p>#14-7-13, Sambhamurty Road, Hanumanpet, Vijayawada-520003, Andhra Pradesh</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name & Town</label>
                <input placeholder="Your name & town" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Contact No.</label>
                <input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="text" value={date} readOnly />
              </div>
              <div className="summary-badge">
                {selectedCount.books} books &middot; {selectedCount.copies} copies selected
              </div>
            </div>

            <div className="semester-tabs">
              {(Object.keys(SEMESTER_TABS) as SemesterKey[]).map((key) => (
                <button
                  type="button"
                  key={key}
                  className={`semester-tab ${activeSemester === key ? "active" : ""}`}
                  onClick={() => setActiveSemester(key)}
                >
                  {SEMESTER_TABS[key]}
                </button>
              ))}
            </div>

            {books.length === 0 ? (
              <div className="empty-semester">Books for {SEMESTER_TABS[activeSemester]} will be listed soon.</div>
            ) : (
              <div className="book-grid">
                {Object.entries(grouped).map(([subject, entries]) =>
                  entries.length > 0 ? (
                    <div key={subject} className="subject-section">
                      <h3>{subject}</h3>
                      {entries.map((book) => (
                        <div key={book.code} className="book-row">
                          <span className="title">{book.title}</span>
                          <div className="qty">
                            <label>Copies</label>
                            <input
                              type="number"
                              min={0}
                              value={quantities[book.code] || 0}
                              onChange={(e) => handleQty(book.code, e)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null
                )}
              </div>
            )}

            <div className="submit-area">
              <button type="submit" className="submit-btn">
                Submit Order
              </button>
            </div>
          </form>

          {submitted && (
            <p style={{ textAlign: "center", marginTop: 18, color: "#5c5548", fontSize: 13 }}>
              Your order has been shared with Vijayam Publications via WhatsApp.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
