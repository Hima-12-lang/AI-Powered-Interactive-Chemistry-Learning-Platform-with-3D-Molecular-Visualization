import { Box, X } from "lucide-react";
import { groupClass } from "../utils/groupTheme.js";

export default function CompareModal({ object, comparisonObject, onClose }) {
  const rows = [
    ["Category", object.category, comparisonObject.category],
    ["Main function", object.mainFunction, comparisonObject.mainFunction],
    ["Key structures", object.keyFeatures.join(", "), comparisonObject.keyFeatures.join(", ")],
    ["Where found", object.whereFound, comparisonObject.whereFound]
  ];

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Comparison view">
      <div className="compare-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close comparison"><X size={18} /></button>
        <div className="modal-header">
          <div>
            <div className="section-heading">Comparison View</div>
            <h2>{object.name} vs {comparisonObject.name}</h2>
          </div>
        </div>
        <div className="compare-hero">
          <div className={groupClass(object.group)}>
            <span className="compare-model-badge"><Box size={34} /></span>
            <strong>{object.name}</strong>
            <small>{object.category}</small>
          </div>
          <div className={groupClass(comparisonObject.group)}>
            <span className="compare-model-badge"><Box size={34} /></span>
            <strong>{comparisonObject.name}</strong>
            <small>{comparisonObject.category}</small>
          </div>
        </div>
        <table>
          <tbody>
            {rows.map(([label, left, right]) => (
              <tr key={label}>
                <th>{label}</th>
                <td className={`compare-left ${groupClass(object.group)}`}>{left}</td>
                <td className={`compare-right ${groupClass(comparisonObject.group)}`}>{right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
