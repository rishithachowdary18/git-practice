document.addEventListener("DOMContentLoaded", () => {

    /* ─────────────────────────────────────────────────────────
       MOBILE HAMBURGER MENU
    ───────────────────────────────────────────────────────── */
    const hamburger   = document.querySelector(".nav-hamburger");
    const mobileMenu  = document.getElementById("mobileMenu");
    const closeBtn    = document.querySelector(".mobile-menu-close");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    const openMenu  = () => {
        mobileMenu.classList.add("open");
        hamburger.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
    };
    const closeMenu = () => {
        mobileMenu.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    };

    hamburger.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    mobileLinks.forEach(link => link.addEventListener("click", closeMenu));

    /* ─────────────────────────────────────────────────────────
       NAVBAR — scrolled class
    ───────────────────────────────────────────────────────── */
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
    }, { passive: true });

    /* ─────────────────────────────────────────────────────────
       GSAP — runs on ALL screen sizes
       pin: true is disabled on mobile (causes scroll-jacking)
    ───────────────────────────────────────────────────────── */
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = () => window.innerWidth <= 768;

    /* ── HERO: fade to black ─────────────────────────────── */
    gsap.timeline({
        scrollTrigger: {
            trigger: ".section1",
            start: "50% 50%",
            end: "300% 50%",
            scrub: 1,
            pin: !isMobile(),   // no pin on mobile
        }
    })
    .to(".section1",          { backgroundColor: "#000" },    "fade")
    .to(".hero-portrait",     { opacity: 0 },                 "fade")
    .to(".hero-tagline-left", { opacity: 0 },                 "fade")
    .to(".hero-skills",       { opacity: 0 },                 "fade")
    .to(".hero-name",         { scale: 1.2, opacity: 0 })
    .to(".hero-sub-left",     { opacity: 0 });

    /* ── ABOUT: scale in + unblur ────────────────────────── */
    gsap.timeline({
        scrollTrigger: {
            trigger: ".section2",
            start: "10% 90%",
            end: "60% 60%",
            scrub: 3,
        }
    })
    .from(".about-inner",  { scale: 0.88 },                      "in")
    .from(".about-cols p", { filter: "blur(20px)", opacity: 0 }, "in");

    /* ── EXPERTISE: slide images in ──────────────────────── */
    gsap.timeline({
        scrollTrigger: {
            trigger: ".section3",
            start: "25% 80%",
            end: "80% 80%",
            scrub: 3,
        }
    })
    .to(".mid-one",        { x: 0, opacity: 1 },         "slide")
    .to(".mid-two",        { x: 0 },                     "slide")
    .to(".expertise-copy", { color: "#000" },             "color")
    .to(".section3",       { backgroundColor: "#fff" },  "color");

    /* ── MARQUEE: scroll-driven pan ──────────────────────── */
    gsap.timeline({
        scrollTrigger: {
            trigger: ".marquee-wrap",
            start: "30% 50%",
            end: "100% 50%",
            scrub: 2,
        }
    })
    .to(".marquee-text", { xPercent: -30 });

    /* ── STRENGTHS: slide words in ───────────────────────── */
    gsap.timeline({
        scrollTrigger: {
            trigger: ".section4",
            start: isMobile() ? "10% 80%" : "5% 0%",
            end:   isMobile() ? "80% 60%" : "120% 50%",
            scrub: 2,
            pin: !isMobile(),   // no pin on mobile
        }
    })
    .to("#str-backend",         { x: 0, opacity: 1 })
    .to("#str-fullstack",       { x: 0, opacity: 1 })
    .to("#str-ai",              { x: 0, opacity: 1 },          "together")
    .to(".section4",            { backgroundColor: "#000" },   "together")
    .to(".strengths-inner h2",  { color: "#fff" },             "together")
    .to(".section4",            { backgroundColor: "#fff" },   "reset")
    .to(".strengths-inner h2",  { color: "#111" },             "reset");

    /* ── WORKS: card stack ───────────────────────────────── */
    // On mobile the cards are static (CSS resets them), so skip this animation
    if (!isMobile()) {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".works-stage",
                start: "50% 50%",
                end: "280% 60%",
                scrub: 2,
                pin: true,
            }
        })
        .to(".card1", { top: "50%", left: "50%", transform: "translate(-50%,-50%)" }, "c1")
        .to(".card2", { top: "50%", left: "50%", transform: "translate(-50%,-50%)" }, "c2")
        .to(".card1", { scale: 0.75, rotate: 3,  opacity: 0 },                        "c2")
        .to(".card3", { top: "50%", left: "50%", transform: "translate(-50%,-50%)" }, "c3")
        .to(".card2", { scale: 0.75, rotate: -3, opacity: 0 },                        "c3")
        .to(".card4", { top: "50%", left: "50%", transform: "translate(-50%,-50%)" }, "c4")
        .to(".card3", { scale: 0.75, rotate: 3,  opacity: 0 },                        "c4")
        .to(".card5", { top: "50%", left: "50%", transform: "translate(-50%,-50%)" }, "c5")
        .to(".card4", { scale: 0.75, rotate: -3, opacity: 0 },                        "c5")
        .to(".card5", { scale: 0.85, opacity: 0.5 });
    }

    /* ── TECH STACK: blur-in cards ───────────────────────── */
    // Set initial state first
    gsap.set([".stack-backend", ".stack-frontend"], {
        filter: "blur(12px)",
        opacity: 0.2,
        y: 60,
    });

    gsap.timeline({
        scrollTrigger: {
            trigger: ".section7",
            start: isMobile() ? "10% 80%" : "60% 50%",
            end:   isMobile() ? "60% 40%" : "110% 50%",
            pin: !isMobile(),   // no pin on mobile
            scrub: 3,
        }
    })
    .to(".stack-backend",  { filter: "blur(0px)", opacity: 1, y: 0 }, "reveal")
    .to(".stack-frontend", { filter: "blur(0px)", opacity: 1, y: 0 }, "reveal");

});
