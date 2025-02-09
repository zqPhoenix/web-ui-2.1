class UIManager {
    constructor(containerId) {
        this.notifications = [];
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error("Container not found!");
            return;
        }

        this.isVisible = true;
        this.container.style.fontFamily = "'Arial', sans-serif";
        this.container.style.color = "#ffffff";
        this.container.style.background = "rgba(15, 15, 15, 0.95)";
        this.container.style.backdropFilter = "blur(10px)";
        this.container.style.border = "2px solid rgba(100, 100, 100, 0.6)";
        this.container.style.padding = "15px";
        this.container.style.borderRadius = "6px";
        this.container.style.width = "1150px";
        this.container.style.margin = "20px auto";
        this.container.style.position = "fixed";
        this.container.style.top = "50%";
        this.container.style.left = "50%";
        this.container.style.transform = "translate(-50%, -50%) scale(1)";
        this.container.style.zIndex = "9999";
        this.container.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        this.container.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.6)";
        this.isDarkMode = true;
        this.container.style.transition = "background 2s ease";
        this.makeDraggable();
        this.addBackgroundLayers();
    }

    show() {
        this.container.style.opacity = "1";
        this.container.style.visibility = "visible";
        this.container.style.transform = "translate(-50%, -50%) scale(1)";
        this.isVisible = true;
    }

    hide() {
        this.container.style.transform = "translate(-50%, -50%) scale(0)";
        this.container.style.opacity = "0";
        this.container.style.visibility = "hidden";
        this.isVisible = false;
    }

    toggleVisibility() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    addBackgroundLayers() {
        this.backgroundImageLayer = document.createElement("div");
        this.backgroundImageLayer.style.position = "absolute";
        this.backgroundImageLayer.style.top = "0";
        this.backgroundImageLayer.style.left = "0";
        this.backgroundImageLayer.style.right = "0";
        this.backgroundImageLayer.style.bottom = "0";
        this.backgroundImageLayer.style.zIndex = "-2";
        this.backgroundImageLayer.style.backgroundSize = "cover";
        this.backgroundImageLayer.style.backgroundPosition = "center";
        this.backgroundImageLayer.style.backgroundRepeat = "no-repeat";
        this.backgroundImageLayer.style.opacity = "0.3";

        this.container.style.overflow = "hidden";
        this.container.appendChild(this.backgroundImageLayer);
    }

    setBackground(background) {
        if (background.startsWith("url(") || background.startsWith("http")) {
            const url = background.startsWith("url(") ? background : `url(${background})`;
            this.backgroundImageLayer.style.backgroundImage = url;
            this.backgroundImageLayer.style.animation = "fadeIn 0.5s ease";
        } else {
            this.container.style.background = background;
        }
    }

    createColorPicker(label, defaultColor = "#ffffff", onChange = null) {
        const pickerContainer = document.createElement("div");
        pickerContainer.style.display = "flex";
        pickerContainer.style.alignItems = "center";
        pickerContainer.style.margin = "10px 0";
        pickerContainer.style.gap = "10px";

        const pickerLabel = document.createElement("label");
        pickerLabel.textContent = label;
        pickerLabel.style.fontSize = "14px";
        pickerLabel.style.color = "#ffffff";
        pickerLabel.style.fontWeight = "bold";

        const pickerInput = document.createElement("input");
        pickerInput.type = "color";
        pickerInput.value = defaultColor;
        pickerInput.style.width = "40px";
        pickerInput.style.height = "40px";
        pickerInput.style.border = "none";
        pickerInput.style.borderRadius = "5px";
        pickerInput.style.cursor = "pointer";
        pickerInput.style.background = "transparent";

        pickerInput.addEventListener("input", () => {
            if (onChange) onChange(pickerInput.value);
        });

        pickerContainer.appendChild(pickerLabel);
        pickerContainer.appendChild(pickerInput);

        window.featureCount++;

        return pickerContainer;
    }

    createToggleSwitch(label = "", initialState = false, onChange = null) {
        const toggleContainer = document.createElement("div");
        toggleContainer.style.display = "flex";
        toggleContainer.style.alignItems = "center";
        toggleContainer.style.justifyContent = "space-between";
        toggleContainer.style.marginBottom = "5px";
        toggleContainer.style.padding = "5px 6px";
        toggleContainer.style.border = "1px solid #444";
        toggleContainer.style.borderRadius = "5px";
        toggleContainer.style.backgroundColor = "rgba(34, 34, 34, 0.5)";
        toggleContainer.style.minHeight = "24px";

        if (label) {
            const labelElement = document.createElement("div");
            labelElement.textContent = label.toUpperCase();
            labelElement.style.fontSize = "10px";
            labelElement.style.color = "#ffffff";
            labelElement.style.marginRight = "10px";
            labelElement.style.flex = "1";
            labelElement.style.lineHeight = "1.2";
            labelElement.style.overflow = "hidden";
            toggleContainer.appendChild(labelElement);
        }

        const switchContainer = document.createElement("div");
        switchContainer.style.position = "relative";
        switchContainer.style.width = "38px";
        switchContainer.style.height = "18px";
        switchContainer.style.borderRadius = "9px";
        switchContainer.style.background = initialState
            ? "rgba(168, 95, 197, 0.5)"
        : "rgba(17, 17, 17, 0.5)";
        switchContainer.style.cursor = "pointer";
        switchContainer.style.flexShrink = "0";

        const slider = document.createElement("div");
        slider.style.position = "absolute";
        slider.style.top = "1px";
        slider.style.left = initialState ? "20px" : "1px";
        slider.style.width = "16px";
        slider.style.height = "16px";
        slider.style.borderRadius = "50%";
        slider.style.background = "#fff";
        slider.style.transition = "left 0.2s ease";

        switchContainer.addEventListener("click", () => {
            const isEnabled = switchContainer.style.background.includes("168, 95, 197");
            switchContainer.style.background = isEnabled
                ? "rgba(17, 17, 17, 0.5)"
            : "rgba(168, 95, 197, 0.5)";
            slider.style.left = isEnabled ? "1px" : "20px";
            if (onChange) onChange(!isEnabled);
        });

        switchContainer.appendChild(slider);
        toggleContainer.appendChild(switchContainer);

        window.featureCount++;

        return toggleContainer;
    }

    createToggleGroup(toggles) {
        const groupContainer = document.createElement("div");
        groupContainer.style.display = "flex";
        groupContainer.style.flexWrap = "wrap";
        groupContainer.style.gap = "10px";
        groupContainer.style.justifyContent = "center";

        toggles.forEach(({ label, initialState, onChange }) => {
            const toggle = this.createToggleSwitch(label, initialState, onChange);
            toggle.style.flex = "0 1 150px";
            groupContainer.appendChild(toggle);
        });

        return groupContainer;
    }

   createTabs(tabs) {
    const tabContainer = document.createElement("div");
    tabContainer.classList.add("tab-container");
    tabContainer.style.display = "flex";
    tabContainer.style.gap = "10px";
    tabContainer.style.marginBottom = "20px";
    tabContainer.style.overflowX = "auto";  // Enable horizontal scrolling
    tabContainer.style.whiteSpace = "nowrap";  // Prevent tabs from wrapping to the next line
    tabContainer.style.paddingBottom = "10px"; // Add padding to move the scrollbar down

    // Scrollbar styling
    tabContainer.style.scrollbarWidth = "thin"; // For Firefox
    tabContainer.style.scrollbarColor = "rgba(100, 100, 100, 0.5) rgba(17, 17, 17, 0.5)"; // For Firefox

    // Custom scrollbar for Webkit browsers (Chrome, Safari)
    tabContainer.style.webkitScrollbar = "thin"; // Makes the scrollbar thinner
    tabContainer.style.webkitScrollbarThumb = "background-color: rgba(100, 100, 100, 0.5)"; // Scrollbar thumb
    tabContainer.style.webkitScrollbarTrack = "background-color: rgba(17, 17, 17, 0.5)"; // Scrollbar track
    tabContainer.style.webkitScrollbarMarginBottom = "10px"; // Move the scrollbar down a bit

    tabs.forEach((tab, index) => {
        const tabElement = document.createElement("div");
        tabElement.classList.add("tab");
        tabElement.style.display = "inline-flex";  // Ensure each tab stays inline for horizontal scrolling
        tabElement.style.alignItems = "center";
        tabElement.style.padding = "8px 20px";
        tabElement.style.background = index === 0
            ? "rgba(34, 34, 34, 0.5)"
            : "rgba(17, 17, 17, 0.5)";
        tabElement.style.border = "1px solid rgba(100, 100, 100, 0.6)";
        tabElement.style.borderRadius = "4px";
        tabElement.style.cursor = "pointer";
        tabElement.style.textAlign = "center";
        tabElement.style.color = "#ffffff";
        tabElement.style.fontWeight = "bold";
        tabElement.style.textShadow = "0 2px 5px rgba(0, 0, 0, 0.5)";
        tabElement.style.transition = "background 0.2s ease";
        tabElement.style.width = "150px";
        tabElement.style.textAlign = "center";
        tabElement.style.gap = "8px";

        if (tab.icon) {
            const iconElement = document.createElement("img");
            iconElement.src = tab.icon;
            iconElement.alt = `${tab.label} icon`;
            iconElement.style.width = "16px";
            iconElement.style.height = "16px";
            tabElement.appendChild(iconElement);
        }

        const labelElement = document.createElement("span");
        labelElement.textContent = tab.label.toUpperCase();
        tabElement.appendChild(labelElement);

        tabElement.addEventListener("click", () => {
            this.switchTab(tabContainer, tab.content);
            document.querySelectorAll(".tab").forEach((t) => {
                t.style.background = "rgba(17, 17, 17, 0.5)";
            });
            tabElement.style.background = "rgba(34, 34, 34, 0.5)";
        });

        tabContainer.appendChild(tabElement);
    });

    this.container.appendChild(tabContainer);

    window.featureCount++;
}


    switchTab(tabContainer, content) {
        const oldContent = this.container.querySelector(".tab-content");
        if (oldContent) oldContent.remove();

        content.classList.add("tab-content");
        content.style.marginTop = "15px";

        this.container.appendChild(content);

        if (content.querySelector(".console-log-box")) {
            const logBox = content.querySelector(".console-log-box");
            logBox.scrollTop = logBox.scrollHeight;
        }
    }

    createLabel(text) {
        const label = document.createElement("div");
        label.textContent = text.toUpperCase();
        label.style.marginBottom = "10px";
        label.style.fontSize = "14px";
        label.style.fontWeight = "bold";
        label.style.color = "#ffffff";
        label.style.textShadow = "0 1px 2px rgba(0, 0, 0, 0.7)";

        return label;
    }

   /**
 * Creates a custom IDE-like code editor with syntax highlighting and IntelliSense made by Snoofz.
 */
    createIDEBox(keywords = [], nestedKeywords = {}) {
        const ideBox = document.createElement("div");
        ideBox.classList.add("ide-box");
        ideBox.style.cssText = `
        position: relative;
        display: flex;
        background: rgba(17,17,17,0.95);
        color: #fff;
        height: 400px;
        overflow: hidden;
        border: 1px solid rgba(100,100,100,0.6);
        border-radius: 6px;
        font-family: monospace;
        font-size: 14px;
        margin-top: 10px;
        user-select: none;
        outline: none;
    `;

        let text = "";
        let cursorPosition = 0;
        let selectionStart = null;
        let selectionEnd = null;
        const undoStack = [];
        const redoStack = [];

        const lineNumbers = document.createElement("div");
        lineNumbers.style.cssText = `
        background-color: rgba(30,30,30,0.8);
        padding: 15px 5px;
        width: 40px;
        overflow-y: auto;
        text-align: right;
        user-select: none;
        line-height: 20px;
    `;
        lineNumbers.classList.add("line-numbers");
        lineNumbers.innerText = "1";

        const codeArea = document.createElement("div");
        codeArea.style.cssText = `
        position: relative;
        padding: 15px;
        width: calc(100% - 40px);
        overflow: auto;
        outline: none;
        cursor: text;
        caret-color: transparent;
        line-height: 20px;
    `;
        codeArea.classList.add("code-area");
        codeArea.setAttribute('tabindex', '0');

        const highlightedDiv = document.createElement("div");
        highlightedDiv.style.cssText = `
        white-space: pre;
        overflow: auto;
        line-height: 20px;
    `;
        highlightedDiv.classList.add("highlighted-code");
        highlightedDiv.innerText = "";

        const cursor = document.createElement("div");
        cursor.style.cssText = `
    position: absolute;
    width: 2px;
    height: 1.4em; /* Taller */
    background-color: #fff;
    animation: blink 1s step-start infinite;
    top: 25px; /* Lower down */
    left: 15px;
`;

        cursor.classList.add("custom-cursor");

        const indicator = document.createElement("div");
        indicator.style.cssText = `
        position: absolute;
        bottom: 5px;
        left: 15px;
        color: #fff;
        display: none;
    `;
        indicator.classList.add("typing-indicator");
        indicator.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        indicator.querySelectorAll('.dot').forEach((dot, index) => {
            dot.style.cssText = `
            display: inline-block;
            width: 5px;
            height: 5px;
            background-color: #fff;
            border-radius: 50%;
            margin-right: 2px;
            animation: blink-dot ${0.3 + index * 0.3}s infinite;
        `;
        });

        const suggestionsContainer = document.createElement("ul");
        suggestionsContainer.style.cssText = `
        position: absolute;
        background: #1e1e1e;
        border: 1px solid #555;
        border-radius: 4px;
        list-style: none;
        padding: 5px 0;
        margin: 0;
        max-height: 150px;
        overflow-y: auto;
        display: none;
        z-index: 1000;
        font-size: 14px;
        width: 200px;
    `;
        suggestionsContainer.classList.add("suggestions-container");

        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
        @keyframes blink {
            0% { opacity: 0.2; }
            20% { opacity: 1; }
            100% { opacity: 0.2; }
        }
        @keyframes blink-dot {
            0% { opacity: 0.2; }
            20% { opacity: 1; }
            100% { opacity: 0.2; }
        }
        .suggestion-item {
            padding: 5px 10px;
            cursor: pointer;
        }
        .suggestion-item:hover, .suggestion-item.active {
            background-color: #333;
        }
        .line {
            display: block;
            height: 20px;
        }
        .comment { color: #6A9955; }
        .string { color: #CE9178; }
        .number { color: #B5CEA8; }
        .boolean { color: #569CD6; }
        .keyword { color: #569CD6; }
        .function { color: #DCDCAA; }
        .punctuation { color: #FFD700; }
        .operator { color: #D4D4D4; }
    `;
        document.head.appendChild(styleTag);

        function escapeHTML(code) {
            return code
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
        }

        const tokenRegex = /\/\*[\s\S]*?\*\/|\/\/.*|["'](?:\\.|[^\\"])*["']|\d+(\.\d+)?([eE][+-]?\d+)?|true|false|null|undefined|function|const|let|var|return|if|else|for|while|do|switch|case|break|continue|default|new|class|extends|super|this|try|catch|finally|throw|typeof|instanceof|async|await|[a-zA-Z_]\w*|[{}()\[\];,\.]|[\+\-\*\/=<>!|&]+|\s+/g;

        function tokenize(code) {
            const tokens = [];
            let match;
            while ((match = tokenRegex.exec(code)) !== null) {
                tokens.push(match[0]);
            }
            return tokens;
        }

        function highlightSyntax(code) {
            const lines = code.split('\n');
            return lines.map(line => {
                const tokens = tokenize(line);

                const highlightedLine = tokens.map(token => {
                    const escapedToken = escapeHTML(token);

                    if (/\/\*[\s\S]*?\*\//.test(token) || /\/\/.*/.test(token)) {
                        return `<span class="comment">${escapedToken}</span>`;
                    }
                    if (/^["'](?:\\.|[^\\"])*["']$/.test(token)) {
                        return `<span class="string">${escapedToken}</span>`;
                    }
                    if (/^\d+(\.\d+)?([eE][+-]?\d+)?$/.test(token)) {
                        return `<span class="number">${escapedToken}</span>`;
                    }
                    if (/^(true|false|null|undefined)$/.test(token)) {
                        return `<span class="boolean">${escapedToken}</span>`;
                    }
                    if (/^(function|const|let|var|return|if|else|for|while|do|switch|case|break|continue|default|new|class|extends|super|this|try|catch|finally|throw|typeof|instanceof|async|await)$/.test(token)) {
                        return `<span class="keyword">${escapedToken}</span>`;
                    }
                    if (/^[a-zA-Z_]\w*$/.test(token)) {
                        return `<span class="function">${escapedToken}</span>`;
                    }
                    if (/^[{}()\[\];,]$/.test(token)) {
                        return `<span class="punctuation">${escapedToken}</span>`;
                    }
                    if (/^[\+\-\*\/=<>!|&]+$/.test(token)) {
                        return `<span class="operator">${escapedToken}</span>`;
                    }
                    if (/^\s+$/.test(token)) {
                        return escapedToken;
                    }

                    return escapedToken;
                }).join('');

                return highlightedLine;
            }).join('\n');
        }

        function updateDisplay() {
            const highlighted = highlightSyntax(text);
            const lines = highlighted.split('\n');
            highlightedDiv.innerHTML = lines.map((line, index) =>
                                                 `<div class="line" data-line="${index + 1}">${line}</div>`
                                                ).join('');
            lineNumbers.innerHTML = lines.map((_, index) => `<div>${index + 1}</div>`).join('');
        }

        function showTypingIndicator() {
            indicator.style.display = 'inline-block';
            setTimeout(() => {
                indicator.style.display = 'none';
            }, 1500);
        }

        highlightedDiv.addEventListener('click', (e) => {
            const lineDiv = e.target.closest('.line');
            if (lineDiv) {
                const lineNumber = lineDiv.dataset.line;
                console.log('Clicked line:', lineNumber);
            }
        });

        codeArea.appendChild(highlightedDiv);
        codeArea.appendChild(cursor);
        codeArea.appendChild(indicator);
        ideBox.appendChild(lineNumbers);
        ideBox.appendChild(codeArea);
        ideBox.appendChild(suggestionsContainer);

        let currentSuggestions = [];
        let selectedSuggestionIndex = -1;

        ideBox.getText = function() {
            return text;
        };

        function handleKeyPress(event) {
            const key = event.key;
            const isCtrl = event.ctrlKey || event.metaKey;

            if (!isCtrl) {
                event.preventDefault();
            }

            if (suggestionsContainer.style.display === "block") {
                if (key === "ArrowDown") {
                    event.preventDefault();
                    moveSelection(1);
                    return;
                } else if (key === "ArrowUp") {
                    event.preventDefault();
                    moveSelection(-1);
                    return;
                } else if (key === "Enter") {
                    if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < currentSuggestions.length) {
                        event.preventDefault();
                        selectSuggestion(selectedSuggestionIndex);
                        return;
                    }
                }
            }

            if (isCtrl) {
                switch(key.toLowerCase()) {
                    case 'z':
                        undo();
                        return;
                    case 'y':
                        redo();
                        return;
                    case 'a':
                        selectAll();
                        return;
                    case 'c':
                        copySelection();
                        return;
                    case 'v':
                        pasteClipboard();
                        return;
                    default:
                        break;
                }
            }

            if (!['Backspace', 'Delete', 'Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Escape'].includes(key)) {
                undoStack.push({ text, cursorPosition });
                redoStack.length = 0;
            }

            switch(key) {
                case 'Backspace':
                    if (cursorPosition > 0) {
                        text = text.slice(0, cursorPosition - 1) + text.slice(cursorPosition);
                        cursorPosition--;
                    }
                    hideSuggestions();
                    break;
                case 'Delete':
                    if (cursorPosition < text.length) {
                        text = text.slice(0, cursorPosition) + text.slice(cursorPosition + 1);
                    }
                    hideSuggestions();
                    break;
                case 'Enter':
                    text = text.slice(0, cursorPosition) + '\n' + text.slice(cursorPosition);
                    cursorPosition++;
                    hideSuggestions();
                    break;
                case 'Tab':
                    var indentation = '    ';
                    text = text.slice(0, cursorPosition) + indentation + text.slice(cursorPosition);
                    cursorPosition += indentation.length;
                    hideSuggestions();
                    break;
                case 'ArrowLeft':
                    if (cursorPosition > 0) cursorPosition--;
                    break;
                case 'ArrowRight':
                    if (cursorPosition < text.length) cursorPosition++;
                    break;
                case 'ArrowUp':
                    moveCursorUp();
                    break;
                case 'ArrowDown':
                    moveCursorDown();
                    break;
                case 'Escape':
                    hideSuggestions();
                    break;
                case ' ':
                    text = text.slice(0, cursorPosition) + ' ' + text.slice(cursorPosition);
                    cursorPosition++;
                    showTypingIndicator();
                    break;
                default:
                    if (key === '.') {
                        text = text.slice(0, cursorPosition) + '.' + text.slice(cursorPosition);
                        cursorPosition++;
                        showTypingIndicator();

                        const dotWordInfo = getCurrentWord(cursorPosition - 1);
                        if (dotWordInfo && nestedKeywords[dotWordInfo.word]) {
                            currentSuggestions = nestedKeywords[dotWordInfo.word];
                            selectedSuggestionIndex = -1;
                            showAutocomplete(currentSuggestions);
                        } else {
                            hideSuggestions();
                        }

                        updateDisplay();
                        updateCursor();
                        return;
                    } else if (key.length === 1) {
                        text = text.slice(0, cursorPosition) + key + text.slice(cursorPosition);
                        cursorPosition++;
                        showTypingIndicator();

                        const lastWordInfo = getCurrentWord(cursorPosition);
                        if (!lastWordInfo) {
                            hideSuggestions();
                            break;
                        }
                        const { word } = lastWordInfo;
                        let matchedSuggestions = keywords.filter((kw) => kw.startsWith(word));

                        if (matchedSuggestions.length) {
                            currentSuggestions = matchedSuggestions;
                            selectedSuggestionIndex = -1;
                            showAutocomplete(matchedSuggestions);
                        } else {
                            hideSuggestions();
                        }

                        updateDisplay();
                        updateCursor();
                    }
                    break;
            }

            updateDisplay();
            updateCursor();
        }

        function moveCursorUp() {
            const beforeCursor = text.slice(0, cursorPosition);
            const lines = beforeCursor.split('\n');
            if (lines.length <= 1) return;
            const currentLine = lines[lines.length - 1];
            const previousLine = lines[lines.length - 2];
            const targetColumn = currentLine.length;
            const newCursorPos = cursorPosition - currentLine.length - 1;
            cursorPosition = newCursorPos + Math.min(targetColumn, previousLine.length);
        }

        function moveCursorDown() {
            const afterCursor = text.slice(cursorPosition);
            const currentLine = text.slice(0, cursorPosition).split('\n').pop();
            const nextLine = afterCursor.split('\n')[0];
            if (!nextLine) return;
            const targetColumn = currentLine.length;
            const newCursorPos = cursorPosition + nextLine.length + 1;
            cursorPosition = newCursorPos > text.length ? text.length : newCursorPos;
        }

        function selectAll() {
            selectionStart = 0;
            selectionEnd = text.length;
            highlightSelection();
        }

        function copySelection() {
            if (selectionStart !== null && selectionEnd !== null && selectionStart !== selectionEnd) {
                const selectedText = text.slice(selectionStart, selectionEnd);
                navigator.clipboard.writeText(selectedText).catch(err => {
                    console.error('Failed to copy:', err);
                });
            }
        }

        codeArea.addEventListener('paste', (event) => {
            event.preventDefault();
            const clipboardText = (event.clipboardData || window.clipboardData).getData('text');
            text = text.slice(0, cursorPosition) + clipboardText + text.slice(cursorPosition);
            cursorPosition += clipboardText.length;
            updateDisplay();
            updateCursor();
            showTypingIndicator();
        });

        ideBox.setText = function(newCode) {
            text = newCode;
            cursorPosition = text.length;
            updateDisplay();
            updateCursor();
        };

        function pasteClipboard() {
            navigator.clipboard.readText().then((clipboardText) => {
                if (selectionStart !== null && selectionEnd !== null && selectionStart !== selectionEnd) {
                    text = text.slice(0, selectionStart) + clipboardText + text.slice(selectionEnd);
                    cursorPosition = selectionStart + clipboardText.length;
                    selectionStart = selectionEnd = null;
                } else {
                    text = text.slice(0, cursorPosition) + clipboardText + text.slice(cursorPosition);
                    cursorPosition += clipboardText.length;
                }
                updateDisplay();
                updateCursor();
                showTypingIndicator();
            }).catch(err => {
                console.error('Failed to read clipboard contents: ', err);
            });
        }

        function undo() {
            if (undoStack.length > 0) {
                const lastState = undoStack.pop();
                redoStack.push({ text, cursorPosition });
                text = lastState.text;
                cursorPosition = lastState.cursorPosition;
                updateDisplay();
                updateCursor();
            }
        }

        function redo() {
            if (redoStack.length > 0) {
                const nextState = redoStack.pop();
                undoStack.push({ text, cursorPosition });
                text = nextState.text;
                cursorPosition = nextState.cursorPosition;
                updateDisplay();
                updateCursor();
            }
        }

        function highlightSelection() {
            if (selectionStart !== null && selectionEnd !== null && selectionStart !== selectionEnd) {
                const beforeSelection = escapeHTML(text.slice(0, selectionStart));
                const selectedText = escapeHTML(text.slice(selectionStart, selectionEnd));
                const afterSelection = escapeHTML(text.slice(selectionEnd));

                highlightedDiv.innerHTML = `
                ${highlightSyntax(beforeSelection)}
                <span style="background-color: rgba(255,255,255,0.2);">${highlightSyntax(selectedText)}</span>
                ${highlightSyntax(afterSelection)}
            `;
            } else {
                updateDisplay();
            }
            lineNumbers.innerHTML = text.split('\n').map((_, index) => `<div>${index + 1}</div>`).join('');
        }

        function updateCursor() {
            const beforeCursor = text.slice(0, cursorPosition);
            const lines = beforeCursor.split('\n');
            const currentLine = lines[lines.length - 1];
            const x = getTextWidth(currentLine) + 15;
            const y = (lines.length - 1) * 20 + 15;
            cursor.style.left = `${x}px`;
            cursor.style.top = `${y}px`;
        }

        function getTextWidth(str) {
            const tempSpan = document.createElement("span");
            tempSpan.style.visibility = "hidden";
            tempSpan.style.whiteSpace = "pre";
            tempSpan.style.fontFamily = "monospace";
            tempSpan.style.fontSize = "14px";
            tempSpan.textContent = str;
            document.body.appendChild(tempSpan);
            const width = tempSpan.offsetWidth;
            document.body.removeChild(tempSpan);
            return width;
        }

        function getCurrentWord(pos) {
            const textBeforeCursor = text.slice(0, pos);
            const match = /(\w+)$/.exec(textBeforeCursor);
            if (match) {
                return {
                    word: match[1],
                    start: pos - match[1].length,
                    end: pos
                };
            }
            return null;
        }

        function showAutocomplete(suggestions) {
            suggestionsContainer.innerHTML = '';
            currentSuggestions = suggestions;
            selectedSuggestionIndex = 0;

            suggestions.forEach((suggestion, index) => {
                const item = document.createElement("li");
                item.textContent = suggestion;
                item.classList.add("suggestion-item");
                if (index === 0) item.classList.add("active");
                item.addEventListener("mousedown", (e) => {
                    e.preventDefault();
                    selectSuggestion(index);
                });
                suggestionsContainer.appendChild(item);
            });

            const coordinates = getCursorCoordinates();
            suggestionsContainer.style.left = `${coordinates.x}px`;
            suggestionsContainer.style.top = `${coordinates.y + 20}px`;
            suggestionsContainer.style.display = 'block';
        }

        function hideSuggestions() {
            suggestionsContainer.style.display = 'none';
            suggestionsContainer.innerHTML = '';
            currentSuggestions = [];
            selectedSuggestionIndex = -1;
        }

        function moveSelection(direction) {
            if (currentSuggestions.length === 0) return;
            selectedSuggestionIndex += direction;
            if (selectedSuggestionIndex < 0) {
                selectedSuggestionIndex = currentSuggestions.length - 1;
            } else if (selectedSuggestionIndex >= currentSuggestions.length) {
                selectedSuggestionIndex = 0;
            }
            updateSuggestionSelection();
        }

        function updateSuggestionSelection() {
            const items = suggestionsContainer.querySelectorAll('.suggestion-item');
            items.forEach((item, index) => {
                if (index === selectedSuggestionIndex) {
                    item.classList.add('active');
                    item.scrollIntoView({ block: 'nearest' });
                } else {
                    item.classList.remove('active');
                }
            });
        }

        function selectSuggestion(index) {
            const suggestion = currentSuggestions[index];
            if (!suggestion) return;

            let currentWordInfo = getCurrentWord(cursorPosition);

            if (cursorPosition > 0 && text[cursorPosition - 1] === '.') {
                text = text.slice(0, cursorPosition) + suggestion + text.slice(cursorPosition);
                cursorPosition += suggestion.length;

            } else if (currentWordInfo) {
                text = text.slice(0, currentWordInfo.start) + suggestion + text.slice(currentWordInfo.end);
                cursorPosition = currentWordInfo.start + suggestion.length;

            } else {
                text = text.slice(0, cursorPosition) + suggestion + text.slice(cursorPosition);
                cursorPosition += suggestion.length;
            }

            updateDisplay();
            updateCursor();
            hideSuggestions();
        }

        function getCursorCoordinates() {
            const beforeCursor = text.slice(0, cursorPosition);
            const lines = beforeCursor.split('\n');
            const currentLine = lines[lines.length - 1];
            const x = getTextWidth(currentLine) + 15;
            const y = (lines.length - 1) * 20 + 15;
            return { x, y };
        }

        ideBox.appendChild(suggestionsContainer);
        updateDisplay();
        updateCursor();
        codeArea.focus();
        codeArea.addEventListener('keydown', handleKeyPress);
        ideBox.addEventListener('click', () => {
            codeArea.focus();
        });

        return ideBox;
    }

    createTextInput(placeholder, onEnter = null) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = placeholder;
        input.style.marginBottom = "10px";
        input.style.padding = "10px";
        input.style.width = "98%";
        input.style.border = "1px solid rgba(100, 100, 100, 0.6)";
        input.style.borderRadius = "5px";
        input.style.background = "#111";
        input.style.opacity = "0.5";
        input.style.color = "#fff";
        input.style.outline = "none";
        input.style.fontSize = "14px";

        input.addEventListener("keydown", (e) => {
            e.preventDefault();
            if (e.key === "Enter" && onEnter) {
                let value = input.value.trim();

                if (value && value.startsWith("https") && !value.startsWith("url(")) {
                    value = `url(${value})`;
                }

                onEnter(value);
            }

            if (e.ctrlKey && e.key.toLowerCase() === "v") {
                navigator.clipboard.readText().then((clipboardText) => {
                    const { selectionStart, selectionEnd } = input;
                    const before = input.value.slice(0, selectionStart);
                    const after = input.value.slice(selectionEnd);
                    input.value = before + clipboardText + after;

                    input.selectionStart = input.selectionEnd = selectionStart + clipboardText.length;

                    console.log("Pasted text:", clipboardText);
                });
                e.preventDefault();
            } else if (e.ctrlKey && e.key.toLowerCase() === "a") {
                input.selectionStart = 0;
                input.selectionEnd = input.value.length;
                e.preventDefault();
                console.log("Selected all text.");
            } else if (e.key === "Backspace") {
                const { selectionStart, selectionEnd } = input;
                if (selectionStart !== selectionEnd) {
                    const before = input.value.slice(0, selectionStart);
                    const after = input.value.slice(selectionEnd);
                    input.value = before + after;

                    input.selectionStart = input.selectionEnd = selectionStart;
                } else if (selectionStart > 0) {
                    input.value = input.value.slice(0, selectionStart - 1) + input.value.slice(selectionEnd);
                    input.selectionStart = input.selectionEnd = selectionStart - 1;
                }
                e.preventDefault();
            } else if (e.key.length === 1) {
                const { selectionStart, selectionEnd } = input;
                const before = input.value.slice(0, selectionStart);
                const after = input.value.slice(selectionEnd);
                input.value = before + e.key + after;

                input.selectionStart = input.selectionEnd = selectionStart + 1;
                e.preventDefault();
            } else if (e.key === "Backspace") {
                input.value = input.value.slice(0, -1);
            }
            else if (e.key.length === 1) {
                input.value += e.key;
            }
        });

        window.featureCount++;

        return input;
    }

    createButton(label, onClick, container = null) {
        const button = document.createElement("button");
        button.textContent = label.toUpperCase();
        button.style.marginTop = "15px";
        button.style.padding = "10px 20px";
        button.style.border = "1px solid rgba(100, 100, 100, 0.6)";
        button.style.borderRadius = "5px";
        button.style.background = "rgba(51, 51, 51, 0.5)";
        button.style.color = "#fff";
        button.style.fontWeight = "bold";
        button.style.cursor = "pointer";
        button.style.transition = "background 0.2s ease";
        button.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.5)";
        button.style.flex = "1";

        button.addEventListener("mouseover", () => {
            button.style.background = "rgba(68, 68, 68, 0.5)";
        });
        button.addEventListener("mouseout", () => {
            button.style.background = "rgba(51, 51, 51, 0.5)";
        });

        button.addEventListener("click", onClick);

        if (container) {
            container.appendChild(button);
        }

        window.featureCount++;

        return button;
    }

    createButtonGroup(buttons) {
        const buttonGroup = document.createElement("div");
        buttonGroup.style.display = "flex";
        buttonGroup.style.gap = "10px";
        buttonGroup.style.marginTop = "15px";

        buttons.forEach((btnConfig) => {
            const button = this.createButton(btnConfig.label, btnConfig.onClick, buttonGroup);
        });

        return buttonGroup;
    }

    createDivider() {
        const divider = document.createElement("div");
        divider.style.borderTop = "1px solid rgba(100, 100, 100, 0.6)";
        divider.style.margin = "10px 0";

        return divider;
    }

    startRainbowBackground() {
        const colors = ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3"];
        let index = 0;
        this.stopRainbowBackground();
        this.rainbowInterval = setInterval(() => {
            this.setBackground(colors[index]);
            index = (index + 1) % colors.length;
        }, 1000);
    }

    stopRainbowBackground() {
        if (this.rainbowInterval) {
            clearInterval(this.rainbowInterval);
            this.rainbowInterval = null;
        }
    }

    createSlider(min, max, value, step) {
        const sliderContainer = document.createElement("div");
        sliderContainer.style.margin = "15px 0";

        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = min;
        slider.max = max;
        slider.value = value;
        slider.step = step;
        slider.style.width = "100%";
        slider.style.background = "#222";
        slider.style.borderRadius = "5px";

        const valueLabel = document.createElement("div");
        valueLabel.textContent = `Value: ${value}`;
        valueLabel.style.textAlign = "right";
        valueLabel.style.color = "#fff";
        valueLabel.style.marginTop = "5px";

        slider.addEventListener("input", () => {
            valueLabel.textContent = `Value: ${slider.value}`;
        });

        sliderContainer.appendChild(slider);
        sliderContainer.appendChild(valueLabel);

        window.featureCount++;

        return sliderContainer;
    }

    createDropdown(options, selectedValue = "", onChange = null) {
        const dropdown = document.createElement("select");
        dropdown.style.marginTop = "10px";
        dropdown.style.padding = "10px";
        dropdown.style.width = "100%";
        dropdown.style.borderRadius = "5px";
        dropdown.style.background = "rgba(17, 17, 17, 0.5)";
        dropdown.style.color = "#fff";
        dropdown.style.border = "1px solid rgba(100, 100, 100, 0.6)";

        options.forEach((option) => {
            const opt = document.createElement("option");
            opt.value = option.value;
            opt.textContent = option.label;
            if (option.value === selectedValue) {
                opt.selected = true;
            }
            dropdown.appendChild(opt);
        });
        if (onChange) {
            dropdown.addEventListener("change", (e) => {
                onChange(e.target.value);
            });
        }

        window.featureCount++;

        return dropdown;
    }

    createConsoleLogBox() {
        const logBox = document.createElement("div");
        logBox.classList.add("console-log-box");
        logBox.style.padding = "15px";
        logBox.style.background = "rgba(17, 17, 17, 0.5)";
        logBox.style.color = "#fff";
        logBox.style.height = "300px";
        logBox.style.overflowY = "scroll";
        logBox.style.border = "1px solid rgba(100, 100, 100, 0.6)";
        logBox.style.borderRadius = "6px";
        logBox.style.fontFamily = "monospace";
        logBox.style.fontSize = "12px";
        logBox.style.marginTop = "10px";

        const style = document.createElement("style");
        style.textContent = `
    .console-log-box::-webkit-scrollbar {
        width: 10px;
    }

    .console-log-box::-webkit-scrollbar-track {
        background: #111;
        border-radius: 5px;
    }

    .console-log-box::-webkit-scrollbar-thumb {
        background: rgba(100, 100, 100, 0.6);
        border-radius: 5px;
    }

    .console-log-box::-webkit-scrollbar-thumb:hover {
        background: rgba(150, 150, 150, 0.8);
    }
    `;
        document.head.appendChild(style);

        Log.storedLogs = [];

        Log.customLog = (message, color = "#fff") => {
            let split = message.split("\n");
            split.forEach(msg => {
                const logMessage = document.createElement("div");
                logMessage.textContent = msg;
                logMessage.style.marginBottom = "5px";
                logMessage.style.color = color;
                logBox.appendChild(logMessage);

                Log.storedLogs.push({ element: logMessage, message: msg, color });

                logBox.scrollTop = logBox.scrollHeight;
            });
        };

        window.featureCount++;

        return logBox;
    }

    createWebSocketResender() {
        const logBox = document.createElement("div");
        logBox.classList.add("websocket-log-box");
        logBox.style.padding = "15px";
        logBox.style.background = "rgba(17, 17, 17, 0.5)";
        logBox.style.color = "#fff";
        logBox.style.height = "300px";
        logBox.style.overflowY = "scroll";
        logBox.style.border = "1px solid rgba(100, 100, 100, 0.6)";
        logBox.style.borderRadius = "6px";
        logBox.style.fontFamily = "monospace";
        logBox.style.fontSize = "12px";
        logBox.style.marginTop = "10px";
        logBox.style.width = "97%";
        logBox.style.position = "relative";

        const style = document.createElement("style");
        style.textContent = `
    .websocket-log-box::-webkit-scrollbar {
        width: 10px;
    }
    .websocket-log-box::-webkit-scrollbar-track {
        background: #111;
        border-radius: 5px;
    }
    .websocket-log-box::-webkit-scrollbar-thumb {
        background: rgba(100, 100, 100, 0.6);
        border-radius: 5px;
    }
    .websocket-log-box::-webkit-scrollbar-thumb:hover {
        background: rgba(150, 150, 150, 0.8);
    }
    .resend-btn {
        margin-left: 10px;
        padding: 5px 12px;
        background: linear-gradient(145deg, rgba(200, 50, 50, 0.8), rgba(255, 70, 70, 1));
        border: none;
        color: white;
        font-size: 12px;
        border-radius: 6px;
        cursor: pointer;
        text-transform: uppercase;
        font-weight: bold;
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    }
    .resend-btn:hover {
        background: linear-gradient(145deg, rgba(255, 70, 70, 1), rgba(200, 50, 50, 0.8));
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
        transform: translateY(-2px);
    }
    .resend-btn:active {
        transform: translateY(1px);
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
    }
    .log-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        border-bottom: 1px solid rgba(100, 100, 100, 0.6);
        word-break: break-all;
    }
    `;
        document.head.appendChild(style);

        const messageList = [];
        let isUserScrolling = false;

        // Detect if the user is manually scrolling up
        logBox.addEventListener("scroll", () => {
            isUserScrolling = logBox.scrollTop < logBox.scrollHeight - logBox.clientHeight;
        });

        function addMessage(message, callback) {
            const logItem = document.createElement("div");
            logItem.classList.add("log-item");

            const msgText = document.createElement("span");
            msgText.textContent = message;

            const resendButton = document.createElement("button");
            resendButton.textContent = "Resend";
            resendButton.classList.add("resend-btn");

            resendButton.addEventListener("click", () => {
                if (callback) callback(message);
            });

            logItem.appendChild(msgText);
            logItem.appendChild(resendButton);
            logBox.appendChild(logItem);

            messageList.push({ message, callback });

            // If the user isn't scrolling, auto-scroll to bottom
            if (!isUserScrolling) {
                logBox.scrollTop = logBox.scrollHeight;
            }
        }

        function clearLogs() {
            // Remove all log items
            logBox.innerHTML = '';
            messageList.length = 0;
        }

        return {
            logBox,
            addMessage,
            clearLogs,
        };
    }

    createMarkdownBox(callback) {
        // Create the script element for marked.js
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
        script.onload = function () {
            // Check if the marked library is loaded
            // Script has loaded and marked is available, now proceed

            const markdownBox = document.createElement("div");
            markdownBox.classList.add("markdown-box");
            markdownBox.style.padding = "15px";
            markdownBox.style.background = "rgba(17, 17, 17, 0.5)";
            markdownBox.style.color = "#fff";
            markdownBox.style.height = "300px";
            markdownBox.style.overflowY = "scroll";
            markdownBox.style.border = "1px solid rgba(100, 100, 100, 0.6)";
            markdownBox.style.borderRadius = "6px";
            markdownBox.style.fontFamily = "monospace";
            markdownBox.style.fontSize = "12px";
            markdownBox.style.marginTop = "10px";
            markdownBox.style.width = "97%";
            markdownBox.style.position = "relative";
            markdownBox.style.whiteSpace = "pre-wrap";
            markdownBox.style.wordWrap = "break-word";
            markdownBox.style.backgroundColor = "rgba(30, 30, 30, 0.7)";
            markdownBox.setAttribute("contenteditable", "false");  // Make it non-editable

            const style = document.createElement("style");
            style.textContent = `
                .markdown-box::-webkit-scrollbar {
                    width: 10px;
                }
                .markdown-box::-webkit-scrollbar-track {
                    background: #111;
                    border-radius: 5px;
                }
                .markdown-box::-webkit-scrollbar-thumb {
                    background: rgba(100, 100, 100, 0.6);
                    border-radius: 5px;
                }
                .markdown-box::-webkit-scrollbar-thumb:hover {
                    background: rgba(150, 150, 150, 0.8);
                }
            `;
            document.head.appendChild(style);

            // Function to set markdown text and parse it into HTML
            function setMarkdownText(markdown) {
                markdownBox.innerHTML = marked.parse(markdown);  // Parse markdown into HTML
            }

            // Call the callback with the markdownBox and setMarkdownText function
            callback({
                markdownBox,
                setMarkdownText
            });
        };

        // Append the script to the document body (it will load and execute)
        document.body.appendChild(script);
    }

    createNotification(title, iconUrl, descriptionElement, time = 8) {
        Log.info(descriptionElement);
        if (window.notificationsEnabled == false) return;

        const notification = document.createElement("div");
        notification.classList.add("notification");
        notification.style.position = "fixed";
        notification.style.right = "-400px";
        notification.style.width = "350px";
        notification.style.background = "rgba(15, 15, 15, 0.95)";
        notification.style.border = "2px solid rgba(100, 100, 100, 0.6)";
        notification.style.borderRadius = "6px";
        notification.style.padding = "15px";
        notification.style.color = "#ffffff";
        notification.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.6)";
        notification.style.zIndex = "10000";
        notification.style.transition = "right 0.5s ease-in-out, top 0.3s ease-in-out";

        const notificationIcon = document.createElement("img");
        notificationIcon.src = iconUrl;
        notificationIcon.style.width = "40px";
        notificationIcon.style.height = "40px";
        notificationIcon.style.float = "left";
        notificationIcon.style.marginRight = "10px";
        notificationIcon.style.borderRadius = "50%";

        const notificationTitle = document.createElement("div");
        notificationTitle.textContent = title.toUpperCase();
        notificationTitle.style.fontWeight = "bold";
        notificationTitle.style.fontFamily = "'Arial', sans-serif";
        notificationTitle.style.fontSize = "16px";
        notificationTitle.style.marginBottom = "5px";

        const notificationDescription = document.createElement("div");
        notificationDescription.style.fontSize = "14px";
        notificationDescription.style.marginTop = "5px";
        notificationDescription.style.fontFamily = "'Arial', sans-serif";

        // Check if descriptionElement is a string (it can contain HTML content) or a DOM element
        if (typeof descriptionElement === "string") {
            notificationDescription.innerHTML = descriptionElement; // Allow HTML content (including span with colors)
        } else {
            notificationDescription.appendChild(descriptionElement); // If it's a DOM element, append it
        }

        notification.appendChild(notificationIcon);
        notification.appendChild(notificationTitle);
        notification.appendChild(notificationDescription);

        document.body.appendChild(notification);

        const notificationHeight = 80;
        const gap = 10;
        const topPosition = this.notifications.length * (notificationHeight + gap) + 20;
        notification.style.top = `${topPosition}px`;
        this.notifications.push(notification);

        setTimeout(() => {
            notification.style.right = "20px";
        }, 100);

        setTimeout(() => {
            notification.style.right = "-400px";
            setTimeout(() => {
                notification.remove();
                this.notifications = this.notifications.filter(n => n !== notification);
                this.notifications.forEach((n, index) => {
                    const newTop = index * (notificationHeight + gap) + 20;
                    n.style.top = `${newTop}px`;
                });
            }, 500);
        }, time * 1000);
    }

    addSpacer(height = 5) {
        const spacer = document.createElement("div");
        spacer.style.height = `${height}px`;
        spacer.style.width = "100%";
        spacer.style.margin = "0";
        return spacer;
    }

    createPremiumLabel(text, highlightedText) {
        const label = document.createElement("div");
        label.style.marginBottom = "10px";
        label.style.fontSize = "14px";
        label.style.fontWeight = "bold";
        label.style.color = "#ffffff";
        label.style.textShadow = "0 1px 2px rgba(0, 0, 0, 0.7)";

        const normalText = document.createElement("span");
        normalText.textContent = text.replace(highlightedText, "");
        normalText.style.color = "#ffffff";

        const highlight = document.createElement("span");
        highlight.textContent = highlightedText;
        highlight.style.color = "#ffd700";
        highlight.style.fontWeight = "bold";

        label.appendChild(normalText);
        label.appendChild(highlight);

        return label;
    }

    makeDraggable() {
        let isDragging = false;
        let startX = 0;
        let startY = 0;

        this.container.style.transform = "none";

        this.container.addEventListener("mousedown", (e) => {
            isDragging = true;
            startX = e.clientX - parseInt(this.container.style.left || '0');
            startY = e.clientY - parseInt(this.container.style.top || '0');
            this.container.style.cursor = "grabbing";
        });

        document.addEventListener("mousemove", (e) => {
            if (isDragging) {
                this.container.style.left = `${e.clientX - startX}px`;
                this.container.style.top = `${e.clientY - startY}px`;
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
            this.container.style.cursor = "default";
        });

        this.container.addEventListener('selectstart', (e) => {
            e.preventDefault();
        });
    }
}
