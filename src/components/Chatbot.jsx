import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Settings, Bot, Sparkles, AlertCircle } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "init",
      sender: "bot",
      text: "Welcome to Alchemist AI Tutor! 🧪 I am trained exclusively in chemistry. How can I help you today?\n\n(Tip: Paste your Gemini API key in the settings above for live generative tutoring, or chat in offline mode!)"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("gemini_api_key") ?? "");
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const saveApiKey = (key) => {
    const trimmed = key.trim();
    setApiKey(trimmed);
    localStorage.setItem("gemini_api_key", trimmed);
    setShowSettings(false);
  };

  // Chemistry keyword filter list (Strict chemistry-only constraint)
  const chemistryKeywords = [
    "chem", "atom", "molecule", "bond", "reaction", "periodic", "element", "water", "co2",
    "methane", "ammonia", "benzene", "nacl", "salt", "graphite", "hydrogen", "chlorine",
    "covalent", "ionic", "ph", "acid", "base", "alkali", "buffer", "molar", "mass", "temp",
    "boil", "melt", "geometry", "orbital", "hybrid", "valence", "electron", "proton",
    "neutron", "nucleus", "combustion", "haber", "electrolysis", "thermodynamic", "exo",
    "endo", "enthalpy", "entropy", "equilibrium", "catalyst", "formula", "balance",
    "coefficient", "organic", "polymer", "metal", "halogen", "noble", "alkane", "alkene",
    "alkyne", "ether", "ester", "alcohol", "ketone", "aldehyde", "carboxyl", "carbo",
    "amine", "peptide", "protein", "dna", "spectroscopy", "titration", "matter", "solid",
    "liquid", "gas", "vapor", "sublime", "lattice", "solute", "solvent", "solution"
  ];

  const checkIsChemistryRelated = (text) => {
    const lower = text.toLowerCase();
    return chemistryKeywords.some((word) => lower.includes(word));
  };

  const getOfflineChemistryResponse = (query) => {
    const lower = query.toLowerCase();

    if (lower.includes("water") || lower.includes("h2o")) {
      return "Water (H₂O) is a bent, polar molecule with a bond angle of 104.5°. Its oxygen is sp³ hybridized. Because oxygen is highly electronegative (3.44), it pulls electron density to create partial charges, allowing robust hydrogen-bonding networks that give water anomalous boiling points and solid ice density patterns.";
    }
    if (lower.includes("ph") || lower.includes("acid") || lower.includes("base")) {
      return "pH represents the negative logarithm of the hydrogen ion concentration: pH = -log[H⁺]. Acidic solutions have pH < 7, neutral is 7, and basic solutions are > 7. Indicators change color in response to pH (e.g. pH Sim colors range from red for acids to purple for bases).";
    }
    if (lower.includes("bond") || lower.includes("covalent") || lower.includes("ionic")) {
      return "Chemical bonds hold atoms together. Covalent bonds form through shared electron pairs between nonmetals (e.g., H₂O, CH₄). Ionic bonds involve total valence electron transfer, creating charged cations and anions attracted electrostatically in vast lattices (e.g., NaCl).";
    }
    if (lower.includes("periodic") || lower.includes("trend") || lower.includes("element")) {
      return "Periodic trends include:\n1. Atomic Radius: Decreases left-to-right (higher nuclear charge pulls shells) and increases top-to-bottom.\n2. Electronegativity: Increases left-to-right and decreases top-to-bottom.\n3. Ionization Energy: Increases left-to-right (electrons harder to remove) and decreases down.";
    }
    if (lower.includes("balance") || lower.includes("equation") || lower.includes("coefficient")) {
      return "To balance a chemical equation, adjust only the coefficients in front of formulas to make sure the number of atoms for each element is equal on both reactants (left) and products (right) sides. Never edit the subscripts of the molecules themselves!";
    }
    if (lower.includes("methane") || lower.includes("ch4")) {
      return "Methane (CH₄) is the simplest alkane hydrocarbon. The carbon atom is sp³ hybridized, creating four perfectly symmetrical C-H covalent single bonds arranged in a tetrahedral geometry (109.5° bond angle). It is highly flammable and nonpolar.";
    }
    if (lower.includes("ammonia") || lower.includes("nh3")) {
      return "Ammonia (NH₃) is a trigonal pyramidal molecule with a bond angle of 107°. Its nitrogen is sp³ hybridized with one lone pair at the apex, which repels the N-H bonding pairs, squeezing their angle. The lone pair makes ammonia behave as a weak Brønsted base.";
    }
    if (lower.includes("benzene") || lower.includes("c6h6")) {
      return "Benzene (C₆H₆) is a flat, planar hexagonal ring. The six sp² carbon atoms share a delocalized cloud of 6 π (pi) electrons above and below the ring plane. This resonance stabilization satisfies Hückel's rule (4n+2), making benzene highly stable.";
    }
    if (lower.includes("salt") || lower.includes("nacl") || lower.includes("sodium chloride")) {
      return "Sodium Chloride (NaCl) forms a giant ionic face-centered cubic (FCC) crystal lattice. Each sodium cation (Na⁺) is octahedrally coordinated by 6 chlorine anions (Cl⁻), and vice versa. It exhibits high melting points (801 °C) and is soluble in polar water.";
    }
    if (lower.includes("graphite")) {
      return "Graphite is a layered covalent network allotrope of carbon. The sp²-hybridized carbons form flat sheets of hexagonal rings with 120° angles. Unhybridized p-orbitals form delocalized π clouds, conducting electricity. Layers stack via weak London dispersion forces, sliding easily.";
    }
    if (lower.includes("api") || lower.includes("gemini") || lower.includes("key")) {
      return "You can get fully dynamic science tutoring by opening the settings (⚙️ icon) above and entering a Google Gemini API Key. It will automatically utilize Gemini 1.5 Flash to tutor you!";
    }

    return "That's an interesting chemistry query! Since I am running in offline local mode, my predefined topics are limited. To get dynamic AI tutor responses on any chemistry topic, please open settings (⚙️) above and paste a Gemini API Key! Or try asking about: Water, Methane, Ammonia, Benzene, NaCl, pH, Chemical Bonds, Periodic Trends, or Balancing Equations.";
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userText = inputValue;
    setInputValue("");

    // Add user message
    const userMsg = { id: Date.now().toString(), sender: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);

    // Check chemistry filter constraint
    if (!checkIsChemistryRelated(userText)) {
      const rejectMsg = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "I am sorry, but as Alchemist AI, I am strictly dedicated to Chemistry Tutoring. 🧪 Please ask me about atomic structure, molecular bonds, periodic properties, chemical equations, or pH simulations, and I will be happy to help!"
      };
      setMessages((prev) => [...prev, rejectMsg]);
      return;
    }

    // Bot response loading
    setIsLoading(true);
    const botMsgPlaceholderId = "loading-placeholder";
    setMessages((prev) => [...prev, { id: botMsgPlaceholderId, sender: "bot", text: "..." }]);

    if (!apiKey) {
      // Offline local simulation mode
      setTimeout(() => {
        const offlineText = getOfflineChemistryResponse(userText);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMsgPlaceholderId ? { ...m, id: Date.now().toString(), text: offlineText } : m
          )
        );
        setIsLoading(false);
      }, 750);
    } else {
      // Live Gemini API mode
      try {
        const systemInstruction =
          "You are Alchemist AI, an expert chemistry tutoring assistant. You must ONLY answer chemistry-related questions. " +
          "If the user asks about non-chemistry topics (such as general history, coding non-chemistry scripts, sports, news, general creative writing, " +
          "or casual chat unrelated to science), politely decline to answer, explaining that you are trained exclusively as a Chemistry Tutor.";

        const payload = {
          contents: [
            {
              parts: [
                { text: `System rule: ${systemInstruction}\n\nUser Question: ${userText}` }
              ]
            }
          ]
        };

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          let detailedMsg = "Failed to contact Gemini API.";
          try {
            const errData = await response.json();
            if (errData.error?.message) {
              detailedMsg = errData.error.message;
            }
          } catch (_) {}
          throw new Error(detailedMsg);
        }

        const data = await response.json();
        const geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "I couldn't fetch an answer. Please retry.";

        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMsgPlaceholderId ? { ...m, id: Date.now().toString(), text: geminiText } : m
          )
        );
      } catch (err) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMsgPlaceholderId
              ? {
                ...m,
                id: Date.now().toString(),
                text: `⚠️ Error: ${err.message}. Please double-check your Gemini API key in settings.`
              }
              : m
          )
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {/* Floating Chat Bubble Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-toggle-btn"
        aria-label="Open Chemistry Tutor Chatbot"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
      </button>

      {/* Slide-out Chat Panel */}
      <aside className={`chat-sidepanel ${isOpen ? "open" : ""}`} role="dialog" aria-label="Alchemist AI Chatbot">
        <div className="chat-header">
          <div className="chat-brand">
            <span className="chat-avatar">
              <Bot size={16} />
            </span>
            <div>
              <h3>Alchemist AI</h3>
              <p>Chemistry Tutor</p>
            </div>
          </div>
          <div className="chat-header-actions">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`chat-header-btn ${showSettings ? "active" : ""}`}
              title="API Settings"
            >
              <Settings size={16} />
            </button>
            <button onClick={() => setIsOpen(false)} className="chat-header-btn" title="Close Panel">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Settings view drawer */}
        {showSettings && (
          <div className="chat-settings">
            <h4>Gemini API Configuration</h4>
            <p>Paste your Gemini API key here to enable live AI responses. Keys are saved securely in your local browser storage.</p>
            <div className="settings-input-group">
              <input
                type="password"
                placeholder="Paste Gemini key (AIzaSy...)"
                defaultValue={apiKey}
                id="gemini-key-input"
              />
              <button
                onClick={() => {
                  const val = document.getElementById("gemini-key-input")?.value ?? "";
                  saveApiKey(val);
                }}
              >
                Save Key
              </button>
            </div>
            {apiKey && (
              <button
                className="clear-key-btn"
                onClick={() => {
                  saveApiKey("");
                  if (document.getElementById("gemini-key-input")) {
                    document.getElementById("gemini-key-input").value = "";
                  }
                }}
              >
                Clear Key (Offline Mode)
              </button>
            )}
          </div>
        )}

        {/* Scrollable messages area */}
        <div className="chat-messages" ref={scrollRef}>
          {messages.map((m) => (
            <div key={m.id} className={`chat-message-row ${m.sender}`}>
              {m.sender === "bot" && (
                <span className="message-bot-avatar">
                  <Sparkles size={12} />
                </span>
              )}
              <div className="message-bubble">
                <p style={{ whiteSpace: "pre-wrap" }}>{m.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chat-message-row bot typing">
              <span className="message-bot-avatar">
                <Sparkles size={12} />
              </span>
              <div className="message-bubble typing-dots">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>

        {/* API key warning in offline mode */}
        {!apiKey && !showSettings && (
          <div className="offline-warning-pill">
            <AlertCircle size={13} />
            <span>Running Offline Mode</span>
          </div>
        )}

        {/* Message Input bar */}
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Ask a chemistry question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button onClick={handleSend} disabled={isLoading || !inputValue.trim()} aria-label="Send message">
            <Send size={15} />
          </button>
        </div>
      </aside>
    </>
  );
}
