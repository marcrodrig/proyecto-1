window.onload = function() {
    setUpEvents();
}

function setUpEvents() {
    // Switch
    const btnSwitch = document.querySelector('#switch');
    btnSwitch.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        btnSwitch.classList.toggle('active');
    
        //.classList.toggle('sb-sidenav-light');
        //document.getElementById('sidenavAccordion').classList.toggle('sb-sidenav-light');
       // Checking class using hasClass 
        //if($('#sidenavAccordion').hasClass('sb-sidenav-light')){
     
           // Switch class from post-unread to post-read
       //    $('#sidenavAccordion').switchClass("sb-sidenav-light","sb-sidenav-dark");
        //   $(this).text('UnRead'); // Changing Button Text
        //}else{
           // Switch class from post-read to post-unread
         //  $('#'+post_id).switchClass("post-read","post-unread");
         //  $(this).text('Read'); // Changing Button Text
        //} 
        var sidenav = document.getElementById('sidenavAccordion');
        if(document.body.classList.contains('dark')) {
            sidenav.classList.add('sb-sidenav-dark');
            sidenav.classList.remove('sb-sidenav-light');
            localStorage.setItem('dark-mode','true');
        }
        else {
            sidenav.classList.add('sb-sidenav-light');
            sidenav.classList.remove('sb-sidenav-dark');
            localStorage.setItem('dark-mode','false');
        }
    });
    const btnSidebarToggle = document.getElementById('sidebarToggle')
    btnSidebarToggle.addEventListener('click', function() {
       /* document.body.classList.toggle('dark');
        btnSwitch.classList.toggle('active');*/
    
        if(document.body.classList.contains('sb-sidenav-toggled'))
            localStorage.setItem('sidebar','false');
        else
            localStorage.setItem('sidebar','true');
    });
}