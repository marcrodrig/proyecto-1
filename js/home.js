window.onload = function() {
    setUpEvents();
}

function setUpEvents() {
    // Switch
    const btnSwitch = document.querySelector('#switch');
    btnSwitch.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        btnSwitch.classList.toggle('active');
    
        var sidenav = document.getElementById('sidenavAccordion');
        if(document.body.classList.contains('dark')) {
            sidenav.classList.add('sb-sidenav-dark');
            sidenav.classList.remove('sb-sidenav-light');
            localStorage.setItem('modoOscuro','true');
        }
        else {
            sidenav.classList.add('sb-sidenav-light');
            sidenav.classList.remove('sb-sidenav-dark');
            localStorage.setItem('modoOscuro','false');
        }
    });
    const btnSidebarToggle = document.getElementById('sidebarToggle')
    btnSidebarToggle.addEventListener('click', function() {
    
        if(document.body.classList.contains('sb-sidenav-toggled'))
            localStorage.setItem('sidebar','false');
        else
            localStorage.setItem('sidebar','true');
    });
}