"use client";

import { useEffect, useRef } from "react";

/**
 * Curved "glass display" overlay — shader.se #about-us style.
 *
 * A full-screen triangle rendered via raw WebGL. Each pixel evaluates a
 * convex height field (parabolic profile) and analytically derives a
 * surface normal. The lighting model blends a fresnel rim, tight and wide
 * specular highlights from a pointer-driven key light, cheap environment
 * reflections, and an animated sheen band.
 *
 * The bulge intensifies as the user scrolls — peaking between ~0.35-0.55
 * viewports — then relaxes. Exactly how shader.se feels.
 */

const VERT = /* glsl */ `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAG = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform float uBulge;
uniform float uDark;
uniform float uScroll;

const float CAMERA_Z = 5.0;

/* ---- helpers ---- */
float saturate(float x) { return clamp(x, 0.0, 1.0); }

float smoothstepE(float edge0, float edge1, float x) {
  float t = saturate((x - edge0) / max(edge1 - edge0, 0.0001));
  return t * t * (3.0 - 2.0 * t);
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);

  /* ---- panel-coords, -1..1 on both axes ---- */
  vec2 p = vUv * 2.0 - 1.0;
  float r2 = dot(p, p);
  float radius = sqrt(r2);

  /* =============================================================
     SCROLL-DRIVEN BULGE LOBE — the shader.se signature
     -------------------------------------------------------------
     uScroll 0 = hero fully visible, ~1 = scrolled one viewport.
     The bulge ramps up sharply, peaks around 0.35-0.50, then
     decays — modelled as a sine lobe gated by two smoothsteps.
  ============================================================= */
  float lobe = sin(clamp(uScroll, 0.0, 1.0) * 3.14159265);
  float rise  = smoothstepE(0.0, 0.32, uScroll);
  float fall  = 1.0 - smoothstepE(0.48, 0.78, uScroll);
  float scrollIntensity = lobe * rise * fall;

  /* base convex height + scroll boost */
  float bulgeAmount = uBulge * (0.62 + scrollIntensity * 1.1);

  /* ---- convex screen profile (parabolic) ---- */
  float base   = saturate(1.0 - 0.52 * r2);
  float profile = pow(base, 1.55);
  float height  = bulgeAmount * profile;

  /* ---- analytic normal from the height field ---- */
  float slope = bulgeAmount * 1.50 * pow(max(base, 0.0001), 0.30) * (-1.05);
  vec2 grad = p * slope;
  vec3 normal = normalize(vec3(-grad.x / max(aspect, 0.001), -grad.y, 1.0));

  vec3 surface = vec3(p.x * aspect, p.y, height);
  vec3 viewDir = normalize(vec3(0.0, 0.0, CAMERA_Z) - surface);

  float ndv = max(dot(normal, viewDir), 0.0);
  float fresnel = pow(1.0 - ndv, 2.9);

  /* ---- cheap environment ---- */
  vec3 refl = reflect(-viewDir, normal);
  float sky  = clamp(refl.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 env = mix(
    vec3(0.14, 0.10, 0.07),
    vec3(1.0, 0.97, 0.89),
    pow(sky, 1.25)
  );

  /* ---- key light follows pointer ---- */
  vec3 keyLight = normalize(vec3(
    (uMouse.x - 0.5) * 3.0,
    (uMouse.y - 0.5) * 2.6,
    1.2
  ));
  vec3 halfVec = normalize(keyLight + viewDir);
  float noh = max(dot(normal, halfVec), 0.0);

  float specTight = pow(noh, 90.0);
  float specWide  = pow(noh, 16.0);

  /* ---- animated sheen across the glass ---- */
  float sheen      = 0.5 + 0.5 * sin(vUv.x * 3.3 + vUv.y * 1.8 + uTime * 0.28);
  float glassSheen = specWide * mix(0.38, 1.0, sheen);

  /* ---- travelling reflection sweep ---- */
  float sweepPhase = sin(vUv.x * 5.8 - vUv.y * 1.2 - uTime * 0.55) * 0.5 + 0.5;
  float sweepMask  = smoothstep(0.10, 0.90, sweepPhase);
  float sweepSpec  = sweepMask * pow(noh, 26.0);

  /* ---- edge / rim ---- */
  float edge   = smoothstep(0.36, 1.18, radius);
  float border = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
  float rim    = saturate(pow(1.0 - border * 15.0, 1.95));

  /* ---- colour mixing ---- */
  vec3 gold = vec3(0.98, 0.82, 0.48);
  vec3 ice  = vec3(0.87, 0.94, 1.00);

  vec3 color = mix(gold, ice, specTight * 0.72 + sky * 0.28);
  color = mix(color, env, 0.26 + fresnel * 0.30);
  color += ice  * specTight  * 0.64;
  color += gold * glassSheen * 0.16;
  color += vec3(1.0, 0.96, 0.90) * sweepSpec * 0.22;
  color += ice  * fresnel    * 0.18;

  /* ---- alpha: complete convex lens — clear centre, luminous rim ---- */
  float alpha =
    fresnel    * 0.40 +
    specTight  * 0.42 +
    glassSheen * 0.07 +
    sweepSpec  * 0.09 +
    edge       * 0.14 +
    rim        * 0.20;

  /*
    Keep the CENTRE of the lens genuinely clear so the headline stays
    perfectly readable — reflections gather toward the rim, exactly like
    a real convex glass. The falloff is smooth (no hard ring).
  */
  float centreClear = smoothstep(0.20, 0.94, radius);
  alpha *= mix(0.02, 1.0, centreClear);

  /* bulge reflections firm up gently at the scroll peak */
  alpha *= 1.0 + scrollIntensity * 0.20;

  alpha *= mix(1.0, 0.72, uDark);
  alpha  = clamp(alpha, 0.0, 0.34);

  gl_FragColor = vec4(color, alpha);
}
`;

