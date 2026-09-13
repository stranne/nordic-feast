// Every month already exists as HTML. Without JavaScript, visitors choose a month.
const month = Number(new Intl.DateTimeFormat("sv-SE", {
  month: "numeric",
  timeZone: "Europe/Stockholm",
}).format(new Date()));
const destination = document.querySelector(`[data-month="${month}"]`);
if (destination) window.location.replace(destination.href);
