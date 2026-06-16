/**
 * Plays the process-card bell swing on all five steps for 2s when the section enters view;
 * after that, only hovered cards animate.
 */
(function () {
  const section = document.querySelector(".section--process");
  if (!section) return;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (motionQuery.matches) return;

  const INTRO_MS = 2400;
  let introTimer = null;

  function stopIntro() {
    clearTimeout(introTimer);
    introTimer = null;
    section.classList.remove("is-intro-playing");
  }

  function startIntro() {
    stopIntro();
    section.classList.remove("is-intro-playing");
    void section.offsetWidth;
    section.classList.add("is-intro-playing");
    introTimer = window.setTimeout(stopIntro, INTRO_MS);
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        startIntro();
      } else {
        stopIntro();
      }
    },
    {
      threshold: 0.35,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  observer.observe(section);
})();
