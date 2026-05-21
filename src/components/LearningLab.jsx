import {
  BookOpen, CheckCircle2, FlaskConical, Mic, RotateCcw,
  Trophy, Volume2, XCircle, Zap, Brain, Layers, ChevronRight
} from "lucide-react";
import { useEffect, useMemo, useState, useCallback } from "react";

// ─── Quiz bank with 3 questions per topic ───────────────────────────────────
const quizBank = {
  water: [
    { question: "What is the H-O-H bond angle in water?", options: ["104.5°", "109.5°", "120°", "180°"], answer: 0, explanation: "Two lone pairs on oxygen push the bonding pairs together, compressing the ideal tetrahedral angle from 109.5° to 104.5°." },
    { question: "Why does ice float on liquid water?", options: ["H-bonds form an open hexagonal lattice making ice less dense", "Ice is lighter per molecule", "Cold water loses mass", "Ice contains no oxygen"], answer: 0, explanation: "Hydrogen bonds in ice force molecules into a hexagonal lattice with more space between them than liquid water, lowering its density." },
    { question: "What makes water an excellent polar solvent?", options: ["Its partial charges attract and surround ions", "Its high boiling point", "Its two hydrogen atoms", "It contains oxygen"], answer: 0, explanation: "The δ− on O and δ+ on H allow water to surround and stabilize both cations (via O) and anions (via H), dissolving ionic compounds." }
  ],
  "carbon-dioxide": [
    { question: "Why is CO₂ nonpolar despite having polar C=O bonds?", options: ["Linear shape cancels the two bond dipoles", "Both atoms are carbon", "It has no lone pairs", "It is a gas"], answer: 0, explanation: "The two C=O dipoles point in exactly opposite directions (180° apart), so they cancel, giving zero net dipole moment." },
    { question: "What is the hybridization of carbon in CO₂?", options: ["sp", "sp²", "sp³", "sp³d"], answer: 0, explanation: "Carbon forms two double bonds and no lone pairs → two electron groups → sp hybridization → linear geometry." },
    { question: "What happens when CO₂ dissolves in water?", options: ["CO₂ + H₂O ⇌ H₂CO₃ (carbonic acid)", "CO₂ + H₂O → NaOH", "O₂ is released", "CO₂ becomes solid"], answer: 0, explanation: "CO₂ reacts with water to form carbonic acid, which dissociates to lower ocean and blood pH." }
  ],
  ammonia: [
    { question: "What is the geometry of ammonia (NH₃)?", options: ["Trigonal pyramidal", "Tetrahedral", "Linear", "Trigonal planar"], answer: 0, explanation: "Three bonding pairs + one lone pair around N → sp³, but the lone pair is not visible in the shape, giving a trigonal pyramid." },
    { question: "Why is ammonia a Brønsted-Lowry base?", options: ["It accepts a proton using its lone pair on N", "It donates a proton from N-H", "It contains ionic bonds", "It is a gas"], answer: 0, explanation: "The lone pair on nitrogen donates to H⁺, forming NH₄⁺. Ammonia is also a Lewis base for the same reason." },
    { question: "What industrial process produces most of the world's ammonia?", options: ["Haber-Bosch (N₂ + 3H₂ → 2NH₃)", "Contact process", "Solvay process", "Ostwald process"], answer: 0, explanation: "The Haber-Bosch process uses an iron catalyst at 400-500°C and 150-300 atm to synthesize ammonia for fertilizers." }
  ],
  methane: [
    { question: "What is the geometry around carbon in methane?", options: ["Tetrahedral", "Linear", "Bent", "Trigonal planar"], answer: 0, explanation: "Four bonding pairs and no lone pairs around carbon → VSEPR predicts tetrahedral geometry at 109.5°." },
    { question: "What is the H-C-H bond angle in methane?", options: ["109.5°", "120°", "104.5°", "90°"], answer: 0, explanation: "Four equivalent sp³ hybrid orbitals point to the corners of a regular tetrahedron — all angles are exactly 109.5°." },
    { question: "Why is methane a more potent greenhouse gas than CO₂ per molecule?", options: ["It absorbs more IR wavelengths and traps more heat per molecule", "It is heavier", "It has more carbon atoms", "It reacts with ozone"], answer: 0, explanation: "CH₄ has a Global Warming Potential ~28× CO₂ over 100 years because it absorbs IR radiation at wavelengths CO₂ cannot." }
  ],
  benzene: [
    { question: "What makes benzene unusually stable?", options: ["6 delocalized π electrons (Hückel 4n+2, n=1)", "3 isolated double bonds", "Ionic lattice structure", "Its small size"], answer: 0, explanation: "Hückel's rule: 4n+2 π electrons (n=1 → 6) in a closed loop gives aromatic stabilization energy of ~150 kJ/mol." },
    { question: "What type of reaction does benzene prefer?", options: ["Electrophilic aromatic substitution", "Addition reaction", "Nucleophilic substitution", "Radical addition"], answer: 0, explanation: "Benzene undergoes substitution (not addition) to preserve its π electron system and the extra stability that aromaticity provides." },
    { question: "What are all C-C bond lengths in benzene?", options: ["139 pm — equal and intermediate", "154 pm (single bond)", "134 pm (double bond)", "Alternating 134 and 154 pm"], answer: 0, explanation: "Delocalization equalizes all six C-C bonds at 139 pm — between a single (154 pm) and double bond (134 pm)." }
  ],
  "sodium-chloride": [
    { question: "What holds sodium chloride together?", options: ["Electrostatic attraction between Na⁺ and Cl⁻", "Covalent bonds", "Hydrogen bonds", "Van der Waals forces"], answer: 0, explanation: "Ionic bonds are Coulombic attractions between oppositely charged Na⁺ and Cl⁻ ions arranged in an FCC crystal lattice." },
    { question: "How many ions surround each ion in the NaCl lattice?", options: ["6 (octahedral coordination)", "4 (tetrahedral)", "8 (cubic)", "12 (close-packed)"], answer: 0, explanation: "Each Na⁺ is surrounded by 6 Cl⁻ and vice versa — this is the 6:6 coordination number of the rock-salt structure." },
    { question: "Why does NaCl conduct electricity in solution but not as a solid?", options: ["Dissolved ions are free to move; solid lattice ions are locked in place", "Water adds electrons", "Bonds break and reform", "Salt becomes metallic"], answer: 0, explanation: "Electrical conduction requires mobile charge carriers. In solid NaCl, ions are locked in the lattice. Dissolving or melting releases free Na⁺ and Cl⁻ that carry current." }
  ],
  graphite: [
    { question: "Why does graphite conduct electricity?", options: ["Delocalized π electrons move freely across the sheets", "It contains metal atoms", "Ionic bonds carry current", "Free protons move"], answer: 0, explanation: "The unhybridized p orbitals on each sp² carbon overlap to form a π band of mobile electrons that conduct along the layers." },
    { question: "What forces hold graphite's layers together?", options: ["Weak van der Waals (London) dispersion forces", "Covalent bonds", "Ionic bonds", "Hydrogen bonds"], answer: 0, explanation: "Layer spacing is 335 pm. Only weak dispersion forces (~5 kJ/mol per C) connect them, which is why layers slide easily — explaining graphite's use as a lubricant." },
    { question: "What is a single isolated layer of graphite called?", options: ["Graphene", "Diamond", "Fullerene", "Carbon nanotube"], answer: 0, explanation: "Graphene (isolated 2D sheet) was first isolated in 2004 by Novoselov and Geim, who won the 2010 Nobel Prize. It is the strongest material ever measured." }
  ],
  "hydrogen-atom": [
    { question: "What is the Bohr radius of hydrogen's ground state?", options: ["53 pm (0.053 nm)", "100 pm", "10 pm", "200 pm"], answer: 0, explanation: "The Bohr radius (a₀ = 52.9 pm) is the most probable distance between the proton and electron in the ground state (n=1) of hydrogen." },
    { question: "Which hydrogen spectral series produces visible light?", options: ["Balmer series", "Lyman series", "Paschen series", "Brackett series"], answer: 0, explanation: "Balmer series transitions end at n=2; the emitted photons have wavelengths 410–656 nm (UV to red), producing the characteristic hydrogen spectrum." },
    { question: "How many naturally occurring isotopes does hydrogen have?", options: ["3 (protium, deuterium, tritium)", "1", "2", "4"], answer: 0, explanation: "Protium (¹H, no neutron), deuterium (²H, 1 neutron), and tritium (³H, 2 neutrons, radioactive) are the three hydrogen isotopes." }
  ],
  "chlorine-atom": [
    { question: "How many valence electrons does chlorine have?", options: ["7", "5", "3", "6"], answer: 0, explanation: "Chlorine has electron configuration [Ne] 3s² 3p⁵ — that is 7 valence electrons in the outermost shell, one short of argon." },
    { question: "What is chlorine's electronegativity on the Pauling scale?", options: ["3.16", "2.20", "3.98", "1.60"], answer: 0, explanation: "Chlorine's electronegativity is 3.16 (Pauling), making it the 3rd most electronegative element after F (3.98) and O (3.44)." },
    { question: "What naturally occurring isotopes does chlorine have?", options: ["³⁵Cl (75.8%) and ³⁷Cl (24.2%)", "³⁶Cl only", "³⁵Cl only", "³⁴Cl and ³⁶Cl"], answer: 0, explanation: "The 3:1 ratio of ³⁵Cl:³⁷Cl gives chlorine its characteristic double peak in mass spectrometry and its non-integer mass of 35.45." }
  ],
  "covalent-bond": [
    { question: "What is the difference between a σ and a π bond?", options: ["σ: head-on overlap; π: lateral p-p overlap", "σ: weaker; π: stronger", "σ: in double bonds only; π: in single bonds", "No difference"], answer: 0, explanation: "σ bonds form by head-on orbital overlap along the internuclear axis and allow free rotation. π bonds form by lateral p-p overlap and restrict rotation." },
    { question: "H-H bond dissociation energy is approximately:", options: ["436 kJ/mol", "100 kJ/mol", "800 kJ/mol", "200 kJ/mol"], answer: 0, explanation: "H-H bond dissociation energy is 436 kJ/mol — the energy needed to homolytically break 1 mol of H-H bonds into H radicals." },
    { question: "What determines whether a covalent bond is polar?", options: ["Electronegativity difference between bonded atoms", "Bond order", "Molecular size", "Number of lone pairs"], answer: 0, explanation: "A bond is polar if the electronegativity difference Δχ is 0.4–1.7 (polar covalent) or < 0.4 (nonpolar covalent). Δχ > 1.7 → ionic bond." }
  ],
  "ionic-bond": [
    { question: "What drives the formation of an ionic bond?", options: ["Electron transfer to fill valence shells + lattice stabilization", "Electron sharing", "Nuclear fusion", "Covalent overlap"], answer: 0, explanation: "Electron transfer from metal to nonmetal satisfies the octet rule for both ions; the resulting Coulombic attraction and lattice energy stabilize the compound." },
    { question: "Which compound has the stronger ionic bond: NaF or NaCl?", options: ["NaF (F⁻ is smaller → shorter bond → stronger attraction)", "NaCl", "Equal strength", "Cannot compare"], answer: 0, explanation: "F⁻ (133 pm) is smaller than Cl⁻ (181 pm), so Na⁺ and F⁻ sit closer together, giving a stronger Coulombic force and higher lattice energy (923 vs 787 kJ/mol)." },
    { question: "Above what electronegativity difference are bonds classified as ionic?", options: ["~1.7 (Pauling scale)", "~0.4", "~3.0", "~1.0"], answer: 0, explanation: "By convention, Δχ > 1.7 indicates predominantly ionic character. NaCl has Δχ = 3.16 − 0.93 = 2.23, well above the threshold." }
  ]
};

