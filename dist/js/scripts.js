/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
 */

// Tout le JS s'exécute quand la page est chargée
window.addEventListener('DOMContentLoaded', event => {

    // =======================
    // 1. Toggle du side menu
    // =======================
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Si tu veux que l'état reste après refresh, décommente ça :
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.add('sb-sidenav-toggled');
        // }

        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem(
                'sb|sidebar-toggle',
                document.body.classList.contains('sb-sidenav-toggled')
            );
        });
    }

    // =======================
    // 2. Recherche de pages
    // =======================

    const searchInput  = document.querySelector(
        'form .form-control[placeholder="Search for..."]'
    );
    const searchButton = document.getElementById('btnNavbarSearch');

    // Iframe où on charge les pages (dashboard.html, etc.)
    const iframe = document.querySelector('iframe[name="mainFrame"]');

    // Liens du menu latéral qui ciblent l'iframe
    const navLinks = document.querySelectorAll(
        '#sidenavAccordion a.nav-link[target="mainFrame"]'
    );

    function performSearch() {
        if (!searchInput) return;

        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        let matchedLink = null;

        navLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            if (!matchedLink && text.includes(query)) {
                matchedLink = link;
            }
        });

        if (matchedLink) {
            const url = matchedLink.getAttribute('href');

            if (iframe) {
                iframe.src = url; // charge la page dans l'iframe
            } else {
                window.location.href = url; // fallback si pas d'iframe
            }
        } else {
            alert('Aucune page trouvée pour : "' + query + '"');
        }
    }

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function (e) {
            e.preventDefault();
            performSearch();
        });

        searchInput.addEventListener('keyup', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }

});
