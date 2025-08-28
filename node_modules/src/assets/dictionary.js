document.addEventListener("DOMContentLoaded", function () {
  // List of words to ignore (add more as needed)
  const ignoreWords = [
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "if",
    "then",
    "at",
    "by",
    "for",
    "in",
    "of",
    "on",
    "to",
    "with",
    "me",
    "my",
    "is",
    "it",
    "as",
    "so",
    "be",
    "are",
    "was",
    "were",
    "that",
    "this",
    "these",
    "those",
  ];

  // Function to wrap words in spans
  function wrapWords(node) {
    if (node.nodeType === 3) {
      // Text node
      const words = node.textContent.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      words.forEach((word) => {
        if (/^\s+$/.test(word)) {
          frag.appendChild(document.createTextNode(word));
        } else if (
          ignoreWords.includes(word.toLowerCase().replace(/[.,!?;:]/g, ""))
        ) {
          frag.appendChild(document.createTextNode(word));
        } else {
          const span = document.createElement("span");
          span.className = "dict-word";
          span.textContent = word;
          frag.appendChild(span);
        }
      });
      node.parentNode.replaceChild(frag, node);
    } else if (
      node.nodeType === 1 &&
      node.childNodes &&
      !["SCRIPT", "STYLE"].includes(node.tagName)
    ) {
      Array.from(node.childNodes).forEach(wrapWords);
    }
  }

  // Exclude homepage by checking for .home-page class on body
  if (!document.body.classList.contains("home-page")) {
    const main = document.querySelector("main, .homepage-content, .page-main");
    if (main) wrapWords(main);
  }

  // Dictionary popup logic
  const popup = document.createElement("div");
  popup.className = "dict-popup";
  document.body.appendChild(popup);

  document.body.addEventListener("mouseover", function (e) {
    if (e.target.classList.contains("dict-word")) {
      const word = e.target.textContent.toLowerCase().replace(/[.,!?;:]/g, "");
      popup.textContent = "Loading...";
      popup.style.display = "block";
      const rect = e.target.getBoundingClientRect();
      popup.style.left = rect.left + window.scrollX + "px";
      popup.style.top = rect.bottom + window.scrollY + 5 + "px";
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((res) => res.json())
        .then((data) => {
          if (
            Array.isArray(data) &&
            data[0]?.meanings?.[0]?.definitions?.[0]?.definition
          ) {
            popup.textContent = data[0].meanings[0].definitions[0].definition;
          } else {
            popup.textContent = "No definition found.";
          }
        })
        .catch(() => {
          popup.textContent = "No definition found.";
        });
    }
  });

  document.body.addEventListener("mouseout", function (e) {
    if (e.target.classList.contains("dict-word")) {
      popup.style.display = "none";
    }
  });
});