// ─── Equation balancing game ─────────────────────────────────────────────────
const equationChallenges = [
  {
    id: "combustion-methane",
    description: "Balance methane combustion",
    template: "_CH₄ + _O₂ → _CO₂ + _H₂O",
    blanks: ["CH₄", "O₂", "CO₂", "H₂O"],
    reactantsCount: 2,
    answers: [1, 2, 1, 2],
    hint: "Count C and H atoms on both sides. C: 1=1 ✓, H: 4=2×2 ✓, O: 4=2+2 ✓"
  },
  {
    id: "haber-bosch",
    description: "Balance the Haber-Bosch process",
    template: "_N₂ + _H₂ → _NH₃",
    blanks: ["N₂", "H₂", "NH₃"],
    reactantsCount: 2,
    answers: [1, 3, 2],
    hint: "2 NH₃ gives 2 N and 6 H. Need 1 N₂ and 3 H₂."
  },
  {
    id: "nacl-formation",
    description: "Balance sodium chloride formation",
    template: "_Na + _Cl₂ → _NaCl",
    blanks: ["Na", "Cl₂", "NaCl"],
    reactantsCount: 2,
    answers: [2, 1, 2],
    hint: "Cl₂ provides 2 Cl atoms. Need 2 Na and 2 NaCl."
  },
  {
    id: "water-electrolysis",
    description: "Balance water electrolysis",
    template: "_H₂O → _H₂ + _O₂",
    blanks: ["H₂O", "H₂", "O₂"],
    reactantsCount: 1,
    answers: [2, 2, 1],
    hint: "2 H₂O gives 4 H (= 2 H₂) and 2 O (= 1 O₂)."
  }
];

