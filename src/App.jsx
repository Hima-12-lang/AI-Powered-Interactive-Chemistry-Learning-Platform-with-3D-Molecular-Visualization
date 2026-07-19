import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import MainViewer from "./components/MainViewer.jsx";
import DetailPanel from "./components/DetailPanel.jsx";
import BottomPanel from "./components/BottomPanel.jsx";
import CompareModal from "./components/CompareModal.jsx";
import LearningLab from "./components/LearningLab.jsx";
import Chatbot from "./components/Chatbot.jsx";
import AuthForm from "./components/AuthForm.jsx";
import ProfileBanner from "./components/ProfileBanner.jsx";
import { chemistryObjects, getObjectById } from "./data/chemistryObjects.js";
import { fetchMe, fetchProgress, login, saveProgress, signup } from "./api/auth.js";

const emptyProgress = { text: false, voice: false, quiz: false, activity: false };

export default function App() {
  const [selectedId, setSelectedId] = useState("water");
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [progressByTopic, setProgressByTopic] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authError, setAuthError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [authToken, setAuthToken] = useState(() => window.localStorage.getItem("chemistry_studio_token") || "");

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
    if (!authToken) {
      setIsAuthenticated(false);
      return;
    }

    const loadUserData = async () => {
      try {
        const meResult = await fetchMe(authToken);
        if (meResult.error) {
          throw new Error(meResult.error);
        }
        setUserEmail(meResult.email);

        const progressResult = await fetchProgress(authToken);
        if (progressResult.error) {
          throw new Error(progressResult.error);
        }

        setProgressByTopic(progressResult ?? {});
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth load error:", error);
        setIsAuthenticated(false);
        setAuthToken("");
        window.localStorage.removeItem("chemistry_studio_token");
        showToast("Please sign in again.");
      }
    };

    loadUserData();
  }, [authToken]);

  useEffect(() => {
    if (!isAuthenticated || !authToken) return;

    const saveUserProgress = async () => {
      try {
        await saveProgress(authToken, progressByTopic);
      } catch (error) {
        console.error("Save progress error:", error);
        showToast("Unable to save progress to the server.");
      }
    };

    saveUserProgress();
  }, [authToken, isAuthenticated, progressByTopic]);

  const handleSignup = async (email, password) => {
    setAuthError("");

    const result = await signup(email, password);
    if (result.error) {
      setAuthError(result.error);
      return;
    }

    window.localStorage.setItem("chemistry_studio_token", result.token);
    setAuthToken(result.token);
    setUserEmail(result.email);
    setIsAuthenticated(true);
    showToast("Account created and signed in!");
  };

  const handleLogin = async (email, password) => {
    setAuthError("");

    const result = await login(email, password);
    if (result.error) {
      setAuthError(result.error);
      return;
    }

    window.localStorage.setItem("chemistry_studio_token", result.token);
    setAuthToken(result.token);
    setUserEmail(result.email);
    setIsAuthenticated(true);
    showToast("Signed in successfully!");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthToken("");
    setUserEmail("");
    setProgressByTopic({});
    window.localStorage.removeItem("chemistry_studio_token");
    showToast("Signed out.");
  };

  const handleAuthSubmit = (email, password) => {
    if (authMode === "login") {
      handleLogin(email, password);
    } else {
      handleSignup(email, password);
    }
  };

  const markProgress = (step) => {
    setProgressByTopic((current) => ({
      ...current,
      [selectedObject.id]: {
        ...(current[selectedObject.id] ?? emptyProgress),
        [step]: true
      }
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="app-shell">
        <AuthForm
          mode={authMode}
          onSubmit={handleAuthSubmit}
          switchMode={() => setAuthMode((current) => (current === "login" ? "signup" : "login"))}
          error={authError}
        />
        {toast && <div className="toast">{toast}</div>}
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Header />
      <ProfileBanner userEmail={userEmail} onLogout={handleLogout} />
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
