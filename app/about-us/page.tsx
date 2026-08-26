"use client";

import { useMemo, useState } from "react";

type DistState = {
  id: string;
  code: string;
  name: string;
  number: number;
  path: string;
};

const STATES: DistState[] = [
  { id: "andhra-pradesh", code: "AP", name: "ANDHRA PRADESH", number: 1, path: "M230 201 L260 198 L282 223 L274 254 L246 272 L226 257 L233 233 Z" },
  { id: "telangana", code: "TS", name: "TELANGANA", number: 2, path: "M214 180 L242 178 L248 200 L226 213 L207 201 Z" },
  { id: "tamil-nadu", code: "TN", name: "TAMIL NADU", number: 3, path: "M193 253 L226 247 L238 274 L230 306 L202 316 L183 299 L192 274 Z" },
  { id: "karnataka", code: "KA", name: "KARNATAKA", number: 4, path: "M179 199 L214 196 L226 228 L212 260 L182 265 L164 233 Z" },
  { id: "kerala", code: "KL", name: "KERALA", number: 5, path: "M170 246 L183 244 L190 275 L181 303 L168 300 L162 268 Z" },
  { id: "odisha", code: "OD", name: "ODISHA", number: 6, path: "M246 160 L280 158 L292 182 L280 205 L251 206 L238 187 Z" },
  { id: "west-bengal", code: "WB", name: "WEST BENGAL", number: 7, path: "M294 129 L313 126 L322 148 L315 172 L300 183 L289 163 Z" },
  { id: "maharashtra", code: "MH", name: "MAHARASHTRA", number: 8, path: "M144 154 L198 154 L221 184 L182 210 L132 204 L118 179 Z" },
  { id: "gujarat", code: "GJ", name: "GUJARAT", number: 9, path: "M98 147 L132 145 L146 172 L120 194 L92 184 L84 164 Z" },
  { id: "rajasthan", code: "RJ", name: "RAJASTHAN", number: 10, path: "M134 91 L181 92 L196 122 L170 151 L127 145 L116 116 Z" },
  { id: "jammu-kashmir", code: "JK", name: "JAMMU & KASHMIR", number: 11, path: "M166 30 L201 25 L228 40 L217 62 L187 70 L160 61 Z" },
];

function centroid(path: string) {
  const pts = path
    .replace(/[A-Z]/g, "")
    .trim()
    .split("L")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const [x, y] = p.split(" ").map(Number);
      return { x, y };
    });
  const x = pts.reduce((a, p) => a + p.x, 0) / pts.length;
  const y = pts.reduce((a, p) => a + p.y, 0) / pts.length;
  return { x, y };
}

export default function AboutUsPage() {
  const [activeId, setActiveId] = useState<string>("andhra-pradesh");

  const enriched = useMemo(
    () => STATES.map((s) => ({ ...s, c: centroid(s.path) })),
    []
  );

  const active = enriched.find((s) => s.id === activeId) || enriched[0];

  return (
    <>
      <style>{`
        :root { background:#050608; color:#fff; }
        * { box-sizing:border-box; }
        body { margin:0; background:#050608; font-family: Inter, system-ui, sans-serif; }

        .wrap{
          min-height:100vh;
          padding:20px;
          display:grid;
          grid-template-columns: 1fr 320px;
          gap:16px;
          background:#050608;
        }

        .map-box{
          position:relative;
          min-height:72vh;
          border:1px solid rgba(255,255,255,.08);
          border-radius:10px;
          overflow:hidden;
          background:#050608;
          display:grid;
          place-items:center;
        }

        .india-img-wrap{
          position:absolute;
          inset:7%;
          display:grid;
          place-items:center;
          background:#050608;
        }

        .india-img{
          width:100%;
          height:100%;
          object-fit:contain;
          mix-blend-mode:multiply;
          filter: contrast(1.2) brightness(.8) saturate(.85);
          opacity:.96;
          pointer-events:none;
          user-select:none;
        }

        .overlay{
          position:absolute;
          inset:7%;
          width:86%;
          height:86%;
        }

        .state{
          fill: transparent;
          stroke: rgba(241,201,114,.45);
          stroke-width:1.2;
          cursor:pointer;
          transition: transform .18s ease, fill .18s ease, stroke .18s ease, filter .18s ease;
          transform-box: fill-box;
          transform-origin: center;
        }

        .state:hover{
          stroke: rgba(255,228,165,.9);
          fill: rgba(241,201,114,.14);
        }

        .state.active{
          fill: rgba(241,201,114,.35);
          stroke: rgba(255,232,176,1);
          stroke-width:1.6;
          transform: translateY(-6px) scale(1.04);
          filter: drop-shadow(0 0 10px rgba(241,201,114,.7));
        }

        .node{
          fill:#f3cf7b;
          pointer-events:none;
        }

        .label{
          fill:#ffe8b0;
          font-size:8px;
          font-weight:700;
          letter-spacing:.04em;
          paint-order:stroke;
          stroke:#050608;
          stroke-width:2px;
          pointer-events:none;
        }

        .side{
          border:1px solid rgba(255,255,255,.08);
          border-radius:10px;
          padding:12px;
          background:rgba(255,255,255,.02);
        }

        .title{
          font-size:.72rem;
          letter-spacing:.14em;
          color:#ddb763;
          font-weight:800;
          margin-bottom:10px;
        }

        .list{
          display:grid;
          gap:7px;
        }

        .btn{
          width:100%;
          text-align:left;
          border:1px solid rgba(255,255,255,.12);
          border-radius:8px;
          background:rgba(255,255,255,.02);
          color:rgba(255,255,255,.85);
          padding:9px 10px;
          font-size:.74rem;
          cursor:pointer;
          transition:.18s;
        }

        .btn:hover,.btn.active{
          border-color: rgba(241,201,114,.85);
          background: rgba(241,201,114,.13);
          color:#ffeab8;
          transform: translateX(2px);
        }

        .meta{
          margin-top:12px;
          padding-top:10px;
          border-top:1px solid rgba(255,255,255,.09);
          font-size:.72rem;
          color:rgba(255,255,255,.8);
        }

        @media (max-width: 900px){
          .wrap{ grid-template-columns:1fr; }
          .map-box{ min-height:58vh; }
        }
      `}</style>

      <section className="wrap" aria-label="About us India map states">
        <div className="map-box">
          <div className="india-img-wrap">
            <img
              src="/images/india.jpg"
              alt="India map"
              className="india-img"
            />
          </div>

          <svg className="overlay" viewBox="70 20 270 310">
            {enriched.map((s) => (
              <path
                key={s.id}
                d={s.path}
                className={`state ${activeId === s.id ? "active" : ""}`}
                onClick={() => setActiveId(s.id)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${s.name}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveId(s.id);
                  }
                }}
              />
            ))}

            <circle cx={active.c.x} cy={active.c.y} r="3" className="node" />
            <text x={active.c.x + 6} y={active.c.y - 6} className="label">
              {active.code} — {active.name}
            </text>
          </svg>
        </div>

        <aside className="side">
          <div className="title">11 DISTRIBUTION STATES</div>
          <div className="list">
            {enriched.map((s) => (
              <button
                key={s.id}
                className={`btn ${activeId === s.id ? "active" : ""}`}
                onClick={() => setActiveId(s.id)}
                aria-pressed={activeId === s.id}
              >
                {String(s.number).padStart(2, "0")} {s.code} — {s.name}
              </button>
            ))}
          </div>

          <div className="meta">
            Selected: <b>{active.name}</b>
          </div>
        </aside>
      </section>
    </>
  );
}