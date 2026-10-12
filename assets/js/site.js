/* Theme toggle + navigation — Joshua Su portfolio */
(function () {
	var KEY = 'js-theme';

	function apply(t) {
		document.documentElement.setAttribute('data-theme', t);
	}

	// Set as early as possible (script is in <head> with defer-free inline call below)
	try {
		var saved = localStorage.getItem(KEY);
		if (saved) {
			apply(saved);
		} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			apply('dark');
		} else {
			apply('light');
		}
	} catch (e) {
		apply('light');
	}

	document.addEventListener('DOMContentLoaded', function () {
		// Theme button
		var btn = document.querySelector('.theme-toggle');
		if (btn) {
			btn.addEventListener('click', function () {
				var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
				apply(next);
				try { localStorage.setItem(KEY, next); } catch (e) {}
			});
		}

		// Mobile menu
		var menuBtn = document.querySelector('.menu-btn');
		var nav = document.querySelector('.nav');
		if (menuBtn && nav) {
			menuBtn.addEventListener('click', function () {
				nav.classList.toggle('open');
			});
		}

		// Projects dropdown
		var drops = document.querySelectorAll('.nav-drop');
		Array.prototype.forEach.call(drops, function (d) {
			var trigger = d.querySelector('button');
			if (!trigger) return;
			trigger.addEventListener('click', function (e) {
				e.stopPropagation();
				d.classList.toggle('open');
			});
		});
		document.addEventListener('click', function () {
			Array.prototype.forEach.call(drops, function (d) { d.classList.remove('open'); });
		});
	});

	// Section jump rail: highlight the part currently in view
	document.addEventListener('DOMContentLoaded', function () {
		var links = document.querySelectorAll('.toc-rail a, .toc-pop a');
		if (!links.length) return;
		var ids = [];
		links.forEach(function (a) { var id = a.getAttribute('data-sec'); if (ids.indexOf(id) < 0) ids.push(id); });
		var heads = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);
		var pop = document.querySelector('.toc-pop');
		function update() {
			var line = window.innerHeight * 0.35, current = heads[0] && heads[0].id;
			heads.forEach(function (h) { if (h.getBoundingClientRect().top <= line) current = h.id; });
			links.forEach(function (a) {
				if (a.getAttribute('data-sec') === current) a.setAttribute('aria-current', 'true');
				else a.removeAttribute('aria-current');
			});
		}
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		update();
		// Jump reliably: lazy images above the target can load mid-scroll and push it down,
		// so load them first and re-align once the smooth scroll has settled.
		function jump(id) {
			var el = document.getElementById(id);
			if (!el) return;
			document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
				if (img.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) img.loading = 'eager';
			});
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			[700, 1400, 2200].forEach(function (t) {
				setTimeout(function () {
					var off = el.getBoundingClientRect().top - 84;
					if (Math.abs(off) > 6) window.scrollBy({ top: off, behavior: 'auto' });
				}, t);
			});
			if (history.replaceState) history.replaceState(null, '', '#' + id);
		}
		links.forEach(function (a) {
			a.addEventListener('click', function (e) {
				e.preventDefault();
				if (pop) pop.removeAttribute('open');
				jump(a.getAttribute('data-sec'));
			});
		});
	});
})();
