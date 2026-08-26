"use client";

import React, { useEffect, useRef, useState } from "react";

type AuthRoute = "/login" | "/register" | "/forgot-password";
type Route = AuthRoute | "/";
type IconName =
  | "arrowLeft"
  | "arrowRight"
  | "mail"
  | "lock"
  | "eye"
  | "eyeOff"
  | "key"
  | "shield"
  | "check"
  | "user"
  | "spark";

const isAuthRoute = (path: string): path is AuthRoute =>
  path === "/login" || path === "/register" || path === "/forgot-password";

const getCurrentRoute = (): Route => {
  if (typeof window === "undefined") return "/";
  const path = window.location.pathname;
  if (path === "/") return "/";
  return isAuthRoute(path) ? path : "/";
};

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  return (
    <svg {...p}>
      {name === "arrowLeft" && (
        <>
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </>
      )}
      {name === "arrowRight" && (
        <>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </>
      )}
      {name === "mail" && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m4 7 8 6 8-6" />
        </>
      )}
      {name === "lock" && (
        <>
          <rect x="5" y="10" width="14" height="10" rx="2.5" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          <path d="M12 14v2" />
        </>
      )}
      {name === "eye" && (
        <>
          <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
          <circle cx="12" cy="12" r="2.7" />
        </>
      )}
      {name === "eyeOff" && (
        <>
          <path d="m3 3 18 18" />
          <path d="M10.6 5.2A10.5 10.5 0 0 1 12 5c6 0 9.5 7 9.5 7a15 15 0 0 1-3.1 4.1" />
          <path d="M6.4 6.5C3.9 8.2 2.5 12 2.5 12s3.5 7 9.5 7c1.7 0 3.2-.4 4.5-1.1" />
          <path d="M10.1 10.1a2.7 2.7 0 0 0 3.8 3.8" />
        </>
      )}
      {name === "key" && (
        <>
          <circle cx="8" cy="15" r="4" />
          <path d="m11 12 9-9" />
          <path d="m16 7 2 2" />
          <path d="m18 5 2 2" />
        </>
      )}
      {name === "shield" && (
        <>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          <path d="m9 12 2 2 4-5" />
        </>
      )}
      {name === "check" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12.2 2.2 2.2 4.8-5" />
        </>
      )}
      {name === "user" && (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
        </>
      )}
      {name === "spark" && (
        <>
          <path d="M12 2v5" />
          <path d="M12 17v5" />
          <path d="M4.9 4.9 8.4 8.4" />
          <path d="m15.6 15.6 3.5 3.5" />
          <path d="M2 12h5" />
          <path d="M17 12h5" />
          <path d="m4.9 19.1 3.5-3.5" />
          <path d="m15.6 8.4 3.5-3.5" />
        </>
      )}
    </svg>
  );
}

