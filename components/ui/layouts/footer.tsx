"use client";

import React, { useState } from "react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "Categories", href: "/categories" },
  { name: "Publishers", href: "/publishers" },
  { name: "Contact", href: "/contact" },
];

const policyLinks = [
  { name: "Privacy Policy", href: "/privacypolicy" },
  { name: "Return Policy", href: "/returnpolicy" },
  { name: "Shipping Policy", href: "/shippingpolicy" },
  { name: "Cookie Policy", href: "/cookiepolicy" },
  { name: "Terms of Service", href: "/termsofservice" },
];

const contactDetails = {
  phones: ["+91 8885414000", "+91 8885414666"],
  email: "support@vijayampublications.com",
};

const offices = [
  {
    id: "vijayawada",
    name: "Corporate Office",
    address:
      "#14-7-13, Sambhamurty Road, Hanumanpet, Vijayawada-520003, Andhra Pradesh",
  },
  {
    id: "tirupati",
    name: "Head Office",
    address:
      "#219, 2nd FLOOR, PRAKASAM ROAD, TIRUPATI-517501, Andhra Pradesh",
  },
];

const heartImage = "/images/heart.png.png";

const featuredImage =
  "https://static.wixstatic.com/media/1b0992_814c1a77bf5a43488713151ef87fd14c~mv2.jpg/v1/crop/x_247,y_0,w_848,h_792/fill/w_264,h_280,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/INTERNATIONAL%20YOGA%20%20Day%20Theme%20Poster_edi.jpg";

const googleMapsUrl =
  "https://www.google.com/maps/place/Vijayam+Publications/@16.5137418,80.620686,17z/data=!3m1!4b1!4m6!3m5!1s0x3a35efffc8e7808f:0x8da3d2f53a04255f!8m2!3d16.5137418!4d80.620686!16s%2Fg%2F1q62gl18g?entry=ttu&g_ep=EgoyMDI2MDgxMS4wIKXMDSoASAFQAw%3D%3D";

const googleMapsEmbedUrl =
  "https://www.google.com/maps?q=Vijayam%20Publications%2C%2016.5137418%2C80.620686&z=17&output=embed";

const heartColors = [
  {
    name: "Red",
    primary: "#e51d3f",
    light: "#ff8595",
    glow: "rgba(239,28,62,.62)",
    filter: "saturate(1.25) contrast(1.15) brightness(1.16)",
  },
  {
    name: "Blue",
    primary: "#2478ed",
    light: "#82c9ff",
    glow: "rgba(38,126,255,.62)",
    filter:
      "hue-rotate(215deg) saturate(1.65) contrast(1.12) brightness(1.2)",
  },
  {
    name: "Emerald",
    primary: "#10b86c",
    light: "#81efb9",
    glow: "rgba(16,203,116,.58)",
    filter:
      "hue-rotate(125deg) saturate(1.55) contrast(1.1) brightness(1.2)",
  },
  {
    name: "Gold",
    primary: "#efa914",
    light: "#ffe28a",
    glow: "rgba(255,185,30,.6)",
    filter:
      "hue-rotate(55deg) saturate(1.8) contrast(1.08) brightness(1.24)",
  },
  {
    name: "Violet",
    primary: "#9c4bd5",
    light: "#dda9ff",
    glow: "rgba(168,78,231,.62)",
    filter:
      "hue-rotate(275deg) saturate(1.65) contrast(1.1) brightness(1.18)",
  },
  {
    name: "Rose",
    primary: "#f34898",
    light: "#ffafd4",
    glow: "rgba(255,72,157,.62)",
    filter:
      "hue-rotate(325deg) saturate(1.55) contrast(1.1) brightness(1.2)",
  },
  {
    name: "Orange",
    primary: "#f16b26",
    light: "#ffc080",
    glow: "rgba(255,111,38,.62)",
    filter:
      "hue-rotate(28deg) saturate(1.65) contrast(1.1) brightness(1.22)",
  },
  {
    name: "Cyan",
    primary: "#12b9c7",
    light: "#8af2f6",
    glow: "rgba(17,205,219,.6)",
    filter:
      "hue-rotate(175deg) saturate(1.6) contrast(1.1) brightness(1.2)",
  },
  {
    name: "Crimson",
    primary: "#b61037",
    light: "#f3758c",
    glow: "rgba(201,18,59,.64)",
    filter: "saturate(1.7) contrast(1.22) brightness(1.04)",
  },
  {
    name: "Purple",
    primary: "#6755df",
    light: "#afa6ff",
    glow: "rgba(109,88,237,.62)",
    filter:
      "hue-rotate(245deg) saturate(1.65) contrast(1.1) brightness(1.19)",
  },
];

