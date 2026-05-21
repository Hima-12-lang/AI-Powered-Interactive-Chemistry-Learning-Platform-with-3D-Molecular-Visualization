import { Atom, FlaskConical, ScanSearch, SplitSquareHorizontal, Zap, Beaker, TrendingUp, Droplets } from "lucide-react";
import { useState, useCallback } from "react";

// ─── Periodic Trends Mini-Explorer ─────────────────────────────────────────
const periodicData = [
  { symbol: "H",  name: "Hydrogen",   Z: 1,  EN: 2.20, IE: 1312, AR: 53,  group: "Nonmetal" },
  { symbol: "Li", name: "Lithium",    Z: 3,  EN: 0.98, IE: 520,  AR: 167, group: "Alkali Metal" },
  { symbol: "C",  name: "Carbon",     Z: 6,  EN: 2.55, IE: 1086, AR: 77,  group: "Nonmetal" },
  { symbol: "N",  name: "Nitrogen",   Z: 7,  EN: 3.04, IE: 1402, AR: 75,  group: "Nonmetal" },
  { symbol: "O",  name: "Oxygen",     Z: 8,  EN: 3.44, IE: 1314, AR: 73,  group: "Nonmetal" },
  { symbol: "F",  name: "Fluorine",   Z: 9,  EN: 3.98, IE: 1681, AR: 64,  group: "Halogen" },
  { symbol: "Na", name: "Sodium",     Z: 11, EN: 0.93, IE: 496,  AR: 186, group: "Alkali Metal" },
  { symbol: "Mg", name: "Magnesium",  Z: 12, EN: 1.31, IE: 738,  AR: 160, group: "Alkaline Earth" },
  { symbol: "Cl", name: "Chlorine",   Z: 17, EN: 3.16, IE: 1251, AR: 99,  group: "Halogen" },
  { symbol: "K",  name: "Potassium",  Z: 19, EN: 0.82, IE: 419,  AR: 243, group: "Alkali Metal" },
  { symbol: "Ca", name: "Calcium",    Z: 20, EN: 1.00, IE: 590,  AR: 197, group: "Alkaline Earth" },
  { symbol: "Fe", name: "Iron",       Z: 26, EN: 1.83, IE: 762,  AR: 156, group: "Transition Metal" },
];

const groupColors = {
  "Nonmetal": "#5bb8ff", "Alkali Metal": "#f59e0b", "Halogen": "#22c55e",
  "Alkaline Earth": "#a78bfa", "Transition Metal": "#fb923c"
};

