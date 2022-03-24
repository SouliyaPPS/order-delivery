import React, { useEffect, useState } from "react";
import A2HS from "./A2HS";

let deferredPrompt;

function Main() {
  const [installable, setInstallable] = useState(false);

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

  const handleInstallClick = (e) => {
    // Hide the app provided install promotion
    setInstallable(false);
    // Show the install prompt
    deferredPrompt.prompt();
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
      <a href="/ShopNow">
        {installable && (
          <div
            onClick={handleInstallClick}
            className="shadow-2xl h-14 install-button flex justify-center items-center cursor-pointer hover:shadow-lg  text-3xl font-semibold text-white bg-amber-500 rounded-lg w-60 "
          >
            <h1 className="text-center">Shop Now 🚀</h1>
          </div>
        )}
      </a>
    </div>
  );
}

export default Main;
