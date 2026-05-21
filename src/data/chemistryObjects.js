const atom = (element, x, y, z, color, radius = 0.34) => ({ element, x, y, z, color, radius });
const bond = (from, to, order = 1) => ({ from, to, order });

const allChemistryObjects = [
  // ──────────────────── MOLECULES ────────────────────
  {
    id: "water",
    name: "Water",
    category: "Polar Molecule",
    group: "Molecules",
    subtitle: "Bent H₂O structure",
    formula: "H₂O",
    molarMass: "18.015 g/mol",
    boilingPoint: "100 °C",
    meltingPoint: "0 °C",
    bondAngle: "104.5°",
    geometry: "Bent (V-shaped)",
    polarity: "Polar",
    description: "Water is a polar covalent molecule with a bent geometry (104.5°) caused by two lone pairs on oxygen that repel the bonding pairs.",
    featuredStructure: "O-H Bonds",
    size: "0.275 nm",
    location: "Molecular space",
    visibleIn: "Liquids, ice, vapor, solutions",
    chemistryNote: "Oxygen's high electronegativity (3.44) pulls electron density toward itself, creating δ− on O and δ+ on each H. This polarity gives water its extraordinary solvent power, surface tension, and hydrogen-bonding network. The anomalous density maximum at 4 °C arises from the open hexagonal lattice hydrogen bonds impose in ice.",
    funFact: "Water is the only common substance that naturally exists as solid, liquid, and gas at Earth's surface temperatures and pressures.",
    realWorldUse: "Universal solvent in cells, coolant in industry, medium for acid-base chemistry, component of blood plasma.",
    whereFound: "Laboratories, oceans, cells, atmosphere, and nearly every aqueous reaction system",
    mainFunction: "Acts as a solvent, reaction medium, heat buffer, and hydrogen-bonding network.",
    keyFeatures: ["Bent geometry", "polar covalent bonds", "hydrogen bonding", "104.5° bond angle", "sp³ oxygen"],
    quickFacts: ["Formula: H₂O", "Bent molecular geometry", "Excellent polar solvent", "Density max at 4 °C"],
    reactionExample: "H₂O + CO₂ ⇌ H₂CO₃ (carbonic acid equilibrium)",
    comparisonTargetId: "carbon-dioxide",
    structure: {
      atoms: [
        atom("O", 0, 0, 0, "#ef4444", 0.42),
        atom("H", -0.78, 0.58, 0, "#f8fafc", 0.24),
        atom("H", 0.78, 0.58, 0, "#f8fafc", 0.24)
      ],
      bonds: [bond(0, 1), bond(0, 2)]
    }
  },
  {
    id: "carbon-dioxide",
    name: "Carbon Dioxide",
    category: "Linear Molecule",
    group: "Molecules",
    subtitle: "O=C=O geometry",
    formula: "CO₂",
    molarMass: "44.01 g/mol",
    boilingPoint: "−78.5 °C (sublimes)",
    meltingPoint: "−56.6 °C (at 5.1 atm)",
    bondAngle: "180°",
    geometry: "Linear",
    polarity: "Nonpolar",
    description: "Carbon dioxide is a linear triatomic molecule with two polar C=O double bonds. Although each bond is polar (C is δ+, O is δ−), the molecule is nonpolar overall because the dipoles cancel in a 180° geometry.",
    featuredStructure: "C=O Double Bonds",
    size: "0.33 nm",
    location: "Gas phase and dissolved carbon systems",
    visibleIn: "Atmosphere, breath, carbonated liquids",
    chemistryNote: "Each C=O bond has bond order 2 (one σ + one π). The sp hybridization on carbon places the two oxygens 180° apart, exactly canceling the bond dipoles. CO₂ dissolves in water to form carbonic acid, underpinning ocean pH regulation and the global carbon cycle.",
    funFact: "Dry ice sublimates at −78.5 °C, skipping the liquid phase entirely at atmospheric pressure.",
    realWorldUse: "Carbonation in beverages, fire extinguishers, supercritical solvent in coffee decaffeination, greenhouse gas driving climate change.",
    whereFound: "Air (420 ppm), combustion products, fermentation, dry ice, and carbonate equilibria",
    mainFunction: "Participates in gas exchange, acid-base equilibria, and carbon-cycle chemistry.",
    keyFeatures: ["Linear shape", "two C=O double bonds", "nonpolar overall", "greenhouse gas", "sp carbon"],
    quickFacts: ["Formula: CO₂", "Linear geometry", "Sublimes as dry ice", "Greenhouse gas"],
    reactionExample: "CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻",
    comparisonTargetId: "water",
    structure: {
      atoms: [
        atom("O", -1.15, 0, 0, "#ef4444", 0.38),
        atom("C", 0, 0, 0, "#334155", 0.4),
        atom("O", 1.15, 0, 0, "#ef4444", 0.38)
      ],
      bonds: [bond(0, 1, 2), bond(1, 2, 2)]
    }
  },
  {
    id: "methane",
    name: "Methane",
    category: "Tetrahedral Molecule",
    group: "Molecules",
    subtitle: "CH₄ covalent model",
    formula: "CH₄",
    molarMass: "16.04 g/mol",
    boilingPoint: "−161.5 °C",
    meltingPoint: "−182.5 °C",
    bondAngle: "109.5°",
    geometry: "Tetrahedral",
    polarity: "Nonpolar",
    description: "Methane is the simplest alkane. Its sp³-hybridized carbon forms four equivalent C-H bonds arranged tetrahedrally, giving bond angles of exactly 109.5°.",
    featuredStructure: "Tetrahedral Carbon",
    size: "0.38 nm",
    location: "Molecular center",
    visibleIn: "Natural gas and organic reaction systems",
    chemistryNote: "The four identical C-H bonds are slightly polar (C is marginally δ+), but the tetrahedral symmetry perfectly cancels all dipoles, making methane nonpolar overall. It is the main constituent of natural gas (≈90%) and a potent greenhouse gas (GWP ≈ 28× CO₂ over 100 years).",
    funFact: "Lakes in Siberia are literally bubbling with methane released by melting permafrost, and it can be ignited directly at the lake surface.",
    realWorldUse: "Heating fuel, feedstock for hydrogen production (steam reforming), raw material for plastics and fertilizers.",
    whereFound: "Natural gas deposits, biogas, wetlands, cow digestion, and hydrocarbon chemistry",
    mainFunction: "Fuel molecule and foundational structure for organic chemistry.",
    keyFeatures: ["sp³ carbon", "four C-H single bonds", "tetrahedral 109.5°", "nonpolar", "lightest alkane"],
    quickFacts: ["Formula: CH₄", "Four C-H single bonds", "Tetrahedral shape", "Main component of natural gas"],
    reactionExample: "CH₄ + 2O₂ → CO₂ + 2H₂O (combustion)",
    comparisonTargetId: "benzene",
    structure: {
      atoms: [
        atom("C", 0, 0, 0, "#334155", 0.42),
        atom("H", 0.9, 0.9, 0.9, "#f8fafc", 0.22),
        atom("H", -0.9, -0.9, 0.9, "#f8fafc", 0.22),
        atom("H", -0.9, 0.9, -0.9, "#f8fafc", 0.22),
        atom("H", 0.9, -0.9, -0.9, "#f8fafc", 0.22)
      ],
      bonds: [bond(0, 1), bond(0, 2), bond(0, 3), bond(0, 4)]
    }
  },
  {
    id: "ammonia",
    name: "Ammonia",
    category: "Trigonal Pyramidal Molecule",
    group: "Molecules",
    subtitle: "NH₃ — pyramidal geometry",
    formula: "NH₃",
    molarMass: "17.03 g/mol",
    boilingPoint: "−33.4 °C",
    meltingPoint: "−77.7 °C",
    bondAngle: "107°",
    geometry: "Trigonal Pyramidal",
    polarity: "Polar",
    description: "Ammonia has three N-H bonds and one lone pair on nitrogen, producing a trigonal pyramidal shape with H-N-H angles of 107°. The lone pair compresses the bond angles slightly below ideal tetrahedral.",
    featuredStructure: "N-H Bonds",
    size: "0.31 nm",
    location: "Molecular space",
    visibleIn: "Fertilizers, cleaning products, refrigerants",
    chemistryNote: "Ammonia is a Brønsted-Lowry base (accepts H⁺) and a Lewis base (donates the lone pair). It is the 2nd-most-produced chemical worldwide — the Haber-Bosch process converts N₂ and H₂ to NH₃, enabling nitrogen fertilizers that feed billions of people.",
    funFact: "Around half of the nitrogen atoms in your body's proteins passed through an ammonia molecule made by the Haber-Bosch process.",
    realWorldUse: "Fertilizer production, household cleaners (as ammonium hydroxide), refrigerant, precursor to explosives and polymers.",
    whereFound: "Atmosphere, soil bacteria, industrial plants, cleaning products, and aquatic systems",
    mainFunction: "Key nitrogen source in fertilizers; base in acid-base chemistry; industrial chemical precursor.",
    keyFeatures: ["Trigonal pyramidal", "lone pair on N", "107° bond angle", "polar molecule", "Brønsted-Lowry base"],
    quickFacts: ["Formula: NH₃", "Trigonal pyramidal", "107° bond angle", "Strong distinctive odor"],
    reactionExample: "NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ (basic solution)",
    comparisonTargetId: "water",
    structure: {
      atoms: [
        atom("N", 0, 0.2, 0, "#3b82f6", 0.38),
        atom("H", -0.82, -0.3, -0.47, "#f8fafc", 0.22),
        atom("H", 0.82, -0.3, -0.47, "#f8fafc", 0.22),
        atom("H", 0, -0.3, 0.94, "#f8fafc", 0.22)
      ],
      bonds: [bond(0, 1), bond(0, 2), bond(0, 3)],
      electronPairs: [{ x: 0, y: 0.82, z: 0, color: "#93c5fd" }]
    }
  },
  {
    id: "benzene",
    name: "Benzene",
    category: "Aromatic Molecule",
    group: "Molecules",
    subtitle: "Delocalized π-electron ring",
    formula: "C₆H₆",
    molarMass: "78.11 g/mol",
    boilingPoint: "80.1 °C",
    meltingPoint: "5.5 °C",
    bondAngle: "120°",
    geometry: "Planar Hexagonal",
    polarity: "Nonpolar",
    description: "Benzene is a planar six-carbon aromatic ring. Each carbon is sp² hybridized, and the unhybridized p orbitals overlap to create a continuous π system with 6 delocalized electrons above and below the ring plane.",
    featuredStructure: "Aromatic Ring",
    size: "0.50 nm across",
    location: "Planar carbon ring",
    visibleIn: "Organic chemistry and spectroscopy",
    chemistryNote: "The 6 π electrons satisfy Hückel's rule (4n+2, n=1), conferring exceptional thermodynamic stability (resonance energy ≈ 150 kJ/mol). All C-C bonds are equivalent at 139 pm — intermediate between a single (154 pm) and double bond (134 pm). Benzene undergoes electrophilic aromatic substitution rather than addition to preserve aromaticity.",
    funFact: "August Kekulé famously reported dreaming of a snake biting its tail, inspiring his 1865 proposal of the cyclic structure of benzene.",
    realWorldUse: "Synthesis of styrene (polystyrene), nylon, dyes, drugs, and pesticides. Recognized carcinogen — replaced by toluene in many lab applications.",
    whereFound: "Petroleum, tobacco smoke, volcanic emissions, combustion exhaust, and aromatic chemical synthesis",
    mainFunction: "Foundational aromatic scaffold for pharmaceuticals, polymers, and dyes.",
    keyFeatures: ["Six-carbon ring", "π delocalization", "planar 120° angles", "resonance", "Hückel's rule"],
    quickFacts: ["Formula: C₆H₆", "Planar aromatic ring", "All bonds equal at 139 pm", "Carcinogen"],
    reactionExample: "C₆H₆ + Br₂ →(FeBr₃) C₆H₅Br + HBr (electrophilic aromatic substitution)",
    comparisonTargetId: "methane",
    structure: {
      atoms: [
        atom("C", 1, 0, 0, "#334155", 0.34),
        atom("C", 0.5, 0.86, 0, "#334155", 0.34),
        atom("C", -0.5, 0.86, 0, "#334155", 0.34),
        atom("C", -1, 0, 0, "#334155", 0.34),
        atom("C", -0.5, -0.86, 0, "#334155", 0.34),
        atom("C", 0.5, -0.86, 0, "#334155", 0.34),
        atom("H", 1.72, 0, 0, "#f8fafc", 0.18),
        atom("H", 0.86, 1.49, 0, "#f8fafc", 0.18),
        atom("H", -0.86, 1.49, 0, "#f8fafc", 0.18),
        atom("H", -1.72, 0, 0, "#f8fafc", 0.18),
        atom("H", -0.86, -1.49, 0, "#f8fafc", 0.18),
        atom("H", 0.86, -1.49, 0, "#f8fafc", 0.18)
      ],
      bonds: [
        bond(0, 1, 1.5), bond(1, 2, 1.5), bond(2, 3, 1.5),
        bond(3, 4, 1.5), bond(4, 5, 1.5), bond(5, 0, 1.5),
        bond(0, 6), bond(1, 7), bond(2, 8),
        bond(3, 9), bond(4, 10), bond(5, 11)
      ]
    }
  },
  // ──────────────────── MATERIALS ────────────────────
  {
    id: "sodium-chloride",
    name: "Sodium Chloride",
    category: "Ionic Lattice",
    group: "Materials",
    subtitle: "Alternating Na⁺ and Cl⁻ ions",
    formula: "NaCl",
    molarMass: "58.44 g/mol",
    boilingPoint: "1413 °C",
    meltingPoint: "801 °C",
    bondAngle: "90° (lattice geometry)",
    geometry: "Face-Centered Cubic Lattice",
    polarity: "Ionic (not molecular)",
    description: "Sodium chloride forms a face-centered cubic crystal lattice in which each Na⁺ is surrounded by 6 Cl⁻ and vice versa. The structure is held together by strong electrostatic (ionic) bonds throughout.",
    featuredStructure: "Crystal Lattice",
    size: "0.564 nm unit cell",
    location: "Repeating solid lattice",
    visibleIn: "Salt crystals and ionic solids",
    chemistryNote: "Sodium transfers its 3s valence electron to chlorine's half-filled 3p orbital. The resulting Na⁺ (Ne configuration) and Cl⁻ (Ar configuration) are stabilized by the lattice energy of −787 kJ/mol. NaCl conducts electricity only when molten or dissolved, because the ions must be free to move.",
    funFact: "A single gram of table salt contains roughly 10²² sodium chloride ion pairs — more than the number of stars observable in the universe.",
    realWorldUse: "Food seasoning and preservation, PVC production, chlor-alkali electrolysis (Cl₂ and NaOH), de-icing roads.",
    whereFound: "Table salt, seawater (≈ 2.7% by mass), mineral halite, and electrolyte solutions",
    mainFunction: "Models ionic bonding, crystal packing, lattice energy, and electrolyte dissociation.",
    keyFeatures: ["Na⁺ ions", "Cl⁻ ions", "ionic attraction", "FCC cubic lattice", "lattice energy 787 kJ/mol"],
    quickFacts: ["Formula: NaCl", "Ionic solid", "MP 801 °C", "Conducts when molten or dissolved"],
    reactionExample: "Na + ½Cl₂ → NaCl  ΔH = −411 kJ/mol",
    comparisonTargetId: "graphite",
    structure: {
      atoms: [
        atom("Na+", -0.8, -0.8, -0.8, "#f59e0b", 0.28), atom("Cl-", 0, -0.8, -0.8, "#22c55e", 0.36), atom("Na+", 0.8, -0.8, -0.8, "#f59e0b", 0.28),
        atom("Cl-", -0.8, 0, -0.8, "#22c55e", 0.36), atom("Na+", 0, 0, -0.8, "#f59e0b", 0.28), atom("Cl-", 0.8, 0, -0.8, "#22c55e", 0.36),
        atom("Na+", -0.8, 0.8, -0.8, "#f59e0b", 0.28), atom("Cl-", 0, 0.8, -0.8, "#22c55e", 0.36), atom("Na+", 0.8, 0.8, -0.8, "#f59e0b", 0.28),
        atom("Cl-", -0.8, -0.8, 0, "#22c55e", 0.36), atom("Na+", 0, -0.8, 0, "#f59e0b", 0.28), atom("Cl-", 0.8, -0.8, 0, "#22c55e", 0.36),
        atom("Na+", -0.8, 0, 0, "#f59e0b", 0.28), atom("Cl-", 0, 0, 0, "#22c55e", 0.36), atom("Na+", 0.8, 0, 0, "#f59e0b", 0.28),
        atom("Cl-", -0.8, 0.8, 0, "#22c55e", 0.36), atom("Na+", 0, 0.8, 0, "#f59e0b", 0.28), atom("Cl-", 0.8, 0.8, 0, "#22c55e", 0.36),
        atom("Na+", -0.8, -0.8, 0.8, "#f59e0b", 0.28), atom("Cl-", 0, -0.8, 0.8, "#22c55e", 0.36), atom("Na+", 0.8, -0.8, 0.8, "#f59e0b", 0.28),
        atom("Cl-", -0.8, 0, 0.8, "#22c55e", 0.36), atom("Na+", 0, 0, 0.8, "#f59e0b", 0.28), atom("Cl-", 0.8, 0, 0.8, "#22c55e", 0.36),
        atom("Na+", -0.8, 0.8, 0.8, "#f59e0b", 0.28), atom("Cl-", 0, 0.8, 0.8, "#22c55e", 0.36), atom("Na+", 0.8, 0.8, 0.8, "#f59e0b", 0.28)
      ],
      bonds: []
    }
  },
  {
    id: "graphite",
    name: "Graphite",
    category: "Covalent Network Solid",
    group: "Materials",
    subtitle: "Layered sp² carbon sheets",
    formula: "C (layered allotrope)",
    molarMass: "12.01 g/mol (per C)",
    boilingPoint: "4027 °C (sublimes)",
    meltingPoint: "3642 °C (at 100 atm)",
    bondAngle: "120° (within sheets)",
    geometry: "Hexagonal Planar Sheets",
    polarity: "Nonpolar",
    description: "Graphite consists of stacked hexagonal sheets of sp²-hybridized carbon atoms. Strong σ bonds hold atoms within sheets; weak van der Waals forces hold sheets together, allowing them to slide over each other.",
    featuredStructure: "Hexagonal Sheets",
    size: "C-C bond 142 pm",
    location: "Stacked carbon layers",
    visibleIn: "Pencil marks, electrodes, lubricants",
    chemistryNote: "Each carbon in graphite has three σ bonds (sp²) and one unhybridized p orbital. These p orbitals combine across the sheet into a delocalized π band, making graphite an electrical conductor along the planes. Interlayer spacing is 335 pm, held by London dispersion forces.",
    funFact: "A pencil can draw a line 50 km long — each mark is a thin layer of graphite flaking onto paper.",
    realWorldUse: "Pencil 'lead', lubricant, electrode in batteries (lithium-ion) and electrolysis, high-temperature crucibles.",
    whereFound: "Underground deposits, pencils, batteries, and industrial furnace linings",
    mainFunction: "Demonstrates covalent network bonding, electrical conductivity in non-metals, and allotropy of carbon.",
    keyFeatures: ["sp² carbon", "delocalized π electrons", "layered structure", "electrical conductor", "slippery planes"],
    quickFacts: ["Allotrope of carbon", "Conducts electricity", "Layers slide easily", "Used in pencils"],
    reactionExample: "C (graphite) + O₂ → CO₂  ΔH = −393.5 kJ/mol",
    comparisonTargetId: "sodium-chloride",
    structure: {
      atoms: [
        atom("C", 0, 0, 0.2, "#475569", 0.3), atom("C", 0.7, 0.4, 0.2, "#475569", 0.3), atom("C", 0.7, 1.2, 0.2, "#475569", 0.3),
        atom("C", 0, 1.6, 0.2, "#475569", 0.3), atom("C", -0.7, 1.2, 0.2, "#475569", 0.3), atom("C", -0.7, 0.4, 0.2, "#475569", 0.3),
        atom("C", 0, 2.4, 0.2, "#475569", 0.3),
        atom("C", 0.35, 0.2, -0.2, "#64748b", 0.28), atom("C", 1.05, 0.6, -0.2, "#64748b", 0.28), atom("C", 1.05, 1.4, -0.2, "#64748b", 0.28),
        atom("C", 0.35, 1.8, -0.2, "#64748b", 0.28), atom("C", -0.35, 1.4, -0.2, "#64748b", 0.28), atom("C", -0.35, 0.6, -0.2, "#64748b", 0.28),
        atom("C", 1.4, 0.4, 0.2, "#475569", 0.3), atom("C", 1.4, 1.2, 0.2, "#475569", 0.3),
        atom("C", -1.4, 0.4, 0.2, "#475569", 0.3), atom("C", -1.4, 1.2, 0.2, "#475569", 0.3),
        atom("C", 0.7, 2.4, 0.2, "#475569", 0.3), atom("C", -0.7, 2.4, 0.2, "#475569", 0.3), atom("C", 0, 3.2, 0.2, "#475569", 0.3)
      ],
      bonds: [
        bond(0, 1), bond(1, 2), bond(2, 3), bond(3, 4), bond(4, 5), bond(5, 0),
        bond(3, 6), bond(1, 13), bond(2, 14), bond(5, 15), bond(4, 16),
        bond(6, 17), bond(6, 18), bond(17, 19), bond(18, 19)
      ]
    }
  },
  // ──────────────────── ATOMS ────────────────────
  {
    id: "hydrogen-atom",
    name: "Hydrogen Atom",
    category: "Atomic Model",
    group: "Atoms",
    subtitle: "One proton and one electron",
    formula: "H (Z=1)",
    molarMass: "1.008 g/mol",
    boilingPoint: "−252.9 °C (H₂ gas)",
    meltingPoint: "−259.1 °C (H₂ solid)",
    bondAngle: "N/A (single atom)",
    geometry: "Spherical 1s orbital",
    polarity: "N/A",
    description: "Hydrogen is the lightest and most abundant element. Its single electron occupies a 1s orbital around one proton. Its spectrum — the Balmer series — was crucial evidence for quantum theory.",
    featuredStructure: "1s Orbital",
    size: "53 pm (Bohr radius)",
    location: "Atomic orbital",
    visibleIn: "Atomic spectra and quantum models",
    chemistryNote: "The hydrogen atom's electron transitions between quantized energy levels produce light at specific wavelengths. The Lyman series (UV), Balmer series (visible), and Paschen series (IR) are all predicted exactly by the Bohr and Schrödinger models. Hydrogen has three natural isotopes: protium (¹H), deuterium (²H), and tritium (³H).",
    funFact: "Hydrogen makes up about 75% of all normal matter in the universe by mass — mostly in stars and interstellar gas clouds.",
    realWorldUse: "Fuel cells (H₂ + ½O₂ → H₂O + electricity), hydrogenation of vegetable oils, rocket propellant, ammonia production.",
    whereFound: "Water, acids, hydrocarbons, stars, fuels, and countless compounds",
    mainFunction: "Introduces atomic structure, orbitals, isotopes, and single-electron quantum mechanics.",
    keyFeatures: ["Z = 1", "single 1s electron", "Bohr radius 53 pm", "3 isotopes", "most abundant element"],
    quickFacts: ["Atomic number: 1", "Lightest element", "75% of universal matter", "Fuel cell fuel"],
    reactionExample: "2H₂ + O₂ → 2H₂O (combustion / fuel cell)",
    comparisonTargetId: "chlorine-atom",
    structure: {
      atoms: [atom("H", 0, 0, 0, "#f8fafc", 0.36)],
      bonds: [],
      orbits: [{ radius: 1.05, color: "#60a5fa" }]
    }
  },
  {
    id: "chlorine-atom",
    name: "Chlorine Atom",
    category: "Halogen Atom",
    group: "Atoms",
    subtitle: "Reactive nonmetal — Group 17",
    formula: "Cl (Z=17)",
    molarMass: "35.45 g/mol",
    boilingPoint: "−34.1 °C (Cl₂ gas)",
    meltingPoint: "−101.5 °C (Cl₂ solid)",
    bondAngle: "N/A (single atom)",
    geometry: "7 valence electrons",
    polarity: "N/A",
    description: "Chlorine is a halogen with electron configuration [Ne] 3s² 3p⁵. With 7 valence electrons, it is highly electronegative (3.16) and reactive, readily gaining one electron to achieve the argon noble-gas configuration.",
    featuredStructure: "Valence Shell",
    size: "99 pm (covalent radius)",
    location: "Outer electron shell",
    visibleIn: "Salts, acids, disinfectants",
    chemistryNote: "Chlorine forms ionic bonds by gaining an electron (Cl + e⁻ → Cl⁻) or covalent bonds by sharing (as in HCl). Cl₂ gas is a yellow-green diatomic at room temperature. The two naturally occurring isotopes, ³⁵Cl (75.8%) and ³⁷Cl (24.2%), give Cl its non-integer atomic mass of 35.45.",
    funFact: "Chlorine was used as a chemical weapon in World War I (Ypres, 1915) — the same element that makes tap water safe to drink at ppm concentrations.",
    realWorldUse: "Water disinfection (Cl₂ and hypochlorite), PVC polymer, bleach, pharmaceuticals, pesticides.",
    whereFound: "Table salt, hydrochloric acid (stomach acid), PVC, disinfectants, seawater, and the ozone layer (CFCs)",
    mainFunction: "Illustrates halogen reactivity, electron gain, and salt formation.",
    keyFeatures: ["Z = 17", "7 valence electrons", "high electronegativity 3.16", "two isotopes ³⁵Cl/³⁷Cl", "halogen group 17"],
    quickFacts: ["Atomic number: 17", "Halogen group 17", "Forms Cl⁻ ions", "Yellow-green diatomic gas"],
    reactionExample: "Na + ½Cl₂ → NaCl (ionic bond formation)",
    comparisonTargetId: "hydrogen-atom",
    structure: {
      atoms: [atom("Cl", 0, 0, 0, "#22c55e", 0.5)],
      bonds: [],
      orbits: [{ radius: 0.9, color: "#38bdf8" }, { radius: 1.35, color: "#a78bfa" }]
    }
  },
  // ──────────────────── BONDS ────────────────────
  {
    id: "covalent-bond",
    name: "Covalent Bond",
    category: "Bonding Model",
    group: "Bonds",
    subtitle: "Shared electron pair",
    formula: "e.g. H-H, C-H, O=O",
    molarMass: "N/A (bond type)",
    boilingPoint: "N/A",
    meltingPoint: "N/A",
    bondAngle: "Varies by geometry",
    geometry: "Depends on VSEPR",
    polarity: "Polar or Nonpolar",
    description: "A covalent bond forms when two atoms share one or more pairs of electrons. The shared electrons are attracted to both nuclei simultaneously, holding the atoms together. Bond order (1, 2, 3) determines length and strength.",
    featuredStructure: "Shared Electron Pair",
    size: "Bond length varies (H-H: 74 pm)",
    location: "Between bonded nuclei",
    visibleIn: "Molecules and network solids",
    chemistryNote: "Covalent bonds form when the electronegativity difference between atoms is less than about 1.7. A single bond is a σ bond (head-on orbital overlap). Double bonds add one π bond; triple bonds add two π bonds. Bond dissociation energy for C-C is 347 kJ/mol, C=C is 614 kJ/mol, and C≡C is 839 kJ/mol.",
    funFact: "Diamond's extreme hardness (Mohs 10) arises from a vast 3D network of strong C-C covalent bonds extending throughout the entire crystal — it is essentially one gigantic molecule.",
    realWorldUse: "All organic molecules (drugs, plastics, fuels), DNA, proteins — life itself is built from covalent bonds.",
    whereFound: "Water, methane, proteins, plastics, minerals, and most molecular compounds",
    mainFunction: "Explains molecular connectivity, shape, bond strength, and molecular polarity.",
    keyFeatures: ["Electron sharing", "bond order 1/2/3", "σ and π bonds", "VSEPR geometry", "polar or nonpolar"],
    quickFacts: ["Shares electrons", "Creates molecules", "Can be polar or nonpolar", "Diamond has covalent network"],
    reactionExample: "H• + H• → H-H (bond formation, ΔE = −436 kJ/mol)",
    comparisonTargetId: "ionic-bond",
    structure: {
      atoms: [
        atom("H", -0.65, 0, 0, "#f8fafc", 0.28),
        atom("H", 0.65, 0, 0, "#f8fafc", 0.28)
      ],
      bonds: [bond(0, 1)],
      electronPairs: [
        { x: 0, y: 0.2, z: 0, color: "#60a5fa" },
        { x: 0, y: -0.2, z: 0, color: "#60a5fa" }
      ]
    }
  },
  {
    id: "ionic-bond",
    name: "Ionic Bond",
    category: "Bonding Model",
    group: "Bonds",
    subtitle: "Electrostatic charge attraction",
    formula: "e.g. Na⁺Cl⁻",
    molarMass: "N/A (bond type)",
    boilingPoint: "N/A",
    meltingPoint: "N/A",
    bondAngle: "Determined by lattice geometry",
    geometry: "Crystal Lattice",
    polarity: "Fully ionic",
    description: "An ionic bond is the electrostatic attraction between oppositely charged ions. It forms when one atom (low ionization energy, e.g. Na) transfers an electron to another (high electron affinity, e.g. Cl), creating a cation and an anion.",
    featuredStructure: "Ion Pair",
    size: "Ion-ion distance 276 pm (NaCl)",
    location: "Between cation and anion",
    visibleIn: "Salts and ionic crystals",
    chemistryNote: "Ionic bonds form when electronegativity difference > ~1.7. The energy released during lattice formation (lattice energy) stabilizes ionic compounds. Coulomb's law governs the strength: F = kq₁q₂/r². Higher charges and smaller ions produce stronger ionic bonds (e.g. MgO vs NaF).",
    funFact: "Many ionic compounds have remarkably high melting points because ionic bonds must be broken throughout the entire lattice. MgO melts at 2852 °C and is used to line industrial furnaces.",
    realWorldUse: "Table salt (NaCl), calcium carbonate (limestone, chalk, bones), electrolytes in sports drinks, batteries.",
    whereFound: "Salts, minerals, ceramics, batteries, and electrolyte solutions",
    mainFunction: "Explains electron transfer, lattice energy, high melting points, and electrolyte behavior.",
    keyFeatures: ["Electron transfer", "cation + anion", "Coulombic attraction", "lattice energy", "conducts when dissolved"],
    quickFacts: ["Transfers electrons", "Forms charged ions", "High melting points", "Conducts in solution"],
    reactionExample: "Na → Na⁺ + e⁻ ; Cl + e⁻ → Cl⁻ ; Na⁺ + Cl⁻ → NaCl",
    comparisonTargetId: "covalent-bond",
    structure: {
      atoms: [
        atom("Na+", -0.7, 0, 0, "#f59e0b", 0.34),
        atom("Cl-", 0.7, 0, 0, "#22c55e", 0.44)
      ],
      bonds: [],
      electronPairs: [{ x: 0.2, y: 0, z: 0, color: "#93c5fd" }]
    }
  }
];

