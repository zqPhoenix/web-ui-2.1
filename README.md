# UIManager - Advanced UI Components for Web Applications
### A UI made for making web game modding simpler


![Web UI Preview](https://github.com/user-attachments/assets/4901c88e-fb9f-485c-b9b0-11567561066b)
![Web UI Preview](https://github.com/user-attachments/assets/fa293425-4935-41d3-be0d-83e8ab0b32b1)
![Web UI Preview](https://github.com/user-attachments/assets/b85831f8-650c-4044-a9bb-28a869c8ec9f)


## Overview

`UIManager` is a powerful JavaScript class designed to streamline the creation of interactive and customizable user interfaces for web-based game modding. It provides a variety of UI components with custom styling, event handling, and modular design, making it easier to manage state, interactions, and visual effects.

## Features

- **Custom UI Elements:** Create buttons, sliders, color pickers, toggle switches, tabs, and more with built-in dark mode support.
- **Interactive Components:** Includes draggable containers, console log boxes, custom IDE boxes with syntax highlighting, and WebSocket message resenders.
- **Notification System:** Display notifications with customizable timing and animations.
- **Modular Design:** Use each method independently to add or modify UI elements on a webpage.

## Installation

Include the script in your HTML:

```html
<script src="path/to/UIManager.js"></script>
```

## Usage

### Initialization

Instantiate `UIManager` with a container ID where the UI elements will be added:

```javascript
let uiManager = new UIManager('my-container-id');
```

### Creating UI Elements

#### Show/Hide UI

```javascript
uiManager.show(); // Show UI
uiManager.hide(); // Hide UI
uiManager.toggleVisibility(); // Toggle UI visibility
```

#### Create UI Components

**Button:**
```javascript
uiManager.createButton('Click Me', () => console.log('Button clicked!'));
```

**Color Picker:**
```javascript
uiManager.createColorPicker('Choose Color', '#ff0000', (color) => {
  document.body.style.backgroundColor = color;
});
```

**Toggle Switch:**
```javascript
uiManager.createToggleSwitch('Dark Mode', true, (isOn) => {
  uiManager.isDarkMode = isOn;
  // Update UI theme based on isOn
});
```

**Tabs:**
```javascript
uiManager.createTabs([
  { label: 'Tab 1', content: document.createElement('div') },
  { label: 'Tab 2', content: document.createElement('div') }
]);
```

**IDE Box (Custom Code Editor):**
```javascript
const ide = uiManager.createIDEBox(['function', 'let'], {
  'object.method': ['method1', 'method2']
});
document.body.appendChild(ide);
```

**Console Log Box:**
```javascript
const consoleBox = uiManager.createConsoleLogBox();
Log.customLog("This is a custom log message", "#00ff00");
```

**WebSocket Resender:**
```javascript
const wsResender = uiManager.createWebSocketResender();
wsResender.addMessage("Message sent", (msg) => console.log(`Resending: ${msg}`));
document.body.appendChild(wsResender.logBox);
```

### Notifications
```javascript
uiManager.createNotification("New Message", "path/to/icon.png", "You've got mail!");
```

### Background Effects
**Rainbow Background:**
```javascript
uiManager.startRainbowBackground();
// To stop: 
uiManager.stopRainbowBackground();
```

### Custom Styling

Most methods return DOM elements that can be further styled:

```javascript
const button = uiManager.createButton('My Button', () => {});
button.style.fontSize = '20px';
```

### Draggable UI

The container is draggable by default. You can disable or re-enable it as needed:

```javascript
// The draggable functionality is initialized in the constructor
```

### Customization

- **Styling:** Modify CSS directly or extend methods for additional styles.
- **Functionality:** Add new methods or modify existing ones to fit your project needs.

## Contribution

Feel free to contribute by:
- Reporting issues or suggesting new features.
- Submitting pull requests to enhance functionality or fix bugs.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.
