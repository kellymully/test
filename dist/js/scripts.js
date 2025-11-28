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

const searchInput  = document.getElementById('sidebarSearch');
const searchButton = document.getElementById('btnNavbarSearch');
const resultsBox   = document.getElementById('searchResults');

// Iframe où on charge les pages (dashboard.html, etc.)
const iframe = document.querySelector('iframe[name="mainFrame"]');

// Liens du menu latéral qui ciblent l'iframe
const navLinks = document.querySelectorAll(
    '#sidenavAccordion a.nav-link[target="mainFrame"]'
);

// Ouvre la 1ʳᵉ page trouvée (Enter ou clic sur le bouton)
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
            window.location.href = url; // fallback
        }
    } else {
        alert('Aucune page trouvée pour : "' + query + '"');
    }
}

// Met à jour la liste des résultats sous la barre de recherche
function updateSearchResults() {
    if (!searchInput || !resultsBox) return;

    const query = searchInput.value.trim().toLowerCase();

    // Nettoie la liste
    resultsBox.innerHTML = '';

    if (!query) {
        resultsBox.style.display = 'none';
        return;
    }

    const matches = [];

    navLinks.forEach(link => {
        const text = link.textContent.trim();
        if (text.toLowerCase().includes(query)) {
            matches.push({ link, text });
        }
    });

    if (!matches.length) {
        resultsBox.style.display = 'none';
        return;
    }

    matches.forEach(({ link, text }) => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.textContent = text;

        item.addEventListener('click', () => {
            const url = link.getAttribute('href');
            if (iframe) {
                iframe.src = url;
            } else {
                window.location.href = url;
            }
            resultsBox.style.display = 'none';
        });

        resultsBox.appendChild(item);
    });

    resultsBox.style.display = 'block';
}

if (searchInput && searchButton) {
    // Clic sur le bouton loupe = ouvre la 1ʳᵉ page trouvée
    searchButton.addEventListener('click', function (e) {
        e.preventDefault();
        performSearch();
    });

    // Touche Enter = ouvre la 1ʳᵉ page trouvée
    searchInput.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        } else {
            // sur chaque frappe, met à jour la liste des résultats
            updateSearchResults();
        }
    });

    // Quand on tape sans Enter (input)
    searchInput.addEventListener('input', updateSearchResults);
}

// Clique en dehors = fermer la liste
document.addEventListener('click', function (e) {
    if (resultsBox && !resultsBox.contains(e.target) && e.target !== searchInput) {
        resultsBox.style.display = 'none';
    }
});
