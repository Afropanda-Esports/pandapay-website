/**
 * Split an element's text into masked lines:
 *   <span class="line"><span class="line__inner">words on this line</span></span>
 * Animate `.line__inner` with yPercent; `.line` clips it.
 * Call again after a resize: it restores the original text first.
 */
const ORIGINAL = "splitOriginal";

export function splitLines(el: HTMLElement): HTMLElement[] {
  if (el.dataset[ORIGINAL] === undefined) {
    el.dataset[ORIGINAL] = el.textContent ?? "";
  }
  const text = (el.dataset[ORIGINAL] ?? "").trim().replace(/\s+/g, " ");
  if (!text) return [];

  // 1. words in spans, so we can read where each one wraps
  el.textContent = "";
  const words = text.split(" ").map((word, i) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.style.display = "inline-block";
    el.append(span);
    if (i < text.split(" ").length - 1) el.append(" ");
    return span;
  });

  // 2. group by line
  const lines: string[][] = [];
  let top: number | null = null;
  for (const span of words) {
    const t = span.offsetTop;
    if (top === null || Math.abs(t - top) > 2) {
      lines.push([]);
      top = t;
    }
    lines[lines.length - 1]!.push(span.textContent ?? "");
  }

  // 3. rebuild as masked lines
  el.textContent = "";
  return lines.map((lineWords) => {
    const line = document.createElement("span");
    line.className = "line";
    const inner = document.createElement("span");
    inner.className = "line__inner";
    inner.textContent = lineWords.join(" ");
    line.append(inner);
    el.append(line);
    return inner;
  });
}