// ─── Flashcard mode ──────────────────────────────────────────────────────────
const flashcards = {
  water:    [["What is water's bond angle?","104.5°"],["What type of bonds does water form?","Hydrogen bonds (O…H-O)"],["Why is water's density max at 4°C?","H-bonds form an open lattice in ice, making it less dense"]],
  "carbon-dioxide": [["Is CO₂ polar?","No — linear shape cancels the two C=O dipoles"],["What is CO₂'s hybridization?","sp (linear)"],["What is CO₂ + H₂O?","H₂CO₃ (carbonic acid)"]],
  ammonia: [["What is ammonia's geometry?","Trigonal pyramidal"],["What makes NH₃ a base?","Lone pair on N donates to H⁺"],["What process makes ammonia industrially?","Haber-Bosch (N₂ + 3H₂ → 2NH₃)"]],
  methane:  [["CH₄ bond angle?","109.5°"],["Hybridization of CH₄ carbon?","sp³"],["Products of methane combustion?","CO₂ and H₂O"]],
  benzene:  [["Why is benzene stable?","Aromatic: 6 delocalized π electrons (Hückel rule)"],["All C-C bonds in benzene?","Equal — 139 pm"],["What reaction type does benzene prefer?","Electrophilic aromatic substitution"]],
  "sodium-chloride": [["NaCl coordination number?","6:6 (octahedral)"],["NaCl lattice energy?","787 kJ/mol"],["Why does NaCl conduct in solution?","Free Na⁺ and Cl⁻ ions carry charge"]],
  graphite: [["Why does graphite conduct?","Delocalized π electrons"],["What holds graphite layers?","Weak van der Waals forces"],["What is a single graphite layer?","Graphene"]],
  "hydrogen-atom": [["Bohr radius of H?","53 pm (0.053 nm)"],["Which series produces visible H emission?","Balmer series"],["H isotopes?","¹H protium, ²H deuterium, ³H tritium"]],
  "chlorine-atom": [["Cl valence electrons?","7"],["Cl electronegativity?","3.16 (Pauling)"],["Cl isotopes?","³⁵Cl (75.8%) and ³⁷Cl (24.2%)"]],
  "covalent-bond": [["σ vs π bond?","σ: head-on; π: lateral p-p overlap"],["H-H bond energy?","436 kJ/mol"],["Polar bond: Δχ range?","0.4 – 1.7"]],
  "ionic-bond": [["Ionic bond: Δχ threshold?",">1.7 (Pauling scale)"],["NaF vs NaCl: which is stronger?","NaF (F⁻ is smaller → stronger attraction)"],["Why do ionic solids have high MP?","Must break strong lattice bonds throughout the crystal"]]
};

