document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector(".article-content")) return;

  const dictionary = {
    grace: "Unmerited favor freely given by God; not earned, not deserved, not withdrawn when we fail. Grace meets us where we are and sustains us there.",
    god: "The eternal, personal Creator who is both holy and near; not an abstract force, but a living presence who engages human weakness with mercy.",
    sin: "Not merely rule-breaking, but a condition of brokenness that bends our loves, distorts our desires, and separates us from life as God intends it.",
    salvation: "God’s work of rescuing, restoring, and reclaiming broken people; not just escape from judgment, but movement toward wholeness and life.",
    savior: "One who delivers us from what we cannot escape ourselves; in Christian faith, Jesus Christ, who enters human suffering to redeem it from within.",
    redemption: "The act of reclaiming what was lost or damaged and giving it new purpose; God’s refusal to abandon broken stories, even when consequences remain.",
    faith: "Trust placed in God rather than in certainty, control, or outcomes; often fragile, sometimes faltering, yet sustained by God rather than perfected by us.",
    repentance: "An honest turning toward God that involves sorrow, surrender, and change; not self-punishment, but movement toward truth and healing.",
    righteousness: "Right relationship with God grounded in grace, not moral achievement; a standing received rather than a status earned.",
    justification: "Being declared right with God not because of our performance, but because of God’s grace; acceptance that precedes transformation.",
    sanctification: "The slow, often painful process of being reshaped over time; growth that includes struggle, setbacks, and dependence rather than instant victory.",
    eternity: "Life beyond the limits of time, rooted not only in the future but already touching the present; the long horizon in which God’s purposes unfold."
  };

  const container = document.querySelector("main");
  if (!container) return;

  const terms = Object.keys(dictionary).join("|");
  const regex = new RegExp(`\\b(${terms})(’s|'s)?\\b`, "gi");

  container.querySelectorAll("p, li, h2, h3, h4").forEach(el => {
    el.innerHTML = el.innerHTML.replace(regex, (full, word) => {
      const def = dictionary[word.toLowerCase()];
      if (!def) return full;
      return `<span class="dict-term" data-definition="${def}">${full}</span>`;
    });
  });
});
