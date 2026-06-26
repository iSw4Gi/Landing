/* ==========================================================================
   منصة المرونة المؤسسية — السكربت الرئيسي
   المسؤوليات: الحركات والتفاعلات فقط (لا منطق أعمال هنا)
   ========================================================================== */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ------------------------------------------------------------------
     1. حالة الهيدر عند التمرير
     ------------------------------------------------------------------ */
  var header = document.querySelector('.site-header');

  function updateHeaderState() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();

  /* ------------------------------------------------------------------
     2. الكشف عن العناصر عند التمرير (Scroll Reveal)
     ------------------------------------------------------------------ */
  var revealTargets = document.querySelectorAll(
    '.why-card, .audience-card, .section-header'
  );

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach(function (el, index) {
      // تأخير تدريجي بسيط للبطاقات المتجاورة
      el.style.transitionDelay = (index % 4) * 0.08 + 's';
      revealObserver.observe(el);
    });
  } else {
    // عند تقليل الحركة أو عدم توفر الدعم، أظهر العناصر مباشرة
    revealTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ------------------------------------------------------------------
     3. تموج الخلفية الزائد (Parallax) لصورة البطل
     ------------------------------------------------------------------ */
  var heroBg = document.querySelector('.hero-bg');

  function updateParallax() {
    if (!heroBg || prefersReducedMotion) return;
    var offset = window.scrollY;
    var translateY = Math.min(offset * 0.15, 80);
    heroBg.style.transform = 'translateY(' + translateY + 'px) scale(1.04)';
  }

  window.addEventListener('scroll', updateParallax, { passive: true });

  /* ------------------------------------------------------------------
     4. جزيئات عائمة في قسم البطل
     ------------------------------------------------------------------ */
  function createParticles() {
    var container = document.querySelector('.particles');
    if (!container || prefersReducedMotion) return;

    var count = window.innerWidth < 640 ? 12 : 24;

    for (var i = 0; i < count; i++) {
      var particle = document.createElement('span');
      particle.className = 'particle';

      var size = 2 + Math.random() * 3;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.right = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animation =
        'floatParticle ' +
        (8 + Math.random() * 10) +
        's linear infinite';
      particle.style.animationDelay = Math.random() * 10 + 's';

      container.appendChild(particle);
    }
  }

  createParticles();

  /* ------------------------------------------------------------------
     5. تأثير التموج (Ripple) عند الضغط على الأزرار
     ------------------------------------------------------------------ */
  function attachRipple(button) {
    button.addEventListener('click', function (event) {
      var rect = button.getBoundingClientRect();
      var ripple = document.createElement('span');
      var size = Math.max(rect.width, rect.height);

      ripple.className = 'ripple';
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.left = event.clientX - rect.left - size / 2 + 'px';
      ripple.style.top = event.clientY - rect.top - size / 2 + 'px';

      button.appendChild(ripple);

      window.setTimeout(function () {
        ripple.remove();
      }, 650);
    });
  }

  document.querySelectorAll('.btn-primary').forEach(attachRipple);

  /* ------------------------------------------------------------------
     6. فتح استبيان Microsoft Forms في تبويب جديد
     ------------------------------------------------------------------ */
  var FORMS_URL =
    'https://forms.office.com/pages/responsepage.aspx?id=j7vjIpaavUiZ-PZS2D2QTMpHU8U2H59Hsn4k_uY6hVZUMlM2R1JLMUE5M1AxVjlCRDJTOFA2RTBMRS4u&route=shorturl';

  document.querySelectorAll('[data-forms-link]').forEach(function (link) {
    link.setAttribute('href', FORMS_URL);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

  /* ------------------------------------------------------------------
     7. مؤشر التمرير: نقل المستخدم إلى القسم التالي
     ------------------------------------------------------------------ */
  var scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function () {
      var nextSection = document.querySelector('.section-why');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
})();