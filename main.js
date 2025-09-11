document.querySelectorAll(".scroll_button").forEach((item, index) => {
  item.addEventListener("click", function (event) {
    document.querySelector(".heading" + index).scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  });
});

document.querySelectorAll(".stars").forEach(canvas => {
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  let stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    for (let s of stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      s.x += s.dx;
      s.y += s.dy;

      if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
      if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
    }
    requestAnimationFrame(animate);
  }
  animate();
});

function typeEffect(element, speed = 40) {
  const text = element.textContent;
  element.textContent = '';

  const cursor = document.createElement('span');
  cursor.textContent = '';
  cursor.style.opacity = '1';
  cursor.style.marginLeft = '2px';
  element.appendChild(cursor);

  let i = 0;

  function blinkCursor() {
    cursor.style.opacity = cursor.style.opacity === '1' ? '0' : '1';
    if (i < text.length) setTimeout(blinkCursor, 500);
  }
  blinkCursor();

  function type() {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      element.appendChild(cursor);
      setTimeout(type, speed);
    } else {
      cursor.remove();
    }
  }

  type();
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      typeEffect(entry.target, 40);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('h1, h2').forEach(el => {
  observer.observe(el);
});

