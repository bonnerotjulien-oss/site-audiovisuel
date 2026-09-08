(() => {
  "use strict";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };

  const sendEvent = (name, params = {}) => {
    try {
      window.dataLayer.push({ event: name, ...params });
      window.gtag("event", name, params);
    } catch (_) {}
  };

  const pageService = document.body.dataset.servicePage || "";

  document.addEventListener("DOMContentLoaded", () => {
    if (pageService) {
      sendEvent("service_page_view", {
        service_page: pageService,
        page_path: window.location.pathname
      });
    }

    document.querySelectorAll('a[href="#devis"], a[href="#contact"], a[href$="#contact"]').forEach((link) => {
      link.addEventListener("click", () => {
        sendEvent("cta_devis_click", {
          service_page: pageService || "homepage",
          cta_text: (link.textContent || "").trim().slice(0, 120),
          cta_target: link.getAttribute("href") || ""
        });
      });
    });

    const showreel = document.querySelector(".showreel-placeholder");
    if (showreel) {
      showreel.addEventListener("click", () => {
        sendEvent("showreel_play", {
          page_path: window.location.pathname
        });
      }, { once: true });
    }

    document.querySelectorAll("form[data-track-form]").forEach((form) => {
      const status = form.querySelector(".service-form-status");

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        const button = form.querySelector('button[type="submit"]');
        const original = button ? button.innerHTML : "";
        if (button) {
          button.disabled = true;
          button.innerHTML = "<span>Envoi en cours…</span>";
        }
        if (status) status.textContent = "";

        try {
          const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { "Accept": "application/json" }
          });

          if (!response.ok) throw new Error("Form submit failed");

          sendEvent("form_submit", {
            form_name: form.dataset.trackForm || "contact",
            service_page: pageService || "homepage",
            page_path: window.location.pathname
          });

          if (status) status.textContent = "Merci. Votre demande a bien été envoyée. Réponse sous 24 h.";
          form.reset();
        } catch (_) {
          if (status) status.textContent = "L’envoi n’a pas abouti. Réessayez dans quelques instants.";
        } finally {
          if (button) {
            button.disabled = false;
            button.innerHTML = original;
          }
        }
      });
    });
  });
})();