// ─── Rich knowledge base ───
const knowledgeById = {
  water: {
    whatItIs: "A polar covalent molecule with a bent 104.5° geometry. Two lone pairs on oxygen push the bonding pairs closer together, producing its distinctive V-shape and making it one of the most important solvents on Earth.",
    parts: [
      ["Oxygen atom", "Highly electronegative (3.44); pulls electron density from both H atoms, generating δ− character."],
      ["Hydrogen atoms", "Each carries δ+ character; donate H-bonds to lone pairs on neighboring water molecules."],
      ["O-H covalent bonds", "Bond length 96 pm; bond energy 459 kJ/mol. Polar due to electronegativity difference."],
      ["Lone pairs", "Two lone pairs on O adopt sp³ positions, compressing H-O-H angle from 109.5° to 104.5°."]
    ]
  },
  "carbon-dioxide": {
    whatItIs: "A linear triatomic molecule with two C=O double bonds. Despite each bond being polar, the molecule is nonpolar because the 180° geometry cancels the dipole moments exactly.",
    parts: [
      ["Carbon atom (sp)", "Central atom; sp hybridized with two σ bonds and two π bonds to oxygens."],
      ["Oxygen atoms", "Each forms one σ and one π bond to carbon; lone pairs provide Lewis-base character."],
      ["C=O double bonds", "Bond length 116 pm; bond energy 799 kJ/mol. Short and strong."],
      ["Linear geometry", "σ bonds point 180° apart; π bonds lie perpendicular. No net dipole."]
    ]
  },
  ammonia: {
    whatItIs: "A trigonal pyramidal polar molecule with three N-H bonds and one lone pair. The lone pair gives ammonia its basic character, making it the world's most-produced industrial chemical.",
    parts: [
      ["Nitrogen atom (sp³)", "Central atom with configuration [He] 2s² 2p³; hybridizes to sp³ with one lone pair."],
      ["N-H bonds", "Bond length 101 pm; bond energy 391 kJ/mol. Slightly polar (N is δ−, H is δ+)."],
      ["Lone pair", "Occupies an sp³ orbital; donates to H⁺ (Brønsted base) or metal ions (Lewis base)."],
      ["Trigonal pyramidal shape", "The three H atoms form the base of a pyramid; N sits above with lone pair on top."]
    ]
  },
  methane: {
    whatItIs: "The simplest alkane, with a perfect tetrahedral geometry and four equivalent C-H bonds. The sp³ carbon forms the blueprint for all saturated organic chemistry.",
    parts: [
      ["Carbon atom (sp³)", "Forms four σ bonds using sp³ hybrid orbitals directed to tetrahedral corners."],
      ["C-H bonds (×4)", "Bond length 109 pm; bond energy 413 kJ/mol. Slightly polar but cancel in tetrahedral arrangement."],
      ["Tetrahedral geometry", "109.5° H-C-H angles minimize electron-pair repulsion (VSEPR)."],
      ["Non-polarity", "Equal C-H dipoles point to tetrahedral corners and cancel exactly."]
    ]
  },
  benzene: {
    whatItIs: "A planar aromatic hydrocarbon where six sp²-hybridized carbons form a ring stabilized by 6 delocalized π electrons — the textbook example of aromaticity and resonance.",
    parts: [
      ["sp² Carbon atoms (×6)", "Each forms 2 C-C σ bonds and 1 C-H σ bond; remaining p orbital contributes to π system."],
      ["Delocalized π cloud", "6 electrons spread above and below the ring plane; all C-C bonds equalized at 139 pm."],
      ["C-H bonds (×6)", "Bond length 108 pm; point radially outward from the ring in the molecular plane."],
      ["Resonance structures", "Neither Kekulé structure alone is correct; reality is the superposition with fractional bond orders."]
    ]
  },
  "sodium-chloride": {
    whatItIs: "An ionic solid made from a repeating face-centered cubic array of Na⁺ and Cl⁻ ions. Each ion is surrounded by 6 of the opposite charge, giving NaCl a coordination number of 6:6.",
    parts: [
      ["Na⁺ ions", "Radius 102 pm; formed when Na donates its 3s electron; reaches stable Ne configuration."],
      ["Cl⁻ ions", "Radius 181 pm; formed when Cl gains an electron; reaches stable Ar configuration."],
      ["FCC lattice", "Atoms arranged so each is octahedrally coordinated; unit cell parameter 564 pm."],
      ["Electrostatic attraction", "Coulombic force F = kq₁q₂/r² holds the lattice together; lattice energy = 787 kJ/mol."]
    ]
  },
  graphite: {
    whatItIs: "A layered carbon allotrope where strong covalent sp² sheets stack via van der Waals forces. The delocalized π electrons make it a conductor; the weak interlayer forces make it a lubricant.",
    parts: [
      ["sp² Carbon sheets", "Each C bonds to 3 neighbors via σ bonds at 120°; hexagonal honeycomb extends infinitely."],
      ["Delocalized π band", "Unhybridized p orbitals overlap across sheets forming a conducting band."],
      ["Layer spacing", "335 pm between sheets; held by London dispersion forces (~5 kJ/mol per layer)."],
      ["Graphene monolayer", "A single isolated sheet is graphene — strongest known material at 130 GPa."]
    ]
  },
  "hydrogen-atom": {
    whatItIs: "The simplest atom — one proton, one electron — whose exact quantum-mechanical solution revealed the structure of orbitals and the wave nature of electrons.",
    parts: [
      ["Proton (nucleus)", "Single positive charge; radius ~0.87 fm; provides Coulombic attraction holding the electron."],
      ["1s electron", "Probability density maximum at Bohr radius (53 pm); spherically symmetric orbital."],
      ["Quantized energy levels", "Eₙ = −13.6/n² eV; transitions produce the Lyman, Balmer, and Paschen spectral series."],
      ["Isotopes", "Protium (¹H, no neutron), Deuterium (²H, 1 neutron), Tritium (³H, 2 neutrons, radioactive)."]
    ]
  },
  "chlorine-atom": {
    whatItIs: "A halogen atom with 7 valence electrons, one short of a noble-gas configuration. Its high electronegativity and electron affinity drive ionic and polar covalent bond formation.",
    parts: [
      ["Nucleus (Z=17)", "17 protons; naturally 75.8% ³⁵Cl and 24.2% ³⁷Cl, giving average mass 35.45."],
      ["Core electrons", "Filled shells [Ne] = 1s² 2s² 2p⁶; shield outer electrons from full nuclear charge."],
      ["Valence shell 3s² 3p⁵", "7 electrons; gains one more to fill 3p⁶ → Cl⁻ with Ar configuration."],
      ["Electronegativity 3.16", "High χ pulls bonding electrons in polar covalent bonds (e.g. H-Cl, 0.9 Debye)."]
    ]
  },
  "covalent-bond": {
    whatItIs: "A chemical bond formed by the mutual sharing of electrons between atoms of similar electronegativity. Bond strength and length depend on bond order and the sizes of the bonded atoms.",
    parts: [
      ["σ bond", "Head-on overlap of orbitals; every covalent bond contains one σ bond; allows free rotation."],
      ["π bond", "Lateral p-p overlap; present in double (1 π) and triple (2 π) bonds; restricts rotation."],
      ["Bond polarity", "Electronegativity difference 0.4–1.7 → polar covalent; < 0.4 → nonpolar covalent."],
      ["Bond dissociation energy", "Energy to homolytically break one mole of bonds in the gas phase (H-H: 436 kJ/mol)."]
    ]
  },
  "ionic-bond": {
    whatItIs: "The electrostatic attraction between oppositely charged ions formed by complete electron transfer from a metal to a nonmetal. Ionic compounds form crystalline lattices, not discrete molecules.",
    parts: [
      ["Cation (e.g. Na⁺)", "Metal loses valence electrons → smaller radius, stable noble-gas configuration."],
      ["Anion (e.g. Cl⁻)", "Nonmetal gains electrons → larger radius, stable noble-gas configuration."],
      ["Lattice energy", "Energy released forming the crystal from gaseous ions; larger for smaller, higher-charge ions."],
      ["Coulombic force", "F = kq₁q₂/r²; increasing charge or decreasing distance dramatically strengthens the bond."]
    ]
  }
};

const normalizeKnowledge = (object) => {
  const knowledge = knowledgeById[object.id] ?? {
    whatItIs: object.description,
    parts: object.keyFeatures.map((feature) => [feature, "Important chemical feature represented in this 3D model."])
  };
  return {
    whatItIs: knowledge.whatItIs,
    parts: knowledge.parts.map(([name, role]) => ({ name, role }))
  };
};

export const chemistryObjects = allChemistryObjects.map((object) => ({
  ...object,
  modelPath: null,
  knowledge: normalizeKnowledge(object)
}));

export const getObjectById = (id) => chemistryObjects.find((object) => object.id === id);
