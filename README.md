# UIManager - Advanced UI Components for Web Applications

![UIManager Logo](link-to-your-logo-if-available)

## Overview

`UIManager` is a versatile JavaScript class designed to simplify the creation of complex, interactive user interfaces for web applications. This class encapsulates a variety of UI elements with custom styling and functionalities, making it easier to manage state, interactions, and visual effects.

## Features

- **Custom UI Elements:** Provides methods to create buttons, sliders, color pickers, toggle switches, tabs, and more, all styled for dark mode compatibility.
- **Interactive Components:** Includes draggable containers, console log boxes, custom IDE boxes with syntax highlighting, and WebSocket message resenders.
- **Notification System:** Implements a notification system with customizable timings and animations.
- **Modular Design:** Each method can be used independently to add or modify UI elements within a web page.

## Installation

To use `UIManager`, simply include the script in your HTML:

```html
<script src="path/to/UIManager.js"></script>

Or, if you're using it with a module system:

bash
npm install ui-manager --save

Then, in your JavaScript file:

javascript
import UIManager from 'ui-manager';

Usage
Initialization
To start using UIManager, instantiate it with a container ID where the UI elements will be added:

javascript
let uiManager = new UIManager('my-container-id');

Creating UI Elements
Here are some examples of how to use different methods:

Show/Hide UI
Show: uiManager.show()
Hide: uiManager.hide()
Toggle Visibility: uiManager.toggleVisibility()

Create UI Components
Button:
javascript
uiManager.createButton('Click Me', () => console.log('Button clicked!'));
Color Picker:
javascript
uiManager.createColorPicker('Choose Color', '#ff0000', (color) => {
  document.body.style.backgroundColor = color;
});
Toggle Switch:
javascript
uiManager.createToggleSwitch('Dark Mode', true, (isOn) => {
  uiManager.isDarkMode = isOn;
  // Update UI theme based on isOn
});
Tabs:
javascript
uiManager.createTabs([
  { label: 'Tab 1', content: document.createElement('div') },
  { label: 'Tab 2', content: document.createElement('div') }
]);
IDE Box (Custom Code Editor):
javascript
const ide = uiManager.createIDEBox(['function', 'let'], {
  'object.method': ['method1', 'method2']
});
document.body.appendChild(ide);
Console Log Box:
javascript
const consoleBox = uiManager.createConsoleLogBox();
Log.customLog("This is a custom log message", "#00ff00");
WebSocket Resender:
javascript
const wsResender = uiManager.createWebSocketResender();
wsResender.addMessage("Message sent", (msg) => console.log(`Resending: ${msg}`));
document.body.appendChild(wsResender.logBox);

Notifications
javascript
uiManager.createNotification("New Message", "path/to/icon.png", "You've got mail!");

Background Effects
Rainbow Background:
javascript
uiManager.startRainbowBackground();
// To stop: uiManager.stopRainbowBackground();

Custom Styling
Most methods return DOM elements that can be further styled or modified:

javascript
const button = uiManager.createButton('My Button', () => {});
button.style.fontSize = '20px';

Draggable UI
The container can be made draggable by default, but you can disable it or re-enable it:

javascript
// The draggable functionality is initialized in the constructor

Customization
Styling: Modify CSS directly on elements or extend methods to include additional styling.
Functionality: Add more methods or extend existing ones to fit your project's needs.

Contribution
Feel free to contribute by:
Opening issues for bugs or new feature requests.
Submitting pull requests to improve the code or add features.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.
