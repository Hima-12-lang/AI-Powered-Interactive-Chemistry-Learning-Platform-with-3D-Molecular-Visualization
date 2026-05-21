import { Atom, BookOpen, GalleryHorizontalEnd, NotebookPen, Settings, UserRound } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-logo">
          <Atom size={20} />
        </div>
        <div>
          <h1>Chemistry Structure Studio</h1>
          <p>Explore atoms, bonds, molecules, and materials</p>
        </div>
      </div>
      <nav className="top-nav" aria-label="Primary navigation">
        <a href="#gallery"><GalleryHorizontalEnd size={16} /> Models</a>
        <a href="#library"><BookOpen size={16} /> Library</a>
        <a href="#notebook"><NotebookPen size={16} /> Lab Notes</a>
        <a href="#settings"><Settings size={16} /> Settings</a>
        <button className="profile-button" aria-label="Profile">
          <UserRound size={18} />
        </button>
      </nav>
    </header>
  );
}
