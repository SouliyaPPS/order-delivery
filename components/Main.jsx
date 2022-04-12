import React, { useEffect, useState } from "react";
import A2HS from "./A2HS";

function NavLink({ to, children }) {
  return (
    <a href={to} className={`mx-4`}>
      {children}
    </a>
  );
}

let deferredPrompt;

function Main() {
  const [installable, setInstallable] = useState(true);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener("appinstalled", () => {
      // Log install to analytics
      console.log("INSTALL: Success");
    });
  }, []);

  const handleInstallClick = () => {
    // Hide the app provided install promotion
    // setInstallable(true);
    // Show the install prompt
    deferredPrompt.prompt(true);
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
    });
  };

  return (
    <div className="flex justify-center items-center flex-col pt-41 text-center font-bold lg:text-8xl text-6xl space-y-2">
      <div className="text-gray-900 pb-10">
        <A2HS />
      </div>
      {/* https://recraft-shop.blogspot.com/ */}
      <NavLink to="/Home">
        {installable && (
          <div
            onClick={handleInstallClick}
            className="shadow-2xl h-14 install-button flex justify-center items-center cursor-pointer hover:shadow-lg  text-3xl font-semibold text-white bg-amber-500 rounded-lg w-60 "
          >
            <h1 className="text-center">Shop Now 🚀</h1>
          </div>
        )}
      </NavLink>
    </div>
  );
}

export default Main;
