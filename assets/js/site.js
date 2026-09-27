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
})();
