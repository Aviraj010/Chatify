import { useState } from "react";

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

function App() {
  const [theme, setTheme] = useState("coffee");

  const changeTheme = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-md px-8">
        <div className="flex-1">
          <a className="text-2xl font-bold text-primary">
            💬 Chatify
          </a>
        </div>

        <div className="flex items-center gap-3">
          <select
            className="select select-bordered"
            value={theme}
            onChange={changeTheme}
          >
            {themes.map((theme) => (
              <option key={theme}>{theme}</option>
            ))}
          </select>

          <button className="btn btn-ghost">Login</button>
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </div>

      {/* Hero */}
      <div className="hero min-h-[85vh]">
        <div className="hero-content flex-col lg:flex-row-reverse gap-20">

          <div className="mockup-window bg-base-300 border shadow-xl w-[380px]">
            <div className="bg-base-200 p-5 space-y-4">

              <div className="chat chat-start">
                <div className="chat-bubble">
                  Hey 👋
                </div>
              </div>

              <div className="chat chat-end">
                <div className="chat-bubble chat-bubble-primary">
                  Hi! What's up?
                </div>
              </div>

              <div className="chat chat-start">
                <div className="chat-bubble">
                  Building Chatify 🚀
                </div>
              </div>

              <div className="chat chat-end">
                <div className="chat-bubble chat-bubble-primary">
                  Looks Awesome 🔥
                </div>
              </div>

            </div>
          </div>

          <div className="max-w-xl">
            <h1 className="text-6xl font-bold">
              Connect with
              <span className="text-primary"> Anyone.</span>
            </h1>

            <p className="py-6 text-lg">
              A modern realtime messaging platform built with
              React, Node.js, Express, MongoDB and Socket.IO.
            </p>

            <div className="flex gap-4">
              <button className="btn btn-primary btn-lg">
                Get Started
              </button>

              <button className="btn btn-outline btn-lg">
                Learn More
              </button>
            </div>

            <div className="stats shadow mt-10">
              <div className="stat">
                <div className="stat-title">Users</div>
                <div className="stat-value text-primary">5K+</div>
              </div>

              <div className="stat">
                <div className="stat-title">Messages</div>
                <div className="stat-value">1M+</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default App;