function useNavigation() {
  const [route, setRoute] = useState<Route>(getCurrentRoute);

  useEffect(() => {
    const sync = () => setRoute(getCurrentRoute());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const navigate = (path: Route) => {
    window.history.pushState({}, "", path);
    setRoute(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { route, navigate };
}

function AuthLink({
  href,
  children,
  navigate,
  className = "auth-link",
}: {
  href: Route;
  children: React.ReactNode;
  navigate: (path: Route) => void;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}

function AuthBackground({ tone }: { tone: "login" | "register" | "forgot" }) {
  return (
    <div className={`auth-background bg-${tone}`} aria-hidden="true">
      <div className="auth-grid" />
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="auth-glow glow-a" />
      <div className="auth-glow glow-b" />
      <div className="auth-orbits">
        <div className="ring ring-a">
          <span />
        </div>
        <div className="ring ring-b" />
        <div className="ring ring-c" />
        <div className="ring-pulse" />
      </div>
      <div className="particles">
        {Array.from({ length: 14 }, (_, i) => (
          <i key={i} className={`auth-particle p${i + 1}`} />
        ))}
      </div>
      <div className="vignette" />
    </div>
  );
}

function PremiumAuthShell({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "login" | "register" | "forgot";
}) {
  return (
    <main className="vp-auth-scene">
      <AuthStyles />
      <AuthBackground tone={tone} />

      <a href="/" className="back-home" aria-label="Back to Home">
        <Icon name="arrowLeft" size={16} /> Back to Home
      </a>

      <section className="auth-stage">{children}</section>
      <p className="auth-caption">
        VIJAYAM PUBLICATIONS · SIGNATURE DIGITAL ENTRANCE
      </p>
    </main>
  );
}

function AuthCard({
  icon,
  badge,
  heading,
  text,
  children,
}: {
  icon: IconName;
  badge: string;
  heading: React.ReactNode;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <article className="auth-card">
      <span className="card-reflection" aria-hidden="true" />
      <span className="card-core" aria-hidden="true" />

      <header className="auth-card-top auth-enter">
        <div className="brand-icon-wrap">
          <span className="brand-glow" />
          <span className="brand-highlight" />
          <div className="brand-icon">
            <Icon name={icon} size={24} />
          </div>
        </div>
        <div className="secure-badge">
          <Icon name="shield" size={12} />
          {badge}
        </div>
      </header>

      <div className="auth-headline auth-enter">
        <p className="auth-eyebrow">
          <span />
          VIJAYAM PUBLICATIONS
        </p>
        <h1>{heading}</h1>
        <p className="auth-copy">{text}</p>
      </div>

      {children}

      <footer className="auth-footer auth-enter">
        <Icon name="spark" size={11} /> Learn. Grow. Move Forward.
      </footer>
    </article>
  );
}

function AuthInput({
  id,
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  error,
  valid,
  messageId,
  inputRef,
}: {
  id: string;
  label: string;
  icon: IconName;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  error?: boolean;
  valid?: boolean;
  messageId?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="auth-field auth-enter">
      <label htmlFor={id}>{label}</label>
      <div className={`input-shell ${error ? "error" : ""} ${valid ? "valid" : ""}`}>
        <span className="input-icon">
          <Icon name={icon} size={18} />
        </span>
        <input
          ref={inputRef}
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? messageId : undefined}
        />
      </div>
    </div>
  );
}

function PasswordInput({
  id,
  label,
  value,
  onChange,
  error,
  valid,
  messageId,
  inputRef,
  autoComplete = "current-password",
  placeholder = "Enter your password",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  valid?: boolean;
  messageId?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  autoComplete?: string;
  placeholder?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="auth-field auth-enter">
      <label htmlFor={id}>{label}</label>
      <div className={`input-shell ${error ? "error" : ""} ${valid ? "valid" : ""}`}>
        <span className="input-icon">
          <Icon name="lock" size={18} />
        </span>
        <input
          ref={inputRef}
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? messageId : undefined}
        />
        <button
          type="button"
          className="eye-button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <Icon name={visible ? "eyeOff" : "eye"} size={17} />
        </button>
      </div>
    </div>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="primary-auth-button auth-enter" type="submit">
      <span>{children}</span>
      <Icon name="arrowRight" size={16} />
      <i />
      <b />
    </button>
  );
}

function AuthMessage({
  id,
  message,
  success,
}: {
  id: string;
  message: string;
  success?: boolean;
}) {
  if (!message) return null;

  return (
    <p id={id} className={`auth-message ${success ? "success" : ""}`} role="status">
      {success && <Icon name="check" size={14} />}
      {message}
    </p>
  );
}

function LoginPage({ navigate }: { navigate: (path: Route) => void }) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);

    const next = {
      email: !email.trim() || !isValidEmail(email),
      password: !password.trim(),
    };

    setErrors(next);

    if (next.email || next.password) {
      setMessage(
        !email.trim() && !password.trim()
          ? "Enter your email and password to continue."
          : next.email
            ? "Use a valid email address to continue."
            : "Enter your password to continue."
      );
      requestAnimationFrame(() =>
        next.email ? emailRef.current?.focus() : passwordRef.current?.focus()
      );
      return;
    }

    setMessage("Welcome back. Your Vijayam journey continues.");
    setSuccess(true);
  };

  return (
    <PremiumAuthShell tone="login">
      <AuthCard
        icon="key"
        badge="Secure Access"
        heading={
          <>
            Welcome
            <br />
            back.
          </>
        }
        text="Pick up where you left off. Your Vijayam experience is waiting."
      >
        <form className="auth-form" onSubmit={submitLogin} noValidate>
          <AuthInput
            id="login-email"
            label="Email address"
            icon="mail"
            value={email}
            onChange={(v) => {
              setEmail(v);
              setErrors((c) => ({ ...c, email: false }));
            }}
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
            error={errors.email}
            valid={success}
            messageId="login-message"
            inputRef={emailRef}
          />

          <PasswordInput
            id="login-password"
            label="Password"
            value={password}
            onChange={(v) => {
              setPassword(v);
              setErrors((c) => ({ ...c, password: false }));
            }}
            error={errors.password}
            valid={success}
            messageId="login-message"
            inputRef={passwordRef}
          />

          <div className="auth-row auth-enter">
            <label className="remember-control">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>

            <AuthLink href="/forgot-password" navigate={navigate}>
              Forgot password?
            </AuthLink>
          </div>

          <PrimaryButton>Sign In</PrimaryButton>
        </form>

        <AuthMessage id="login-message" message={message} success={success} />

        <div className="auth-bottom auth-enter">
          <span>New here?</span>
          <AuthLink href="/register" navigate={navigate}>
            Create your account
          </AuthLink>
        </div>
      </AuthCard>
    </PremiumAuthShell>
  );
}

