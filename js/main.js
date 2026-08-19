const nav = document.querySelector(".quick-nav");
const navLinks = document.querySelectorAll(".quick-nav a");
const sections = document.querySelectorAll("section[id]");

let currentActiveId = null;
let isClickScrolling = false;

function setActiveLink(sectionId) {
  if (currentActiveId === sectionId) {
    return;
  }

  const activeLink = document.querySelector(`.quick-nav a[href="#${sectionId}"]`);

  if (!activeLink || !nav) {
    return;
  }

  currentActiveId = sectionId;

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  activeLink.classList.add("active");

  activeLink.scrollIntoView({
    behavior: "smooth",
    inline: "start",
    block: "nearest"
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    if (isClickScrolling) {
      return;
    }

    const visibleEntries = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visibleEntries.length === 0) {
      return;
    }

    setActiveLink(visibleEntries[0].target.id);
  },
  {
    root: null,
    threshold: [0.2, 0.35, 0.5, 0.65],
    rootMargin: "-90px 0px -45% 0px"
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const sectionId = link.getAttribute("href").replace("#", "");

    isClickScrolling = true;
    setActiveLink(sectionId);

    window.setTimeout(() => {
      isClickScrolling = false;
    }, 700);
  });
});