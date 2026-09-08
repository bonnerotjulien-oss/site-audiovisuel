VÉRIFICATION / CORRECTION TRACKING V63
=====================================

Vérifications effectuées :
- H1 SEO présents sur les 3 pages services.
- Canonical + meta description présents.
- GTM GTM-NM8S3KBX présent.
- Favicon JB présent.
- Aucun Gmail / mailto public.
- Formulaires services intégrés.
- Liens internes valides.
- JSON-LD valide.

Correction importante :
Le précédent analytics-events.js pouvait intercepter le formulaire homepage
en plus du script.js déjà existant, ce qui pouvait provoquer deux envois.

V63 corrige ce point :
- script.js gère SEUL le formulaire homepage.
- analytics-events.js gère SEUL les formulaires des pages services.
- le formulaire homepage envoie un événement de succès au tracking uniquement
  après confirmation FormSubmit.
- le tracking GA4 n'effectue plus le double appel dataLayer + gtag.

Fichiers importants à remplacer sur GitHub :
- script.js
- analytics-events.js
- tous les HTML du pack (références ?v=63)

Le reste de la V6 SEO / conversion est conservé.