function PeriodicTrendsMini({ currentElement }) {
  const [property, setProperty] = useState("EN");
  const [hoveredEl, setHoveredEl] = useState(null);

  const propConfig = {
    EN:  { label: "Electronegativity", unit: "(Pauling)", max: 4.0, color: "#5bb8ff" },
    IE:  { label: "Ionization Energy", unit: "kJ/mol",   max: 1800, color: "#39ff85" },
    AR:  { label: "Atomic Radius",     unit: "pm",       max: 260,  color: "#b99cff" }
  };
  const cfg = propConfig[property];
  const highlighted = periodicData.find(d => d.symbol === currentElement?.toUpperCase?.() || d.name === currentElement);

  return (
    <div className="rail-card bottom-group" style={{ minWidth: "min(480px, 90vw)" }}>
      <div className="section-heading">⚛️ Periodic Trends Explorer</div>
      <div style={{ display: "flex", gap: 6, margin: "10px 0 8px", flexWrap: "wrap" }}>
        {Object.entries(propConfig).map(([key, { label }]) => (
          <button key={key} onClick={() => setProperty(key)}
            style={{ padding: "5px 12px", borderRadius: 999, fontSize: "0.76rem", fontWeight: 800, cursor: "pointer", border: property === key ? "none" : "1px solid var(--border)", background: property === key ? cfg.color : "rgba(255,255,255,0.08)", color: property === key ? "#071510" : "#effcff" }}>
            {label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {periodicData.map(el => {
          const val = el[property];
          const pct = Math.round((val / cfg.max) * 100);
          const isHighlighted = highlighted?.symbol === el.symbol;
          return (
            <div key={el.symbol}
              onMouseEnter={() => setHoveredEl(el)}
              onMouseLeave={() => setHoveredEl(null)}
              style={{
                width: 48, cursor: "pointer",
                borderRadius: 10, padding: "6px 4px 4px",
                background: isHighlighted ? `${cfg.color}33` : "rgba(255,255,255,0.07)",
                border: isHighlighted ? `2px solid ${cfg.color}` : "1px solid rgba(141,230,232,0.18)",
                textAlign: "center", transition: "all 0.15s"
              }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 900, color: groupColors[el.group] ?? "#f4fdff" }}>{el.symbol}</div>
              <div style={{ height: 3, background: `rgba(255,255,255,0.12)`, borderRadius: 999, margin: "3px 0 2px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: cfg.color, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: "0.58rem", color: "var(--muted)" }}>{val}</div>
            </div>
          );
        })}
      </div>
      {hoveredEl && (
        <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 12, background: "rgba(255,255,255,0.07)", fontSize: "0.82rem", color: "#f4fdff", display: "flex", gap: 10, flexWrap: "wrap" }}>
          <strong style={{ color: groupColors[hoveredEl.group] }}>{hoveredEl.name} ({hoveredEl.symbol})</strong>
          <span>Z={hoveredEl.Z}</span>
          <span>EN={hoveredEl.EN}</span>
          <span>IE={hoveredEl.IE} kJ/mol</span>
          <span>r={hoveredEl.AR} pm</span>
        </div>
      )}
    </div>
  );
}

// ─── Bond Energy Calculator ──────────────────────────────────────────────────
const bondEnergies = {
  "H-H":  436, "H-C":  413, "H-N":  391, "H-O":  459, "H-Cl": 432,
  "C-C":  347, "C=C":  614, "C≡C":  839,
  "C-N":  305, "C=N":  615, "C≡N":  891,
  "C-O":  358, "C=O":  799,
  "N-N":  163, "N=N":  418, "N≡N":  945,
  "O-O":  146, "O=O":  498,
  "Cl-Cl":243, "Na-Cl":412
};

function BondEnergyCalc() {
  const [broken, setBroken] = useState(["H-H", "Cl-Cl"]);
  const [formed, setFormed] = useState(["H-Cl", "H-Cl"]);
  const [newBroken, setNewBroken] = useState("H-H");
  const [newFormed, setNewFormed] = useState("H-Cl");

  const totalBroken = broken.reduce((s, b) => s + (bondEnergies[b] ?? 0), 0);
  const totalFormed = formed.reduce((s, f) => s + (bondEnergies[f] ?? 0), 0);
  const dH = totalBroken - totalFormed;

  return (
    <div className="rail-card bottom-group" style={{ minWidth: "min(400px, 90vw)" }}>
      <div className="section-heading">⚡ Bond Energy Calculator</div>
      <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: 10 }}>ΔH = Σ(bonds broken) − Σ(bonds formed)</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: "0.74rem", color: "#ff9a9a", fontWeight: 800, marginBottom: 6 }}>BONDS BROKEN (+energy in)</div>
          {broken.map((b, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 8px", borderRadius: 8, background: "rgba(255,90,90,0.1)", marginBottom: 4, fontSize: "0.82rem" }}>
              <span>{b}</span>
              <span style={{ color: "#ff9a9a", fontWeight: 800 }}>+{bondEnergies[b] ?? "?"}</span>
              <button onClick={() => setBroken(broken.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: "#ff9a9a", cursor: "pointer", padding: 0, fontSize: "0.9rem" }}>✕</button>
            </div>
          ))}
          <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
            <select value={newBroken} onChange={e => setNewBroken(e.target.value)} style={{ flex: 1, borderRadius: 8, border: "1px solid var(--border)", background: "rgba(255,255,255,0.08)", color: "#f4fdff", padding: "4px 6px", fontSize: "0.78rem" }}>
              {Object.keys(bondEnergies).map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <button onClick={() => setBroken([...broken, newBroken])} style={{ padding: "4px 8px", borderRadius: 8, border: "1px solid rgba(255,90,90,0.4)", background: "rgba(255,90,90,0.15)", color: "#ff9a9a", cursor: "pointer", fontSize: "0.8rem" }}>Add</button>
          </div>
        </div>
        <div>
          <div style={{ fontSize: "0.74rem", color: "#9dffbd", fontWeight: 800, marginBottom: 6 }}>BONDS FORMED (−energy out)</div>
          {formed.map((f, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 8px", borderRadius: 8, background: "rgba(57,255,133,0.1)", marginBottom: 4, fontSize: "0.82rem" }}>
              <span>{f}</span>
              <span style={{ color: "#9dffbd", fontWeight: 800 }}>−{bondEnergies[f] ?? "?"}</span>
              <button onClick={() => setFormed(formed.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: "#9dffbd", cursor: "pointer", padding: 0, fontSize: "0.9rem" }}>✕</button>
            </div>
          ))}
          <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
            <select value={newFormed} onChange={e => setNewFormed(e.target.value)} style={{ flex: 1, borderRadius: 8, border: "1px solid var(--border)", background: "rgba(255,255,255,0.08)", color: "#f4fdff", padding: "4px 6px", fontSize: "0.78rem" }}>
              {Object.keys(bondEnergies).map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <button onClick={() => setFormed([...formed, newFormed])} style={{ padding: "4px 8px", borderRadius: 8, border: "1px solid rgba(57,255,133,0.4)", background: "rgba(57,255,133,0.12)", color: "#9dffbd", cursor: "pointer", fontSize: "0.8rem" }}>Add</button>
          </div>
        </div>
      </div>
      <div style={{ padding: "10px 14px", borderRadius: 14, background: dH < 0 ? "rgba(57,255,133,0.12)" : "rgba(255,90,90,0.12)", border: `1px solid ${dH < 0 ? "rgba(57,255,133,0.4)" : "rgba(255,90,90,0.4)"}`, textAlign: "center" }}>
        <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Estimated ΔH_rxn</div>
        <div style={{ fontSize: "1.4rem", fontWeight: 900, color: dH < 0 ? "#9dffbd" : "#ff9a9a" }}>{dH > 0 ? "+" : ""}{dH} kJ/mol</div>
        <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: 2 }}>{dH < 0 ? "Exothermic — heat released 🔥" : dH > 0 ? "Endothermic — heat absorbed 🧊" : "Thermoneutral"}</div>
      </div>
    </div>
  );
}