// ─── Molecule builder challenges ─────────────────────────────────────────────
const buildTargets = [
  { id: "h2o", label: "Build H₂O", formula: "H₂O", accepts: ["H", "O", "H"], success: "Correct! H-O-H with 104.5° angle — water's bent shape from two lone pairs on oxygen." },
  { id: "co2", label: "Build CO₂", formula: "CO₂", accepts: ["O", "C", "O"], success: "Correct! O=C=O — linear geometry, nonpolar overall despite polar bonds." },
  { id: "nh3", label: "Build NH₃", formula: "NH₃", accepts: ["N", "H", "H", "H"], success: "Correct! N at the apex with 3 H atoms below — trigonal pyramidal, like an umbrella." },
  { id: "nacl", label: "Build NaCl", formula: "NaCl", accepts: ["Na", "Cl"], success: "Correct! Na⁺ transfers its electron to Cl⁻ — an ionic bond, not a shared pair." },
  { id: "hcl", label: "Build HCl", formula: "HCl", accepts: ["H", "Cl"], success: "Correct! H-Cl: Δχ = 0.96 → polar covalent bond with δ+ on H and δ− on Cl." }
];

const atomTokens = ["H", "O", "C", "N", "Na", "Cl", "Ca", "Fe"];
const tokenColors = { H: "#f8fafc", O: "#ef4444", C: "#334155", N: "#3b82f6", Na: "#f59e0b", Cl: "#22c55e", Ca: "#a78bfa", Fe: "#fb923c" };

