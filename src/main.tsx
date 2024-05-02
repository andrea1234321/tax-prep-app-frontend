import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import './i18n.ts';
import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Suspense fallback="... loading">
            <App />
        </Suspense>
    </React.StrictMode>,
);