function RegisterPage({ navigate }: { navigate: (path: Route) => void }) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    password: false,
    terms: false,
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const submitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);

    const next = {
      fullName: !fullName.trim(),
      email: !email.trim() || !isValidEmail(email),
      password: password.trim().length < 6,
      terms: !terms,
    };

    setErrors(next);

    if (Object.values(next).some(Boolean)) {
      setMessage(
        next.terms
          ? "Agree to the terms and privacy policy to continue."
          : next.password
            ? "Create a password with at least 6 characters."
            : "Complete the required details to create your Vijayam account."
      );

      requestAnimationFrame(() => {
        if (next.fullName) nameRef.current?.focus();
        else if (next.email) emailRef.current?.focus();
        else if (next.password) passwordRef.current?.focus();
      });

      return;
    }

    setSuccess(true);
    setMessage("Your Vijayam account is ready to connect to authentication.");
  };

  return (
    <PremiumAuthShell tone="register">
      <AuthCard
        icon="user"
        badge="Student Account"
        heading={
          <>
            Create your
            <br />
            account.
          </>
        }
        text="One account for your books, learning and everything Vijayam."
      >
        <form className="auth-form" onSubmit={submitRegister} noValidate>
          <AuthInput
            id="register-name"
            label="Full name"
            icon="user"
            value={fullName}
            onChange={(v) => {
              setFullName(v);
              setErrors((c) => ({ ...c, fullName: false }));
            }}
            placeholder="Your full name"
            autoComplete="name"
            error={errors.fullName}
            valid={success}
            messageId="register-message"
            inputRef={nameRef}
          />

          <AuthInput
            id="register-email"
            label="Email address"
            icon="mail"
            value={email}
            onChange={(v) => {
              setEmail(v);
              setErrors((c) => ({ ...c, email: false }));
            }}
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
            error={errors.email}
            valid={success}
            messageId="register-message"
            inputRef={emailRef}
          />

          <PasswordInput
            id="register-password"
            label="Create password"
            value={password}
            onChange={(v) => {
              setPassword(v);
              setErrors((c) => ({ ...c, password: false }));
            }}
            placeholder="Create password"
            autoComplete="new-password"
            error={errors.password}
            valid={success}
            messageId="register-message"
            inputRef={passwordRef}
          />

          <label className={`terms-control auth-enter ${errors.terms ? "terms-error" : ""}`}>
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => {
                setTerms(e.target.checked);
                setErrors((c) => ({ ...c, terms: false }));
              }}
            />
            I agree to the terms and privacy policy
          </label>

          <PrimaryButton>Create Account</PrimaryButton>
        </form>

        <AuthMessage id="register-message" message={message} success={success} />

        <div className="auth-bottom auth-enter">
          <span>Already have an account?</span>
          <AuthLink href="/login" navigate={navigate}>
            Sign in
          </AuthLink>
        </div>
      </AuthCard>
    </PremiumAuthShell>
  );
}

function ForgotPasswordPage({ navigate }: { navigate: (path: Route) => void }) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const submitReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);

    if (!email.trim() || !isValidEmail(email)) {
      setError(true);
      setMessage("Enter a valid account email to prepare reset access.");
      requestAnimationFrame(() => emailRef.current?.focus());
      return;
    }

    setError(false);
    setSuccess(true);
    setMessage("Reset instructions are ready. Connect this action to your backend email service.");
  };

  return (
    <PremiumAuthShell tone="forgot">
      <AuthCard
        icon="lock"
        badge="Access Recovery"
        heading={
          <>
            Reset your
            <br />
            access.
          </>
        }
        text="A secure reset link will help you get back in."
      >
        <form className="auth-form" onSubmit={submitReset} noValidate>
          <AuthInput
            id="forgot-email"
            label="Account email"
            icon="mail"
            value={email}
            onChange={(v) => {
              setEmail(v);
              setError(false);
            }}
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
            error={error}
            valid={success}
            messageId="forgot-message"
            inputRef={emailRef}
          />

          <PrimaryButton>Send Reset Link</PrimaryButton>
        </form>

        <AuthMessage id="forgot-message" message={message} success={success} />

        <div className="auth-bottom stacked auth-enter">
          <span>
            Remembered your password?{" "}
            <AuthLink href="/login" navigate={navigate}>
              Back to Sign In
            </AuthLink>
          </span>
          <AuthLink href="/register" navigate={navigate}>
            Create a new account
          </AuthLink>
        </div>
      </AuthCard>
    </PremiumAuthShell>
  );
}

