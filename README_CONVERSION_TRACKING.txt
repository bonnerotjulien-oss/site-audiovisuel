V6 SEO + CONVERSION — MISE À JOUR
================================

CHANGEMENTS EFFECTUÉS
1. H1 SEO explicites :
   - Captation multicam à Bordeaux, Libourne et en Gironde
   - Live streaming à Bordeaux et en Gironde
   - Vidéaste entreprise à Bordeaux, Libourne et en Gironde

2. Formulaire de devis DIRECTEMENT sur chacune des 3 pages services.
   L'utilisateur n'est plus renvoyé vers la homepage.
   CTA principal : "Recevoir une première estimation sous 24 h".

3. Source de chaque demande enregistrée automatiquement :
   - Captation multicam Bordeaux
   - Live streaming Bordeaux
   - Vidéaste entreprise Bordeaux

4. Tracking Analytics ajouté :
   - service_page_view
   - cta_devis_click
   - showreel_play
   - form_submit

5. Le formulaire des pages services est envoyé en AJAX à FormSubmit.
   L'événement form_submit est déclenché uniquement après une réponse HTTP réussie.

6. L'adresse e-mail personnelle reste invisible.

FICHIERS À METTRE SUR GITHUB
- tous les fichiers HTML du pack
- analytics-events.js
- sitemap.xml / robots.txt / CNAME déjà présents dans le pack

À CONSERVER DANS LE DÉPÔT
- assets/
- styles.css
- script.js
- favicons

GOOGLE ANALYTICS
La balise GA4 reste gérée via le conteneur GTM existant.
Après mise en ligne, vérifier dans GA4 > Temps réel / DebugView :
- service_page_view
- cta_devis_click
- showreel_play
- form_submit

Dans GA4, il est recommandé de marquer "form_submit" comme événement clé
(Key event / conversion) une fois que les premiers événements remontent.

SEARCH CONSOLE
Après publication :
- soumettre https://julienbonnerot.fr/sitemap.xml
- demander l'indexation des 3 pages services.
