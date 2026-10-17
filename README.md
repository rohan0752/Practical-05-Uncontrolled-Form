# Practical 5: Uncontrolled Form Components in React

## BCA (Hons.) React.js Practical 5

### 🎯 Objective
To understand and implement **Uncontrolled Components** in React using `useRef()` and native DOM `FormData` APIs, where form elements maintain their own internal state in the DOM instead of React component state.

### 💡 Core Concepts Demonstrated
1. **useRef Hook**: Accessing DOM elements directly without triggering component re-renders.
2. **Native FormData API**: Extracting all submitted form values cleanly on submit (`new FormData(event.target)`).
3. **Controlled vs Uncontrolled Comparison**: Clear side-by-side conceptual explanation of when to choose uncontrolled components (e.g. file uploads, legacy integration, non-reactive forms).
4. **Validation on Submit**: Validating inputs upon form submission without intermediate state thrashing.

### 🚀 Running Locally
```bash
npm install
npm run dev
```

### 📦 Tech Stack
- React 19 / 18
- Vite
- Vanilla Modern CSS
