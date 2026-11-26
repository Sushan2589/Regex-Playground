
const regexInput = document.getElementById("regex");
const textInput = document.getElementById("testText");
const globalCheck = document.getElementById("global");
const ignoreCaseCheck = document.getElementById("ignoreCase");
const multilineCheck = document.getElementById("multiline");

const countElement = document.getElementById("count");
const resultElement = document.getElementById("result");

function escapeHTML(text) {
    return text.replace(/[&<>"']/g, function(char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char];
    });
}

function testRegex() {
    const pattern = regexInput.value;
    const text = textInput.value;

    let flags = "";

    if (globalCheck.checked) flags += "g";
    if (ignoreCaseCheck.checked) flags += "i";
    if (multilineCheck.checked) flags += "m";

    try {
        const regex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");

        let matches = [...text.matchAll(regex)];

        if (!globalCheck.checked) {
            matches = matches.slice(0, 1);
        }

        countElement.textContent = matches.length;

        if (matches.length === 0) {
            resultElement.textContent = text || "Matches will appear here";
            return;
        }

        let output = "";
        let lastIndex = 0;

        matches.forEach(function(match) {
            const start = match.index;
            const end = start + match[0].length;

            output += escapeHTML(text.slice(lastIndex, start));
            output += "<mark>" + escapeHTML(match[0]) + "</mark>";

            lastIndex = end;
        });

        output += escapeHTML(text.slice(lastIndex));

        resultElement.innerHTML = output;

    } catch (error) {
        countElement.textContent = "0";
        resultElement.textContent = "Invalid regular expression";
    }
}

regexInput.addEventListener("input", testRegex);
textInput.addEventListener("input", testRegex);

globalCheck.addEventListener("change", testRegex);
ignoreCaseCheck.addEventListener("change", testRegex);
multilineCheck.addEventListener("change", testRegex);
