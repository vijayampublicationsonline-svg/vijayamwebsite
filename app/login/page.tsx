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
      <span>VIJAYAM</span>
      <small>PUBLICATIONS</small>
    </button>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  if (!open) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M3 3l18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M10.6 10.8a2.2 2.2 0 003.1 3.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M9.9 5.6A10.8 10.8 0 0112 5.4c5.2 0 8.9 3.7 10 6.6a1 1 0 010 .7 12 12 0 01-4.1 5.1M6.1 8.1A12.2 12.2 0 002 12a1 1 0 000 .7c.8 2.1 3.1 4.8 6.4 6.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M2 12.3a1 1 0 010-.6C3.1 8.8 6.8 5 12 5s8.9 3.8 10 6.7a1 1 0 010 .6C20.9 15.2 17.2 19 12 19S3.1 15.2 2 12.3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
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
      <label htmlFor={id}>{label}</label>
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
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <EyeIcon open={visible} />
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
}: {
  children: React.ReactNode;
  navigate: (route: Route) => void;
}) {
  return (
    <main className="auth-page">
      <header className="auth-header">
        <Wordmark navigate={navigate} />
        <button type="button" className="header-link">
          Need help?
        </button>
      </header>

      <div className="auth-shell">
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
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setNotice(
        "Signed in state is ready to connect to your authentication service."
      );
    }, 700);
  };

  return (
    <AuthLayout navigate={navigate}>
      <div className="form-wrap">
        <p className="form-kicker">SIGN IN</p>
        <h2>Welcome back.</h2>
        <p className="form-intro">Continue where you left off.</p>

        <form className="auth-form" onSubmit={submit} noValidate>
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
              <LinkButton
                href="/forgot-password"
                navigate={navigate}
                className="text-link"
              >
                Forgot password?
              </LinkButton>
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

          <SubmitButton loading={loading}>Sign in</SubmitButton>

          {notice && <p className="field-message field-message-success">{notice}</p>}
        </form>

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
      </div>
    </AuthLayout>
  );
}

function RegisterPage({ navigate }: { navigate: (route: Route) => void }) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const [notice, setNotice] = useState("");

  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const score = [hasMinLength, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice("");

    if (!name.trim()) {
      setNotice("Please enter your full name.");
      requestAnimationFrame(() => nameRef.current?.focus());
      return;
    }

    if (!validEmail(email)) {
      setNotice("Please enter a valid email address.");
      requestAnimationFrame(() => emailRef.current?.focus());
      return;
    }

    if (!hasMinLength) {
      setNotice("Please enter at least 8 characters.");
      requestAnimationFrame(() => passwordRef.current?.focus());
      return;
    }

    if (!terms) {
      setNotice("Please accept the terms and privacy policy.");
      return;
    }

    setNotice("Account details are ready to connect to your backend.");
  };

  return (
    <AuthLayout navigate={navigate}>
      <div className="form-wrap">
        <p className="form-kicker">REGISTER</p>
        <h2>Create your account.</h2>
        <p className="form-intro">Keep your books, notes and progress together.</p>

        <form className="auth-form" onSubmit={submit} noValidate>
          <InputField
            id="register-name"
            label="Full name"
            value={name}
            onChange={(value) => {
              setName(value);
              setNotice("");
            }}
            placeholder="Your full name"
            autoComplete="name"
            inputRef={nameRef}
          />

          <InputField
            id="register-email"
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

          <PasswordField
            id="register-password"
            label="Password"
            value={password}
            onChange={(value) => {
              setPassword(value);
              setNotice("");
            }}
            placeholder="Use 8+ characters"
            autoComplete="new-password"
            inputRef={passwordRef}
          />

          <div className="security-panel" aria-live="polite">
            <div className="strength">
              <div className="strength-top">
                <span>Password strength</span>
                <b>
                  {score === 0
                    ? "Not set"
                    : score === 1
                    ? "Weak"
                    : score === 2
                    ? "Fair"
                    : score === 3
                    ? "Good"
                    : "Strong"}
                </b>
              </div>
              <div className="strength-bars">
                {[1, 2, 3, 4].map((n) => (
                  <i key={n} className={n <= score ? "active" : ""} />
                ))}
              </div>
            </div>

            <ul className="password-rules">
              <li className={hasMinLength ? "ok" : ""}>
                <CheckIcon />
                <span>At least 8 characters</span>
              </li>
              <li className={hasUpper ? "ok" : ""}>
                <CheckIcon />
                <span>One uppercase letter</span>
              </li>
              <li className={hasNumber ? "ok" : ""}>
                <CheckIcon />
                <span>One number</span>
              </li>
              <li className={hasSpecial ? "ok" : ""}>
                <CheckIcon />
                <span>One special character</span>
              </li>
            </ul>
          </div>

          <label className="check-row">
            <input
              type="checkbox"
              checked={terms}
              onChange={(event) => setTerms(event.target.checked)}
            />
            <span>I agree to the Terms and Privacy Policy.</span>
          </label>

          <SubmitButton>Create account</SubmitButton>

          {notice && (
            <p
              className={`field-message ${
                notice.includes("ready")
                  ? "field-message-success"
                  : "field-message-error"
              }`}
            >
              {notice}
            </p>
          )}
        </form>

        <p className="switch-row">
          Already have an account?{" "}
          <LinkButton href="/login" navigate={navigate} className="text-link strong">
            Sign in
          </LinkButton>
        </p>
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

    setNotice("Reset request is ready to connect to your email service.");
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
              className={`field-message ${
                notice.includes("ready")
                  ? "field-message-success"
                  : "field-message-error"
              }`}
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