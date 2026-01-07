document.addEventListener("DOMContentLoaded", () => {
  const dictionary = {
    grace: "Unmerited favor freely given by God",
    justification: "Being declared righteous before God",
    sanctification: "The ongoing process of spiritual growth",
    redemption: "Deliverance from sin through Christ"
  };

  const content = document.querySelector(".site-main");
  if (!content) return;

  const walker = document.createTreeWalker(
    content,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.parentNode.closest("a, script, style")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const regex = new RegExp(
    `\\b(${Object.keys(dictionary).join("|")})\\b`,
    "gi"
  );

  let node;
  while ((node = walker.nextNode())) {
    const replaced = node.nodeValue.replace(regex, (match) => {
      const definition = dictionary[match.toLowerCase()];
      return `<span class="dict-term" data-definition="${definition}">${match}</span>`;
    });

    if (replaced !== node.nodeValue) {
      const span = document.createElement("span");
      span.innerHTML = replaced;
      node.parentNode.replaceChild(span, node);
    }
  }
});