/* ================================================================== */

function compile(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("distortion shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/* ================================================================== */

export default function BulgeDistortion() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
      }) ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("distortion program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    /* full-screen triangle */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );

    const aPos = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uMouse      = gl.getUniformLocation(program, "uMouse");
    const uTime       = gl.getUniformLocation(program, "uTime");
    const uBulge      = gl.getUniformLocation(program, "uBulge");
    const uDark       = gl.getUniformLocation(program, "uDark");
    const uScroll     = gl.getUniformLocation(program, "uScroll");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const bulgeStrength = coarse ? 1.4 : 2.4;

    let w = 0;
    let h = 0;
    let frame = 0;
    let elapsed = 0.0;
    let last = performance.now();

    const target  = { x: 0.62, y: 0.6 };
    const current = { x: 0.62, y: 0.6 };

    let scrollTarget  = 0;
    let scrollCurrent = 0;

    const readScroll = () => {
      scrollTarget = Math.min(
        Math.max(window.scrollY / (window.innerHeight * 0.7), 0),
        1.15,
      );
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, coarse ? 1.4 : 1.75);
      const rect = canvas.getBoundingClientRect();
      w = Math.max(Math.round(rect.width * ratio), 1);
      h = Math.max(Math.round(rect.height * ratio), 1);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };

    const move = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1.0 - e.clientY / window.innerHeight;
    };

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!reduced) {
        elapsed += dt;
        const ease = 1.0 - Math.exp(-dt * 8);
        current.x += (target.x - current.x) * ease;
        current.y += (target.y - current.y) * ease;
      }

      const isDark = document.documentElement.classList.contains("dark");
      scrollCurrent += (scrollTarget - scrollCurrent) * (1.0 - Math.exp(-dt * 4.5));

      gl.uniform2f(uResolution, w, h);
      gl.uniform2f(uMouse, current.x, current.y);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uBulge, bulgeStrength);
      gl.uniform1f(uDark, isDark ? 1.0 : 0.0);
      gl.uniform1f(uScroll, scrollCurrent);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });

    if (!reduced && !coarse) {
      window.addEventListener("mousemove", move, { passive: true });
    }

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("mousemove", move);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <div className="vp-bulge-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="vp-bulge-canvas" />
    </div>
  );
}