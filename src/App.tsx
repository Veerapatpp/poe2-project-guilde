import { NavLink, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Campaign from "./pages/Campaign";
import Builds from "./pages/Builds";
import Tools from "./pages/Tools";

const links = [
  { to: "/", label: "Home" },
  { to: "/campaign", label: "Campaign" },
  { to: "/builds", label: "Builds" },
  { to: "/tools", label: "Tools" },
];

export default function App() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col p-4">
      <nav className="flex gap-2 text-sm">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 ${isActive ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <main className="mt-4 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/builds" element={<Builds />} />
          <Route path="/tools" element={<Tools />} />
        </Routes>
      </main>

      <footer className="mt-8 text-xs text-zinc-500">
        Unofficial fan-made tool. Not affiliated with or endorsed by Grinding Gear Games.
      </footer>
    </div>
  );
}
