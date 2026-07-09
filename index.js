import { submitConsultation } from './firebase.js';
import { inject } from '@vercel/analytics';

// Initialize Vercel Analytics
inject();

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    // Transform hamburger to X
    const spans = mobileToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close mobile nav when clicking a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
      const spans = mobileToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // Video Inline Play Logic
  const playTrigger = document.getElementById('play-trigger');
  if (playTrigger) {
    playTrigger.addEventListener('click', () => {
      // Create YouTube iframe directly in place of the thumbnail
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', 'https://www.youtube.com/embed/t3Q5zuX7XNA?autoplay=1');
      iframe.setAttribute('title', 'Suvendu Physics Lecture');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', 'true');
      
      // Inline styling to fill the aspect-ratio container
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.borderRadius = 'var(--radius-cards)';
      
      // Replace thumbnail SVG with the iframe
      playTrigger.innerHTML = '';
      playTrigger.appendChild(iframe);
      playTrigger.style.cursor = 'default';
    });
  }

  // Enrollment Form Handling
  const enrollmentForm = document.getElementById('enrollment-form');
  if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = enrollmentForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Get form data
      const formData = new FormData(enrollmentForm);
      const name = formData.get('name');
      const phone = formData.get('phone');
      const email = formData.get('email');
      const grade = formData.get('grade');
      const role = formData.get('role');
      const message = formData.get('message');
      
      // Animate submit button to loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
      submitBtn.style.backgroundColor = 'var(--color-charcoal)';
      submitBtn.style.color = 'var(--color-ash)';
      
      // Submit to Firestore database
      const result = await submitConsultation(name, email, phone, grade, role, message);
      
      if (result.success) {
        submitBtn.textContent = 'Request Received Successfully ✓';
        submitBtn.style.backgroundColor = 'var(--color-iris-glow)';
        submitBtn.style.color = 'var(--color-obsidian)';
        enrollmentForm.reset();
      } else {
        submitBtn.textContent = 'Submission Failed. Try Again';
        submitBtn.style.backgroundColor = '#ef4444'; // Red error button
        submitBtn.style.color = '#ffffff';
      }
      
      // Reset button after a short delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = 'var(--color-carbon-vellum)';
        submitBtn.style.color = 'var(--color-obsidian)';
      }, 4000);
    });
  }

  // Hero Quick Lead Form Handling
  const heroLeadForm = document.getElementById('hero-lead-form');
  if (heroLeadForm) {
    heroLeadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = heroLeadForm.querySelector('.hero-form-submit');
      const originalText = submitBtn.textContent;
      
      const name = document.getElementById('hero-name').value;
      const phone = document.getElementById('hero-phone').value;
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Booking...';
      submitBtn.style.backgroundColor = 'var(--color-charcoal)';
      submitBtn.style.color = 'var(--color-ash)';
      
      const result = await submitConsultation(
        name,
        '', // No email asked
        phone,
        'Hero Quick Book', // Grade source tag
        'student',
        'Quick Demo Class Booking from Hero Section'
      );
      
      if (result.success) {
        submitBtn.textContent = 'Demo Booked ✓';
        submitBtn.style.backgroundColor = 'var(--color-iris-glow)';
        submitBtn.style.color = 'var(--color-obsidian)';
        heroLeadForm.reset();
      } else {
        submitBtn.textContent = 'Failed. Try Again';
        submitBtn.style.backgroundColor = '#ef4444';
        submitBtn.style.color = '#ffffff';
      }
      
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = 'var(--color-carbon-vellum)';
        submitBtn.style.color = 'var(--color-obsidian)';
      }, 4000);
    });
  }

  // Interactive Physics Simulator Dashboard
  const mockupContainer = document.querySelector('.mockup-container');
  const angleLabel = document.querySelector('.sim-vector-box text');
  const simEquationText = document.querySelector('.sim-equation');
  const simStatCards = document.querySelectorAll('.sim-stat-card .sim-stat-value');
  
  // SVG elements
  const planePath = document.querySelector('.sim-vector-svg path:nth-of-type(1)');
  const angleArc = document.querySelector('.sim-vector-svg path:nth-of-type(2)');
  const sphere = document.querySelector('.sim-vector-svg circle:nth-of-type(1)');
  const centerDot = document.querySelector('.sim-vector-svg circle:nth-of-type(2)');
  
  // Vectors
  const gravityLine = document.querySelector('.sim-vector-svg line:nth-of-type(1)');
  const gravityText = document.querySelector('.sim-vector-svg text:nth-of-type(2)');
  const normalLine = document.querySelector('.sim-vector-svg line:nth-of-type(2)');
  const normalText = document.querySelector('.sim-vector-svg text:nth-of-type(3)');
  const frictionLine = document.querySelector('.sim-vector-svg line:nth-of-type(3)');
  const frictionText = document.querySelector('.sim-vector-svg text:nth-of-type(4)');

  const updateSimulation = (e) => {
    // Determine cursor ratio within container
    const rect = mockupContainer.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const ratio = x / rect.width;
    
    // Map ratio to angle between 10 deg and 35 deg
    const angleDeg = 10 + ratio * 25;
    const angleRad = (angleDeg * Math.PI) / 180;
    
    // Physics constants
    const g = 9.81;
    const mass = 2.50;
    
    // Calculation: acceleration a = 5/7 * g * sin(theta)
    const acceleration = (5 / 7) * g * Math.sin(angleRad);
    // Rough estimate of rolling velocity & kinetic energy
    const velocity = Math.sqrt(2 * acceleration * 3.0); // assuming a path length of 3m
    const energy = 0.5 * mass * velocity * velocity + 0.5 * (0.5 * mass * 0.2 * 0.2) * (velocity/0.2)*(velocity/0.2); // translational + rotational KE
    
    // Update stats cards
    simStatCards[0].textContent = `${mass.toFixed(2)} kg`;
    simStatCards[1].textContent = `${velocity.toFixed(2)} m/s`;
    simStatCards[2].textContent = `${energy.toFixed(2)} J`;
    
    // Update text labels
    angleLabel.textContent = `\u03B8 = ${Math.round(angleDeg)}\u00B0`;
    simEquationText.innerHTML = `a = <sup>5</sup>/<sub>7</sub>g sin &theta; = ${acceleration.toFixed(2)} m/s&sup2;`;
    
    // Update SVG plane coordinates
    // Plane is a triangle: (50, 110) to (350, 110) to (350, 110 - 300 * tan(angle))
    const startX = 50;
    const endX = 350;
    const baseY = 110;
    const height = 300 * Math.tan(angleRad);
    const topY = baseY - height;
    
    planePath.setAttribute('d', `M ${startX} ${baseY} L ${endX} ${baseY} L ${endX} ${topY} Z`);
    
    // Update angle arc representation
    // Center at (startX, baseY), radius 50. Arc from angleRad to 0
    const arcRadius = 45;
    const arcX = startX + arcRadius * Math.cos(angleRad);
    const arcY = baseY - arcRadius * Math.sin(angleRad);
    angleArc.setAttribute('d', `M ${startX + arcRadius} ${baseY} A ${arcRadius} ${arcRadius} 0 0 0 ${arcX} ${arcY}`);
    angleLabel.setAttribute('x', `${startX + 55}`);
    angleLabel.setAttribute('y', `${baseY - 10}`);
    
    // Position sphere halfway on the incline
    const sphereX = startX + 160;
    const sphereY = baseY - 160 * Math.tan(angleRad);
    
    // Apply normal offset to position the sphere ON the plane (radius = 22)
    // The normal vector is (-sin(theta), cos(theta)) pointing up-left
    const radius = 22;
    const offsetSphereX = sphereX - radius * Math.sin(angleRad);
    const offsetSphereY = sphereY - radius * Math.cos(angleRad);
    
    sphere.setAttribute('cx', offsetSphereX);
    sphere.setAttribute('cy', offsetSphereY);
    
    centerDot.setAttribute('cx', offsetSphereX);
    centerDot.setAttribute('cy', offsetSphereY);
    
    // Update vector lines relative to sphere center
    // Gravity (vertical down)
    gravityLine.setAttribute('x1', offsetSphereX);
    gravityLine.setAttribute('y1', offsetSphereY);
    gravityLine.setAttribute('x2', offsetSphereX);
    gravityLine.setAttribute('y2', offsetSphereY + 45);
    
    gravityText.setAttribute('x', offsetSphereX + 5);
    gravityText.setAttribute('y', offsetSphereY + 40);
    
    // Normal Force (perpendicular to plane: pointing up and left)
    const normalLength = 40;
    const nX = offsetSphereX - normalLength * Math.sin(angleRad);
    const nY = offsetSphereY - normalLength * Math.cos(angleRad);
    
    normalLine.setAttribute('x1', offsetSphereX);
    normalLine.setAttribute('y1', offsetSphereY);
    normalLine.setAttribute('x2', nX);
    normalLine.setAttribute('y2', nY);
    
    normalText.setAttribute('x', nX - 15);
    normalText.setAttribute('y', nY + 5);
    
    // Friction Force (parallel to plane: pointing up and left along incline)
    const contactX = offsetSphereX + radius * Math.sin(angleRad);
    const contactY = offsetSphereY + radius * Math.cos(angleRad);
    
    const frictionLength = 35;
    const fX = contactX - frictionLength * Math.cos(angleRad);
    const fY = contactY + frictionLength * Math.sin(angleRad);
    
    frictionLine.setAttribute('x1', contactX);
    frictionLine.setAttribute('y1', contactY);
    frictionLine.setAttribute('x2', fX);
    frictionLine.setAttribute('y2', fY);
    
    frictionText.setAttribute('x', fX - 12);
    frictionText.setAttribute('y', fY + 12);
  };

  mockupContainer.addEventListener('mousemove', updateSimulation);
  mockupContainer.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      updateSimulation(e.touches[0]);
    }
  }, { passive: true });

  // ==========================================
  // Three.js 3D Physics Background Simulation
  // ==========================================
  const initThreeBg = () => {
    const canvas = document.getElementById('physics-bg');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    // Initial camera position
    camera.position.set(0, 35, 110);

    // 1. Central Physics Subject: Quantum core point cloud
    const coreGeometry = new THREE.SphereGeometry(14, 30, 30);
    const coreMaterial = new THREE.PointsMaterial({
      color: 0xffffff, // Monotone White
      size: 0.15,
      transparent: true,
      opacity: 0.55
    });
    const core = new THREE.Points(coreGeometry, coreMaterial);
    scene.add(core);

    // 2. Orbiting particles & orbital tracks
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const numOrbits = 3;
    const orbits = [];

    for (let i = 0; i < numOrbits; i++) {
      const orbitRadius = 24 + i * 8;
      const orbitGeom = new THREE.BufferGeometry();
      const points = [];
      
      for (let j = 0; j <= 64; j++) {
        const theta = (j / 64) * Math.PI * 2;
        const x = orbitRadius * Math.cos(theta);
        const z = orbitRadius * Math.sin(theta);
        points.push(new THREE.Vector3(x, 0, z));
      }
      
      orbitGeom.setFromPoints(points);
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0x3f3f46, // Monotone Zinc Gray
        transparent: true,
        opacity: 0.25
      });
      const orbitLine = new THREE.Line(orbitGeom, orbitMat);
      
      // Randomly tilt orbital planes in 3D
      orbitLine.rotation.x = Math.random() * Math.PI;
      orbitLine.rotation.y = Math.random() * Math.PI;
      orbitGroup.add(orbitLine);

      // Orbiting particles (electrons / satellites)
      const particleGeom = new THREE.BufferGeometry();
      const posArray = new Float32Array(3); // 1 point (x,y,z)
      particleGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0xffffff, // Monotone White
        size: 2.0,
        transparent: true,
        opacity: 0.8
      });
      const particle = new THREE.Points(particleGeom, particleMat);
      orbitGroup.add(particle);

      orbits.push({
        line: orbitLine,
        radius: orbitRadius,
        speed: 0.4 + Math.random() * 0.5,
        angle: Math.random() * Math.PI * 2,
        particle: particle
      });
    }

    // 3. Spacetime Warp Grid (Gravitational Field Sheet)
    const gridWidth = 220;
    const gridHeight = 220;
    const gridSegments = 36;
    const gridGeom = new THREE.PlaneGeometry(gridWidth, gridHeight, gridSegments, gridSegments);

    // Apply gravity well equation to pull vertices downward at the center
    const pos = gridGeom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const dist = Math.sqrt(vx * vx + vy * vy);
      // Singularity pull function
      const zWarp = -2400 / (dist + 24);
      pos.setZ(i, zWarp);
    }
    gridGeom.computeVertexNormals();

    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x27272a, // Monotone Gray
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const gridMesh = new THREE.Mesh(gridGeom, gridMat);
    gridMesh.rotation.x = -Math.PI / 2; // Lay horizontal
    gridMesh.position.y = -14; // Position beneath quantum core
    scene.add(gridMesh);

    // Helper: Dynamic sprite texture generation for text cards in WebGL space
    const createTextSprite = (titleText, formulaText) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 512, 128);

      // Glass plate background
      ctx.fillStyle = 'rgba(18, 18, 20, 0.7)';
      // Round rect drawing fallback
      if (ctx.roundRect) {
        ctx.roundRect(8, 8, 496, 112, 12);
      } else {
        ctx.rect(8, 8, 496, 112);
      }
      ctx.fill();
      ctx.strokeStyle = 'rgba(82, 82, 91, 0.25)'; // Monotone gray border
      ctx.lineWidth = 2;
      ctx.stroke();

      // Heading Text
      ctx.fillStyle = '#a1a1aa'; // Neutral Gray
      ctx.font = '22px Inter, system-ui, sans-serif';
      ctx.fillText(titleText, 32, 48);

      // Physics Formula Text
      ctx.fillStyle = '#ffffff'; // Crisp Monotone White
      ctx.font = 'bold 24px "Space Mono", Courier, monospace';
      ctx.fillText(formulaText, 32, 90);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(40, 10, 1);
      return sprite;
    };

    // 4. Create floating physics proof sprites (Class 11 & 12 Syllabus)
    const sprite1 = createTextSprite("Rotational Dynamics (Class 11)", "τ = I α  |  L = I ω");
    sprite1.position.set(45, 12, 10);
    scene.add(sprite1);

    const sprite2 = createTextSprite("Faraday's Law of EMI (Class 12)", "ε = -dΦ_B / dt");
    sprite2.position.set(-50, -5, -20);
    scene.add(sprite2);

    const sprite3 = createTextSprite("Gauss's Law (Class 12)", "∮ E · dA = q_in / ε₀");
    sprite3.position.set(50, -18, -40);
    scene.add(sprite3);

    const sprite4 = createTextSprite("Photoelectric Effect (Class 12)", "hν = φ + K_max");
    sprite4.position.set(-45, 8, 25);
    scene.add(sprite4);

    // Track scroll
    let scrollFraction = 0;
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        scrollFraction = scrollTop / scrollHeight;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle viewport resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Animation Loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      
      // Core rotation
      core.rotation.y += 0.002;
      core.rotation.x += 0.001;

      // Move particles along orbits
      orbits.forEach(orbit => {
        orbit.angle += 0.01 * orbit.speed;
        
        // Circular orbit relative coordinates
        const lx = orbit.radius * Math.cos(orbit.angle);
        const lz = orbit.radius * Math.sin(orbit.angle);
        const localPos = new THREE.Vector3(lx, 0, lz);
        
        // Transform along tilted orbit plane rotation
        localPos.applyEuler(orbit.line.rotation);
        
        // Update orbiting point coordinate
        const posAttr = orbit.particle.geometry.attributes.position;
        posAttr.setXYZ(0, localPos.x, localPos.y, localPos.z);
        posAttr.needsUpdate = true;
      });

      // Camera Orbit scroll controls
      // Orbit camera in a 3D spiral around the center sphere
      const currentAngle = scrollFraction * Math.PI * 1.8 + Math.PI * 0.2;
      const currentRadius = 110 - scrollFraction * 25;
      
      const targetX = Math.sin(currentAngle) * currentRadius;
      const targetZ = Math.cos(currentAngle) * currentRadius;
      const targetY = 35 - scrollFraction * 60; // Camera sinks as user scrolls down

      // Smooth camera interpolation (lerping)
      camera.position.x += (targetX - camera.position.x) * 0.07;
      camera.position.y += (targetY - camera.position.y) * 0.07;
      camera.position.z += (targetZ - camera.position.z) * 0.07;
      camera.lookAt(0, 0, 0);

      // Micro-hover floating animations for formulas
      const floatVal = Math.sin(time * 1.5) * 1.2;
      sprite1.position.y = 12 + floatVal;
      sprite2.position.y = -5 + Math.cos(time * 1.3) * 1.0;
      sprite3.position.y = -18 + floatVal;
      sprite4.position.y = 8 + Math.cos(time * 1.4) * 1.1;

      renderer.render(scene, camera);
    };

    animate();
  };

  // Launch WebGL 3D Background
  initThreeBg();

  // Smart Scroll Header: reveal on scroll up, hide on scroll down
  let lastScrollY = window.scrollY;
  const header = document.querySelector('.site-header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        header.classList.add('scrolled');
        if (window.scrollY > lastScrollY) {
          // Scrolling down -> hide header
          header.classList.add('nav-hidden');
        } else {
          // Scrolling up -> show header
          header.classList.remove('nav-hidden');
        }
      } else {
        header.classList.remove('scrolled', 'nav-hidden');
      }
      lastScrollY = window.scrollY;
    }, { passive: true });
  }
});
