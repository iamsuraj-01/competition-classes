(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate The wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    // Back To Top Button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    $('.back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 'smooth');
        return false;
    });

    // Gallery
    $('#autoWidth').lightSlider({
        autoWidth: true,
        loop: true,
        auto: true,
        pause: 2000,
        speed: 700,
        onSliderLoad: function(){
            $('#autoWidth').removeClass('cs-hidden');
        }
    });

    $(document).ready(function() {
        // Initialize a session flag
        if (!sessionStorage.getItem('modalAlreadyClosed')) {
            var myModal = new bootstrap.Modal(document.getElementById('eligibilityModal'), {
                keyboard: false,
                backdrop: 'static'
            });
            myModal.show();
    
            $('#eligibilityModal').on('hidden.bs.modal', function () {
                console.log('Modal is closed');
                // Set the flag in sessionStorage when the modal is closed
                sessionStorage.setItem('modalAlreadyClosed', 'true');
            });
        }
    });

    // Contact Form Submission
    $(document).ready(function() {
        $("#contactForm").on("submit", function(event) {
            event.preventDefault(); // Prevent the default form submission

            const fullName = $("input[name='fullName']").val();
            const email = $("input[name='email']").val();
            const phone = $("input[name='phone']").val();
            const query = $("textarea[name='query']").val();

            // Create an array for the message lines
            const messageLines = [
                `Information:`,
                `Name: ${fullName}`,
                `Email: ${email}`,
                `Phone: ${phone}`,
                `Query: ${query}`
            ];

            // Join the message lines with line breaks
            const message = messageLines.join('%0D%0A'); // '%0D%0A' is the URL-encoded line break for mailto links

            // Construct mailto link
            const mailtoLink = `mailto:competitionclasses.edu@gmail.com?subject=Admission Request from ${fullName}&body=${message}`;

            // Open the user's default email client
            window.location.href = mailtoLink;

            // Show Thank You Modal
            $("#thankYouModal").modal('show');
        });
    });

    
})(jQuery);
