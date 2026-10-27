"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";

type AuthRoute = "/login" | "/register" | "/forgot-password";
type Route = AuthRoute | "/";

const isAuthRoute = (path: string): path is AuthRoute =>
  path === "/login" || path === "/register" || path === "/forgot-password";

function getRoute(): Route {
  if (typeof window === "undefined") return "/";
  const path = window.location.pathname;
  if (path === "/") return "/";
  if (isAuthRoute(path)) return path;
  return "/";
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validMobile(value: string) {
  const normalized = value.trim();
  const digits = normalized.replace(/\D/g, "");
  return /^\+?[0-9\s()-]+$/.test(normalized) && digits.length >= 8 && digits.length <= 15;
}

function useNavigation() {
  const [route, setRoute] = useState<Route>(getRoute);

  useEffect(() => {
    const syncRoute = () => setRoute(getRoute());
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  const navigate = (next: Route) => {
    if (next === "/") {
      window.location.href = "/";
      return;
    }
    window.history.pushState({}, "", next);
    setRoute(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { route, navigate };
}

function LinkButton({
  href,
  navigate,
  children,
  className = "",
}: {
  href: Route;
  navigate: (route: Route) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}

function Wordmark({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <button
      type="button"
      className="wordmark"
      onClick={() => navigate("/")}
      aria-label="Vijayam Publications home"
    >
      <img src="/images/eagle%20logo%20.jpg" alt="Vijayam Publications eagle logo" />
      <span>VIJAYAM</span>
      <small>PUBLICATIONS</small>
    </button>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12.5l4.2 4.1L19 7.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InputField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  error,
  inputRef,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        ref={inputRef}
        id={id}
        name={id}
        value={value}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
      />
      {error && <p className="field-message field-message-error">{error}</p>}
    </div>
  );
}

function PasswordField({
  id,
  value,
  onChange,
  inputRef,
  error,
  label = "Password",
  placeholder = "Enter your password",
  autoComplete = "current-password",
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  error?: string;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="field">
      {label && <label htmlFor={id}>{label}</label>}
      <div className="password-wrap">
        <input
          ref={inputRef}
          id={id}
          name={id}
          value={value}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
        />
        <button
          type="button"
          className="password-toggle"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {visible ? (
              <>
                <path d="M3 3l18 18" />
                <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                <path d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.3 4.3 9 7-.3 1.1-1.1 2.3-2.2 3.4" />
                <path d="M6.2 6.2C4.4 7.4 3.3 9.2 3 12c.5 2 2.2 4.1 4.6 5.5A10 10 0 0012 19c1 0 2-.2 2.9-.5" />
              </>
            ) : (
              <>
                <path d="M2.5 12s3.3-6 9.5-6 9.5 6 9.5 6-3.3 6-9.5 6-9.5-6-9.5-6z" />
                <circle cx="12" cy="12" r="2.5" />
              </>
            )}
          </svg>
        </button>
      </div>
      {error && <p className="field-message field-message-error">{error}</p>}
    </div>
  );
}

function SubmitButton({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <button type="submit" className="submit-button" disabled={loading}>
      {loading ? "Please wait…" : children}
    </button>
  );
}

function AuthLayout({
  children,
  navigate,
  wide = false,
}: {
  children: React.ReactNode;
  navigate: (route: Route) => void;
  wide?: boolean;
}) {
  return (
    <main className="auth-page">
      <header className="auth-header">
        <Wordmark navigate={navigate} />
        <button type="button" className="header-link">
          Need help?
        </button>
      </header>

      <div className={`auth-shell${wide ? " auth-shell-wide" : ""}`}>
        <section className="editorial-side">
          <p className="kicker">WELCOME</p>
          <h1>Welcome back.</h1>
          <p className="intro">Continue where you left off.</p>
          <p className="support-copy">
            Vijayam provides focused learning resources for nursing students,
            designed for consistent study and meaningful progress.
          </p>
          <p className="meta-line">LEARNING • PRACTICE • PROGRESS</p>
          <button
            type="button"
            className="back-link"
            onClick={() => navigate("/")}
          >
            ← Back to home
          </button>
        </section>

        <section className="form-side">{children}</section>
      </div>

      <footer className="auth-footer">
        <span>© {new Date().getFullYear()} Vijayam Publications</span>
        <span>Privacy</span>
        <span>Terms</span>
      </footer>
    </main>
  );
}

function LoginPage({ navigate }: { navigate: (route: Route) => void }) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [notice, setNotice] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmailError("");
    setPasswordError("");
    setNotice("");

    if (!email.trim()) {
      setEmailError("Email address is required.");
      requestAnimationFrame(() => emailRef.current?.focus());
      return;
    }

    if (!validEmail(email)) {
      setEmailError("Please enter a valid email address.");
      requestAnimationFrame(() => emailRef.current?.focus());
      return;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      requestAnimationFrame(() => passwordRef.current?.focus());
      return;
    }

    setNotice(
      "Your details are valid, but sign-in needs a secure authentication service. This page does not send or save your password."
    );
  };

  return (
    <AuthLayout navigate={navigate}>
      <div className="form-wrap">
        <p className="form-kicker">SIGN IN</p>
        <h2>Welcome back.</h2>
        <p className="form-intro">Continue where you left off.</p>

        <form className="auth-form" onSubmit={submit} noValidate autoComplete="off">
          <InputField
            id="login-email"
            label="Email address"
            value={email}
            onChange={(value) => {
              setEmail(value);
              setEmailError("");
              setNotice("");
            }}
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
            error={emailError}
            inputRef={emailRef}
          />

          <div className="field-stack">
            <div className="field-row">
              <label htmlFor="login-password">Password</label>
            </div>
            <PasswordField
              id="login-password"
              value={password}
              onChange={(value) => {
                setPassword(value);
                setPasswordError("");
                setNotice("");
              }}
              error={passwordError}
              inputRef={passwordRef}
              label=""
              autoComplete="new-password"
            />
          </div>

          <label className="check-row">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
            <span>Keep me signed in</span>
          </label>

          <SubmitButton>Sign in</SubmitButton>

          {notice && <p className="field-message field-message-error" role="alert">{notice}</p>}
        </form>

        <nav className="login-links" aria-label="Account options">
          <p className="switch-row">
            New to Vijayam?{" "}
            <LinkButton
              href="/register"
              navigate={navigate}
              className="text-link strong"
            >
              Create an account
            </LinkButton>
          </p>
          <LinkButton
            href="/forgot-password"
            navigate={navigate}
            className="text-link login-forgot-link"
          >
            Forgot password?
          </LinkButton>
        </nav>
      </div>
    </AuthLayout>
  );
}

function RegisterPage({ navigate }: { navigate: (route: Route) => void }) {
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const mobileRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmRef = useRef<HTMLInputElement | null>(null);
  const termsRef = useRef<HTMLInputElement | null>(null);
  const updatesConsentRef = useRef<HTMLInputElement | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [audience, setAudience] = useState("");
  const [referral, setReferral] = useState("");
  const [terms, setTerms] = useState(false);
  const [updatesConsent, setUpdatesConsent] = useState(false);
  const [offers, setOffers] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  const toggleOffer = (value: string) => {
    setOffers((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice("");

    if (!firstName.trim()) {
      setNotice("Please enter your first name.");
      requestAnimationFrame(() => firstNameRef.current?.focus());
      return;
    }
    if (!lastName.trim()) {
      setNotice("Please enter your last name.");
      requestAnimationFrame(() => lastNameRef.current?.focus());
      return;
    }
    if (!validEmail(email)) {
      setNotice("Please enter a valid email address.");
      requestAnimationFrame(() => emailRef.current?.focus());
      return;
    }
    if (!validMobile(mobile)) {
      setNotice("Please enter a valid mobile number with 8–15 digits.");
      requestAnimationFrame(() => mobileRef.current?.focus());
      return;
    }
    if (password.trim().length < 8) {
      setNotice("Please enter a password with at least 8 non-space characters.");
      requestAnimationFrame(() => passwordRef.current?.focus());
      return;
    }
    if (password !== confirmPassword) {
      setNotice("Your passwords do not match.");
      requestAnimationFrame(() => confirmRef.current?.focus());
      return;
    }
    if (!audience) {
      setNotice("Please select your area of study.");
      return;
    }
    if (!terms) {
      setNotice("Please agree to the Terms of Use and Privacy Policy.");
      requestAnimationFrame(() => termsRef.current?.focus());
      return;
    }
    if (!updatesConsent) {
      setNotice("Please agree to essential account, order and payment updates.");
      requestAnimationFrame(() => updatesConsentRef.current?.focus());
      return;
    }

    setNotice(
      "All required details are valid. Account creation still needs a secure server endpoint; this page does not store your password."
    );
  };

  return (
    <AuthLayout navigate={navigate} wide>
      <div className="register-heading">
        <p className="register-breadcrumb">Home <span>/</span> <b>Sign up</b></p>
        <p className="form-kicker">JOIN VIJAYAM</p>
        <h2>Create your account</h2>
        <p className="form-intro">A better study experience starts here. Keep your books, notes and progress together.</p>
      </div>

      <div className="form-wrap register-card">
        <form className="auth-form register-form" onSubmit={submit} noValidate>
          <div className="register-main-grid">
            <div className="register-column">
              <InputField
                id="register-first-name"
                label="First name *"
                value={firstName}
                onChange={(value) => { setFirstName(value); setNotice(""); }}
                placeholder="Enter your first name"
                autoComplete="given-name"
                inputRef={firstNameRef}
              />
              <InputField
                id="register-last-name"
                label="Last name *"
                value={lastName}
                onChange={(value) => { setLastName(value); setNotice(""); }}
                placeholder="Enter your last name"
                autoComplete="family-name"
                inputRef={lastNameRef}
              />
              <InputField
                id="register-email"
                label="Email address *"
                value={email}
                onChange={(value) => { setEmail(value); setNotice(""); }}
                placeholder="Enter your email address"
                type="email"
                autoComplete="email"
                inputRef={emailRef}
              />
              <InputField
                id="register-mobile"
                label="Mobile *"
                value={mobile}
                onChange={(value) => { setMobile(value); setNotice(""); }}
                placeholder="Enter your phone number"
                type="tel"
                autoComplete="tel"
                inputRef={mobileRef}
              />
            </div>

            <div className="register-column register-column-right">
              <PasswordField
                id="register-password"
                label="Password *"
                value={password}
                onChange={(value) => { setPassword(value); setNotice(""); }}
                placeholder="Create a password (8+ characters)"
                autoComplete="new-password"
                inputRef={passwordRef}
              />
              <PasswordField
                id="register-confirm-password"
                label="Confirm password *"
                value={confirmPassword}
                onChange={(value) => { setConfirmPassword(value); setNotice(""); }}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                inputRef={confirmRef}
              />

              <fieldset className="audience-field">
                <legend>We’d like to know more about you *</legend>
                <div className="audience-options">
                  {["Nursing", "Degree", "Vocational", "Bridge Course"].map((option) => (
                    <label key={option}>
                      <input
                        type="radio"
                        name="study-area"
                        value={option}
                        checked={audience === option}
                        onChange={(event) => { setAudience(event.target.value); setNotice(""); }}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>

              <InputField
                id="register-referral"
                label="Referral code"
                value={referral}
                onChange={setReferral}
                placeholder="Enter referral code (optional)"
              />

              <label className="check-row register-check">
                <input ref={termsRef} type="checkbox" checked={terms} onChange={(event) => setTerms(event.target.checked)} />
                <span>I agree to the <a href="#terms">Terms of Use</a> and <a href="#privacy">Privacy Policy</a> *</span>
              </label>
            </div>
          </div>

          <section className="communication-section">
            <h3>Communication preferences</h3>
            <div className="communication-grid">
              <div className="communication-block">
                <label className="check-row">
                  <input ref={updatesConsentRef} type="checkbox" checked={updatesConsent} onChange={(event) => setUpdatesConsent(event.target.checked)} />
                  <span>I agree to receive essential account, order and payment updates. *</span>
                </label>
                <label className="check-row optional-update">
                  <input type="checkbox" checked={offers.includes("WhatsApp updates")} onChange={() => toggleOffer("WhatsApp updates")} />
                  <span>Optional service updates via WhatsApp</span>
                </label>
              </div>
              <div className="communication-block">
                <p>Offers and study resources <span>(optional)</span></p>
                <div className="offer-options">
                  {["Email", "SMS", "WhatsApp"].map((option) => (
                    <label className="check-row" key={option}>
                      <input type="checkbox" checked={offers.includes(option)} onChange={() => toggleOffer(option)} />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="register-submit">
            <SubmitButton>Create account</SubmitButton>
            {notice && (
              <p
                className={`field-message ${notice.includes("All required details are valid") ? "field-message-success" : "field-message-error"}`}
                role={notice.includes("All required details are valid") ? "status" : "alert"}
              >
                {notice}
              </p>
            )}
            <p className="switch-row">
              Already have an account?{" "}
              <LinkButton href="/login" navigate={navigate} className="text-link strong">Sign in</LinkButton>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

function ForgotPasswordPage({ navigate }: { navigate: (route: Route) => void }) {
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validEmail(email)) {
      setNotice("Please enter the email linked to your account.");
      requestAnimationFrame(() => emailRef.current?.focus());
      return;
    }

    setNotice(
      "Your email is valid, but password reset needs a secure email service connected to the app."
    );
  };

  return (
    <AuthLayout navigate={navigate}>
      <div className="form-wrap">
        <p className="form-kicker">RESET</p>
        <h2>Reset your password.</h2>
        <p className="form-intro">
          Enter your account email and we’ll send the next steps.
        </p>

        <form className="auth-form" onSubmit={submit} noValidate>
          <InputField
            id="forgot-email"
            label="Email address"
            value={email}
            onChange={(value) => {
              setEmail(value);
              setNotice("");
            }}
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
            inputRef={emailRef}
          />

          <SubmitButton>Send reset link</SubmitButton>

          {notice && (
            <p
              className="field-message field-message-error"
              role="alert"
            >
              {notice}
            </p>
          )}
        </form>

        <div className="reset-links">
          <LinkButton href="/login" navigate={navigate} className="text-link">
            Back to sign in
          </LinkButton>
          <LinkButton href="/register" navigate={navigate} className="text-link">
            Create account
          </LinkButton>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function Page() {
  const { route, navigate } = useNavigation();

  return (
    <>
      {route === "/register" && <RegisterPage navigate={navigate} />}
      {route === "/forgot-password" && <ForgotPasswordPage navigate={navigate} />}
      {(route === "/" || route === "/login") && <LoginPage navigate={navigate} />}
      <AuthStyles />
    </>
  );
}

function AuthStyles() {
  return (
    <style>{`
      :root { color-scheme: light; }

      * { box-sizing: border-box; }

      html, body {
        margin: 0;
        min-height: 100%;
        background: #F8F4EC;
      }

      body {
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
        color: #1F2220;
      }

      button, input { font: inherit; }

      .auth-page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background:
          radial-gradient(960px 420px at 84% -6%, rgba(199, 170, 124, .15), transparent 64%),
          radial-gradient(760px 380px at -4% 102%, rgba(191, 211, 194, .21), transparent 68%),
          linear-gradient(180deg, #FAF6EF 0%, #F8F4EC 100%);
      }

      .auth-header {
        width: min(1240px, calc(100% - 64px));
        min-height: 76px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #E6DFD2;
      }

      .wordmark {
        border: 0;
        background: transparent;
        padding: 0;
        display: inline-flex;
        flex-direction: column;
        gap: 2px;
        color: #1F2220;
        text-align: left;
        cursor: pointer;
        transition: transform .2s ease;
      }

      .wordmark:hover {
        transform: translateY(-1px);
      }

      .wordmark span {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: .08em;
      }

      .wordmark small {
        font-size: 10px;
        letter-spacing: .18em;
        color: #6B6F67;
      }

      .header-link {
        border: 0;
        background: transparent;
        color: #6B6F67;
        font-size: 14px;
        cursor: pointer;
        transition: color .18s ease;
      }

      .header-link:hover { color: #22463D; }

      .auth-shell {
        width: min(1240px, calc(100% - 64px));
        margin: 0 auto;
        flex: 1;
        display: grid;
        grid-template-columns: 42% 58%;
        gap: 56px;
        align-items: start;
        padding: 52px 0 44px;
      }

      .editorial-side {
        padding-right: 42px;
        border-right: 1px solid #E6DFD2;
        opacity: 0;
        transform: translateY(8px);
        animation: subtleRise .48s ease forwards;
      }

      .kicker {
        margin: 0 0 16px;
        font-size: 11px;
        letter-spacing: .12em;
        color: #6B6F67;
      }

      .editorial-side h1 {
        margin: 0;
        font-size: clamp(40px, 5vw, 50px);
        line-height: 1.05;
        font-weight: 500;
        color: #1F2220;
      }

      .intro {
        margin: 16px 0 0;
        font-size: 16px;
        color: #1F2220;
      }

      .support-copy {
        margin: 14px 0 0;
        max-width: 410px;
        font-size: 14px;
        line-height: 1.6;
        color: #6B6F67;
      }

      .meta-line {
        margin: 26px 0 0;
        font-size: 11px;
        letter-spacing: .12em;
        color: #6B6F67;
      }

      .back-link {
        margin-top: 30px;
        border: 0;
        background: transparent;
        padding: 0;
        color: #6B6F67;
        font-size: 14px;
        cursor: pointer;
        transition: color .18s ease, transform .18s ease;
      }

      .back-link:hover {
        color: #22463D;
        transform: translateX(-2px);
      }

      .form-side {
        display: flex;
        justify-content: center;
      }

      .form-wrap {
        width: min(100%, 442px);
        padding: 22px 22px;
        border: 1px solid #E8DFD1;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.86);
        box-shadow: 0 10px 24px rgba(48, 54, 48, 0.045);
        backdrop-filter: blur(2px);
        opacity: 0;
        transform: translateY(10px);
        animation: subtleRise .5s ease .08s forwards;
        transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease;
      }

      .form-wrap:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 30px rgba(48, 54, 48, 0.065);
        border-color: #DDD3C3;
      }

      .form-wrap::before {
        content: "";
        display: block;
        height: 2px;
        width: 72px;
        border-radius: 999px;
        background: linear-gradient(90deg, #2A584E, #9FB8A7);
        margin-bottom: 16px;
        transform-origin: left center;
        animation: lineGrow .62s ease .14s both;
      }

      .form-kicker {
        margin: 0 0 14px;
        font-size: 11px;
        letter-spacing: .12em;
        color: #6B6F67;
        text-transform: uppercase;
      }

      .form-wrap h2 {
        margin: 0;
        font-size: clamp(36px, 4.2vw, 46px);
        line-height: 1.06;
        font-weight: 500;
        color: #1F2220;
      }

      .form-intro {
        margin: 14px 0 28px;
        font-size: 14px;
        line-height: 1.6;
        color: #6B6F67;
      }

      .auth-form {
        display: grid;
        gap: 16px;
      }

      .field {
        display: grid;
        gap: 8px;
      }

      .field > label,
      .field-row > label {
        font-size: 14px;
        color: #1F2220;
      }

      .field input,
      .password-wrap input {
        width: 100%;
        height: 53px;
        border: 1px solid #DCD7CB;
        border-radius: 8px;
        background: #FFFFFF;
        color: #1F2220;
        font-size: 14px;
        padding: 0 15px;
        outline: none;
        transition: border-color .2s ease, box-shadow .2s ease, background-color .2s ease, transform .2s ease;
      }

      .field input::placeholder,
      .password-wrap input::placeholder {
        color: #8B877E;
      }

      .field input:hover,
      .password-wrap input:hover {
        border-color: #CFC5B1;
        background: #FFFEFC;
      }

      .field input:focus,
      .password-wrap input:focus {
        border-color: #22463D;
        box-shadow: 0 0 0 3px rgba(34, 70, 61, .08);
        transform: translateY(-1px);
      }

      .field input[aria-invalid="true"],
      .password-wrap input[aria-invalid="true"] {
        border-color: #B5534B;
      }

      .field-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      .field-stack .field > label {
        display: none;
      }

      .password-wrap {
        position: relative;
      }

      .password-wrap input { padding-right: 52px; }

      .password-toggle {
        position: absolute;
        right: 9px;
        top: 50%;
        transform: translateY(-50%);
        width: 34px;
        height: 34px;
        border: 0;
        border-radius: 7px;
        background: transparent;
        color: #6B6F67;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: color .18s ease, background-color .18s ease, transform .18s ease;
      }

      .password-toggle svg {
        width: 18px;
        height: 18px;
      }

      .password-toggle:hover {
        color: #22463D;
        background: rgba(34,70,61,.08);
      }

      .password-toggle:active {
        transform: translateY(-50%) scale(.96);
      }

      .check-row {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        color: #6B6F67;
        font-size: 14px;
      }

      .check-row input {
        width: 16px;
        height: 16px;
        accent-color: #22463D;
        transition: transform .16s ease;
      }

      .check-row input:active {
        transform: scale(.92);
      }

      .submit-button {
        width: 100%;
        height: 53px;
        border: 0;
        border-radius: 8px;
        background: #22463D;
        color: #FFFFFF;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color .2s ease, transform .2s ease, box-shadow .2s ease;
      }

      .submit-button:hover:not(:disabled) {
        background: #183A33;
        transform: translateY(-1px);
        box-shadow: 0 7px 16px rgba(34,70,61,.16);
      }

      .submit-button:active:not(:disabled) {
        transform: translateY(0) scale(.992);
        box-shadow: none;
      }

      .submit-button:disabled {
        opacity: .72;
        cursor: wait;
      }

      .security-panel {
        border: 1px solid #E8DFD1;
        border-radius: 8px;
        background: #FEFCF8;
        padding: 12px;
        display: grid;
        gap: 10px;
      }

      .strength {
        display: grid;
        gap: 8px;
      }

      .strength-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
        color: #6B6F67;
      }

      .strength-top b {
        color: #1F2220;
        font-weight: 600;
      }

      .strength-bars {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 5px;
      }

      .strength-bars i {
        height: 4px;
        border-radius: 999px;
        background: #E3DED2;
        transition: background-color .18s ease;
      }

      .strength-bars i.active {
        background: #22463D;
      }

      .password-rules {
        margin: 0;
        padding: 0;
        list-style: none;
        display: grid;
        gap: 7px;
      }

      .password-rules li {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: #73776F;
        transition: color .18s ease;
      }

      .password-rules li svg {
        width: 14px;
        height: 14px;
        color: #A3AAA2;
      }

      .password-rules li.ok {
        color: #2F5F4E;
      }

      .password-rules li.ok svg {
        color: #2F5F4E;
      }

      .field-message {
        margin: 2px 0 0;
        font-size: 13px;
        line-height: 1.45;
        animation: messageIn .2s ease;
      }

      @keyframes messageIn {
        from { opacity: 0; transform: translateY(-2px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes subtleRise {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes lineGrow {
        from { transform: scaleX(.2); opacity: .4; }
        to { transform: scaleX(1); opacity: 1; }
      }

      .field-message-error { color: #B5534B; }
      .field-message-success { color: #3D765B; }

      .text-link {
        color: #6B6F67;
        text-decoration: none;
        font-size: 14px;
        position: relative;
        transition: color .18s ease;
      }

      .text-link::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 1px;
        background: currentColor;
        transform: scaleX(0);
        transform-origin: left center;
        transition: transform .22s ease;
        opacity: .65;
      }

      .text-link:hover {
        color: #22463D;
      }

      .text-link:hover::after {
        transform: scaleX(1);
      }

      .text-link.strong { color: #22463D; }

      .switch-row {
        margin: 20px 0 0;
        font-size: 14px;
        color: #6B6F67;
      }

      .login-links {
        display: grid;
        justify-items: center;
        gap: 10px;
        margin-top: 20px;
        padding-top: 17px;
        border-top: 1px solid var(--eagle-line);
      }
      .login-links .switch-row { margin: 0; }
      .login-forgot-link { font-size: 13px; }

      .reset-links {
        margin-top: 18px;
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
      }

      .auth-footer {
        width: min(1240px, calc(100% - 64px));
        min-height: 56px;
        margin: auto auto 0;
        border-top: 1px solid #E6DFD2;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        color: #6B6F67;
        font-size: 12px;
      }

      @media (max-width: 980px) {
        .auth-shell {
          grid-template-columns: 1fr 1fr;
          gap: 34px;
          padding-top: 34px;
        }

        .editorial-side {
          padding-right: 24px;
        }

        .form-wrap {
          padding: 18px;
        }
      }

      @media (max-width: 760px) {
        .auth-header {
          width: calc(100% - 40px);
          min-height: 72px;
        }

        .header-link { display: none; }

        .auth-shell {
          width: calc(100% - 40px);
          grid-template-columns: 1fr;
          gap: 26px;
          padding: 24px 0 30px;
        }

        .editorial-side {
          border-right: 0;
          border-bottom: 1px solid #E6DFD2;
          padding-right: 0;
          padding-bottom: 20px;
        }

        .editorial-side h1 {
          font-size: clamp(34px, 8vw, 38px);
        }

        .form-wrap {
          width: 100%;
          max-width: 100%;
        }

        .auth-footer {
          width: calc(100% - 40px);
          font-size: 11px;
          min-height: 52px;
        }
      }

      /* Eagle-brand refresh */
      :root {
        --eagle-navy: #14245B;
        --eagle-blue: #0878C9;
        --eagle-cyan: #10B8D7;
        --eagle-red: #E6202A;
        --eagle-gold: #F4C414;
        --eagle-ink: #17234F;
        --eagle-muted: #586584;
        --eagle-line: #D6E3F3;
      }

      html, body { background: #F2F7FC; }
      body { color: var(--eagle-ink); }
      .auth-page {
        background:
          radial-gradient(ellipse at 10% 12%, rgba(16,184,215,.13), transparent 32%),
          radial-gradient(ellipse at 92% 86%, rgba(230,32,42,.08), transparent 30%),
          linear-gradient(135deg, #F5FAFF 0%, #EAF3FC 52%, #FFF9E8 100%);
      }
      .auth-header, .auth-footer { border-color: var(--eagle-line); }
      .wordmark {
        display: grid;
        grid-template-columns: 54px auto;
        grid-template-rows: auto auto;
        column-gap: 11px;
        align-items: center;
      }
      .wordmark img {
        grid-column: 1;
        grid-row: 1 / 3;
        width: 54px;
        height: 54px;
        object-fit: contain;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 4px 14px rgba(20,36,91,.12);
      }
      .wordmark span { color: var(--eagle-navy); font-weight: 800; }
      .wordmark small { color: var(--eagle-blue); font-weight: 700; }
      .header-link, .back-link, .auth-footer, .support-copy,
      .meta-line, .kicker, .form-kicker, .form-intro,
      .switch-row, .check-row { color: var(--eagle-muted); }
      .editorial-side {
        border-color: var(--eagle-line);
        padding-top: 28px;
      }
      .kicker, .form-kicker { color: var(--eagle-red); font-weight: 800; }
      .editorial-side h1, .form-wrap h2 { color: var(--eagle-navy); }
      .editorial-side h1 { font-weight: 750; letter-spacing: -.045em; }
      .intro { color: var(--eagle-blue); font-weight: 650; }
      .meta-line { color: var(--eagle-blue); font-weight: 750; }
      .form-wrap {
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(20,36,91,.12);
        border-radius: 24px;
        background: linear-gradient(150deg, rgba(255,255,255,.98), rgba(247,251,255,.96));
        box-shadow: 0 28px 72px rgba(20,36,91,.16), 0 6px 18px rgba(8,120,201,.06);
      }
      .form-wrap::before {
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, var(--eagle-navy) 0 24%, var(--eagle-blue) 24% 48%, var(--eagle-cyan) 48% 68%, var(--eagle-gold) 68% 84%, var(--eagle-red) 84%);
      }
      .form-wrap:hover {
        border-color: rgba(8,120,201,.3);
        box-shadow: 0 32px 82px rgba(20,36,91,.19), 0 8px 22px rgba(8,120,201,.08);
      }
      .form-kicker {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 7px 11px;
        border: 1px solid rgba(244,196,20,.42);
        border-radius: 999px;
        background: linear-gradient(110deg, rgba(244,196,20,.14), rgba(16,184,215,.08));
        letter-spacing: .14em;
      }
      .form-wrap h2 { letter-spacing: -.04em; }
      .form-intro { color: #65718D; }
      .field input, .password-wrap input {
        background: linear-gradient(180deg, #FFFFFF, #FBFDFF);
        box-shadow: inset 0 1px 2px rgba(20,36,91,.025);
      }
      .field input:hover, .password-wrap input:hover {
        border-color: rgba(8,120,201,.45);
      }
      .field > label, .field-row > label { color: var(--eagle-navy); font-weight: 650; }
      .field input, .password-wrap input {
        border-color: #C9D8EB;
        border-radius: 10px;
        color: var(--eagle-ink);
      }
      .field input:focus, .password-wrap input:focus {
        border-color: var(--eagle-blue);
        box-shadow: 0 0 0 4px rgba(8,120,201,.12);
      }
      .field input[aria-invalid="true"], .password-wrap input[aria-invalid="true"] { border-color: var(--eagle-red); }
      .text-link, .text-link.strong { color: var(--eagle-blue); font-weight: 650; }
      .text-link:hover, .header-link:hover, .back-link:hover, .password-toggle:hover { color: var(--eagle-red); }
      .password-toggle:hover { background: rgba(16,184,215,.12); }
      .check-row input { accent-color: var(--eagle-blue); }
      .submit-button {
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(244,196,20,.35);
        border-radius: 11px;
        background: linear-gradient(110deg, var(--eagle-navy) 0%, #173E83 56%, var(--eagle-blue) 100%);
        box-shadow: 0 10px 22px rgba(20,36,91,.2), inset 0 1px 0 rgba(255,255,255,.18);
        letter-spacing: .025em;
      }
      .submit-button:hover:not(:disabled) {
        background: linear-gradient(110deg, #101C4A 0%, #12336F 56%, #0565AC 100%);
        box-shadow: 0 13px 26px rgba(20,36,91,.25), 0 0 0 3px rgba(244,196,20,.12);
      }
      .submit-button:focus-visible, .password-toggle:focus-visible, .text-link:focus-visible {
        outline: 3px solid rgba(244,196,20,.75);
        outline-offset: 3px;
      }
      .strength-top b, .password-rules li.ok, .password-rules li.ok svg { color: var(--eagle-blue); }
      .strength-bars i.active { background: linear-gradient(90deg, var(--eagle-cyan), var(--eagle-blue)); }
      .security-panel { border-color: var(--eagle-line); background: #F7FBFF; }
      .field-message-success { color: #087B69; }
      .field-message-error { color: var(--eagle-red); }

      @media (max-width: 760px) {
        .editorial-side { padding-top: 0; }
        .wordmark { grid-template-columns: 46px auto; }
        .wordmark img { width: 46px; height: 46px; }
      }

      /* Wide, editorial registration form inspired by the reference layout */
      .auth-shell-wide {
        display: block;
        padding-top: 34px;
      }
      .auth-shell-wide .editorial-side { display: none; }
      .auth-shell-wide .form-side { display: block; }
      .register-heading { margin: 0 auto 22px; max-width: 1240px; }
      .register-breadcrumb {
        margin: 0 0 22px;
        color: var(--eagle-muted);
        font-size: 14px;
      }
      .register-breadcrumb span { margin: 0 10px; color: #A8B6CA; }
      .register-breadcrumb b { color: var(--eagle-navy); }
      .register-heading .form-kicker { margin-bottom: 12px; }
      .register-heading h2 {
        margin: 0;
        color: var(--eagle-navy);
        font-size: clamp(34px, 4vw, 46px);
        font-weight: 650;
        letter-spacing: -.045em;
      }
      .register-heading .form-intro { margin: 9px 0 0; }
      .register-card {
        width: 100%;
        max-width: none;
        padding: 34px 40px;
        border-color: rgba(20,36,91,.14);
        border-radius: 18px;
        background: linear-gradient(140deg, rgba(241,246,252,.98), rgba(249,251,254,.98) 58%, rgba(255,250,235,.76));
        box-shadow: 0 24px 60px rgba(20,36,91,.12), 0 5px 18px rgba(8,120,201,.06);
      }
      .register-card::before { margin-bottom: 28px; }
      .register-main-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: clamp(28px, 5vw, 72px);
      }
      .register-column { display: grid; align-content: start; gap: 18px; }
      .register-column-right {
        border-left: 1px solid #B9C9DD;
        padding-left: clamp(28px, 5vw, 72px);
      }
      .register-card .field { gap: 8px; }
      .register-card .field input,
      .register-card .password-wrap input { height: 48px; }
      .register-card .field > label { font-size: 15px; }
      .audience-field {
        min-width: 0;
        margin: 0;
        padding: 0;
        border: 0;
      }
      .audience-field legend {
        margin-bottom: 11px;
        color: var(--eagle-navy);
        font-size: 15px;
        font-weight: 650;
      }
      .audience-options { display: flex; flex-wrap: wrap; gap: 10px 15px; }
      .audience-options label {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: #3E4A67;
        font-size: 14px;
        cursor: pointer;
      }
      .audience-options input {
        width: 16px;
        height: 16px;
        margin: 0;
        accent-color: var(--eagle-blue);
      }
      .register-check { align-items: flex-start; line-height: 1.5; }
      .register-check input { flex: 0 0 16px; }
      .register-check a { color: var(--eagle-blue); text-decoration: none; font-weight: 650; }
      .register-check a:hover { color: var(--eagle-red); text-decoration: underline; }
      .communication-section {
        margin-top: 24px;
        padding-top: 20px;
        border-top: 1px solid #CFD9E6;
      }
      .communication-section h3 {
        margin: 0 0 14px;
        color: var(--eagle-navy);
        font-size: 16px;
        font-weight: 700;
      }
      .communication-grid { display: grid; grid-template-columns: 1fr 1fr; }
      .communication-block { padding-right: 34px; }
      .communication-block + .communication-block {
        padding: 0 0 0 42px;
        border-left: 1px solid #B9C9DD;
      }
      .communication-block p {
        margin: 0 0 12px;
        color: #3E4A67;
        font-size: 14px;
      }
      .communication-block p span { color: var(--eagle-muted); }
      .communication-block .check-row { align-items: flex-start; font-size: 13px; line-height: 1.5; }
      .communication-block .check-row input { flex: 0 0 16px; margin-top: 1px; }
      .optional-update { margin-top: 13px; }
      .offer-options { display: flex; flex-wrap: wrap; gap: 12px; }
      .offer-options .check-row { align-items: center; }
      .register-submit { width: min(100%, 440px); margin: 30px auto 0; text-align: center; }
      .register-submit .submit-button { min-height: 54px; }
      .register-submit .switch-row { margin-top: 17px; }
      .wordmark img {
        width: 62px;
        height: 62px;
        border: 2px solid rgba(244,196,20,.6);
        box-shadow: 0 5px 18px rgba(20,36,91,.17), 0 0 0 4px rgba(16,184,215,.08);
      }
      .wordmark { grid-template-columns: 62px auto; }

      @media (max-width: 760px) {
        .wordmark { grid-template-columns: 46px auto; }
        .wordmark img { width: 46px; height: 46px; }
        .auth-shell-wide { padding-top: 24px; }
        .register-heading { margin-bottom: 18px; }
        .register-breadcrumb { margin-bottom: 16px; }
        .register-card { padding: 24px 20px; }
        .register-card::before { margin-bottom: 22px; }
        .register-main-grid { grid-template-columns: 1fr; gap: 20px; }
        .register-column-right { border-left: 0; border-top: 1px solid #B9C9DD; padding: 22px 0 0; }
        .communication-grid { grid-template-columns: 1fr; gap: 18px; }
        .communication-block { padding: 0; }
        .communication-block + .communication-block { border-left: 0; border-top: 1px solid #B9C9DD; padding: 18px 0 0; }
      }

      /* Consistent eagle identity across sign-in, registration, and password reset */
      .auth-header { min-height: 106px; }
      .wordmark { grid-template-columns: 88px auto; column-gap: 16px; }
      .wordmark img {
        width: 88px;
        height: 88px;
        border: 3px solid var(--eagle-gold);
        box-shadow: 0 0 0 5px rgba(16,184,215,.16), 0 10px 26px rgba(20,36,91,.22);
      }
      .wordmark span,
      .wordmark small {
        font-family: Georgia, "Times New Roman", serif;
      }
      .wordmark span { font-size: 19px; letter-spacing: .1em; }
      .wordmark small { font-size: 11px; letter-spacing: .2em; }
      .brand-emblem {
        width: fit-content;
        display: grid;
        justify-items: center;
        gap: 5px;
        margin: 0 0 30px;
        padding: 17px 22px 15px;
        border: 1px solid rgba(244,196,20,.48);
        border-radius: 22px;
        background: linear-gradient(145deg, rgba(255,255,255,.94), rgba(226,244,252,.86));
        box-shadow: 0 16px 38px rgba(20,36,91,.13), inset 0 1px 0 #fff;
      }
      .brand-emblem img {
        width: 116px;
        height: 116px;
        object-fit: contain;
        border: 4px solid #fff;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 0 0 3px var(--eagle-gold), 0 0 0 8px rgba(16,184,215,.18), 0 12px 28px rgba(20,36,91,.2);
      }
      .brand-emblem span {
        margin-top: 9px;
        color: var(--eagle-navy);
        font-size: 19px;
        font-weight: 850;
        letter-spacing: .13em;
      }
      .brand-emblem small {
        color: var(--eagle-blue);
        font-size: 10px;
        font-weight: 750;
        letter-spacing: .24em;
      }
      .editorial-side { border-color: rgba(8,120,201,.22); }
      .register-heading .form-kicker { color: var(--eagle-red); }
      .audience-options label {
        padding: 9px 12px;
        border: 1px solid #CFDDF0;
        border-radius: 999px;
        background: rgba(255,255,255,.78);
        transition: border-color .18s ease, background .18s ease, box-shadow .18s ease;
      }
      .audience-options label:has(input:checked) {
        border-color: var(--eagle-blue);
        background: linear-gradient(110deg, rgba(16,184,215,.13), rgba(244,196,20,.15));
        box-shadow: 0 3px 12px rgba(8,120,201,.1);
      }
      @media (max-width: 760px) {
        .auth-header { min-height: 78px; }
        .wordmark { grid-template-columns: 56px auto; column-gap: 11px; }
        .wordmark img { width: 56px; height: 56px; }
        .wordmark span { font-size: 16px; }
        .brand-emblem { margin-bottom: 22px; padding: 14px 18px 12px; }
        .brand-emblem img { width: 92px; height: 92px; }
      }

      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          transition: none !important;
          animation: none !important;
          scroll-behavior: auto !important;
        }
      }
    `}</style>
  );
}