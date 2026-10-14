"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ArrowRight, Check, ChevronDown, FileText, Upload } from "lucide-react";

const bookCategories = [
  "Textbook",
  "Nursing",
  "Clinical",
  "Academic",
  "Research",
  "Professional",
  "Other",
] as const;

type FieldName =
  | "fullName"
  | "email"
  | "phone"
  | "qualification"
  | "designation"
  | "yearsOfExperience"
  | "bookCategory"
  | "bookTitle"
  | "bookDescription"
  | "publishingGoal"
  | "cvFile"
  | "manuscriptFile";

type FormErrors = Partial<Record<FieldName, string>>;

type AuthorApplication = {
  fullName: string;
  email: string;
  phone: string;
  qualification: string;
  designation: string;
  institution: string;
  yearsOfExperience: string;
  bookCategory: string;
  bookTitle: string;
  bookDescription: string;
  publishingGoal: string;
};

const emptyForm: AuthorApplication = {
  fullName: "",
  email: "",
  phone: "",
  qualification: "",
  designation: "",
  institution: "",
  yearsOfExperience: "",
  bookCategory: "",
  bookTitle: "",
  bookDescription: "",
  publishingGoal: "",
};

export default function AuthorPage() {
  const [isDark, setIsDark] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<AuthorApplication>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const [cvFileName, setCvFileName] = useState("");
  const [manuscriptFileName, setManuscriptFileName] = useState("");
  const [draggingCv, setDraggingCv] = useState(false);
  const [draggingManuscript, setDraggingManuscript] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDark(root.classList.contains("dark"));

    const handleThemeChange = (event: Event) => {
      const detail = (event as CustomEvent<{ dark?: boolean }>).detail;
      setIsDark(detail?.dark ?? root.classList.contains("dark"));
    };

    syncTheme();
    window.addEventListener("vp:theme-change", handleThemeChange);

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });

    return () => {
      window.removeEventListener("vp:theme-change", handleThemeChange);
      observer.disconnect();
    };
  }, []);

  const updateField = <K extends keyof AuthorApplication>(field: K, value: AuthorApplication[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (field in errors) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = (formElement: HTMLFormElement) => {
    const nextErrors: FormErrors = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Please enter your full name.";
    if (!form.email.trim()) nextErrors.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Please enter a valid email.";

    if (!form.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    if (!form.qualification.trim()) nextErrors.qualification = "Please enter your qualification.";
    if (!form.designation.trim()) nextErrors.designation = "Please enter your designation.";
    if (!form.yearsOfExperience.trim()) nextErrors.yearsOfExperience = "Please enter years of experience.";
    if (!form.bookCategory) nextErrors.bookCategory = "Please select a book category.";
    if (!form.bookTitle.trim()) nextErrors.bookTitle = "Please enter your book title.";
    if (!form.bookDescription.trim()) nextErrors.bookDescription = "Please enter a brief book description.";
    if (!form.publishingGoal.trim()) nextErrors.publishingGoal = "Please share your publishing goal.";
    if (!cvFileName) nextErrors.cvFile = "Please upload your CV.";
    if (!manuscriptFileName) nextErrors.manuscriptFile = "Please upload your manuscript or sample chapter.";

    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0] as FieldName | undefined;
    if (firstError) {
      requestAnimationFrame(() => formElement.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus());
    }

    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate(event.currentTarget)) return;
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm(emptyForm);
    setErrors({});
    setCvFileName("");
    setManuscriptFileName("");
    setDraggingCv(false);
    setDraggingManuscript(false);
  };

  return (
    <main
      data-theme={isDark ? "dark" : "light"}
      className={`min-h-screen px-3 py-8 sm:px-5 sm:py-10 ${
        isDark ? "bg-[#14120F] text-[#F7F3EA]" : "bg-[#F7F3EA] text-[#24221E]"
      }`}
    >
      <div className="mx-auto w-full max-w-[900px]">
        <div className="author-card">
          {submitted ? (
            <section className="success-state" aria-live="polite">
              <span className="success-icon"><Check size={20} /></span>
              <h1>Application Submitted</h1>
              <p>
                Thank you for sharing your details and manuscript idea with Vijayam Publications.
                Our editorial team will review your submission carefully.
              </p>
              <button type="button" onClick={resetForm} className="submit-btn w-fit">
                Submit Another Application <ArrowRight size={16} />
              </button>
            </section>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <header className="card-header">
                <div className="eyebrow"><span /> Vijayam Publications · Editorial Desk</div>
                <div className="title-row">
                  <h1>Author Application</h1>
                </div>
                <p>
                  Tell us about your work and the book you would like to publish. Every proposal is read by
                  our editorial team and considered with care.
                </p>
                <div className="review-note">
                  <span>01 · Author profile</span>
                  <span>02 · Book proposal</span>
                  <span>03 · Supporting documents</span>
                </div>
              </header>

              <div className="field-grid">
                <InputField label="Full Name" name="fullName" required error={errors.fullName}>
                  <input
                    name="fullName"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={(event) => updateField("fullName", event.target.value)}
                    aria-invalid={!!errors.fullName}
                  />
                </InputField>

                <InputField label="Email" name="email" required error={errors.email}>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    aria-invalid={!!errors.email}
                  />
                </InputField>

                <InputField label="Phone" name="phone" required error={errors.phone}>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    aria-invalid={!!errors.phone}
                  />
                </InputField>

                <InputField label="Qualification" name="qualification" required error={errors.qualification}>
                  <input
                    name="qualification"
                    placeholder="E.g., MSc Nursing"
                    value={form.qualification}
                    onChange={(event) => updateField("qualification", event.target.value)}
                    aria-invalid={!!errors.qualification}
                  />
                </InputField>

                <InputField label="Designation" name="designation" required error={errors.designation}>
                  <input
                    name="designation"
                    placeholder="E.g., Assistant Professor"
                    value={form.designation}
                    onChange={(event) => updateField("designation", event.target.value)}
                    aria-invalid={!!errors.designation}
                  />
                </InputField>

                <InputField label="Institution / College" name="institution">
                  <input
                    name="institution"
                    autoComplete="organization"
                    placeholder="Enter institution or college"
                    value={form.institution}
                    onChange={(event) => updateField("institution", event.target.value)}
                  />
                </InputField>

                <InputField label="Years of Experience" name="yearsOfExperience" required error={errors.yearsOfExperience}>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    min="0"
                    inputMode="numeric"
                    placeholder="E.g., 8"
                    value={form.yearsOfExperience}
                    onChange={(event) => updateField("yearsOfExperience", event.target.value)}
                    aria-invalid={!!errors.yearsOfExperience}
                  />
                </InputField>

                <div className="field-wrap">
                  <PremiumSelect
                    name="bookCategory"
                    label="Book Category"
                    required
                    value={form.bookCategory}
                    error={errors.bookCategory}
                    options={bookCategories}
                    placeholder="Select book category"
                    onChange={(value) => updateField("bookCategory", value)}
                  />
                </div>

                <InputField label="Book Title" name="bookTitle" required full error={errors.bookTitle}>
                  <input
                    name="bookTitle"
                    placeholder="Enter your proposed book title"
                    value={form.bookTitle}
                    onChange={(event) => updateField("bookTitle", event.target.value)}
                    aria-invalid={!!errors.bookTitle}
                  />
                </InputField>

                <InputField label="Book Description" name="bookDescription" required full error={errors.bookDescription}>
                  <textarea
                    name="bookDescription"
                    rows={5}
                    placeholder="Briefly describe your proposed book, its intended readers, and what makes it useful."
                    value={form.bookDescription}
                    onChange={(event) => updateField("bookDescription", event.target.value)}
                    aria-invalid={!!errors.bookDescription}
                  />
                </InputField>

                <InputField label="Publishing Goal" name="publishingGoal" required full error={errors.publishingGoal}>
                  <textarea
                    name="publishingGoal"
                    rows={4}
                    placeholder="Tell us your publishing goal (for example: academic adoption, professional audience, clinical utility)."
                    value={form.publishingGoal}
                    onChange={(event) => updateField("publishingGoal", event.target.value)}
                    aria-invalid={!!errors.publishingGoal}
                  />
                </InputField>

                <div className="field-wrap full">
                  <UploadField
                    name="cvFile"
                    title="Upload CV"
                    helper="PDF · DOC · DOCX · Maximum 5 MB"
                    fileName={cvFileName}
                    dragging={draggingCv}
                    error={errors.cvFile}
                    onDragState={setDraggingCv}
                    onFileChange={(name) => {
                      setCvFileName(name);
                      setErrors((current) => ({ ...current, cvFile: undefined }));
                    }}
                  />
                </div>

                <div className="field-wrap full">
                  <UploadField
                    name="manuscriptFile"
                    title="Upload Manuscript / Sample Chapter"
                    helper="PDF · DOC · DOCX"
                    fileName={manuscriptFileName}
                    dragging={draggingManuscript}
                    error={errors.manuscriptFile}
                    onDragState={setDraggingManuscript}
                    onFileChange={(name) => {
                      setManuscriptFileName(name);
                      setErrors((current) => ({ ...current, manuscriptFile: undefined }));
                    }}
                  />
                </div>
              </div>

              <div className="footer-area">
                <button type="submit" className="submit-btn">
                  Submit Author Application <ArrowRight size={16} />
                </button>
                <p>Your information will be reviewed by the Vijayam Publications editorial team.</p>
              </div>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        main {
          background-color: #f4efe6;
          background-image:
            radial-gradient(circle at 12% 8%, rgba(164,124,69,.10), transparent 25%),
            linear-gradient(rgba(96,73,42,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96,73,42,.035) 1px, transparent 1px);
          background-size: auto, 32px 32px, 32px 32px;
        }
        .author-card {
          position: relative;
          overflow: hidden;
          border: 1px solid #ded4c3;
          border-radius: 20px;
          background: #fffdf8;
          box-shadow: 0 30px 70px rgba(48,38,24,.12), 0 2px 8px rgba(48,38,24,.05);
          padding: clamp(24px, 4vw, 42px);
          animation: modal-enter 240ms cubic-bezier(.22,1,.36,1) both;
        }
        .author-card::before {
          content: "";
          position: absolute;
          inset: 0 0 auto;
          height: 4px;
          background: linear-gradient(90deg, #72512c 0%, #c6a56d 48%, #72512c 100%);
        }
        .card-header {
          margin-bottom: 30px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e5ddcf;
        }
        .eyebrow {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 14px;
          color: #80633d;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .15em;
          text-transform: uppercase;
        }
        .eyebrow span { width: 24px; height: 1px; background: #a47c45; }
        .title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        h1 {
          margin: 0;
          color: #24221e;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(32px, 4.4vw, 44px);
          line-height: 1.06;
          font-weight: 500;
          letter-spacing: -.02em;
        }
        .card-header p {
          margin: 13px 0 0;
          color: #6f695f;
          font-size: 14px;
          line-height: 1.7;
          max-width: 660px;
        }
        .review-note {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 22px;
          margin-top: 20px;
          color: #8a8174;
          font-size: 10px;
          font-weight: 650;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .field-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px 20px;
        }
        .field-wrap.full { grid-column: 1 / -1; }

        .field {
          display: block;
        }
        .field.full { grid-column: 1 / -1; }
        .label {
          display: block;
          margin-bottom: 6px;
          color: #292722;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0;
        }
        .required {
          color: #9b7742;
          margin-left: 4px;
        }

        :global(input), :global(textarea) {
          width: 100%;
          border: 1px solid #d8cebd;
          border-radius: 9px;
          background: #fffefa;
          color: #24221e;
          font-size: 15px;
          line-height: 1.4;
          outline: none;
          box-shadow: inset 0 1px 2px rgba(63,45,23,.025);
          transition: border-color 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
        }
        :global(input) {
          min-height: 50px;
          padding: 0 14px;
        }
        :global(textarea) {
          min-height: 126px;
          padding: 12px 14px;
          resize: vertical;
        }
        :global(textarea[name="publishingGoal"]) { min-height: 108px; }
        :global(input::placeholder), :global(textarea::placeholder) {
          color: #8c877f;
          opacity: 1;
        }
        :global(input:hover), :global(textarea:hover) { border-color: #c3b398; }
        :global(input:focus), :global(textarea:focus) {
          border-color: #9d7743;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(157,119,67,.10);
        }

        .error {
          margin-top: 6px;
          color: #91463b;
          font-size: 12px;
          line-height: 1.35;
        }

        .upload-field { position: relative; }
        .upload-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 7px;
        }
        .upload-label-row .label { margin: 0; }
        .upload-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          min-height: 112px;
          border: 1px solid rgba(155,119,66,.32);
          border-radius: 18px;
          background:
            radial-gradient(circle at 0% 0%, rgba(214,177,112,.18), transparent 38%),
            radial-gradient(circle at 100% 100%, rgba(126,91,45,.08), transparent 44%),
            linear-gradient(145deg, #fffefa 0%, #fff8eb 100%);
          padding: 19px 20px;
          cursor: pointer;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 10px 28px rgba(83,58,25,.08);
          transition: border-color 240ms cubic-bezier(.22,1,.36,1), box-shadow 240ms cubic-bezier(.22,1,.36,1), transform 200ms cubic-bezier(.22,1,.36,1);
        }
        .upload-card::before {
          content: "";
          position: absolute;
          z-index: -1;
          inset: 0;
          background: linear-gradient(110deg, transparent 25%, rgba(255,255,255,.82) 47%, transparent 69%);
          transform: translateX(-120%);
          transition: transform 850ms cubic-bezier(.22,1,.36,1);
          pointer-events: none;
        }
        .upload-card::after {
          content: "";
          position: absolute;
          inset: 7px;
          z-index: -1;
          border: 1px dashed rgba(155,119,66,.23);
          border-radius: 12px;
          pointer-events: none;
          transition: border-color 240ms ease;
        }
        .upload-card:hover::before,
        .upload-card.dragging::before { transform: translateX(120%); }
        .upload-card:hover,
        .upload-card.dragging,
        .upload-card:focus-within {
          border-color: #b18445;
          box-shadow: 0 0 0 4px rgba(177,132,69,.11), 0 22px 44px rgba(90,62,28,.16);
          transform: translateY(-3px);
        }
        .upload-card.dragging { transform: translateY(-3px) scale(1.01); }
        .upload-card:hover::after,
        .upload-card.dragging::after { border-color: rgba(155,119,66,.52); }
        .upload-card.has-file {
          border-color: rgba(81,126,89,.42);
          background:
            radial-gradient(circle at 0% 0%, rgba(96,145,105,.14), transparent 40%),
            linear-gradient(145deg, #fffefa 0%, #f5fbf5 100%);
        }
        .upload-glow {
          position: absolute;
          top: -60px;
          right: -45px;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: rgba(190,145,76,.12);
          filter: blur(18px);
          pointer-events: none;
        }
        .upload-main {
          display: flex;
          gap: 14px;
          min-width: 0;
          align-items: center;
        }
        .upload-icon {
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          border: 1px solid rgba(155,119,66,.28);
          border-radius: 15px;
          color: #8c6635;
          background: linear-gradient(145deg, #fffdf8, #f2dfbd);
          box-shadow: inset 0 1px 0 #fff, 0 8px 20px rgba(91,63,28,.14);
          transition: transform 240ms cubic-bezier(.22,1,.36,1), box-shadow 240ms ease;
        }
        .upload-card:hover .upload-icon,
        .upload-card.dragging .upload-icon {
          transform: translateY(-2px) rotate(-3deg) scale(1.04);
          box-shadow: inset 0 1px 0 #fff, 0 12px 24px rgba(91,63,28,.2);
        }
        .has-file .upload-icon { color: #55765b; background: linear-gradient(145deg, #fbfffb, #dcebdd); }
        .upload-copy { min-width: 0; }
        .upload-kicker {
          display: block;
          margin-bottom: 4px;
          color: #8a6a3e;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
        }
        .upload-copy strong {
          display: block;
          overflow: hidden;
          color: #292722;
          font-size: 15px;
          font-weight: 750;
          line-height: 1.35;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .upload-copy small {
          display: block;
          margin-top: 4px;
          color: #736c61;
          font-size: 12px;
          line-height: 1.4;
        }
        .upload-action {
          position: relative;
          z-index: 1;
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border: 1px solid #8c6635;
          border-radius: 999px;
          background: linear-gradient(180deg, #a47c45 0%, #805b2e 100%);
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .06em;
          text-transform: uppercase;
          white-space: nowrap;
          padding: 10px 14px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.28), 0 7px 16px rgba(94,64,28,.2);
          transition: transform 200ms cubic-bezier(.22,1,.36,1), box-shadow 200ms ease;
        }
        .upload-card:hover .upload-action { transform: translateX(2px); box-shadow: inset 0 1px 0 rgba(255,255,255,.28), 0 10px 22px rgba(94,64,28,.26); }
        .upload-success {
          margin-top: 9px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #4f7056;
          font-size: 11px;
          font-weight: 650;
          letter-spacing: .02em;
        }
        .upload-success span {
          width: 20px;
          height: 20px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          color: #fff;
          background: #638069;
          box-shadow: 0 4px 10px rgba(73,108,80,.22);
        }

        .footer-area {
          margin-top: 24px;
        }
        .submit-btn {
          min-height: 56px;
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 1px solid #694a28;
          border-radius: 9px;
          background: #79572f;
          color: #fffdf8;
          font-size: 14px;
          font-weight: 650;
          letter-spacing: .025em;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 7px 16px rgba(72,48,22,.14);
          transition: background-color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
        }
        .submit-btn svg { transition: transform 180ms ease; }
        .submit-btn:hover {
          background: #684824;
          transform: translateY(-1px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 11px 22px rgba(72,48,22,.19);
        }
        .submit-btn:hover svg { transform: translateX(3px); }
        .footer-area p {
          margin: 12px 0 0;
          color: #6f695f;
          font-size: 12px;
          line-height: 1.5;
          text-align: center;
        }

        .success-state {
          text-align: left;
          display: grid;
          gap: 12px;
          min-height: 260px;
          align-content: center;
        }
        .success-icon {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          border: 1px solid #9b7742;
          color: #58705b;
          background: #f8f3ea;
        }
        .success-state h1 {
          font-size: clamp(26px, 4vw, 34px);
        }
        .success-state p {
          margin: 0;
          color: #6f695f;
          max-width: 640px;
          line-height: 1.65;
          font-size: 14px;
        }

        @keyframes modal-enter {
          from { opacity: 0; transform: scale(.985) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @media (max-width: 700px) {
          .author-card {
            width: calc(100% - 24px);
            margin: 12px auto;
            padding: 20px;
            border-radius: 14px;
          }
          .field-grid { grid-template-columns: 1fr; gap: 18px; }
          .footer-area { margin-top: 22px; }
        }

        :global(.dark) main {
          background-color: #14120f;
          background-image:
            radial-gradient(circle at 12% 8%, rgba(200,170,114,.08), transparent 25%),
            linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
        }
        :global(.dark) .author-card {
          background: #1c1916;
          border-color: rgba(255,255,255,.14);
          box-shadow: 0 24px 54px rgba(0,0,0,.38);
        }
        :global(.dark) h1 { color: #f7f3ea; }
        :global(.dark) .eyebrow { color: #c8aa72; }
        :global(.dark) .review-note { color: #968d80; }
        :global(.dark) .card-header { border-color: rgba(255,255,255,.12); }
        :global(.dark) .card-header p,
        :global(.dark) .footer-area p,
        :global(.dark) .upload-copy small,
        :global(.dark) .close-btn {
          color: #b8b0a3;
        }
        :global(.dark) .label,
        :global(.dark) .upload-copy strong { color: #e5dfd4; }
        :global(.dark) .close-btn,
        :global(.dark) input,
        :global(.dark) textarea,
        :global(.dark) .upload-card,
        :global(.dark) .select-trigger {
          background: #24211d;
          border-color: rgba(255,255,255,.16);
          color: #f7f3ea;
        }
        :global(.dark) .upload-card {
          background:
            radial-gradient(120% 140% at 100% -10%, rgba(200,170,114,.14) 0%, rgba(200,170,114,0) 52%),
            linear-gradient(180deg, #26221d 0%, #221f1b 100%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.03), 0 10px 18px rgba(0,0,0,.25);
        }
        :global(.dark) .upload-action {
          border-color: rgba(200,170,114,.45);
          background: linear-gradient(180deg, rgba(200,170,114,.18) 0%, rgba(200,170,114,.1) 100%);
          color: #e8d4aa;
        }
        :global(.dark) .upload-success {
          border-color: rgba(126,164,134,.45);
          background: rgba(67,97,74,.28);
          color: #cbe1cf;
        }
        :global(.dark) input::placeholder,
        :global(.dark) textarea::placeholder { color: #968f84; }
        :global(.dark) input:focus,
        :global(.dark) textarea:focus,
        :global(.dark) .upload-card:hover,
        :global(.dark) .upload-card.dragging,
        :global(.dark) .premium-select.is-open .select-trigger {
          border-color: #c8aa72;
          box-shadow: 0 0 0 3px rgba(200,170,114,.12);
        }
        :global(.dark) .select-menu {
          background: #24211d;
          border-color: rgba(255,255,255,.16);
          box-shadow: 0 14px 30px rgba(0,0,0,.35);
        }
        :global(.dark) .select-option { color: #e5dfd4; }
        :global(.dark) .select-option:hover,
        :global(.dark) .select-option.is-active,
        :global(.dark) .select-option.is-selected { background: rgba(200,170,114,.1); }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: .01ms !important; transition-duration: .01ms !important; }
        }
      `}</style>
    </main>
  );
}

function InputField({
  label,
  name,
  children,
  required = false,
  full = false,
  error,
}: {
  label: string;
  name: string;
  children: ReactNode;
  required?: boolean;
  full?: boolean;
  error?: string;
}) {
  const errorId = `${name}-error`;

  return (
    <label className={`field ${full ? "full" : ""}`}>
      <span className="label">
        {label}
        {required && <span className="required">*</span>}
      </span>
      {children}
      {error && (
        <small id={errorId} className="error" role="alert">
          {error}
        </small>
      )}
    </label>
  );
}

function UploadField({
  name,
  title,
  helper,
  fileName,
  dragging,
  error,
  onDragState,
  onFileChange,
}: {
  name: string;
  title: string;
  helper: string;
  fileName: string;
  dragging: boolean;
  error?: string;
  onDragState: (dragging: boolean) => void;
  onFileChange: (fileName: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const errorId = `${name}-error`;

  const pickFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onFileChange(file?.name || "");
  };

  return (
    <div className="upload-field">
      <div className="upload-label-row">
        <label className="label" htmlFor={name}>
          {title}<span className="required">*</span>
        </label>
      </div>

      <label
        className={`upload-card ${dragging ? "dragging" : ""} ${fileName ? "has-file" : ""}`}
        onDragEnter={() => onDragState(true)}
        onDragOver={(event) => {
          event.preventDefault();
          onDragState(true);
        }}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) onDragState(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          onFileChange(event.dataTransfer.files?.[0]?.name || "");
          onDragState(false);
        }}
      >
        <span className="upload-main">
          <span className="upload-icon">
            {fileName ? <FileText size={22} /> : <Upload size={22} />}
          </span>
          <span className="upload-copy">
            <span className="upload-kicker">{fileName ? "Ready to submit" : "Add document"}</span>
            <strong>{fileName || "Drop your file here, or browse"}</strong>
            <small>{fileName ? "Attached to your author application" : helper}</small>
          </span>
        </span>
        <span className="upload-action">
          <Upload size={14} />
          <span>{fileName ? "Replace file" : "Browse files"}</span>
        </span>
        <input
          ref={inputRef}
          id={name}
          name={name}
          type="file"
          accept=".pdf,.doc,.docx"
          className="sr-only"
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          onChange={pickFile}
        />
      </label>

      {fileName && (
        <div className="upload-success" role="status">
          <span><Check size={13} /></span>
          Document attached
        </div>
      )}
      {error && (
        <small id={errorId} className="error" role="alert">
          {error}
        </small>
      )}

      <style jsx global>{`
        .upload-field { position: relative; }
        .upload-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 7px;
        }
        .upload-label-row .label { margin: 0; }
        .upload-card {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          min-height: 100px;
          border: 1px solid #d8cebd;
          border-radius: 10px;
          background: #fffdf9;
          padding: 18px 20px;
          cursor: pointer;
          box-shadow: 0 3px 10px rgba(65,49,28,.05);
          transition: border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
        }
        .upload-card::after {
          content: "";
          position: absolute;
          top: 10px;
          bottom: 10px;
          left: 0;
          width: 3px;
          border-radius: 0 2px 2px 0;
          background: #9a7542;
          opacity: .7;
          pointer-events: none;
        }
        .upload-card:hover,
        .upload-card.dragging,
        .upload-card:focus-within {
          border-color: #a98350;
          background: #fffcf7;
          box-shadow: 0 0 0 3px rgba(154,117,66,.08), 0 5px 14px rgba(65,49,28,.07);
        }
        .upload-card.dragging { background: #fbf5ea; }
        .upload-card.has-file {
          border-color: #9eae9f;
          background: #fbfdf9;
        }
        .upload-card.has-file::after { background: #66806b; }
        .upload-main { display: flex; align-items: center; gap: 14px; min-width: 0; }
        .upload-icon {
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          border: 1px solid #ddcfb9;
          border-radius: 8px;
          color: #835f32;
          background: #f7efe2;
          transition: border-color 160ms ease, background-color 160ms ease;
        }
        .upload-card:hover .upload-icon,
        .upload-card.dragging .upload-icon {
          border-color: #c7aa7d;
          background: #f3e7d4;
        }
        .has-file .upload-icon {
          color: #55705a;
          border-color: #c7d5c9;
          background: #edf4ed;
        }
        .upload-copy { min-width: 0; }
        .upload-kicker {
          display: block;
          margin-bottom: 4px;
          color: #8a6a3e;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
        }
        .upload-copy strong {
          display: block;
          overflow: hidden;
          color: #292722;
          font-size: 15px;
          font-weight: 750;
          line-height: 1.35;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .upload-copy small { display: block; margin-top: 4px; color: #736c61; font-size: 12px; line-height: 1.4; }
        .upload-action {
          position: relative;
          z-index: 1;
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border: 1px solid #85643a;
          border-radius: 6px;
          background: #8a683d;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .01em;
          white-space: nowrap;
          padding: 10px 14px;
          box-shadow: 0 1px 2px rgba(76,52,25,.14);
          transition: background-color 160ms ease, border-color 160ms ease;
        }
        .upload-card:hover .upload-action {
          border-color: #704f29;
          background: #79582f;
        }
        .upload-success {
          margin-top: 9px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #4f7056;
          font-size: 11px;
          font-weight: 650;
          letter-spacing: .02em;
        }
        .upload-success span {
          width: 20px;
          height: 20px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          color: #fff;
          background: #638069;
          box-shadow: 0 4px 10px rgba(73,108,80,.22);
        }
        .dark .upload-kicker { color: #d5b77f; }
        .dark .upload-card,
        .dark .upload-card.has-file {
          border-color: rgba(213,183,127,.28);
          background: #25211c;
          box-shadow: 0 7px 18px rgba(0,0,0,.22);
        }
        .dark .upload-card::after { border-color: rgba(213,183,127,.2); }
        .dark .upload-icon,
        .dark .has-file .upload-icon {
          color: #d8b97e;
          border-color: rgba(213,183,127,.28);
          background: #312b23;
          box-shadow: none;
        }
        .dark .upload-copy strong { color: #f2ece2; }
        .dark .upload-copy small { color: #aaa195; }
        .dark .upload-action {
          border-color: #a9824b;
          background: #8f6b3b;
          color: #fff;
          box-shadow: none;
        }
        .dark .upload-card:hover,
        .dark .upload-card.dragging,
        .dark .upload-card:focus-within {
          border-color: #b89457;
          background: #29241e;
          box-shadow: 0 0 0 3px rgba(200,170,114,.08);
        }
        .dark .upload-card.has-file::after { background: #78917c; }
        .dark .upload-success { color: #b9d7bf; }
        @media (max-width: 600px) {
          .upload-card { align-items: flex-start; flex-direction: column; min-height: 0; padding: 18px; }
          .upload-main { width: 100%; }
          .upload-copy { max-width: calc(100% - 66px); }
          .upload-action { justify-content: center; width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .upload-card::before { display: none; }
        }
      `}</style>
    </div>
  );
}

function PremiumSelect({
  name,
  label,
  required = false,
  value,
  options,
  error,
  placeholder,
  onChange,
}: {
  name: string;
  label: string;
  required?: boolean;
  value: string;
  options: readonly string[];
  error?: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(Math.max(0, options.indexOf(value)));
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const listboxId = `${name}-listbox`;
  const errorId = `${name}-error`;

  useEffect(() => {
    if (!open) return;
    const onOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onOutside);
    return () => document.removeEventListener("pointerdown", onOutside);
  }, [open]);

  useEffect(() => {
    if (open) setActiveIndex(Math.max(0, options.indexOf(value)));
  }, [open, options, value]);

  const choose = (index: number) => {
    onChange(options[index]);
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((current) => (current + direction + options.length) % options.length);
    } else if ((event.key === "Enter" || event.key === " ") && open) {
      event.preventDefault();
      choose(activeIndex);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={`premium-select ${open ? "is-open" : ""}`}>
      <label className="label" htmlFor={`${name}-trigger`}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <button
        ref={triggerRef}
        id={`${name}-trigger`}
        name={name}
        type="button"
        className="select-trigger"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={open ? `${name}-option-${activeIndex}` : undefined}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onKeyDown}
      >
        <span>{value || placeholder}</span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div id={listboxId} className="select-menu" role="listbox" aria-label={label}>
          {options.map((option, index) => (
            <button
              key={option}
              id={`${name}-option-${index}`}
              type="button"
              role="option"
              aria-selected={value === option}
              className={`select-option ${activeIndex === index ? "is-active" : ""} ${value === option ? "is-selected" : ""}`}
              onPointerMove={() => setActiveIndex(index)}
              onClick={() => choose(index)}
            >
              <span>{option}</span>
              {value === option && <Check size={14} />}
            </button>
          ))}
        </div>
      )}

      {error && (
        <small id={errorId} className="error" role="alert">
          {error}
        </small>
      )}

      <style jsx>{`
        .premium-select { position: relative; }
        .select-trigger {
          width: 100%;
          min-height: 50px;
          border: 1px solid #ddd7cc;
          border-radius: 8px;
          background: #fffefb;
          padding: 0 14px;
          color: #24221e;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-size: 15px;
          transition: border-color 180ms cubic-bezier(.22,1,.36,1), box-shadow 180ms cubic-bezier(.22,1,.36,1);
        }
        .premium-select.is-open .select-trigger,
        .select-trigger:focus-visible {
          border-color: #b18445;
          box-shadow: 0 0 0 3px rgba(177,132,69,.1);
          outline: none;
        }
        .select-menu {
          position: absolute;
          z-index: 30;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          border: 1px solid #ddd7cc;
          border-radius: 10px;
          background: #fffefb;
          box-shadow: 0 12px 28px rgba(40,32,20,.1);
          padding: 6px;
          animation: menu-open 180ms cubic-bezier(.22,1,.36,1) both;
        }
        .select-option {
          width: 100%;
          min-height: 44px;
          border-radius: 8px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #292722;
          font-size: 14px;
          text-align: left;
          transition: background-color 160ms cubic-bezier(.22,1,.36,1), color 160ms cubic-bezier(.22,1,.36,1);
        }
        .select-option:hover,
        .select-option.is-active { background: rgba(155,119,66,.1); }
        .select-option.is-selected { color: #7f5e32; background: rgba(155,119,66,.13); }
        @keyframes menu-open {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