const footerStyles = `
  .vp-footer {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    color: #eee6dc;
    background:
      radial-gradient(circle at 82% 10%, var(--heart-glow), transparent 27%),
      radial-gradient(circle at 8% 68%, rgba(255,255,255,.05), transparent 28%),
      linear-gradient(145deg, #191617, #0e0c0e 58%, #070709);
    border-top: 1px solid rgba(242,211,179,.14);
    font-family: "DM Sans", "Segoe UI", sans-serif;
    transition: background .5s ease;
  }

  .vp-footer,
  .vp-footer * {
    box-sizing: border-box;
  }

  .vp-footer a,
  .vp-footer button {
    color: inherit;
    font: inherit;
  }

  .vp-footer__bg {
    position: absolute;
    z-index: -1;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
    background-size: 100px 100px;
    mask-image: linear-gradient(
      to bottom,
      transparent,
      #000 12%,
      #000 88%,
      transparent
    );
  }

  .vp-footer__bg::after {
    content: "";
    position: absolute;
    top: -20%;
    bottom: -20%;
    left: -35%;
    width: 24%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,.06),
      var(--heart-glow),
      transparent
    );
    filter: blur(24px);
    transform: skewX(-18deg);
    animation: vpSweep 6s ease-in-out infinite;
  }

  .vp-footer__shell {
    width: min(1240px, calc(100% - 48px));
    margin-inline: auto;
  }

  .vp-footer__hero {
    min-height: 720px;
    padding: clamp(80px, 10vw, 132px) 0 80px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(350px, .9fr);
    gap: clamp(55px, 7vw, 105px);
    align-items: center;
  }

  .vp-footer__eyebrow {
    margin: 0 0 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--heart-light);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .23em;
    animation: vpFadeUp .8s ease both;
  }

  .vp-footer__eyebrow::before {
    content: "";
    width: 38px;
    height: 1px;
    background: currentColor;
  }

  .vp-footer__title {
    margin: 0;
    color: var(--heart-primary);
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(43px, 5.6vw, 80px);
    font-weight: 500;
    line-height: 1.02;
    letter-spacing: -.03em;
    filter: drop-shadow(0 0 22px var(--heart-glow));
  }

  .vp-footer__title span {
    display: block;
    opacity: 0;
    transform: translateY(30px);
    animation: vpTitleReveal .9s cubic-bezier(.16,.84,.22,1) .15s both;
  }

  .vp-footer__title .vp-footer__title-accent {
    width: fit-content;
    font-style: italic;
    animation-delay: .35s;
  }

  .vp-footer__tagline {
    width: fit-content;
    margin: 30px 0 0;
    color: var(--heart-primary);
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(23px, 2.7vw, 40px);
    font-weight: 700;
    line-height: 1.18;
    letter-spacing: -.02em;
    text-align: left;
    text-shadow: 0 0 16px var(--heart-glow);
    opacity: 0;
    animation: vpFadeUp .9s ease .65s both;
  }

  .vp-footer__tagline-line {
    display: block;
    width: 100%;
    margin: 0;
    text-align: left;
    white-space: nowrap;
  }

  .vp-footer__tagline-line + .vp-footer__tagline-line {
    margin-top: 7px;
  }

  .vp-heart-scene {
    min-height: 650px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    animation: vpFadeUp 1s ease .35s both;
  }

  .vp-heart-visual {
    position: relative;
    width: min(300px, 76vw);
    height: 290px;
    flex: 0 0 290px;
    display: grid;
    place-items: center;
  }

  .vp-heart-glow {
    position: absolute;
    inset: 6% 0 0;
    width: 280px;
    height: 270px;
    max-width: 90vw;
    margin: auto;
    border-radius: 50%;
    background: radial-gradient(
      ellipse,
      var(--heart-glow),
      transparent 70%
    );
    filter: blur(30px);
    opacity: .58;
    pointer-events: none;
    animation: vpGlowPulse 2.2s ease-in-out infinite;
  }

  .vp-heart-button {
    position: relative;
    z-index: 2;
    width: 245px;
    height: 265px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    outline: none;
  }

  .vp-heart-button:focus-visible {
    outline: 2px solid var(--heart-light);
    outline-offset: 8px;
    border-radius: 24px;
  }

  .vp-heart-image-wrap {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    transform-origin: 50% 58%;
    animation:
      vpHeartBeat 1.35s ease-in-out infinite,
      vpHeartFloat 5s ease-in-out infinite;
  }

  .vp-heart-image {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    filter:
      var(--heart-image-filter)
      drop-shadow(0 18px 14px rgba(0,0,0,.72))
      drop-shadow(0 0 20px var(--heart-glow));
    transform: scale(.86);
    transition: filter .45s ease, transform .3s ease;
    pointer-events: none;
    user-select: none;
  }

  .vp-heart-button:hover .vp-heart-image {
    filter:
      var(--heart-image-filter)
      drop-shadow(0 22px 18px rgba(0,0,0,.78))
      drop-shadow(0 0 36px var(--heart-glow));
    transform: scale(.91);
  }

  .vp-heart-content {
    position: relative;
    z-index: 4;
    width: 100%;
    margin-top: 68px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .vp-heart-caption {
    margin: 0;
    padding: 7px 12px;
    border: 1px solid color-mix(in srgb, var(--heart-light), transparent 78%);
    border-radius: 999px;
    background: color-mix(in srgb, var(--heart-primary), transparent 92%);
    color: var(--heart-light);
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 0 20px color-mix(in srgb, var(--heart-glow), transparent 45%);
    transition: transform .3s ease, background .3s ease;
  }

  .vp-heart-caption:hover {
    transform: translateY(-3px) scale(1.03);
    background: color-mix(in srgb, var(--heart-primary), transparent 84%);
  }

  .vp-heart-caption strong {
    display: block;
    font-size: 14px;
    font-weight: 900;
    line-height: 1.4;
    letter-spacing: .22em;
  }

  .vp-heart-dots {
    margin-top: 24px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .vp-heart-dot {
    width: 7px;
    height: 7px;
    border: 1px solid var(--heart-primary);
    border-radius: 50%;
    background: var(--heart-primary);
    opacity: .27;
    transition: opacity .3s ease, transform .3s ease, box-shadow .3s ease;
  }

  .vp-heart-dot.active {
    background: var(--heart-light);
    border-color: var(--heart-light);
    opacity: 1;
    box-shadow: 0 0 13px var(--heart-glow);
    transform: scale(1.65);
  }

  .vp-heart-color-count {
    margin-top: 16px;
    color: var(--heart-primary);
    font-size: 9px;
    font-weight: 800;
    letter-spacing: .2em;
    text-transform: uppercase;
  }

  .vp-heart-message {
    max-width: 470px;
    margin: 56px 0 0;
    padding: 0 12px;
    color: var(--heart-light);
    font-size: clamp(15px, 1.35vw, 19px);
    font-weight: 800;
    line-height: 1.55;
    letter-spacing: .03em;
    text-align: center;
    text-shadow: 0 0 13px var(--heart-glow);
  }

  .vp-feature {
    padding: 74px 0 82px;
    border-top: 1px solid rgba(242,214,184,.12);
  }

  .vp-feature__layout {
    display: grid;
    grid-template-columns: minmax(270px, .8fr) minmax(0, 1.2fr);
    gap: clamp(45px, 8vw, 110px);
    align-items: center;
  }

  .vp-feature__stage {
    position: relative;
    min-height: 390px;
    display: grid;
    place-items: center;
    perspective: 1100px;
  }

  .vp-feature__orbit {
    position: absolute;
    width: 330px;
    height: 330px;
    border: 1px solid var(--heart-primary);
    border-radius: 50%;
    opacity: .28;
    animation: vpOrbit 18s linear infinite;
  }

  .vp-feature__orbit::before {
    content: "";
    position: absolute;
    inset: 26px;
    border: 1px dashed var(--heart-primary);
    border-radius: 50%;
  }

  .vp-feature__card {
    position: relative;
    z-index: 2;
    width: min(264px, 72vw);
    padding: 10px;
    overflow: hidden;
    border: 1px solid color-mix(in srgb, var(--heart-light), transparent 42%);
    border-radius: 9px;
    background: #181416;
    box-shadow:
      0 38px 65px rgba(0,0,0,.58),
      0 0 36px var(--heart-glow);
    transform: rotateY(-7deg) rotateX(3deg) rotateZ(-2deg);
    animation: vpFloat 5s ease-in-out infinite;
    transition: transform .45s ease;
  }

  .vp-feature__card::after {
    content: "";
    position: absolute;
    inset: 10px;
    background: linear-gradient(
      115deg,
      transparent 28%,
      rgba(255,255,255,.2) 46%,
      transparent 62%
    );
    transform: translateX(-140%);
    animation: vpShine 3.8s ease-in-out infinite;
    pointer-events: none;
  }

  .vp-feature__card:hover {
    transform: rotate(0) scale(1.055);
  }

  .vp-feature__image {
    width: 100%;
    min-height: 280px;
    display: block;
    border-radius: 5px;
    object-fit: cover;
  }

  .vp-section-eyebrow {
    margin: 0 0 16px;
    color: var(--heart-light);
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .23em;
  }

  .vp-section-title {
    max-width: 650px;
    margin: 0;
    color: #f3e9df;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(38px, 5vw, 66px);
    font-weight: 500;
    line-height: .98;
    letter-spacing: -.035em;
  }

  .vp-section-title span {
    display: block;
    color: var(--heart-primary);
    font-style: italic;
    text-shadow: 0 0 18px var(--heart-glow);
  }

  .vp-section-text {
    max-width: 570px;
    margin: 25px 0 0;
    color: #aaa09a;
    font-size: 16px;
    line-height: 1.8;
  }

  .vp-map {
    padding: 82px 0 92px;
    border-top: 1px solid rgba(242,214,184,.12);
  }

  .vp-map__heading {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 30px;
  }

  .vp-map__heading .vp-section-title {
    font-size: clamp(36px, 4.7vw, 62px);
  }

  .vp-map__card {
    position: relative;
    padding: 12px;
    border: 1px solid color-mix(in srgb, var(--heart-light), transparent 62%);
    border-radius: 28px;
    background:
      linear-gradient(145deg, rgba(255,255,255,.11), rgba(255,255,255,.025)),
      #151214;
    box-shadow:
      0 38px 80px rgba(0,0,0,.58),
      0 0 45px color-mix(in srgb, var(--heart-glow), transparent 38%);
    transition: transform .4s ease, box-shadow .4s ease;
  }

  .vp-map__card:hover {
    transform: translateY(-7px);
    box-shadow:
      0 48px 90px rgba(0,0,0,.68),
      0 0 60px var(--heart-glow);
  }

  .vp-map__frame-wrap {
    position: relative;
    height: 440px;
    overflow: hidden;
    border-radius: 18px;
    background: #242124;
  }

  .vp-map__frame {
    width: 100%;
    height: 100%;
    display: block;
    border: 0;
    filter: saturate(.9) contrast(1.05);
  }

  .vp-map__badge {
    position: absolute;
    z-index: 3;
    top: 22px;
    left: 22px;
    max-width: calc(100% - 44px);
    padding: 14px 18px;
    border: 1px solid rgba(255,255,255,.25);
    border-radius: 14px;
    color: #fff;
    background: rgba(15,12,14,.88);
    box-shadow: 0 12px 30px rgba(0,0,0,.35);
    backdrop-filter: blur(12px);
    pointer-events: none;
  }

  .vp-map__badge strong,
  .vp-map__badge span {
    display: block;
  }

  .vp-map__badge strong {
    color: var(--heart-light);
    font-family: Georgia, "Times New Roman", serif;
    font-size: 19px;
  }

  .vp-map__badge span {
    margin-top: 5px;
    color: #bcb2ac;
    font-size: 11px;
    letter-spacing: .08em;
  }

  .vp-map__pin {
    position: absolute;
    z-index: 4;
    right: 26px;
    bottom: 25px;
    width: 58px;
    height: 58px;
    display: grid;
    place-items: center;
    border: 1px solid var(--heart-light);
    border-radius: 50% 50% 50% 8px;
    color: #fff;
    background: var(--heart-primary);
    box-shadow: 0 0 30px var(--heart-glow);
    font-size: 25px;
    transform: rotate(-45deg);
    pointer-events: none;
    animation: vpPinPulse 2s ease-in-out infinite;
  }

  .vp-map__pin span {
    transform: rotate(45deg);
  }

  .vp-map__actions {
    padding: 18px 8px 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 25px;
  }

  .vp-map__address {
    margin: 0;
    color: #bcb2ac;
    font-size: 14px;
    line-height: 1.6;
  }

  .vp-map__button {
    flex: 0 0 auto;
    padding: 13px 21px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1px solid var(--heart-light);
    border-radius: 999px;
    color: #fff;
    background: var(--heart-primary);
    box-shadow: 0 0 20px var(--heart-glow);
    font-size: 13px;
    font-weight: 800;
    letter-spacing: .06em;
    text-decoration: none;
    transition: transform .3s ease, box-shadow .3s ease;
  }

  .vp-map__button:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 30px var(--heart-glow);
  }

  .vp-footer__main {
    padding: 70px 0 66px;
    display: grid;
    grid-template-columns: .8fr 1fr 1.55fr .95fr;
    gap: clamp(34px, 5vw, 70px);
    border-top: 1px solid rgba(242,214,184,.12);
  }

  .vp-footer__column-title {
    margin: 0 0 24px;
    color: var(--heart-light);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .21em;
  }

  .vp-footer__links,
  .vp-contact-list {
    margin: 0;
    padding: 0;
    display: grid;
    list-style: none;
  }

  .vp-contact-list {
    gap: 9px;
  }

  .vp-footer__links a,
  .vp-contact-link {
    position: relative;
    width: fit-content;
    padding: 9px 27px 9px 0;
    display: inline-flex;
    align-items: center;
    color: #bdb4ad;
    text-decoration: none;
    transition: color .3s ease, transform .3s ease;
  }

  .vp-footer__links a::after {
    content: "→";
    position: absolute;
    right: 4px;
    color: var(--heart-light);
    opacity: 0;
    transform: translateX(-7px);
    transition: .3s ease;
  }

  .vp-footer__links a:hover,
  .vp-contact-link:hover {
    color: var(--heart-light);
    transform: translateX(5px);
  }

  .vp-footer__links a:hover::after {
    opacity: 1;
    transform: none;
  }

  .vp-contact-label {
    margin: 13px 0 3px;
    color: #817973;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: .17em;
  }

  .vp-contact-link {
    gap: 10px;
    font-size: 14px;
    line-height: 1.55;
    overflow-wrap: anywhere;
  }

  .vp-office-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  .vp-office + .vp-office {
    padding-left: 30px;
    border-left: 1px solid rgba(244,218,188,.12);
  }

  .vp-office__heading {
    margin: 0 0 14px;
    display: flex;
    align-items: center;
    gap: 9px;
    color: #f0e3d5;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 19px;
    font-weight: 500;
  }

  .vp-office__marker {
    color: var(--heart-primary);
    font-size: 11px;
  }

  .vp-office address {
    margin: 0;
    color: #9f9690;
    font-size: 13px;
    font-style: normal;
    line-height: 1.8;
  }

  .vp-footer__bottom {
    min-height: 88px;
    padding: 27px 0;
    display: flex;
    align-items: center;
    border-top: 1px solid rgba(242,214,184,.11);
    color: #877f79;
    font-size: 12px;
  }

  .vp-footer__bottom p {
    margin: 0;
    letter-spacing: .06em;
  }

  @keyframes vpSweep {
    0% { left: -35%; opacity: 0; }
    25% { opacity: .7; }
    100% { left: 125%; opacity: 0; }
  }

  @keyframes vpFadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: none; }
  }

  @keyframes vpTitleReveal {
    from {
      opacity: 0;
      filter: blur(8px);
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      filter: none;
      transform: none;
    }
  }

  @keyframes vpHeartBeat {
    0%, 100% { scale: 1; }
    10% { scale: 1.075; }
    20% { scale: 1; }
    30% { scale: 1.045; }
    45% { scale: 1; }
  }

  @keyframes vpHeartFloat {
    0%, 100% { translate: 0 0; rotate: -1deg; }
    50% { translate: 0 -7px; rotate: 1deg; }
  }

  @keyframes vpGlowPulse {
    0%, 100% { opacity: .45; transform: scale(.94); }
    50% { opacity: .82; transform: scale(1.06); }
  }

  @keyframes vpOrbit {
    to { transform: rotate(360deg); }
  }

  @keyframes vpFloat {
    0%, 100% { translate: 0 0; }
    50% { translate: 0 -14px; }
  }

  @keyframes vpShine {
    0%, 42% { transform: translateX(-140%); opacity: 0; }
    55% { opacity: .7; }
    72%, 100% { transform: translateX(140%); opacity: 0; }
  }

  @keyframes vpPinPulse {
    0%, 100% {
      scale: 1;
      box-shadow: 0 0 22px var(--heart-glow);
    }
    50% {
      scale: 1.08;
      box-shadow: 0 0 42px var(--heart-glow);
    }
  }

  @media (max-width: 1050px) {
    .vp-footer__main {
      grid-template-columns: .8fr 1fr 1.7fr;
    }

    .vp-footer__policies {
      grid-column: 1 / -1;
    }

    .vp-footer__policies .vp-footer__links {
      grid-template-columns: repeat(3, max-content);
      gap: 0 28px;
    }
  }

  @media (max-width: 820px) {
    .vp-footer__hero {
      grid-template-columns: 1fr;
      min-height: auto;
      gap: 80px;
      padding-bottom: 55px;
    }

    .vp-feature__layout {
      grid-template-columns: 1fr;
    }

    .vp-feature__copy {
      text-align: center;
    }

    .vp-section-text {
      margin-inline: auto;
    }

    .vp-map__heading {
      display: block;
    }

    .vp-map__heading .vp-section-text {
      margin-inline: 0;
    }

    .vp-footer__main {
      grid-template-columns: 1fr 1fr;
    }

    .vp-footer__offices,
    .vp-footer__policies {
      grid-column: 1 / -1;
    }

    .vp-footer__policies .vp-footer__links {
      grid-template-columns: repeat(2, max-content);
    }
  }

  @media (max-width: 620px) {
    .vp-footer__shell {
      width: min(100% - 32px, 1240px);
    }

    .vp-footer__hero {
      padding: 74px 0 45px;
      gap: 72px;
    }

    .vp-footer__title {
      font-size: clamp(38px, 11.5vw, 58px);
    }

    .vp-footer__tagline {
      margin-top: 25px;
      font-size: clamp(22px, 8vw, 35px);
    }

    .vp-footer__tagline-line {
      white-space: normal;
    }

    .vp-heart-scene {
      min-height: 625px;
    }

    .vp-heart-visual {
      width: min(270px, 82vw);
      height: 260px;
      flex-basis: 260px;
    }

    .vp-heart-button {
      width: 225px;
      height: 245px;
    }

    .vp-heart-content {
      margin-top: 72px;
    }

    .vp-heart-caption strong {
      font-size: 12px;
      letter-spacing: .18em;
    }

    .vp-heart-dots {
      gap: 8px;
    }

    .vp-heart-message {
      margin-top: 50px;
      font-size: 14px;
    }

    .vp-feature {
      padding: 60px 0 72px;
    }

    .vp-feature__stage {
      min-height: 350px;
    }

    .vp-feature__orbit {
      width: 290px;
      height: 290px;
      max-width: 90vw;
      max-height: 90vw;
    }

    .vp-section-title {
      font-size: clamp(35px, 11vw, 52px);
    }

    .vp-map {
      padding: 65px 0 74px;
    }

    .vp-map__card {
      padding: 8px;
      border-radius: 21px;
    }

    .vp-map__frame-wrap {
      height: 390px;
      border-radius: 15px;
    }

    .vp-map__badge {
      top: 15px;
      left: 15px;
      padding: 11px 13px;
    }

    .vp-map__pin {
      right: 18px;
      bottom: 20px;
      width: 50px;
      height: 50px;
      font-size: 21px;
    }

    .vp-map__actions {
      padding: 17px 6px 7px;
      flex-direction: column;
      align-items: stretch;
    }

    .vp-map__button {
      justify-content: center;
    }

    .vp-footer__main {
      padding: 55px 0;
      grid-template-columns: 1fr;
      gap: 44px;
    }

    .vp-footer__offices,
    .vp-footer__policies {
      grid-column: auto;
    }

    .vp-footer__policies .vp-footer__links {
      grid-template-columns: 1fr;
    }

    .vp-office-list {
      grid-template-columns: 1fr;
      gap: 28px;
    }

    .vp-office + .vp-office {
      padding: 27px 0 0;
      border-top: 1px solid rgba(244,218,188,.12);
      border-left: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .vp-footer *,
    .vp-footer *::before,
    .vp-footer *::after {
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: .01ms !important;
    }
  }
`;

