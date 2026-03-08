import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { LeadsList } from "./pages/LeadsList";
import { LeadDetails } from "./pages/LeadDetails";
import { LeadManagement } from "./pages/LeadManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "leads", Component: LeadsList },
      { path: "leads/:id", Component: LeadDetails },
      { path: "management", Component: LeadManagement },
    ],
  },
]);
