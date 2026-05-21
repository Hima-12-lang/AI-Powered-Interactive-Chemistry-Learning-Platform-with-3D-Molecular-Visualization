import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import MainViewer from "./components/MainViewer.jsx";
import DetailPanel from "./components/DetailPanel.jsx";
import BottomPanel from "./components/BottomPanel.jsx";
import CompareModal from "./components/CompareModal.jsx";
import LearningLab from "./components/LearningLab.jsx";
import Chatbot from "./components/Chatbot.jsx";
import { chemistryObjects, getObjectById } from "./data/chemistryObjects.js";

const emptyProgress = { text: false, voice: false, quiz: false, activity: false };
const loadProgress = () => {
  try {
    return JSON.parse(window.localStorage.getItem("chemistry-studio-progress") || "{}");
  } catch {
    return {};
  }
};

export default function App() {
  const [selectedId, setSelectedId] = useState("water");
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [progressByTopic, setProgressByTopic] = useState(loadProgress);

  const selectedObject = getObjectById(selectedId) ?? chemistryObjects[0];
  const comparisonObject = getObjectById(selectedObject.comparisonTargetId) ?? chemistryObjects[1];
  const selectedProgress = progressByTopic[selectedObject.id] ?? emptyProgress;

  const filteredObjects = useMemo(() => {
    return chemistryObjects.filter((object) => {
      const matchesFilter = filter === "All" || object.group === filter;
      const haystack = `${object.name} ${object.category} ${object.subtitle}`.toLowerCase();
      return matchesFilter && haystack.includes(query.trim().toLowerCase());
    });
  }, [filter, query]);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(""), 2400);
  };

  useEffect(() => {
    window.localStorage.setItem("chemistry-studio-progress", JSON.stringify(progressByTopic));
  }, [progressByTopic]);

  const markProgress = (step) => {
    setProgressByTopic((current) => ({
      ...current,
      [selectedObject.id]: {
        ...(current[selectedObject.id] ?? emptyProgress),
        [step]: true
      }
    }));
  };

  return (
    <div className="app-shell">
      <Header />
      <main className="studio-grid">
        <Sidebar
          objects={filteredObjects}
          selectedId={selectedId}
          filter={filter}
          query={query}
          onFilterChange={setFilter}
          onQueryChange={setQuery}
          onSelect={setSelectedId}
        />
        <section className="center-stack">
          <MainViewer object={selectedObject} onToast={showToast} />
          <LearningLab object={selectedObject} progress={selectedProgress} onProgress={markProgress} onToast={showToast} />
          <BottomPanel
            object={selectedObject}
            comparisonObject={comparisonObject}
            onOpenCompare={() => setIsCompareOpen(true)}
          />
        </section>
        <DetailPanel object={selectedObject} />
      </main>
      {isCompareOpen && (
        <CompareModal object={selectedObject} comparisonObject={comparisonObject} onClose={() => setIsCompareOpen(false)} />
      )}
      <footer className="app-footer">
        <span>Powered by AIMER Society</span>
        <strong>Interactive Chemistry Visualization Lab</strong>
      </footer>
      {toast && <div className="toast">{toast}</div>}
      <Chatbot />
    </div>
  );
}
