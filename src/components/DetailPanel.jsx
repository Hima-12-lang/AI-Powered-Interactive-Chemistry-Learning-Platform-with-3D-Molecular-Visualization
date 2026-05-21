import { Box } from "lucide-react";
import { useEffect, useState } from "react";
import { groupClass } from "../utils/groupTheme.js";

export default function DetailPanel({ object }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = window.setTimeout(() => setIsLoading(false), 300);
    return () => window.clearTimeout(timer);
  }, [object.id]);

  if (isLoading) {
    return (
      <aside className={`detail-panel ${groupClass(object.group)}`}>
        {[1, 2, 3, 4].map((item) => (
          <article className="detail-card skeleton-card" key={item}>
            <div className="skeleton-line short" />
            <div className="skeleton-line" />
            <div className="skeleton-line" />
            <div className="skeleton-line medium" />
          </article>
        ))}
      </aside>
    );
  }

  return (
    <aside className={`detail-panel ${groupClass(object.group)}`}>
      <article className="detail-card featured">
        <div className="section-heading">Chemical Structure</div>
        <div className="structure-row">
          <span className="model-icon detail-model-icon">
            <Box size={22} />
          </span>
          <div>
            <h3>{object.featuredStructure}</h3>
            <p>{object.category}</p>
          </div>
        </div>
        <dl className="stats-list">
          <div><dt>Type</dt><dd>{object.group}</dd></div>
          <div><dt>Size</dt><dd>{object.size}</dd></div>
          <div><dt>Location</dt><dd>{object.location}</dd></div>
          <div><dt>Observed in</dt><dd>{object.visibleIn}</dd></div>
        </dl>
        <label className="marker-toggle">
          <span>Show markers</span>
          <input type="checkbox" defaultChecked />
        </label>
      </article>
      <article className="detail-card">
        <div className="section-heading">Knowledge Base</div>
        <p>{object.knowledge.whatItIs}</p>
        <div className="parts-list">
          {object.knowledge.parts.map((part) => (
            <div className="part-item" key={part.name}>
              <strong>{part.name}</strong>
              <span>{part.role}</span>
            </div>
          ))}
        </div>
      </article>
      <article className="detail-card">
        <div className="section-heading">Chemistry Notes</div>
        <p>{object.chemistryNote}</p>
        <div className="fun-fact">
          <strong>For Fun</strong>
          <span>{object.funFact}</span>
        </div>
      </article>
      <article className="detail-card occurrence">
        <div className="section-heading">Where It Appears</div>
        <p>{object.whereFound}</p>
        <div className="mini-map">
          <span />
          <span />
          <span />
          <b>{object.group}</b>
        </div>
      </article>
    </aside>
  );
}
