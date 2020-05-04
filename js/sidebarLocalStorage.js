var sidenav = document.getElementById('sidenavAccordion');

if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark');
    sidenav.classList.add('sb-sidenav-dark');
    sidenav.classList.remove('sb-sidenav-light');
}
else
    document.body.classList.remove('dark');

   /* if(document.body.classList.contains('dark')) {
        sidenav.classList.add('sb-sidenav-dark');
        sidenav.classList.remove('sb-sidenav-light');
        localStorage.setItem('dark-mode','true');
    }
    else {
        sidenav.classList.add('sb-sidenav-light');
        sidenav.classList.remove('sb-sidenav-dark');
        localStorage.setItem('dark-mode','false');
    }*/

if (localStorage.getItem('sidebar') === 'false')
    document.body.classList.add('sb-sidenav-toggled');
else
    document.body.classList.remove('sb-sidenav-toggled');