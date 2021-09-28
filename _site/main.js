jQuery(function() {
	var $sidebar = $('#sidebar'),
		$nav = $('.nav'),
		$main = $('.main'),
		$slide = $('.slide'),
		$scroller = $('.scroller'),
		searchHeight = $('.search').outerHeight() + 1,
		offset = $sidebar.offset().top;

	$sidebar.find('a').click(function() {
		$('body').removeClass('nav-open');
	});

	var $dl = $('.sidebar a.active').closest('dl');

	setSidebar();

	if ($dl.length > 0) {
		setActiveSidebarLink();
	}

	$(window).on("scroll", function() {
		throttle(function(){
			setActiveSidebarLink();
			setSidebar();
		}, 100)();
	});

	function setActiveSidebarLink() {
			$dl.find('a').removeClass('active-highlight');
			var $closest = getClosestHeader();
			$closest.addClass('active-highlight');
	}

	function setSidebar() {
		var bottom = $main.outerHeight() - $sidebar.outerHeight() - 53;
		if (window.scrollY > bottom) {
			var t = window.innerHeight - ($main.offset().top + $main.outerHeight() - searchHeight - window.scrollY);
			if (t < 0) { t = 0; }
			$slide.css("position", "absolute").css("top", window.scrollY);
		} else if (window.scrollY > $main.offset().top) {
			$slide.css("position", "fixed").css("top", 0);
		} else {
			var t = $('nav').offset().top + $('nav').outerHeight() - window.scrollY;
			$slide.css("position", "absolute").css("top", $main.offset().top);
		}
	}

});



  $(document.links).filter(function() {
	return this.hostname != window.location.hostname;
  }).attr('target', '_blank');

function getClosestHeader() {
	var $links = $('.sidebar a.active').closest('dl').find('dd a:not(.sub-page)'),
	top = window.scrollY,
	$last = $links.first();

	if (top < 300) {
		return $last;
	}

	if (top + window.innerHeight >= $(".main").height()) {
		return $links.last();
	}

	for (var i = 0; i < $links.length; i++) {
		var $link = $links.eq(i),
		href = $link.attr("href");

		if (href !== undefined && href.charAt(0) === "#" && href.length > 1) {
			var $anchor = $(href);

			if ($anchor.length > 0) {
				var offset = $anchor.offset();

				if (top < offset.top -100) {
					return $last;
				}

				$last = $link;
			}
		}
	}
	return $last;
}


function throttle (callback, limit) {

	var wait = false;
	return function () {
		if (!wait) {

			callback.apply(null, arguments);
			wait = true;
			setTimeout(function () {
				wait = false;
			}, limit);
		}
	};
}

function toggle_visibility(id) 
{
    var e = document.getElementById(id);
    if ( e.style.display == 'block' )
        e.style.display = 'none';
    else
        e.style.display = 'block';
}

$( document ).ready(function (){
var tables = document.getElementsByTagName("table");
for (let i=0;i<tables.length;i++){
console.log(tables[i].title)
if (tables[i].title!='basic'){
tables[i].innerHTML=tables[i].innerHTML.replace(/ \*/g,"<a href='faq.html#paramsinputboxes' style='font-size:150%;'>*</a>")}
}
const coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
	  console.log(this)
	  console.log(this.classList)
	  console.log(this.nextElementSibling)

    this.classList.toggle("active");
    const content = this.nextElementSibling;
	console.log(content)
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}




})


