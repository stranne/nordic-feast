// The current month in Stockholm time. Every page remains complete without this script.
const month = Number(new Intl.DateTimeFormat("sv-SE", {
  month: "numeric",
  timeZone: "Europe/Stockholm",
}).format(new Date()));

// The home page lists all twelve months; visitors with JavaScript go straight to this one.
const destination = document.querySelector(`[data-current-month-redirect] [data-month="${month}"]`);
if (destination) window.location.replace(destination.href);

// Season calendars mark the current month as a visual reference.
for (const element of document.querySelectorAll(`[data-season-month="${month}"]`)) {
  element.classList.add("is-current-month");
}
