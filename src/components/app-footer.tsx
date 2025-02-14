import React from "react";

export default function AppFooter() {
  return (
    <footer className="mt-auto border-t border-black/5 py-5">
      <small className="opacity-50">
        &copy; {new Date().getFullYear()} Petsoft. All rights reserved.
      </small>
    </footer>
  );
}
