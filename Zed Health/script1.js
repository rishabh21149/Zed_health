/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

/* =========================================================
   OUR VALUES
   SCROLL REVEAL ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const valueRows = document.querySelectorAll(".value-row");


    if (!valueRows.length) {
        return;
    }


    const valuesObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                entry.target.classList.add("is-visible");


                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.15,

            rootMargin: "0px 0px -40px 0px"
        }
    );


    valueRows.forEach((row) => {

        valuesObserver.observe(row);

    });

});

/* =========================================
   MOBILE NAVIGATION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const mobileDrawer = document.getElementById("mobileDrawer");
    const mobileOverlay = document.getElementById("mobileMenuOverlay");
    const mobileClose = document.getElementById("mobileClose");

    if (
        !menuToggle ||
        !mobileDrawer ||
        !mobileOverlay ||
        !mobileClose
    ) {
        return;
    }


    /* Open Menu */

    function openMobileMenu() {

        mobileDrawer.classList.add("active");
        mobileOverlay.classList.add("active");

        mobileDrawer.setAttribute("aria-hidden", "false");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close Menu");

        document.body.style.overflow = "hidden";
    }


    /* Close Menu */

    function closeMobileMenu() {

        mobileDrawer.classList.remove("active");
        mobileOverlay.classList.remove("active");

        mobileDrawer.setAttribute("aria-hidden", "true");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open Menu");

        document.body.style.overflow = "";
    }


    /* Toggle */

    menuToggle.addEventListener("click", function () {

        if (mobileDrawer.classList.contains("active")) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }

    });


    /* Close button */

    mobileClose.addEventListener("click", closeMobileMenu);


    /* Overlay click */

    mobileOverlay.addEventListener("click", closeMobileMenu);


    /* Close after clicking navigation link */

    const mobileLinks =
        mobileDrawer.querySelectorAll("a");

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            closeMobileMenu();

        });

    });


    /* Escape key */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            mobileDrawer.classList.contains("active")
        ) {

            closeMobileMenu();

        }

    });

});
document.addEventListener("DOMContentLoaded", () => {

    const animatedElements = document.querySelectorAll(
        ".reveal-item, .reveal-image"
    );

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);
            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    animatedElements.forEach(element => {
        observer.observe(element);
    });

});
document.addEventListener("DOMContentLoaded", function () {

    const revealElements = document.querySelectorAll(
        ".reveal-item, .reveal-image, .reveal-contact, .reveal-form"
    );

    const observer = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach(function (element) {
        observer.observe(element);
    });

});

/* =========================================================
   ZED HEALTH — CONTACT FORM
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");

    if (!form) return;


    const submitButton =
        document.getElementById("contactSubmit");

    const submitText =
        document.getElementById("submitText");

    const submitArrow =
        document.getElementById("submitArrow");

    const successMessage =
        document.getElementById("formSuccess");

    const errorMessage =
        document.getElementById("formError");


    form.addEventListener("submit", async function (event) {

        event.preventDefault();


        /* Hide previous messages */

        successMessage.classList.remove("show");
        errorMessage.classList.remove("show");


        /* Loading state */

        submitButton.classList.add("is-loading");

        submitText.textContent = "Sending...";
        submitArrow.textContent = "";


        try {

            const formData = new FormData(form);


            const response = await fetch(
                form.action,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


            if (response.ok) {

                /* Success */

                form.reset();

                successMessage.classList.add("show");

                submitText.textContent = "Sent";

                submitArrow.textContent = "✓";


                /* Restore button */

                setTimeout(function () {

                    submitText.textContent =
                        "Send Enquiry";

                    submitArrow.textContent =
                        "→";

                    submitButton.classList.remove(
                        "is-loading"
                    );

                }, 3000);


            } else {

                throw new Error(
                    "Form submission failed"
                );

            }


        } catch (error) {

            console.error(
                "Contact form error:",
                error
            );


            errorMessage.classList.add("show");


            submitText.textContent =
                "Send Enquiry";

            submitArrow.textContent =
                "→";

            submitButton.classList.remove(
                "is-loading"
            );

        }

    });

});