export const groupClass = (group = "") => `group-${group.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "default"}`;
