import { Box, Check, ChevronDown, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { groupClass } from "../utils/groupTheme.js";

const filters = ["All", "Atoms", "Molecules", "Bonds", "Materials"];
const groupOrder = ["Atoms", "Molecules", "Bonds", "Materials"];

export default function Sidebar({ objects, selectedId, filter, query, onFilterChange, onQueryChange, onSelect }) {
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const groupedObjects = groupOrder
    .map((group) => ({
      group,
      items: objects.filter((object) => object.group === group)
    }))
    .filter((section) => section.items.length > 0);

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="section-heading">Chemistry Library</div>
        <label className="search-box">
          <Search size={15} />
          <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search models..." />
        </label>
        <div className="filter-row">
          {filters.map((item) => (
            <button key={item} className={`${filter === item ? "chip active" : "chip"} filter-${item.toLowerCase()}`} onClick={() => onFilterChange(item)}>
              {filter === item && <Check size={13} />}
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="object-scroll">
        {groupedObjects.length === 0 ? (
          <div className="empty-library">No models found</div>
        ) : (
          groupedObjects.map((section) => (
            <section className={`object-section ${groupClass(section.group)}`} key={section.group}>
              <button
                className="object-section-heading"
                onClick={() => setCollapsedGroups((current) => ({ ...current, [section.group]: !current[section.group] }))}
                aria-expanded={!collapsedGroups[section.group]}
              >
                {collapsedGroups[section.group] ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                <span>{section.group}</span>
                <b>{section.items.length}</b>
              </button>
              {!collapsedGroups[section.group] && <div className="object-list">
                {section.items.map((object) => (
                  <button
                    key={object.id}
                    className={selectedId === object.id ? `object-item selected ${groupClass(object.group)}` : `object-item ${groupClass(object.group)}`}
                    onClick={() => onSelect(object.id)}
                  >
                    <span className={object.modelPath ? "model-icon available" : "model-icon"}>
                      <Box size={19} />
                    </span>
                    <span>
                      <strong>{object.name}</strong>
                      <small>{object.category}</small>
                    </span>
                    {selectedId === object.id && <ChevronRight className="selected-arrow" size={18} />}
                  </button>
                ))}
              </div>}
            </section>
          ))
        )}
      </div>
    </aside>
  );
}
