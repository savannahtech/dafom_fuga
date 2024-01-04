# LeatherbackPopUp Class Documentation

The `LeatherbackPopUp` class is a JavaScript utility for creating customizable payment pop-ups. This document provides an overview of its features, usage, and methods.

## Installation

No specific installation is required as this is a standalone JavaScript class that can be included in your project.

## Usage

```javascript
// Instantiate the LeatherbackPopUp class with configuration options
const popUp = new LeatherbackPopUp({
  label: "leatherback",
  callback: () => {
    console.log("Transaction successful!");
  },
  // Other configuration options...
});

// Generate and display the payment pop-up
popUp.generatePaymentPopUp();
