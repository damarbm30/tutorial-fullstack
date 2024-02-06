import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import Missing from "./components/ui/missing";
import { AuthProvider } from "./context/auth";
import { PersistLogin, Protected, Public } from "./components/wrapper";
import { Login, Register, Home, Contact, Profile, Address } from "./routes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<PersistLogin />}>
        <Route element={<Public />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/address" element={<Address />} />
        </Route>
      </Route>
      <Route path="*" element={<Missing />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
