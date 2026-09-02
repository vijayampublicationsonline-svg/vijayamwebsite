"use client";

import { useState } from "react";

type DistState = {
  id: string;
  code: string;
  name: string;
  number: number;
  phones?: string[];
};

const STATES: DistState[] = [
  {
    id: "andhra-pradesh",
    code: "AP",
    name: "ANDHRA PRADESH",
    number: 1,
    phones: ["8885414666", "7416089898"],
  },
  {
    id: "telangana",
    code: "TS",
    name: "TELANGANA",
    number: 2,
    phones: ["8885414666", "7416089898"],
  },
  {
    id: "tamil-nadu",
    code: "TN",
    name: "TAMIL NADU",
    number: 3,
  },
  {
    id: "karnataka",
    code: "KA",
    name: "KARNATAKA",
    number: 4,
    phones: ["9381879949"],
  },
  {
    id: "kerala",
    code: "KL",
    name: "KERALA",
    number: 5,
  },
  {
    id: "odisha",
    code: "OD",
    name: "ODISHA",
    number: 6,
  },
  {
    id: "west-bengal",
    code: "WB",
    name: "WEST BENGAL",
    number: 7,
  },
  {
    id: "maharashtra",
    code: "MH",
    name: "MAHARASHTRA",
    number: 8,
  },
  {
    id: "gujarat",
    code: "GJ",
    name: "GUJARAT",
    number: 9,
  },
  {
    id: "rajasthan",
    code: "RJ",
    name: "RAJASTHAN",
    number: 10,
  },
  {
    id: "jammu-kashmir",
    code: "JK",
    name: "JAMMU & KASHMIR",
    number: 11,
  },
];

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.75 19.75 0 0 1-8.63-3.07 19.4 19.4 0 0 1-6-6A19.75 19.75 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AboutUsPage() {
  const [activeId, setActiveId] = useState("andhra-pradesh");

  const active = STATES.find((state) => state.id === activeId) ?? STATES[0];

  return (
    <>
      <style>{`
        :root {
          color-scheme: light;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #f9f3ec;
          color: #2d211b;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .about-container {
          min-height: 100vh;
          padding: 42px 24px 70px;
          overflow: hidden;
          background:
            radial-gradient(circle at 10% 10%, rgba(181, 99, 53, 0.08), transparent 30%),
            radial-gradient(circle at 90% 30%, rgba(213, 169, 103, 0.12), transparent 28%),
            linear-gradient(180deg, #fffaf5 0%, #fff3e9 50%, #f8eee6 100%);
        }

        .top-bar,
        .content-wrap,
        .story {
          position: relative;
          z-index: 1;
          width: min(1240px, 100%);
          margin-left: auto;
          margin-right: auto;
        }

        .top-bar {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 28px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(128, 70, 38, 0.18);
        }

        .title-wrap {
          display: grid;
          gap: 7px;
        }

        .eyebrow,
        .story-head {
          margin: 0;
          color: #984f2b;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .title {
          margin: 0;
          color: #4a2114;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 4.6vw, 54px);
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.035em;
        }

        .subtitle {
          margin: 0;
          color: #85513a;
          font-size: 13px;
        }

        .counter {
          flex-shrink: 0;
          color: #733a21;
          font-size: 12px;
          font-weight: 750;
          letter-spacing: 0.1em;
        }

        .content-wrap {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 380px;
          gap: 30px;
          align-items: stretch;
        }

        .map-area {
          min-height: 700px;
          display: grid;
          place-items: center;
        }

        .map-shell {
          position: relative;
          width: min(100%, 820px);
          padding: 14px;
          overflow: hidden;
          border: 1px solid rgba(255, 145, 70, 0.55);
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow:
            0 34px 72px rgba(85, 42, 20, 0.12),
            0 0 42px rgba(255, 140, 70, 0.42),
            0 0 120px rgba(255, 110, 40, 0.24),
            inset 0 1px 0 rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(14px);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          animation: mapGlowPulse 3.2s ease-in-out infinite;
        }

        .map-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            linear-gradient(125deg, rgba(255, 255, 255, 0.68), transparent 35%, transparent 75%, rgba(255, 128, 50, 0.2));
        }

        .map-shell::after {
          content: "";
          position: absolute;
          top: -20%;
          left: -45%;
          width: 50%;
          height: 160%;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            100deg,
            transparent,
            rgba(255, 255, 255, 0.52),
            rgba(255, 172, 108, 0.35),
            transparent
          );
          transform: skewX(-18deg);
          filter: blur(2px);
          animation: mapShine 3.4s ease-in-out infinite;
        }

        .map-shell:hover {
          transform: translateY(-4px);
          box-shadow:
            0 40px 82px rgba(85, 42, 20, 0.16),
            0 0 60px rgba(255, 140, 70, 0.56),
            0 0 140px rgba(255, 110, 40, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.99);
        }

        .india-img {
          display: block;
          width: 100%;
          max-height: 76vh;
          object-fit: contain;
          user-select: none;
          position: relative;
          z-index: 0;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          filter: saturate(2.15) contrast(1.32) brightness(1.13) drop-shadow(0 12px 28px rgba(196, 82, 28, 0.24));
          animation: indiaVibrance 3.6s ease-in-out infinite;
        }

        .side {
          min-height: 700px;
          padding: 24px;
          border: 1px solid rgba(161, 93, 51, 0.17);
          border-radius: 24px;
          background: rgba(255, 252, 248, 0.72);
          box-shadow: 0 22px 55px rgba(88, 43, 20, 0.08);
          backdrop-filter: blur(18px);
        }

        .side-title {
          margin: 0 0 14px;
          color: #7c3f23;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .list {
          display: grid;
          gap: 8px;
        }

        .state-group {
          display: grid;
          gap: 10px;
        }

        .state-btn {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          overflow: hidden;
          border: 1px solid #edd8c6;
          border-radius: 13px;
          background: linear-gradient(180deg, #fffefd, #fff8f2);
          color: #6b2f1d;
          text-align: left;
          cursor: pointer;
          transition: transform 0.24s ease, border-color 0.24s ease, box-shadow 0.24s ease, background 0.24s ease;
        }

        .state-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(105deg, transparent 10%, rgba(255, 255, 255, 0.75) 48%, transparent 80%);
          transform: translateX(-130%);
          transition: transform 0.75s ease;
        }

        .state-btn:hover {
          transform: translateX(3px);
          border-color: #d8ad8d;
          box-shadow: 0 9px 22px rgba(92, 47, 24, 0.08);
        }

        .state-btn:hover::after {
          transform: translateX(130%);
        }

        .state-btn:focus-visible {
          outline: 2px solid #b35e36;
          outline-offset: 2px;
        }

        .state-btn.active {
          border-color: #c98e68;
          background: linear-gradient(90deg, rgba(255, 231, 214, 0.96), rgba(255, 249, 244, 0.98));
          box-shadow: 0 12px 28px rgba(108, 52, 24, 0.12), inset 4px 0 0 #9f4b29;
          transform: translateX(4px);
        }

        .btn-number {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #f3d3be;
          color: #6a2c17;
          font-size: 10px;
          font-weight: 850;
          transition: transform 0.25s ease, background 0.25s ease;
        }

        .state-btn.active .btn-number {
          background: linear-gradient(135deg, #b55d35, #803419);
          color: #fff;
          transform: scale(1.08);
          box-shadow: 0 5px 12px rgba(125, 49, 21, 0.24);
        }

        .btn-code {
          min-width: 28px;
          color: #8a401f;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 0.08em;
        }

        .btn-name {
          font-size: 12px;
          font-weight: 750;
          letter-spacing: 0.015em;
        }

        .contact-reveal {
          position: relative;
          margin: 0 0 4px;
          padding: 1px;
          overflow: hidden;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(151, 75, 39, 0.7), rgba(224, 181, 119, 0.8), rgba(151, 75, 39, 0.25));
          box-shadow: 0 20px 38px rgba(92, 43, 17, 0.17), 0 6px 14px rgba(92, 43, 17, 0.09);
          animation: contactReveal 0.48s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .contact-reveal::before {
          content: "";
          position: absolute;
          top: -80%;
          left: -30%;
          width: 70%;
          height: 250%;
          pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.38), transparent);
          transform: rotate(20deg);
          animation: contactShine 1.2s ease 0.15s both;
        }

        .contact-inner {
          position: relative;
          z-index: 1;
          padding: 18px;
          border-radius: 19px;
          background: radial-gradient(circle at 100% 0%, rgba(229, 181, 116, 0.2), transparent 42%), linear-gradient(145deg, #5e2917, #35170e);
          color: #fff9f3;
        }

        .contact-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 15px;
        }

        .contact-label {
          margin: 0 0 5px;
          color: #e9bd87;
          font-size: 9px;
          font-weight: 850;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .contact-state {
          margin: 0;
          color: #fffaf5;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          font-weight: 500;
          line-height: 1.2;
        }

        .contact-icon {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border: 1px solid rgba(239, 191, 132, 0.3);
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.07);
          color: #edc18b;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
        }

        .contact-icon svg {
          width: 19px;
          height: 19px;
        }

        .phone-list {
          display: grid;
          gap: 9px;
        }

        .phone-link {
          min-height: 49px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 10px 12px;
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.07);
          color: #fff;
          text-decoration: none;
          transition: transform 0.22s ease, background 0.22s ease, border-color 0.22s ease;
        }

        .phone-link:hover {
          transform: translateY(-2px);
          border-color: rgba(238, 190, 130, 0.48);
          background: rgba(255, 255, 255, 0.12);
        }

        .phone-details {
          display: grid;
          gap: 2px;
        }

        .phone-caption {
          color: #d7af88;
          font-size: 9px;
          font-weight: 750;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .phone-number {
          color: #fffaf5;
          font-size: 16px;
          font-weight: 750;
          letter-spacing: 0.055em;
        }

        .call-now {
          color: #edc18b;
          font-size: 9px;
          font-weight: 850;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .contact-empty {
          margin: 0;
          padding: 5px 0 2px;
          color: #ead6c9;
          font-size: 12px;
          line-height: 1.6;
        }

        .story {
          display: grid;
          gap: 16px;
          margin-top: 54px;
          padding-top: 34px;
          border-top: 1px solid rgba(128, 70, 38, 0.18);
        }

        .story-title {
          max-width: 750px;
          margin: 0;
          color: #4a1f12;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(27px, 3.6vw, 42px);
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.025em;
        }

        .story-grid {
          display: grid;
          gap: 18px;
        }

        .story-item {
          position: relative;
          padding: clamp(24px, 3.2vw, 40px);
          overflow: hidden;
          border: 1px solid #e7cdb8;
          border-radius: 20px;
          background: radial-gradient(circle at 0 0, #fff4e7, transparent 35%), linear-gradient(180deg, #fffefd, #fff8f3);
          box-shadow: 0 18px 34px rgba(94, 42, 21, 0.09), inset 0 1px 0 #fff;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .story-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 28px 50px rgba(94, 42, 21, 0.14), inset 0 1px 0 #fff;
        }

        .story-item h3 {
          margin: 0 0 11px;
          color: #5a2412;
          font-size: 17px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .story-item p {
          max-width: 1080px;
          margin: 0;
          color: #74452d;
          font-size: clamp(15px, 1.25vw, 18px);
          line-height: 1.8;
        }

        @keyframes contactReveal {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes contactShine {
          from {
            transform: translateX(-170%) rotate(20deg);
          }
          to {
            transform: translateX(270%) rotate(20deg);
          }
        }

        @keyframes mapGlowPulse {
          0%, 100% {
            box-shadow:
              0 34px 72px rgba(85, 42, 20, 0.12),
              0 0 42px rgba(255, 140, 70, 0.42),
              0 0 120px rgba(255, 110, 40, 0.24),
              inset 0 1px 0 rgba(255, 255, 255, 0.96);
          }
          50% {
            box-shadow:
              0 38px 82px rgba(85, 42, 20, 0.16),
              0 0 62px rgba(255, 140, 70, 0.58),
              0 0 152px rgba(255, 110, 40, 0.34),
              inset 0 1px 0 rgba(255, 255, 255, 0.99);
          }
        }

        @keyframes mapShine {
          0% { left: -45%; opacity: 0; }
          20% { opacity: 0.85; }
          60% { opacity: 0.52; }
          100% { left: 125%; opacity: 0; }
        }

        @keyframes indiaVibrance {
          0%, 100% {
            filter: saturate(2.05) contrast(1.28) brightness(1.1) drop-shadow(0 10px 24px rgba(196, 82, 28, 0.2));
            transform: scale(1);
          }
          50% {
            filter: saturate(2.28) contrast(1.38) brightness(1.17) drop-shadow(0 14px 30px rgba(196, 82, 28, 0.28));
            transform: scale(1.012);
          }
        }

        @media (max-width: 1000px) {
          .content-wrap {
            grid-template-columns: 1fr;
          }
          .map-area {
            min-height: 520px;
          }
          .india-img {
            max-height: 58vh;
          }
          .side {
            min-height: auto;
          }
          .list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .state-group {
            min-width: 0;
          }
          .contact-reveal {
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .about-container {
            padding: 24px 14px 42px;
          }
          .top-bar {
            align-items: flex-start;
            flex-direction: column;
          }
          .title {
            font-size: 34px;
          }
          .map-area {
            min-height: 390px;
          }
          .map-shell {
            border-radius: 17px;
            padding: 8px;
          }
          .india-img {
            max-height: 43vh;
          }
          .side {
            padding: 16px;
            border-radius: 18px;
          }
          .list {
            grid-template-columns: 1fr;
          }
          .contact-inner {
            padding: 15px;
          }
          .phone-number {
            font-size: 15px;
          }
          .call-now {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <main className="about-container">
        <header className="top-bar">
          <div className="title-wrap">
            <p className="eyebrow">Vijayam Publications</p>
            <h1 className="title">Distribution Network</h1>
            <p className="subtitle">
              Select a state to view its distribution contact details.
            </p>
          </div>

          <div className="counter" aria-live="polite">
            STATE · {String(active.number).padStart(2, "0")} · {active.code}
          </div>
        </header>

        <div className="content-wrap">
          <section className="map-area" aria-label="India distribution map">
            <div className="map-shell">
              <img
                src="/images/india.jpg"
                alt="India distribution map"
                className="india-img"
              />
            </div>
          </section>

          <aside className="side" aria-label="Distribution states">
            <p className="side-title">11 Distribution States</p>

            <div className="list">
              {STATES.map((state) => (
                <div key={state.id} className="state-group">
                  <button
                    type="button"
                    className={`state-btn ${activeId === state.id ? "active" : ""}`}
                    onClick={() => setActiveId(state.id)}
                    aria-pressed={activeId === state.id}
                  >
                    <span className="btn-number">
                      {String(state.number).padStart(2, "0")}
                    </span>
                    <span className="btn-code">{state.code}</span>
                    <span className="btn-name">{state.name}</span>
                  </button>

                  {activeId === state.id && (
                    <div className="contact-reveal" key={`contact-${state.id}`}>
                      <div className="contact-inner">
                        <div className="contact-top">
                          <div>
                            <p className="contact-label">Distribution Contact</p>
                            <h2 className="contact-state">{state.name}</h2>
                          </div>

                          <span className="contact-icon">
                            <PhoneIcon />
                          </span>
                        </div>

                        {state.phones && state.phones.length > 0 ? (
                          <div className="phone-list">
                            {state.phones.map((phone, index) => (
                              <a
                                key={phone}
                                className="phone-link"
                                href={`tel:+91${phone}`}
                                aria-label={`Call ${state.name} distribution contact ${phone}`}
                              >
                                <span className="phone-details">
                                  <span className="phone-caption">
                                    {state.phones!.length > 1
                                      ? `Contact ${index + 1}`
                                      : "Official contact"}
                                  </span>
                                  <span className="phone-number">+91 {phone}</span>
                                </span>
                                <span className="call-now">Call now</span>
                              </a>
                            ))}
                          </div>
                        ) : (
                          <p className="contact-empty">
                            Distribution contact details for this state will be
                            available soon.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>
        </div>

        <section className="story">
          <p className="story-head">About Us</p>
          <h2 className="story-title">
            Why we started, and how we continue to grow with purpose.
          </h2>

          <div className="story-grid">
            <article className="story-item">
              <h3>Why we started</h3>
              <p>
                Vijayam Publications was started to make quality educational and
                meaningful reading content accessible across regions where
                consistent distribution was difficult.
              </p>
            </article>

            <article className="story-item">
              <h3>Our mission</h3>
              <p>
                We focus on dependable delivery, long-term partnerships, and
                reader-first curation so institutions, stores, and learners can
                trust what reaches them.
              </p>
            </article>

            <article className="story-item">
              <h3>How we work</h3>
              <p>
                With a state-wise distribution model, responsive planning, and
                localized support, we build a scalable network that stays
                reliable as demand evolves.
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}