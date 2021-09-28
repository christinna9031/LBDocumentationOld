jQuery(() => {
  const $sidebar = $('#sidebar');
  const $nav = $('.nav');
  const $main = $('.main');
  const $slide = $('.slide');
  const $scroller = $('.scroller');
  const searchHeight = $('.search').outerHeight() + 1;
  const offset = $sidebar.offset().top;

  $sidebar.find('a').click(() => {
    $('body').removeClass('nav-open');
  });

  const $dl = $('.sidebar a.active').closest('dl');

  setSidebar();

  if ($dl.length > 0) {
    setActiveSidebarLink();
  }

  $(window).on('scroll', () => {
    throttle(() => {
      setActiveSidebarLink();
      setSidebar();
    }, 100)();
  });

  function setActiveSidebarLink() {
    $dl.find('a').removeClass('active-highlight');
    const $closest = getClosestHeader();
    $closest.addClass('active-highlight');
  }

  function setSidebar() {
    const bottom = $main.outerHeight() - $sidebar.outerHeight() - 53;
    if (window.scrollY > bottom) {
      var t = window.innerHeight - ($main.offset().top + $main.outerHeight() - searchHeight - window.scrollY);
      if (t < 0) { t = 0; }
      $slide.css('position', 'absolute').css('top', window.scrollY);
    } else if (window.scrollY > $main.offset().top) {
      $slide.css('position', 'fixed').css('top', 0);
    } else {
      var t = $('nav').offset().top + $('nav').outerHeight() - window.scrollY;
      $slide.css('position', 'absolute').css('top', $main.offset().top);
    }
  }
});

$(document.links).filter(function () {
  return this.hostname != window.location.hostname;
}).attr('target', '_blank');

function getClosestHeader() {
  const $links = $('.sidebar a.active').closest('dl').find('dd a:not(.sub-page)');
  const top = window.scrollY;
  let $last = $links.first();

  if (top < 300) {
    return $last;
  }

  if (top + window.innerHeight >= $('.main').height()) {
    return $links.last();
  }

  for (let i = 0; i < $links.length; i++) {
    const $link = $links.eq(i);
    const href = $link.attr('href');

    if (href !== undefined && href.charAt(0) === '#' && href.length > 1) {
      const $anchor = $(href);

      if ($anchor.length > 0) {
        const offset = $anchor.offset();

        if (top < offset.top - 100) {
          return $last;
        }

        $last = $link;
      }
    }
  }
  return $last;
}

function throttle(callback, limit) {
  let wait = false;
  return function () {
    if (!wait) {
      callback.apply(null, arguments);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
}

function toggle_visibility(id) {
  const e = document.getElementById(id);
  if (e.style.display == 'block') e.style.display = 'none';
  else e.style.display = 'block';
}

$(document).ready(() => {
  const tables = document.getElementsByTagName('table');
  for (let i = 0; i < tables.length; i++) {
    console.log(tables[i].title);
    if (tables[i].title != 'basic') {
      tables[i].innerHTML = tables[i].innerHTML.replace(/ \*/g, "<a href='faq.html#paramsinputboxes' style='font-size:150%;'>*</a>");
    }
  }
});
