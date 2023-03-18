const cardTitle = document.querySelector('[data-products="link"] h3');

const breakpointDesktop = window.matchMedia('(min-width:1024px)');

const breakpointCheckerDesktop = () => {
  if (breakpointDesktop.matches) {
    if (cardTitle) {
      cardTitle.innerHTML = 'Монтаж печатных <br> плат';
    }
  } else {
    if (cardTitle) {
      cardTitle.innerHTML = 'Монтаж <br> печатных плат';
    }
  }
};

breakpointDesktop.addListener(breakpointCheckerDesktop);

export {breakpointCheckerDesktop};
