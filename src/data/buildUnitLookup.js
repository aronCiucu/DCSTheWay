/**
 * Build a fast lookup map from an editable UNIT_CATALOG.
 * Supports:
 *  - "F-16C_50" (exact string)
 *  - { prefix: "Mirage-F1" }
 *  - { contains: "Mirage-F1" }
 *  - { regex: "^Mirage-F1" }  (JS regex string)
 *
 * Requires `allTypes` list so patterns can expand.
 */
export function buildUnitLookup(unitCatalog, allTypes = []) {
  const lookup = {};
  const all = new Set(allTypes);

  const expandSpec = (spec) => {
    if (typeof spec === "string") return [spec];

    if (spec && typeof spec === "object") {
      if (spec.prefix) {
        return [...all].filter((t) => t.startsWith(spec.prefix));
      }
      if (spec.contains) {
        return [...all].filter((t) => t.includes(spec.contains));
      }
      if (spec.regex) {
        const r = new RegExp(spec.regex);
        return [...all].filter((t) => r.test(t));
      }
    }
    return [];
  };

  for (const cat of unitCatalog || []) {
    const category = cat?.category ?? "Unknown";
    for (const sub of cat?.subcategories || []) {
      const subcategory = sub?.name ?? "Unknown";

      for (const spec of sub?.units || []) {
        const types = expandSpec(spec);
        for (const type of types) {
          if (!type) continue;
          lookup[type] = { category, subcategory };
        }
      }
    }
  }

  return lookup;
}