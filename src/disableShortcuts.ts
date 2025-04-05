function disableShortcuts(): void {
  document.addEventListener("contextmenu", (e) => e.preventDefault()); // Disable right-click

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "F12" || // F12
      (e.ctrlKey && e.shiftKey && e.key === "I") || // Ctrl+Shift+I
      (e.ctrlKey && e.shiftKey && e.key === "J") || // Ctrl+Shift+J
      (e.ctrlKey && e.key === "U") // Ctrl+U (View Source)
    ) {
      e.preventDefault();
      alert("This action is disabled.");
    }
  });
}

export default disableShortcuts;