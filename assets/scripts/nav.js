document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-links a");
    const aboutLink = document.querySelector("a#about"); // Target the About link

    navLinks.forEach(link => link.classList.remove("active"));
    document.querySelector("a#home")?.classList.add("active");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            if (link.id === "quest-paths") {
                if (aboutLink) {
                    aboutLink.classList.remove("active");
                }
                return;
            }
            
            const href = link.getAttribute("href");

            if (href.startsWith("#")) {
                e.preventDefault();
                const targetId = href.replace("#", "");
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: "smooth" });

                    navLinks.forEach(nav => nav.classList.remove("active"));
                    link.classList.add("active");
                }
            } else {
                navLinks.forEach(nav => nav.classList.remove("active"));
                link.classList.add("active");
            }
        });
    });
});
