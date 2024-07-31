const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const animateOnScroll = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

export const observeElements = (selectors) => {
  selectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      observer.observe(element);
    });
  });
};