// ─── pH Simulator ────────────────────────────────────────────────────────────
function PhSimulator() {
  const [pH, setPH] = useState(7);
  const solutions = [
    { name: "Gastric acid", pH: 1.5 }, { name: "Lemon juice", pH: 2.3 },
    { name: "Vinegar", pH: 2.9 }, { name: "Coffee", pH: 5.0 },
    { name: "Rain water", pH: 5.6 }, { name: "Pure water", pH: 7.0 },
    { name: "Blood", pH: 7.4 }, { name: "Sea water", pH: 8.2 },
    { name: "Baking soda", pH: 8.3 }, { name: "Bleach", pH: 12.5 },
    { name: "Drain cleaner", pH: 14 }
  ];
  const getColor = (p) => {
    if (p < 3) return "#ef4444";
    if (p < 6) return "#f97316";
    if (p < 7.5) return "#22c55e";
    if (p < 10) return "#3b82f6";
    return "#a855f7";
  };
  const color = getColor(pH);
  const concentration = pH <= 7
    ? `[H⁺] = 10⁻${pH.toFixed(1)} = ${(10 ** -pH).toExponential(2)} mol/L`
    : `[OH⁻] = 10⁻${(14 - pH).toFixed(1)} = ${(10 ** -(14 - pH)).toExponential(2)} mol/L`;

  return (
    <div className="rail-card bottom-group" style={{ minWidth: "min(420px, 90vw)" }}>
      <div className="section-heading">🧪 pH / Acid-Base Simulator</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "10px 0" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: color, boxShadow: `0 0 20px ${color}88`, display: "grid", placeItems: "center", fontSize: "1.1rem", fontWeight: 900, color: "#fff", flexShrink: 0 }}>
          {pH.toFixed(1)}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "0.82rem", fontWeight: 800, color }}>
            {pH < 6.5 ? "Acidic" : pH > 7.5 ? "Basic (Alkaline)" : "Neutral"}
          </div>
          <div style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "monospace" }}>{concentration}</div>
        </div>
      </div>
      <div style={{ position: "relative", height: 18, borderRadius: 999, background: "linear-gradient(to right,#ef4444,#f97316,#eab308,#22c55e,#3b82f6,#a855f7)", marginBottom: 8 }}>
        <div style={{ position: "absolute", left: `${(pH / 14) * 100}%`, top: -4, transform: "translateX(-50%)", width: 14, height: 26, borderRadius: 4, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.4)", border: `2px solid ${color}`, transition: "left 0.15s" }} />
      </div>
      <input type="range" min="0" max="14" step="0.1" value={pH} onChange={e => setPH(Number(e.target.value))}
        style={{ width: "100%", marginBottom: 10, accentColor: color }} />
      <div style={{ display: "flex", gap: "0 6px", flexWrap: "wrap" }}>
        {solutions.map(s => (
          <button key={s.name} onClick={() => setPH(s.pH)}
            style={{ padding: "4px 9px", fontSize: "0.7rem", borderRadius: 999, cursor: "pointer", marginBottom: 4, border: `1px solid ${getColor(s.pH)}44`, background: Math.abs(s.pH - pH) < 0.2 ? `${getColor(s.pH)}33` : "rgba(255,255,255,0.07)", color: getColor(s.pH), fontWeight: 700 }}>
            {s.name} ({s.pH})
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Structure Views (enhanced Lab View) ────────────────────────────────────
function StructureViews({ object }) {
  const views = [
    { label: "Ball-and-stick", desc: "Atoms as spheres, bonds as cylinders. Best for showing geometry and bond angles.", icon: "⚛️" },
    { label: "Space filling", desc: "Atoms at van der Waals radii. Shows actual molecular volume and shape.", icon: "🔵" },
    { label: "Electron density", desc: "Colour map of electron density: red (high δ−) → blue (low δ+). Reveals polarity.", icon: "🌈" }
  ];
  return (
    <div className="bottom-group lab-group rail-card">
      <div className="section-heading">🔬 Representation Styles</div>
      <div className="micro-cards">
        {views.map(({ label, desc, icon }, i) => (
          <div className={`micro-card tone-${i}`} key={label} title={desc} style={{ cursor: "help" }}>
            <span style={{ fontSize: "1.3rem" }}>{icon}</span>
            <span style={{ fontWeight: 800, fontSize: "0.8rem" }}>{label}</span>
            <span style={{ fontSize: "0.68rem", color: "var(--muted)", lineHeight: 1.3 }}>{desc.slice(0, 56)}…</span>
          </div>
        ))}
      </div>
      {object.bondAngle && (
        <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 12, background: "rgba(255,255,255,0.07)", fontSize: "0.82rem", display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span>📐 Bond angle: <strong>{object.bondAngle}</strong></span>
          {object.geometry && <span>🔷 Geometry: <strong>{object.geometry}</strong></span>}
          {object.polarity && <span>⚡ Polarity: <strong>{object.polarity}</strong></span>}
        </div>
      )}
    </div>
  );
}

// ─── Compare Structures ──────────────────────────────────────────────────────
function CompareSection({ object, comparisonObject, onOpenCompare }) {
  return (
    <div className="bottom-group compare-group rail-card">
      <div className="section-heading">🔍 Compare Structures</div>
      <div className="compare-chips">
        <span>{object.name}</span>
        <SplitSquareHorizontal size={16} />
        <span>{comparisonObject.name}</span>
      </div>
      {object.formula && comparisonObject.formula && (
        <div style={{ display: "flex", gap: 8, margin: "8px 0", fontSize: "0.82rem" }}>
          <div style={{ flex: 1, padding: "6px 10px", borderRadius: 10, background: "rgba(91,184,255,0.12)", border: "1px solid rgba(91,184,255,0.28)", textAlign: "center" }}>
            <div style={{ color: "var(--muted)", fontSize: "0.68rem" }}>Formula</div>
            <div style={{ fontWeight: 900, color: "#5bb8ff" }}>{object.formula}</div>
          </div>
          <div style={{ flex: 1, padding: "6px 10px", borderRadius: 10, background: "rgba(185,156,255,0.12)", border: "1px solid rgba(185,156,255,0.28)", textAlign: "center" }}>
            <div style={{ color: "var(--muted)", fontSize: "0.68rem" }}>Formula</div>
            <div style={{ fontWeight: 900, color: "#b99cff" }}>{comparisonObject.formula}</div>
          </div>
        </div>
      )}
      <button className="primary-action" onClick={onOpenCompare}>
        <ScanSearch size={16} /> Open Full Comparison
      </button>
    </div>
  );
}

// ─── Quick Facts (enriched) ──────────────────────────────────────────────────
function QuickFactsPanel({ object }) {
  const facts = [
    ...object.quickFacts,
    object.molarMass && `Molar mass: ${object.molarMass}`,
    object.boilingPoint && `BP: ${object.boilingPoint}`,
    object.meltingPoint && `MP: ${object.meltingPoint}`
  ].filter(Boolean);
  return (
    <div className="bottom-group facts-group rail-card">
      <div className="section-heading">📋 Quick Facts</div>
      {facts.map((fact) => (
        <div className="fact-line" key={fact}>{fact}</div>
      ))}
      {object.reactionExample && (
        <div style={{ marginTop: 8, padding: "8px 10px", borderRadius: 12, background: "rgba(185,156,255,0.1)", border: "1px solid rgba(185,156,255,0.28)", fontSize: "0.8rem" }}>
          <div style={{ color: "#b99cff", fontWeight: 800, marginBottom: 3 }}>Key Reaction</div>
          <code style={{ color: "#e2d9ff", fontFamily: "monospace", fontSize: "0.78rem" }}>{object.reactionExample}</code>
        </div>
      )}
    </div>
  );
}

// ─── Tab navigation ──────────────────────────────────────────────────────────
const panelTabs = [
  { id: "lab",     label: "Lab View",    icon: Atom },
  { id: "trends",  label: "Trends",      icon: TrendingUp },
  { id: "energy",  label: "Bond Energy", icon: Zap },
  { id: "ph",      label: "pH Sim",      icon: Droplets },
];

// ─── Main BottomPanel ────────────────────────────────────────────────────────
export default function BottomPanel({ object, comparisonObject, onOpenCompare }) {
  const [activePanel, setActivePanel] = useState("lab");

  return (
    <div style={{ borderRadius: 24, padding: 16, background: "linear-gradient(145deg, rgba(10,24,38,0.94), rgba(7,18,30,0.90))", border: "1px solid var(--border)" }}>
      {/* Panel tab nav */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {panelTabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActivePanel(id)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px",
              borderRadius: 999, fontWeight: 800, fontSize: "0.8rem", cursor: "pointer",
              border: activePanel === id ? "none" : "1px solid var(--border)",
              background: activePanel === id ? "linear-gradient(135deg,rgba(57,255,133,0.9),rgba(0,191,165,0.85))" : "rgba(255,255,255,0.07)",
              color: activePanel === id ? "#061912" : "#effcff"
            }}>
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* Panel content — horizontally scrollable cards */}
      <div className="bottom-panel" style={{ padding: 0, background: "none", border: "none" }}>
        {activePanel === "lab" && (
          <>
            <StructureViews object={object} />
            <CompareSection object={object} comparisonObject={comparisonObject} onOpenCompare={onOpenCompare} />
            <QuickFactsPanel object={object} />
          </>
        )}
        {activePanel === "trends" && (
          <PeriodicTrendsMini currentElement={object.name} />
        )}
        {activePanel === "energy" && (
          <BondEnergyCalc />
        )}
        {activePanel === "ph" && (
          <PhSimulator />
        )}
      </div>
    </div>
  );
}
