var sidenav = document.getElementById('sidenavAccordion');

if (localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('dark');
    sidenav.classList.add('sb-sidenav-dark');
    sidenav.classList.remove('sb-sidenav-light');
}
else
    document.body.classList.remove('dark');

if (localStorage.getItem('sidebar') === 'false')
    document.body.classList.add('sb-sidenav-toggled');
else
    document.body.classList.remove('sb-sidenav-toggled');