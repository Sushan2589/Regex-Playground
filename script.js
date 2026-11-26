const regexInput = document.getElementById("regex");
const textInput = document.getElementById("testText");
const globalCheck = document.getElementById("global");
const ignoreCaseCheck = document.getElementById("ignoreCase");


const countElement = document.getElementById("count");
const resultElement = document.getElementById("result");
const matchList = document.getElementById("matchList");

const replaceInput = document.getElementById("replaceText");
const replaceResult = document.getElementById("replaceResult");

function escapeHTML(text) {
  return text.replace(/[&<>"']/g, function (char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char];
  });
}

function testRegex() {
  const pattern = regexInput.value;
  const text = textInput.value;

  let flags = "";

  if (globalCheck.checked) flags += "g";
  if (ignoreCaseCheck.checked) flags += "i";
  

  try {
    const regex = new RegExp(
      pattern,
      flags.includes("g") ? flags : flags + "g",
    );

    let matches = [...text.matchAll(regex)];

    if (!globalCheck.checked) {
      matches = matches.slice(0, 1);
    }

    countElement.textContent = matches.length;

    countElement.textContent = matches.length;

    matchList.innerHTML = "";

    matches.forEach(function (match, index) {
      const item = document.createElement("div");
      item.className = "match-item";

      item.innerHTML = `
        <strong>Match ${index + 1}: ${escapeHTML(match[0])}</strong>
        <p>Start: ${match.index}</p>
        <p>End: ${match.index + match[0].length}</p>
        <p>Length: ${match[0].length}</p>
    `;

      matchList.appendChild(item);
    });

    if (matches.length === 0) {
      resultElement.textContent = text || "Matches will appear here";
      return;
    }

    let output = "";
    let lastIndex = 0;

    matches.forEach(function (match) {
      const start = match.index;
      const end = start + match[0].length;

      output += escapeHTML(text.slice(lastIndex, start));
      output += "<mark>" + escapeHTML(match[0]) + "</mark>";

      lastIndex = end;
    });

    output += escapeHTML(text.slice(lastIndex));

    resultElement.innerHTML = output;

    const replaceRegex = new RegExp(pattern, flags);

    replaceResult.textContent = text.replace(replaceRegex, replaceInput.value);
  } catch (error) {
    countElement.textContent = "0";
    resultElement.textContent = "Invalid regular expression";
    matchList.innerHTML = "";
  }
}

regexInput.addEventListener("input", testRegex);
textInput.addEventListener("input", testRegex);

globalCheck.addEventListener("change", testRegex);
ignoreCaseCheck.addEventListener("change", testRegex);