export default function Page() {
  const { route, navigate } = useNavigation();

  if (route === "/" || route === "/login") return <LoginPage navigate={navigate} />;
  if (route === "/register") return <RegisterPage navigate={navigate} />;
  if (route === "/forgot-password") return <ForgotPasswordPage navigate={navigate} />;

  return <LoginPage navigate={navigate} />;
}

function AuthStyles() {
  return (
    <style>{`
      :root { color-scheme: dark; }
      * { box-sizing: border-box; }
      html, body { margin: 0; min-height: 100%; background: #050505; }
      body { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      button, input { font: inherit; }
      a, button, input, label { -webkit-tap-highlight-color: transparent; }

      .vp-auth-scene {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 78px 20px 72px;
        background:
          radial-gradient(circle at 50% 42%, rgba(217,171,81,.13), transparent 26%),
          radial-gradient(circle at 18% 16%, rgba(124,74,11,.25), transparent 34%),
          radial-gradient(circle at 82% 86%, rgba(93,55,8,.24), transparent 32%),
          linear-gradient(135deg, #050505 0%, #0A0805 48%, #030303 100%);
      }

      .auth-background, .auth-background * { pointer-events: none; }
      .auth-background { position: absolute; inset: 0; z-index: -1; overflow: hidden; }

      .auth-grid {
        position: absolute;
        inset: -20%;
        opacity: .18;
        background-image:
          linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
        background-size: 72px 72px;
        mask-image: radial-gradient(ellipse at center, black 10%, transparent 72%);
        animation: gridDrift 20s linear infinite;
      }

      .aurora {
        position: absolute;
        width: 70vw;
        height: 22vh;
        border-radius: 999px;
        filter: blur(34px);
        opacity: .16;
        background: linear-gradient(90deg, transparent, rgba(217,171,81,.7), rgba(243,217,155,.25), transparent);
      }

      .aurora-a { left: -18%; top: 18%; animation: auroraMoveA 14s ease-in-out infinite; }
      .aurora-b { right: -26%; bottom: 15%; opacity: .1; animation: auroraMoveB 17s ease-in-out infinite; }

      .auth-glow { position: absolute; border-radius: 999px; filter: blur(4px); }
      .glow-a {
        width: 520px;
        height: 520px;
        left: calc(50% - 620px);
        top: 9%;
        background: radial-gradient(circle, rgba(217,171,81,.18), transparent 68%);
        animation: glowA 8s ease-in-out infinite;
      }

      .glow-b {
        width: 580px;
        height: 580px;
        right: calc(50% - 660px);
        bottom: -12%;
        background: radial-gradient(circle, rgba(124,76,18,.18), transparent 68%);
        animation: glowB 10s ease-in-out infinite;
      }

      .auth-orbits {
        position: absolute;
        left: 50%;
        top: 50%;
        width: min(780px, 94vw);
        aspect-ratio: 1;
        transform: translate(-50%, -50%);
      }

      .ring { position: absolute; border-radius: 50%; border: 1px solid rgba(217,171,81,.075); }
      .ring-a { inset: 0; animation: orbitClockwise 34s linear infinite; }
      .ring-b { inset: 15%; border-color: rgba(243,217,155,.06); animation: orbitCounter 46s linear infinite; }
      .ring-c { inset: 29%; border-style: dashed; border-color: rgba(217,171,81,.05); animation: orbitClockwise 58s linear infinite; }

      .ring-a span {
        position: absolute;
        left: 50%;
        top: -4px;
        width: 7px;
        height: 7px;
        border-radius: 999px;
        background: #E8BD61;
        box-shadow: 0 0 12px rgba(232,189,97,.92), 0 0 34px rgba(232,189,97,.38);
      }

      .ring-pulse {
        position: absolute;
        inset: 34%;
        border-radius: 999px;
        border: 1px solid rgba(232,189,97,.1);
        animation: ringPulse 5.8s ease-in-out infinite;
      }

      .particles { position: absolute; inset: 0; }

      .auth-particle {
        position: absolute;
        width: 3px;
        height: 3px;
        border-radius: 999px;
        background: #E8BD61;
        opacity: .28;
        box-shadow: 0 0 9px rgba(232,189,97,.82), 0 0 23px rgba(232,189,97,.32);
        animation: particleFloat 5s ease-in-out infinite;
      }

      .p1 { left: 12%; top: 32%; animation-delay: -.2s; }
      .p2 { left: 22%; top: 72%; width: 2px; height: 2px; animation-delay: -1s; }
      .p3 { left: 31%; top: 18%; animation-delay: -2s; }
      .p4 { left: 44%; top: 86%; width: 2px; height: 2px; animation-delay: -3s; }
      .p5 { left: 58%; top: 14%; animation-delay: -1.6s; }
      .p6 { left: 69%; top: 82%; width: 4px; height: 4px; animation-delay: -2.4s; }
      .p7 { left: 80%; top: 27%; animation-delay: -3.5s; }
      .p8 { left: 88%; top: 66%; width: 2px; height: 2px; animation-delay: -4.3s; }
      .p9 { left: 7%; top: 58%; width: 2px; height: 2px; animation-delay: -1.8s; }
      .p10 { left: 92%; top: 42%; animation-delay: -2.8s; }
      .p11 { left: 38%; top: 8%; width: 2px; height: 2px; animation-delay: -4.8s; }
      .p12 { left: 64%; top: 55%; width: 2px; height: 2px; animation-delay: -3.8s; }
      .p13 { left: 48%; top: 27%; width: 2px; height: 2px; animation-delay: -5.1s; }
      .p14 { left: 74%; top: 11%; width: 2px; height: 2px; animation-delay: -6.2s; }

      .vignette {
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,.42) 63%, rgba(0,0,0,.9) 100%);
      }

      .back-home {
        position: absolute;
        left: 22px;
        top: 22px;
        z-index: 5;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-height: 42px;
        padding: 0 16px;
        border: 1px solid rgba(255,255,255,.13);
        border-radius: 999px;
        color: rgba(255,255,255,.84);
        background: rgba(255,255,255,.045);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        text-decoration: none;
        font-size: 12px;
        font-weight: 850;
        transition: transform .25s ease, border-color .25s ease, color .25s ease, background .25s ease;
        animation: backHomeIn .7s cubic-bezier(.16,1,.3,1) both;
      }

      .back-home:hover, .back-home:focus-visible {
        transform: translateX(-3px);
        color: #F3D99B;
        border-color: rgba(217,171,81,.42);
        background: rgba(255,255,255,.075);
        outline: none;
      }

      .auth-stage { position: relative; z-index: 2; width: min(456px, 100%); }

      .auth-card {
        position: relative;
        z-index: 2;
        overflow: hidden;
        width: 100%;
        padding: 34px 35px 28px;
        border: 1px solid rgba(255,255,255,.16);
        border-radius: 30px;
        background: linear-gradient(145deg, rgba(255,255,255,.115), rgba(255,255,255,.043) 48%, rgba(217,171,81,.06));
        backdrop-filter: blur(28px);
        -webkit-backdrop-filter: blur(28px);
        box-shadow: 0 48px 120px rgba(0,0,0,.74), inset 0 1px 0 rgba(255,255,255,.17);
        animation: cardEnter .9s cubic-bezier(.16,1,.3,1) both;
      }

      .card-reflection {
        position: absolute;
        left: -120%;
        top: -32%;
        width: 54%;
        height: 172%;
        transform: rotate(22deg);
        pointer-events: none;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.085), rgba(232,189,97,.08), transparent);
        filter: blur(5px);
        animation: reflection 7.5s ease-in-out infinite;
      }

      .card-core {
        position: absolute;
        left: 50%;
        top: 54%;
        width: 220px;
        height: 220px;
        transform: translate(-50%, -50%);
        border-radius: 999px;
        background: rgba(217,171,81,.055);
        filter: blur(45px);
        pointer-events: none;
        animation: corePulse 5.5s ease-in-out infinite;
      }

      .auth-card-top, .auth-headline, .auth-form, .auth-message, .auth-bottom, .auth-footer {
        position: relative;
        z-index: 2;
      }

      .auth-card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 25px;
      }

      .brand-icon-wrap { position: relative; }

      .brand-glow {
        position: absolute;
        inset: -8px;
        border-radius: 22px;
        background: radial-gradient(circle, rgba(232,189,97,.25), transparent 68%);
        filter: blur(9px);
        animation: brandGlow 3.8s ease-in-out infinite;
      }

      .brand-highlight {
        position: absolute;
        inset: -2px;
        border-radius: 19px;
        background: conic-gradient(from 0deg, transparent, rgba(243,217,155,.34), transparent 35%);
        opacity: .55;
        animation: iconHaloSpin 7s linear infinite;
      }

      .brand-icon {
        position: relative;
        display: grid;
        place-items: center;
        width: 54px;
        height: 54px;
        border: 1px solid rgba(232,189,97,.34);
        border-radius: 17px;
        color: #E8BD61;
        background: linear-gradient(145deg, rgba(232,189,97,.2), rgba(94,59,12,.13));
        box-shadow: 0 14px 31px rgba(171,112,22,.18), inset 0 1px 0 rgba(255,255,255,.18);
        animation: iconBreath 4.3s ease-in-out infinite;
      }

      .secure-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 10px;
        border: 1px solid rgba(255,255,255,.09);
        border-radius: 999px;
        color: rgba(255,255,255,.58);
        background: rgba(255,255,255,.035);
        font-size: 9px;
        font-weight: 850;
        letter-spacing: .08em;
        text-transform: uppercase;
      }

      .secure-badge svg { color: #D9AB51; }

      .auth-eyebrow {
        display: flex;
        align-items: center;
        gap: 9px;
        margin: 0 0 10px;
        color: #D9AB51;
        font-size: 9px;
        font-weight: 950;
        letter-spacing: .19em;
        text-transform: uppercase;
      }

      .auth-eyebrow span {
        width: 26px;
        height: 1px;
        background: linear-gradient(90deg, #D9AB51, transparent);
        animation: eyebrowLine 3.5s ease-in-out infinite;
      }

      .auth-headline h1 {
        margin: 0;
        color: #fff;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(38px, 6vw, 48px);
        line-height: .98;
        letter-spacing: -.055em;
      }

      .auth-copy {
        max-width: 356px;
        margin: 12px 0 27px;
        color: rgba(255,255,255,.58);
        font-size: 12px;
        line-height: 1.65;
      }

      .auth-form { display: grid; gap: 15px; }
      .auth-field { display: grid; gap: 7px; }
      .auth-field label { margin-left: 2px; color: rgba(255,255,255,.76); font-size: 11px; font-weight: 850; }

      .input-shell {
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 55px;
        padding: 0 14px;
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 14px;
        background: linear-gradient(180deg, rgba(0,0,0,.34), rgba(0,0,0,.22));
        box-shadow: inset 0 1px 0 rgba(255,255,255,.045), 0 8px 20px rgba(0,0,0,.14);
        transition: border-color .22s ease, box-shadow .22s ease, transform .22s ease, background .22s ease;
      }

      .input-shell::after {
        content: "";
        position: absolute;
        left: -80%;
        bottom: 0;
        width: 65%;
        height: 1px;
        pointer-events: none;
        background: linear-gradient(90deg, transparent, #E8BD61, transparent);
        transition: left .65s ease;
      }

      .input-shell:focus-within {
        transform: translateY(-1px);
        border-color: rgba(232,189,97,.66);
        background: linear-gradient(180deg, rgba(0,0,0,.36), rgba(55,39,15,.2));
        box-shadow: 0 0 0 4px rgba(232,189,97,.075), 0 15px 30px rgba(0,0,0,.24);
      }

      .input-shell:focus-within::after { left: 125%; }
      .input-shell.error { border-color: rgba(232,189,97,.78); animation: fieldAttention .55s ease; }
      .input-shell.valid { border-color: rgba(123,194,139,.42); }

      .input-icon {
        flex: 0 0 auto;
        display: grid;
        place-items: center;
        color: #C99834;
        transition: transform .22s ease, color .22s ease, filter .22s ease;
      }

      .input-shell:focus-within .input-icon {
        color: #E8BD61;
        transform: scale(1.08);
        filter: drop-shadow(0 0 7px rgba(232,189,97,.58));
      }

      .input-shell input {
        position: relative;
        z-index: 1;
        width: 100%;
        min-width: 0;
        padding: 15px 0;
        border: 0;
        outline: 0;
        color: #fff;
        background: transparent;
        font-size: 14px;
      }

      .input-shell input::placeholder { color: rgba(255,255,255,.31); }

      .eye-button {
        position: relative;
        z-index: 2;
        display: grid;
        place-items: center;
        padding: 6px;
        border: 0;
        color: rgba(255,255,255,.46);
        background: transparent;
        cursor: pointer;
        transition: color .2s ease, transform .2s ease;
      }

      .eye-button:hover, .eye-button:focus-visible {
        color: #E8BD61;
        transform: scale(1.08);
        outline: none;
      }

      .auth-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: -1px;
      }

      .remember-control, .terms-control {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: rgba(255,255,255,.48);
        font-size: 10px;
        line-height: 1.5;
        cursor: pointer;
      }

      .remember-control input, .terms-control input {
        width: 14px;
        height: 14px;
        margin: 0;
        accent-color: #D9AB51;
        cursor: pointer;
      }

      .terms-control { align-items: flex-start; }
      .terms-error { color: #F3D99B; animation: fieldAttention .55s ease; }

      .auth-link {
        color: #DFB45B;
        background: transparent;
        text-decoration: none;
        font-size: 10px;
        font-weight: 850;
        transition: color .2s ease;
      }

      .auth-link:hover, .auth-link:focus-visible {
        color: #F3D99B;
        outline: none;
        text-decoration: underline;
        text-underline-offset: 3px;
      }

      .primary-auth-button {
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        min-height: 56px;
        margin-top: 4px;
        border: 1px solid rgba(243,217,155,.28);
        border-radius: 14px;
        color: #171006;
        background: linear-gradient(135deg, #F3D99B 0%, #E8BD61 40%, #D9AB51 68%, #9C6715 100%);
        box-shadow: 0 17px 35px rgba(168,109,18,.28), inset 0 1px 0 rgba(255,255,255,.52);
        cursor: pointer;
        font-size: 13px;
        font-weight: 950;
        transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
      }

      .primary-auth-button i {
        position: absolute;
        left: -110%;
        top: -20%;
        width: 65%;
        height: 145%;
        transform: skewX(-20deg);
        pointer-events: none;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.46), transparent);
        animation: buttonSweep 8s ease-in-out infinite;
      }

      .primary-auth-button b {
        position: absolute;
        inset: auto 16px 7px;
        height: 1px;
        pointer-events: none;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.65), transparent);
        animation: buttonUnderGlow 2.8s ease-in-out infinite;
      }

      .primary-auth-button:hover, .primary-auth-button:focus-visible {
        transform: translateY(-2px);
        filter: saturate(1.06);
        box-shadow: 0 23px 47px rgba(168,109,18,.38), inset 0 1px 0 rgba(255,255,255,.56);
        outline: none;
      }

      .primary-auth-button:hover svg, .primary-auth-button:focus-visible svg { transform: translateX(4px); }
      .primary-auth-button:active { transform: translateY(0) scale(.985); }

      .auth-message {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        margin: 12px 0 0;
        padding: 10px 12px;
        border: 1px solid rgba(232,189,97,.18);
        border-radius: 11px;
        color: #F3D99B;
        background: rgba(232,189,97,.068);
        font-size: 10px;
        line-height: 1.45;
        text-align: center;
        animation: messageIn .3s ease;
      }

      .auth-message.success {
        color: #BDE7C6;
        border-color: rgba(113,185,129,.22);
        background: rgba(113,185,129,.07);
        animation: successPop .72s cubic-bezier(.16,1,.3,1) both;
      }

      .auth-bottom {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        margin-top: 19px;
        color: rgba(255,255,255,.42);
        font-size: 10px;
      }

      .auth-bottom.stacked { flex-direction: column; gap: 8px; }

      .auth-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        margin-top: 18px;
        padding-top: 15px;
        border-top: 1px solid rgba(255,255,255,.07);
        color: rgba(255,255,255,.3);
        font-size: 8px;
        font-weight: 850;
        letter-spacing: .11em;
        text-transform: uppercase;
      }

      .auth-footer svg { color: rgba(217,171,81,.66); animation: footerSpark 3.2s ease-in-out infinite; }

      .auth-caption {
        position: absolute;
        left: 50%;
        bottom: 22px;
        z-index: 1;
        transform: translateX(-50%);
        margin: 0;
        color: rgba(255,255,255,.22);
        font-size: 8px;
        font-weight: 850;
        letter-spacing: .18em;
        text-align: center;
        white-space: nowrap;
        pointer-events: none;
        animation: captionFade 5s ease-in-out infinite;
      }

      .auth-enter { animation: enterSoft .7s cubic-bezier(.16,1,.3,1) both; }
      .auth-card-top { animation-delay: .08s; }
      .auth-headline { animation-delay: .14s; }
      .auth-field:nth-child(1) { animation-delay: .2s; }
      .auth-field:nth-child(2) { animation-delay: .26s; }
      .auth-field:nth-child(3) { animation-delay: .32s; }
      .auth-row, .terms-control { animation-delay: .38s; }
      .primary-auth-button { animation-delay: .44s; }
      .auth-bottom { animation-delay: .5s; }
      .auth-footer { animation-delay: .56s; }

      @keyframes cardEnter {
        from { opacity: 0; transform: translateY(42px) scale(.96) rotateX(5deg); filter: blur(4px); }
        to { opacity: 1; transform: translateY(0) scale(1) rotateX(0); filter: blur(0); }
      }

      @keyframes enterSoft {
        from { opacity: 0; transform: translateY(15px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes backHomeIn {
        from { opacity: 0; transform: translateX(-10px); }
        to { opacity: 1; transform: translateX(0); }
      }

      @keyframes reflection {
        0%, 46% { transform: translateX(0) rotate(22deg); }
        72%, 100% { transform: translateX(420%) rotate(22deg); }
      }

      @keyframes buttonSweep {
        0%, 58% { transform: translateX(0) skewX(-20deg); }
        82%, 100% { transform: translateX(340%) skewX(-20deg); }
      }

      @keyframes buttonUnderGlow {
        0%, 100% { opacity: .22; transform: scaleX(.5); }
        50% { opacity: .8; transform: scaleX(1); }
      }

      @keyframes corePulse {
        0%, 100% { transform: translate(-50%, -50%) scale(.8); opacity: .35; }
        50% { transform: translate(-50%, -50%) scale(1.15); opacity: .75; }
      }

      @keyframes brandGlow {
        0%, 100% { opacity: .35; transform: scale(.96); }
        50% { opacity: .76; transform: scale(1.08); }
      }

      @keyframes iconBreath {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-2px); }
      }

      @keyframes iconHaloSpin { to { transform: rotate(360deg); } }

      @keyframes eyebrowLine {
        0%, 100% { width: 26px; opacity: .65; }
        50% { width: 42px; opacity: 1; }
      }

      @keyframes fieldAttention {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-5px); }
        40% { transform: translateX(5px); box-shadow: 0 0 0 5px rgba(232,189,97,.085); }
        60% { transform: translateX(-3px); }
        80% { transform: translateX(2px); }
      }

      @keyframes messageIn {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes successPop {
        0% { opacity: 0; transform: translateY(-5px) scale(.96); box-shadow: 0 0 0 0 rgba(113,185,129,.22); }
        55% { opacity: 1; transform: translateY(0) scale(1.02); box-shadow: 0 0 0 8px rgba(113,185,129,.06); }
        100% { transform: translateY(0) scale(1); box-shadow: 0 0 0 0 rgba(113,185,129,0); }
      }

      @keyframes glowA {
        0%, 100% { transform: translate(0,0) scale(1); }
        50% { transform: translate(52px,-34px) scale(1.12); }
      }

      @keyframes glowB {
        0%, 100% { transform: translate(0,0) scale(1); }
        50% { transform: translate(-44px,30px) scale(.92); }
      }

      @keyframes orbitClockwise { to { transform: rotate(360deg); } }
      @keyframes orbitCounter { to { transform: rotate(-360deg); } }

      @keyframes ringPulse {
        0%, 100% { opacity: .08; transform: scale(.92); }
        50% { opacity: .34; transform: scale(1.12); }
      }

      @keyframes particleFloat {
        0%, 100% { transform: translate3d(0,0,0); opacity: .18; }
        50% { transform: translate3d(14px,-24px,0); opacity: .72; }
      }

      @keyframes gridDrift { to { transform: translate3d(72px,72px,0); } }

      @keyframes auroraMoveA {
        0%, 100% { transform: translate3d(-4%, 0, 0) rotate(-12deg); opacity: .08; }
        50% { transform: translate3d(14%, 18%, 0) rotate(-8deg); opacity: .18; }
      }

      @keyframes auroraMoveB {
        0%, 100% { transform: translate3d(4%, 0, 0) rotate(16deg); opacity: .06; }
        50% { transform: translate3d(-12%, -16%, 0) rotate(10deg); opacity: .14; }
      }

      @keyframes footerSpark {
        0%, 100% { opacity: .5; transform: rotate(0deg) scale(1); }
        50% { opacity: 1; transform: rotate(18deg) scale(1.08); }
      }

      @keyframes captionFade {
        0%, 100% { opacity: .45; }
        50% { opacity: .9; }
      }

      @media (max-width: 760px) {
        .vp-auth-scene { padding: 72px 15px 62px; }
        .auth-card { padding: 28px 21px 23px; border-radius: 24px; }
        .auth-orbits { width: 590px; }
        .glow-a { left: -185px; }
        .glow-b { right: -215px; }
        .back-home { left: 14px; top: 14px; }
        .auth-headline h1 { font-size: 37px; }
        .auth-caption { display: none; }
        .auth-row { align-items: flex-start; gap: 12px; }
      }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: .01ms !important;
          animation-iteration-count: 1 !important;
          scroll-behavior: auto !important;
          transition-duration: .01ms !important;
        }
      }
    `}</style>
  );
}