type HeartColor = (typeof heartColors)[number];

function MedicalHeart({
  color,
  colorIndex,
  onChangeColor,
}: {
  color: HeartColor;
  colorIndex: number;
  onChangeColor: () => void;
}) {
  return (
    <div className="vp-heart-scene">
      <div className="vp-heart-visual">
        <span className="vp-heart-glow" aria-hidden="true" />

        <button
          className="vp-heart-button"
          type="button"
          onClick={onChangeColor}
          aria-label={`Medical heart. Current color is ${color.name}. Click to change its color.`}
        >
          <span className="vp-heart-image-wrap">
            <img
              className="vp-heart-image"
              src={heartImage}
              alt={`${color.name} anatomical medical heart`}
              draggable={false}
            />
          </span>
        </button>
      </div>

      <div className="vp-heart-content">
        <button
          className="vp-heart-caption"
          type="button"
          onClick={onChangeColor}
          aria-label="Touch the heart to change its color"
        >
          <strong>TOUCH THE HEART</strong>
        </button>

        <div
          className="vp-heart-dots"
          aria-label={`Heart color ${colorIndex + 1} of 10`}
        >
          {heartColors.map((heartColor, index) => (
            <span
              key={heartColor.name}
              className={`vp-heart-dot ${
                index === colorIndex ? "active" : ""
              }`}
            />
          ))}
        </div>

        <span className="vp-heart-color-count">
          {colorIndex + 1} of 10 colors · {color.name}
        </span>

        <p className="vp-heart-message">
          Think Nursing. Feel the Pulse. Shape the Future.
        </p>
      </div>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [colorIndex, setColorIndex] = useState(0);
  const color = heartColors[colorIndex];

  const footerColorStyle = {
    "--heart-primary": color.primary,
    "--heart-light": color.light,
    "--heart-glow": color.glow,
    "--heart-image-filter": color.filter,
  } as React.CSSProperties;

  const changeColor = () => {
    setColorIndex((current) => (current + 1) % heartColors.length);
  };

  return (
    <>
      <style>{footerStyles}</style>

      <footer className="vp-footer" style={footerColorStyle}>
        <div className="vp-footer__bg" aria-hidden="true" />

        <div className="vp-footer__shell">
          <section className="vp-footer__hero" aria-labelledby="footer-title">
            <div className="vp-footer__brand">
              <p className="vp-footer__eyebrow">A LEGACY OF LEARNING</p>

              <h2 id="footer-title" className="vp-footer__title">
                <span>VIJAYAM</span>
                <span className="vp-footer__title-accent">PUBLICATIONS</span>
              </h2>

              <p className="vp-footer__tagline">
                <strong className="vp-footer__tagline-line">
                  Your Knowledge.
                </strong>
                <strong className="vp-footer__tagline-line">
                  Your Future.
                </strong>
                <strong className="vp-footer__tagline-line">
                  Your Vijayam.
                </strong>
              </p>
            </div>

            <MedicalHeart
              color={color}
              colorIndex={colorIndex}
              onChangeColor={changeColor}
            />
          </section>

          <section className="vp-feature" aria-labelledby="feature-title">
            <div className="vp-feature__layout">
              <div className="vp-feature__stage">
                <span className="vp-feature__orbit" aria-hidden="true" />

                <div className="vp-feature__card">
                  <img
                    className="vp-feature__image"
                    src={featuredImage}
                    alt="International Yoga Day theme poster"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="vp-feature__copy">
                <p className="vp-section-eyebrow">
                  LEARNING BEYOND THE CLASSROOM
                </p>
                <h3 id="feature-title" className="vp-section-title">
                  Knowledge in motion.
                  <span>Wellness in life.</span>
                </h3>
                <p className="vp-section-text">
                  Explore the connection between education, healthcare and
                  holistic well-being through the Vijayam learning community.
                </p>
              </div>
            </div>
          </section>

          <section className="vp-map" aria-labelledby="map-title">
            <div className="vp-map__heading">
              <div>
                <p className="vp-section-eyebrow">FIND VIJAYAM PUBLICATIONS</p>
                <h3 id="map-title" className="vp-section-title">
                  Visit our
                  <span>Vijayawada location.</span>
                </h3>
              </div>

              <p className="vp-section-text">
                Explore the live map, zoom in for nearby landmarks, or open the
                location in Google Maps for directions.
              </p>
            </div>

            <div className="vp-map__card">
              <div className="vp-map__frame-wrap">
                <div className="vp-map__badge">
                  <strong>Vijayam Publications</strong>
                  <span>HANUMANPET · VIJAYAWADA</span>
                </div>

                <iframe
                  className="vp-map__frame"
                  src={googleMapsEmbedUrl}
                  title="Vijayam Publications location on Google Maps"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />

                <div className="vp-map__pin" aria-hidden="true">
                  <span>●</span>
                </div>
              </div>

              <div className="vp-map__actions">
                <p className="vp-map__address">
                  #14-7-13, Sambhamurty Road, Hanumanpet,
                  <br />
                  Vijayawada-520003, Andhra Pradesh
                </p>

                <a
                  className="vp-map__button"
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Vijayam Publications in Google Maps"
                >
                  Open in Google Maps <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </section>

          <section
            className="vp-footer__main"
            aria-label="Footer navigation, contact details and offices"
          >
            <nav aria-label="Footer navigation">
              <h3 className="vp-footer__column-title">EXPLORE</h3>
              <ul className="vp-footer__links">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <section>
              <h3 className="vp-footer__column-title">CONTACT</h3>

              <p className="vp-contact-label">PHONE</p>
              <ul className="vp-contact-list">
                {contactDetails.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      className="vp-contact-link"
                      href={`tel:${phone.replace(/\s/g, "")}`}
                    >
                      ☎ {phone}
                    </a>
                  </li>
                ))}
              </ul>

              <p className="vp-contact-label">EMAIL</p>
              <a
                className="vp-contact-link"
                href={`mailto:${contactDetails.email}`}
              >
                ✉ {contactDetails.email}
              </a>
            </section>

            <section className="vp-footer__offices">
              <h3 className="vp-footer__column-title">OFFICES</h3>

              <div className="vp-office-list">
                {offices.map((office) => (
                  <article className="vp-office" key={office.id}>
                    <h4 className="vp-office__heading">
                      <span className="vp-office__marker" aria-hidden="true">
                        ●
                      </span>
                      {office.name}
                    </h4>
                    <address>{office.address}</address>
                  </article>
                ))}
              </div>
            </section>

            <nav className="vp-footer__policies" aria-label="Policies">
              <h3 className="vp-footer__column-title">POLICIES</h3>
              <ul className="vp-footer__links">
                {policyLinks.map((policy) => (
                  <li key={policy.name}>
                    <a href={policy.href}>{policy.name}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          <div className="vp-footer__bottom">
            <p>© {year} Vijayam Publications. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}