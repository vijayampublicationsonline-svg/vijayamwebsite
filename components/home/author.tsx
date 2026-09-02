"use client";

import React from "react";

const benefits = [
  "Professional editorial guidance",
  "ISBN & copyright assistance",
  "Premium cover and book design",
  "Print and digital publishing",
  "Nationwide academic distribution",
];

const highlights = [
  {
    icon: "✦",
    title: "Academic Excellence",
    text: "Books shaped around the latest nursing curriculum.",
    tone: "gold",
  },
  {
    icon: "◈",
    title: "Expert Publishing",
    text: "From editing to design, every detail is handled.",
    tone: "plum",
  },
  {
    icon: "◎",
    title: "Reach Students",
    text: "Connect with educators and learners across India.",
    tone: "terracotta",
  },
  {
    icon: "◌",
    title: "Wider Distribution",
    text: "Available through academic and online networks.",
    tone: "sage",
  },
];

export default function JoinAuthorSection() {
  return (
    <section className="author-section">
      <style>{`
        .author-section {
          position: relative;
          overflow: hidden;
          padding: 112px 24px;
          color: #fffaf3;
          background:
            radial-gradient(circle at 8% 8%, rgba(255, 218, 159, .52), transparent 25rem),
            radial-gradient(circle at 94% 14%, rgba(219, 151, 135, .32), transparent 28rem),
            radial-gradient(circle at 76% 96%, rgba(179, 201, 163, .28), transparent 25rem),
            linear-gradient(135deg, #5a3546 0%, #754759 45%, #aa6658 100%);
          font-family: Georgia, "Times New Roman", serif;
        }

        .author-section * {
          box-sizing: border-box;
        }

        .author-section::before {
          position: absolute;
          inset: 0;
          opacity: .15;
          background-image: radial-gradient(rgba(255, 255, 255, .8) .7px, transparent .7px);
          background-size: 20px 20px;
          content: "";
          pointer-events: none;
        }

        .author-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(12px);
          opacity: .45;
          pointer-events: none;
          animation: authorFloat 12s ease-in-out infinite;
        }

        .author-orb-one {
          top: -155px;
          left: -100px;
          width: 350px;
          height: 350px;
          background: #f5c86f;
        }

        .author-orb-two {
          right: -150px;
          bottom: -175px;
          width: 440px;
          height: 440px;
          background: #b8cda6;
          animation-delay: -5s;
        }

        .author-orb-three {
          top: 42%;
          left: 47%;
          width: 150px;
          height: 150px;
          background: #e69d8d;
          opacity: .24;
          animation-delay: -8s;
        }

        .author-container {
          position: relative;
          z-index: 1;
          max-width: 1220px;
          margin: 0 auto;
        }

        .author-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.04fr) minmax(420px, .96fr);
          gap: 72px;
          align-items: center;
        }

        .author-copy {
          animation: authorReveal .75s ease both;
        }

        .author-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 10px 17px;
          border: 1px solid rgba(255, 245, 226, .48);
          border-radius: 999px;
          background: rgba(255, 250, 243, .12);
          box-shadow: inset 0 1px rgba(255, 255, 255, .22);
          color: #fff9f0;
          font-family: Arial, sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .11em;
          text-transform: uppercase;
          backdrop-filter: blur(12px);
        }

        .author-eyebrow span {
          color: #ffd98a;
          font-size: 17px;
          animation: authorSparkle 3s ease-in-out infinite;
        }

        .author-title {
          max-width: 690px;
          margin: 27px 0 22px;
          font-size: clamp(43px, 5vw, 70px);
          font-weight: 600;
          letter-spacing: -.05em;
          line-height: 1.03;
          text-shadow: 0 4px 22px rgba(61, 27, 43, .22);
        }

        .author-title em {
          color: #ffe3a5;
          font-style: italic;
          font-weight: 500;
        }

        .author-description {
          max-width: 610px;
          margin: 0;
          color: rgba(255, 249, 241, .9);
          font-family: Arial, sans-serif;
          font-size: 17px;
          line-height: 1.8;
        }

        .author-benefits {
          display: grid;
          gap: 13px;
          margin: 32px 0 38px;
          padding: 0;
          list-style: none;
          font-family: Arial, sans-serif;
        }

        .author-benefit {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #fffaf4;
          font-size: 15px;
          font-weight: 600;
        }

        .author-check {
          display: grid;
          width: 24px;
          height: 24px;
          flex: 0 0 24px;
          place-items: center;
          border-radius: 50%;
          color: #6a3d43;
          background: #ffe1a6;
          box-shadow: 0 4px 12px rgba(57, 27, 36, .18);
          font-size: 13px;
          font-weight: 900;
        }

        .author-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 13px;
          font-family: Arial, sans-serif;
        }

        .author-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 55px;
          padding: 0 24px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 800;
          text-decoration: none;
          transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
        }

        .author-button:hover {
          transform: translateY(-3px);
        }

        .author-button-primary {
          color: #623c42;
          background: linear-gradient(135deg, #ffe5aa, #f5c979);
          box-shadow: 0 13px 26px rgba(59, 27, 40, .24);
        }

        .author-button-primary:hover {
          box-shadow: 0 17px 32px rgba(59, 27, 40, .34);
        }

        .author-button-secondary {
          border: 1px solid rgba(255, 250, 243, .5);
          color: #fffaf3;
          background: rgba(255, 250, 243, .12);
          backdrop-filter: blur(10px);
        }

        .author-button-secondary:hover {
          background: rgba(255, 250, 243, .21);
        }

        .author-card {
          position: relative;
          padding: 34px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, .75);
          border-radius: 30px;
          color: #493947;
          background: linear-gradient(145deg, rgba(255, 253, 248, .97), rgba(247, 238, 224, .94));
          box-shadow: 0 28px 65px rgba(51, 24, 39, .28), inset 0 1px #ffffff;
          animation: authorRise .9s .15s ease both;
        }

        .author-card::before {
          position: absolute;
          top: -110px;
          right: -70px;
          width: 245px;
          height: 245px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(249, 203, 123, .52), rgba(226, 155, 138, .08) 70%);
          content: "";
        }

        .author-card-header,
        .author-highlight-grid,
        .author-journey {
          position: relative;
        }

        .author-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 27px;
        }

        .author-card-kicker {
          margin: 0 0 5px;
          color: #a46059;
          font-family: Arial, sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .author-card-title {
          margin: 0;
          color: #4a3748;
          font-size: 31px;
          letter-spacing: -.035em;
        }

        .author-seal {
          display: grid;
          width: 53px;
          height: 53px;
          flex: 0 0 53px;
          place-items: center;
          border: 1px solid #f0ce8a;
          border-radius: 50%;
          color: #8d5848;
          background: #fff0c9;
          box-shadow: 0 7px 18px rgba(135, 87, 70, .13);
          font-size: 23px;
          animation: authorSparkle 3.2s ease-in-out infinite;
        }

        .author-highlight-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 13px;
        }

        .author-highlight {
          min-height: 174px;
          padding: 19px;
          border: 1px solid rgba(111, 76, 88, .1);
          border-radius: 19px;
          background: rgba(255, 255, 255, .68);
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .author-highlight:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 24px rgba(99, 67, 74, .13);
        }

        .author-icon {
          display: grid;
          width: 41px;
          height: 41px;
          place-items: center;
          border-radius: 13px;
          font-size: 22px;
        }

        .gold .author-icon { color: #9a6a22; background: #fff0c4; }
        .plum .author-icon { color: #80536f; background: #f0dfea; }
        .terracotta .author-icon { color: #b95e4d; background: #fbe0d7; }
        .sage .author-icon { color: #58785e; background: #e1eddb; }

        .author-highlight h4 {
          margin: 15px 0 7px;
          color: #4d3b49;
          font-family: Arial, sans-serif;
          font-size: 14px;
        }

        .author-highlight p {
          margin: 0;
          color: #756976;
          font-family: Arial, sans-serif;
          font-size: 12px;
          line-height: 1.55;
        }

        .author-journey {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-top: 18px;
          padding: 19px 21px;
          overflow: hidden;
          border-radius: 19px;
          color: #fffaf3;
          background: linear-gradient(105deg, #75505a, #986158 55%, #bd7b59);
          box-shadow: 0 12px 24px rgba(103, 64, 65, .2);
          transition: transform .25s ease;
        }

        .author-journey:hover {
          transform: translateY(-3px);
        }

        .author-journey small {
          display: block;
          margin-bottom: 4px;
          color: #ffe6ba;
          font-family: Arial, sans-serif;
          font-size: 12px;
        }

        .author-journey strong {
          font-size: 20px;
        }

        .author-arrow {
          color: #ffe3a0;
          font-family: Arial, sans-serif;
          font-size: 28px;
          transition: transform .25s ease;
        }

        .author-journey:hover .author-arrow {
          transform: translateX(7px);
        }

        @keyframes authorFloat {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(18px, 22px, 0) scale(1.05); }
        }

        @keyframes authorRise {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes authorReveal {
          from { opacity: 0; transform: translateX(-18px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes authorSparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.08) rotate(8deg); }
        }

        @media (max-width: 920px) {
          .author-section { padding: 82px 20px; }
          .author-grid { grid-template-columns: 1fr; gap: 50px; }
        }

        @media (max-width: 480px) {
          .author-section { padding: 70px 17px; }
          .author-card { padding: 24px 18px; }
          .author-highlight-grid { grid-template-columns: 1fr; }
          .author-title { font-size: 42px; }
          .author-actions { display: grid; }
          .author-button { width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .author-orb, .author-copy, .author-card, .author-seal, .author-eyebrow span {
            animation: none;
          }

          .author-button, .author-highlight, .author-journey, .author-arrow {
            transition: none;
          }
        }
      `}</style>

      <div className="author-orb author-orb-one" />
      <div className="author-orb author-orb-two" />
      <div className="author-orb author-orb-three" />

      <div className="author-container">
        <div className="author-grid">
          <div className="author-copy">
            <div className="author-eyebrow">
              <span>✦</span> Join our author community
            </div>

            <h2 className="author-title">
              Share your knowledge.
              <br />
              Publish with <em>Vijayam Publications.</em>
            </h2>

            <p className="author-description">
              Transform your expertise into trusted academic books that empower
              nursing students, educators, and healthcare professionals across India.
            </p>

            <ul className="author-benefits">
              {benefits.map((benefit) => (
                <li className="author-benefit" key={benefit}>
                  <span className="author-check">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="author-actions">
              <a className="author-button author-button-primary" href="/authors/join">
                Become an Author <span>→</span>
              </a>
              <a className="author-button author-button-secondary" href="/authors/guidelines">
                Author Guidelines
              </a>
            </div>
          </div>

          <div className="author-card">
            <div className="author-card-header">
              <div>
                <p className="author-card-kicker">The Vijayam advantage</p>
                <h3 className="author-card-title">Why publish with us?</h3>
              </div>
              <div className="author-seal">✦</div>
            </div>

            <div className="author-highlight-grid">
              {highlights.map((highlight) => (
                <div className={`author-highlight ${highlight.tone}`} key={highlight.title}>
                  <div className="author-icon">{highlight.icon}</div>
                  <h4>{highlight.title}</h4>
                  <p>{highlight.text}</p>
                </div>
              ))}
            </div>

            <div className="author-journey">
              <div>
                <small>Ready to publish?</small>
                <strong>Start your author journey</strong>
              </div>
              <span className="author-arrow">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}