// ─── Main Component ──────────────────────────────────────────────────────────
export default function LearningLab({ object, progress, onProgress, onToast }) {
  const [activeTab, setActiveTab] = useState("explain");
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [spoken, setSpoken] = useState(false);
  const [tray, setTray] = useState([]);
  const [targetIndex, setTargetIndex] = useState(0);
  const [flashIndex, setFlashIndex] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);
  const [eqInputs, setEqInputs] = useState([]);
  const [eqChecked, setEqChecked] = useState(false);
  const [eqCorrect, setEqCorrect] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const target = buildTargets[targetIndex % buildTargets.length];
  const currentCards = flashcards[object.id] ?? [["Formula", object.formula ?? "—"], ["Category", object.category], ["Key feature", object.keyFeatures[0]]];
  const currentCard = currentCards[flashIndex % currentCards.length];

  const questions = quizBank[object.id] ?? [
    {
      question: `Which feature best describes ${object.name}?`,
      options: [object.keyFeatures[0], "No chemical structure", "Only biological tissue", "Radioactive decay product"],
      answer: 0,
      explanation: `${object.keyFeatures[0]} is the defining feature of ${object.name}.`
    }
  ];
  const currentQuestion = questions[quizIndex % questions.length];

  const currentChallenge = equationChallenges[quizIndex % equationChallenges.length];

  useEffect(() => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setSpoken(false);
    setFlashIndex(0);
    setFlashFlipped(false);
    setQuizIndex(0);
    setQuizScore(0);
    setEqInputs(currentChallenge.answers.map(() => ""));
    setEqChecked(false);
    setEqCorrect(false);
  }, [object.id]);

  useEffect(() => {
    setEqInputs(currentChallenge.answers.map(() => ""));
    setEqChecked(false);
    setEqCorrect(false);
  }, [quizIndex]);

  const explanation = useMemo(() => {
    const parts = [
      `${object.name} (${object.formula ?? object.category}).`,
      object.description,
      object.chemistryNote,
      `Geometry: ${object.geometry ?? object.category}.`,
      object.realWorldUse ? `Real-world use: ${object.realWorldUse}` : ""
    ];
    return parts.filter(Boolean).join(" ");
  }, [object]);

  const speak = () => {
    if (!("speechSynthesis" in window)) { onToast("Voice not supported in this browser"); return; }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(explanation);
    utt.rate = 0.92; utt.pitch = 1.05;
    window.speechSynthesis.speak(utt);
    setSpoken(true);
    onProgress("voice");
  };

  const chooseAnswer = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === currentQuestion.answer) {
      setQuizScore((s) => s + 1);
      onProgress("quiz");
      onToast("Correct! 🎉");
    } else {
      onToast("Not quite — read the explanation below.");
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizIndex((i) => i + 1);
  };

  const addAtom = (symbol) => {
    const nextTray = [...tray, symbol];
    setTray(nextTray.slice(-target.accepts.length));
    const slice = nextTray.slice(-target.accepts.length);
    if (slice.length === target.accepts.length && slice.join("-") === target.accepts.join("-")) {
      onProgress("activity");
      onToast(target.success);
    }
  };

  const checkEquation = () => {
    const correct = currentChallenge.answers.every((ans, i) => parseInt(eqInputs[i], 10) === ans);
    setEqChecked(true);
    setEqCorrect(correct);
    if (correct) { onProgress("activity"); onToast("Equation balanced! ⚗️"); }
    else onToast("Not balanced yet — try again or use the hint.");
  };

  const completedCount = Object.values(progress).filter(Boolean).length;

  const tabs = [
    ["explain", "Explain", BookOpen],
    ["flash", "Flashcards", Brain],
    ["quiz", "Quiz", Trophy],
    ["build", "Build", FlaskConical],
    ["equation", "Balance", Zap],
    ["progress", "Progress", Layers]
  ];

  return (
    <section className="learning-studio" id="notebook">
      <div className="learning-header">
        <div>
          <div className="section-heading">Learning Studio</div>
          <h3>{object.name}</h3>
        </div>
        <div className="learning-score">{completedCount}/4 complete</div>
      </div>

      <div className="learning-tabs" role="tablist" aria-label="Learning tools" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
        {tabs.map(([id, label, Icon]) => (
          <button className={activeTab === id ? "active" : ""} key={id} onClick={() => setActiveTab(id)} role="tab" aria-selected={activeTab === id}>
            <Icon size={13} /> <span style={{ fontSize: "0.72rem" }}>{label}</span>
          </button>
        ))}
      </div>

      <div className="learning-body">
        {/* ── EXPLAIN ── */}
        {activeTab === "explain" && (
          <article className="learning-pane explanation-card">
            <div className="section-heading">Topic Explanation</div>
            {object.formula && (
              <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "999px", background: "rgba(101,217,130,0.16)", border: "1px solid rgba(101,217,130,0.38)", fontSize: "1.1rem", fontWeight: 900, letterSpacing: 1, marginBottom: 10, color: "#caffd8" }}>
                {object.formula}
              </div>
            )}
            <p style={{ marginBottom: 10 }}>{object.description}</p>
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "12px 14px", marginBottom: 10, borderLeft: "3px solid var(--group-color, var(--green))" }}>
              <div className="section-heading" style={{ marginBottom: 4 }}>Chemistry Detail</div>
              <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.65, color: "#d9e9ee" }}>{object.chemistryNote}</p>
            </div>
            {object.realWorldUse && (
              <div style={{ background: "rgba(91,184,255,0.1)", borderRadius: 14, padding: "10px 14px", marginBottom: 10, borderLeft: "3px solid #5bb8ff" }}>
                <div className="section-heading" style={{ color: "#5bb8ff", marginBottom: 4 }}>Real-World Use</div>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#cde8f5" }}>{object.realWorldUse}</p>
              </div>
            )}
            {object.reactionExample && (
              <div style={{ background: "rgba(185,156,255,0.1)", borderRadius: 14, padding: "10px 14px", marginBottom: 12, borderLeft: "3px solid #b99cff" }}>
                <div className="section-heading" style={{ color: "#b99cff", marginBottom: 4 }}>Key Reaction</div>
                <code style={{ fontSize: "0.88rem", color: "#e2d9ff", fontFamily: "monospace" }}>{object.reactionExample}</code>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 12 }}>
              {[["Formula", object.formula], ["Geometry", object.geometry], ["Polarity", object.polarity], ["Molar Mass", object.molarMass]].filter(([,v]) => v).map(([k, v]) => (
                <div key={k} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "8px 10px" }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: 2 }}>{k}</div>
                  <div style={{ fontWeight: 800, fontSize: "0.84rem" }}>{v}</div>
                </div>
              ))}
            </div>
            <div className="learning-actions">
              <button className="primary-action compact-action" onClick={() => { onProgress("text"); onToast("Marked as read ✓"); }}>
                <Mic size={15} /> Mark Read
              </button>
              <button className={spoken ? "icon-action active" : "icon-action"} onClick={speak} title="Play voice explanation">
                <Volume2 size={17} />
              </button>
            </div>
          </article>
        )}

        {/* ── FLASHCARDS ── */}
        {activeTab === "flash" && (
          <article className="learning-pane" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="section-heading">Flashcards — {object.name}</div>
            <div
              onClick={() => setFlashFlipped((f) => !f)}
              style={{
                minHeight: 160, cursor: "pointer", borderRadius: 18,
                background: flashFlipped ? "linear-gradient(135deg,rgba(101,217,130,0.22),rgba(0,191,165,0.12))" : "rgba(255,255,255,0.09)",
                border: "1px solid var(--border)", display: "grid", placeItems: "center",
                padding: "20px 16px", transition: "background 0.3s", textAlign: "center"
              }}
            >
              {flashFlipped
                ? <div>
                    <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginBottom: 8 }}>ANSWER</div>
                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#9dffbd" }}>{currentCard[1]}</div>
                  </div>
                : <div>
                    <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginBottom: 8 }}>QUESTION — tap to reveal</div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f4fdff" }}>{currentCard[0]}</div>
                  </div>
              }
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "space-between", alignItems: "center" }}>
              <button className="icon-text-action" onClick={() => { setFlashFlipped(false); setFlashIndex((i) => (i - 1 + currentCards.length) % currentCards.length); }}>← Prev</button>
              <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{(flashIndex % currentCards.length) + 1} / {currentCards.length}</span>
              <button className="icon-text-action" onClick={() => { setFlashFlipped(false); setFlashIndex((i) => (i + 1) % currentCards.length); }}>Next →</button>
            </div>
            <button className="primary-action" onClick={() => { onProgress("text"); onToast("Flashcards studied ✓"); }}>
              <CheckCircle2 size={15} /> Mark Studied
            </button>
          </article>
        )}

        {/* ── QUIZ ── */}
        {activeTab === "quiz" && (
          <article className="learning-pane quiz-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div className="section-heading">Interactive Quiz</div>
              <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Q{(quizIndex % questions.length) + 1}/{questions.length} · Score: {quizScore}</span>
            </div>
            <h4>{currentQuestion.question}</h4>
            <div className="quiz-options">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = selectedAnswer !== null && index === currentQuestion.answer;
                const isWrong = isSelected && index !== currentQuestion.answer;
                return (
                  <button
                    className={`quiz-option${isCorrect ? " correct" : ""}${isWrong ? " wrong" : ""}`}
                    key={option} onClick={() => chooseAnswer(index)} disabled={selectedAnswer !== null}
                  >
                    <span>{option}</span>
                    {isCorrect && <CheckCircle2 size={16} />}
                    {isWrong && <XCircle size={16} />}
                  </button>
                );
              })}
            </div>
            {showExplanation && (
              <div style={{ marginTop: 10, padding: "10px 12px", borderRadius: 12, background: "rgba(101,217,130,0.1)", borderLeft: "3px solid var(--green)", fontSize: "0.84rem", color: "#caf5d0", lineHeight: 1.55 }}>
                <strong style={{ color: "#9dffbd" }}>Explanation: </strong>{currentQuestion.explanation}
              </div>
            )}
            {selectedAnswer !== null && (
              <button className="icon-text-action" onClick={nextQuestion} style={{ marginTop: 10 }}>
                Next Question <ChevronRight size={14} />
              </button>
            )}
            <div className="score-line">Topic score: {quizScore}/{questions.length}</div>
          </article>
        )}

        {/* ── BUILD MOLECULE ── */}
        {activeTab === "build" && (
          <article className="learning-pane activity-card">
            <div className="section-heading">Molecule Builder</div>
            <h4>{target.label}</h4>
            <div style={{ fontSize: "0.82rem", color: "var(--muted)", marginBottom: 8 }}>
              Tap atoms in order to build <strong style={{ color: "#f4fdff" }}>{target.formula}</strong> — sequence: {target.accepts.join(" – ")}
            </div>
            <div className="atom-token-row">
              {atomTokens.map((symbol) => (
                <button
                  className="atom-token"
                  key={symbol}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", symbol)}
                  onClick={() => addAtom(symbol)}
                  style={{ background: `linear-gradient(135deg, ${tokenColors[symbol] ?? "#e2e8f0"}, rgba(0,0,0,0.4))`, color: symbol === "H" ? "#1a2b2a" : "#f4fdff", border: `2px solid ${tokenColors[symbol] ?? "#e2e8f0"}44` }}
                >
                  {symbol}
                </button>
              ))}
            </div>
            <div
              className="reaction-tray"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => addAtom(e.dataTransfer.getData("text/plain"))}
            >
              {tray.length
                ? tray.map((sym, i) => <span key={`${sym}-${i}`} style={{ background: `${tokenColors[sym] ?? "#5bb8ff"}33`, borderColor: `${tokenColors[sym] ?? "#5bb8ff"}66`, color: "#f4fdff", fontWeight: 900 }}>{sym}</span>)
                : <small>Drag or tap atoms here → match the sequence</small>}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              <button className="icon-text-action" onClick={() => setTray([])}>
                <RotateCcw size={14} /> Clear
              </button>
              <button className="icon-text-action" onClick={() => { setTray([]); setTargetIndex((i) => i + 1); }}>
                Next Molecule →
              </button>
            </div>
          </article>
        )}

        {/* ── EQUATION BALANCER ── */}
        {activeTab === "equation" && (
          <article className="learning-pane" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="section-heading">Balance Chemical Equations ⚗️</div>
            <h4 style={{ margin: "4px 0 8px" }}>{currentChallenge.description}</h4>
            <div style={{ fontSize: "0.82rem", color: "var(--muted)", marginBottom: 6 }}>
              Enter coefficients for each species:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 8 }}>
              {currentChallenge.blanks.map((species, i) => {
                const isArrow = i === currentChallenge.reactantsCount;
                const isPlus = i > 0 && i !== currentChallenge.reactantsCount;
                return (
                  <div key={species + i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {isPlus && <span style={{ color: "var(--muted)", fontWeight: "bold" }}>+</span>}
                    {isArrow && <span style={{ color: "#39ff85", fontWeight: "bold", margin: "0 6px" }}>→</span>}
                    <input
                      type="number" min="1" max="10"
                      value={eqInputs[i] ?? ""}
                      onChange={(e) => { const next = [...eqInputs]; next[i] = e.target.value; setEqInputs(next); setEqChecked(false); }}
                      style={{ width: 44, height: 38, borderRadius: 10, border: eqChecked ? (parseInt(eqInputs[i],10) === currentChallenge.answers[i] ? "2px solid #39ff85" : "2px solid #ff5a67") : "1px solid var(--border)", background: "rgba(255,255,255,0.09)", color: "#f4fdff", textAlign: "center", fontSize: "1rem", fontWeight: 900 }}
                    />
                    <span style={{ fontWeight: 700, color: "#d9e9ee", fontSize: "0.95rem" }}>{species}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--muted)", background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "8px 12px" }}>
              Template: <code style={{ color: "#d7c9ff" }}>{currentChallenge.template}</code>
            </div>
            {eqChecked && (
              <div style={{ padding: "10px 12px", borderRadius: 12, background: eqCorrect ? "rgba(57,255,133,0.12)" : "rgba(255,90,103,0.12)", borderLeft: `3px solid ${eqCorrect ? "#39ff85" : "#ff5a67"}`, fontSize: "0.85rem", color: eqCorrect ? "#caffd8" : "#ffb3b3" }}>
                {eqCorrect ? "✅ Perfectly balanced! Atoms are conserved." : `❌ Not balanced. Hint: ${currentChallenge.hint}`}
              </div>
            )}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button className="primary-action compact-action" onClick={checkEquation} style={{ flex: 1 }}>
                <CheckCircle2 size={15} /> Check Balance
              </button>
              <button className="icon-text-action" onClick={() => setQuizIndex((i) => i + 1)}>Next Equation →</button>
            </div>
          </article>
        )}

        {/* ── PROGRESS ── */}
        {activeTab === "progress" && (
          <article className="learning-pane progress-card">
            <div className="section-heading">Progress Tracking</div>
            <div className="progress-meter" aria-label={`${completedCount} of 4 learning goals complete`}>
              <span style={{ width: `${(completedCount / 4) * 100}%` }} />
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--muted)", marginTop: 6 }}>{completedCount}/4 goals achieved for {object.name}</div>
            <div className="progress-grid">
              {[["text", "Read / Flashcards"], ["voice", "Voice"], ["quiz", "Quiz"], ["activity", "Build / Balance"]].map(([key, label]) => (
                <span className={progress[key] ? "done" : ""} key={key}>
                  {progress[key] ? <CheckCircle2 size={14} /> : <FlaskConical size={14} />} {label}
                </span>
              ))}
            </div>
            {object.funFact && (
              <div style={{ marginTop: 14, padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.06)", borderLeft: "4px solid var(--group-color, var(--green))", fontStyle: "italic", color: "#eefbff", fontSize: "0.9rem", lineHeight: 1.55 }}>
                <div style={{ fontStyle: "normal", fontSize: "0.72rem", color: "var(--muted)", marginBottom: 4 }}>FUN FACT</div>
                {object.funFact}
              </div>
            )}
          </article>
        )}
      </div>
    </section>
  );
}
