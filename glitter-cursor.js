const PARTICLE_COLORS = ["#FF8A36", "#FFB347", "#FFD27A", "#FFFFFF"];
const REDUCED_MOTION_MEDIA = "(prefers-reduced-motion: reduce)";
const MAX_DEVICE_PIXEL_RATIO = 2;
const PARTICLE_LIFETIME = 0.78;
const TOUCH_GLOW_LIFETIME = 260;

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function addMediaListener(query, listener) {
  if (typeof query.addEventListener === "function") {
    query.addEventListener("change", listener);
  } else {
    query.addListener(listener);
  }
}

function removeMediaListener(query, listener) {
  if (typeof query.removeEventListener === "function") {
    query.removeEventListener("change", listener);
  } else {
    query.removeListener(listener);
  }
}

export class GlitterCursor {
  constructor() {
    this.motionMedia = window.matchMedia(REDUCED_MOTION_MEDIA);
    this.lowPower =
      (navigator.hardwareConcurrency || 4) <= 4 ||
      (navigator.deviceMemory || 4) <= 4;
    this.maxParticles = this.lowPower ? 72 : 128;
    this.touchParticleLimit = this.lowPower ? 42 : 64;

    this.canvas = null;
    this.context = null;
    this.width = 0;
    this.height = 0;
    this.devicePixelRatio = 1;
    this.particles = [];
    this.particlePool = [];
    this.frameId = null;
    this.lastFrameTime = 0;
    this.sparkleCounter = 0;
    this.enabled = false;
    this.mounted = false;

    this.cursor = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      hasPosition: false,
      visible: false,
    };
    this.touch = {
      active: false,
      pointerId: null,
      x: 0,
      y: 0,
      glowUntil: 0,
    };
    this.lastTrailPoint = {
      mouse: null,
      touch: null,
    };

    this.handleMotionChange = this.handleMotionChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.handlePointerCancel = this.handlePointerCancel.bind(this);
    this.handlePointerOut = this.handlePointerOut.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleWindowBlur = this.handleWindowBlur.bind(this);
    this.renderFrame = this.renderFrame.bind(this);
  }

  mount() {
    if (this.mounted) {
      return this;
    }

    this.mounted = true;
    addMediaListener(this.motionMedia, this.handleMotionChange);
    if (!this.motionMedia.matches) {
      this.enable();
    }

    return this;
  }

  enable() {
    if (this.enabled) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.className = "glitter-cursor-canvas";
    canvas.setAttribute("aria-hidden", "true");

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      throw new Error("GlitterCursor could not acquire a 2D canvas context.");
    }

    this.canvas = canvas;
    this.context = context;
    this.particles = [];
    this.particlePool = Array.from({ length: this.maxParticles }, () => ({}));
    document.body.append(canvas);

    this.enabled = true;
    this.resizeCanvas();
    window.addEventListener("resize", this.handleResize, { passive: true });
    window.addEventListener("pointermove", this.handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerdown", this.handlePointerDown, {
      passive: true,
    });
    window.addEventListener("pointerup", this.handlePointerUp, {
      passive: true,
    });
    window.addEventListener("pointercancel", this.handlePointerCancel, {
      passive: true,
    });
    window.addEventListener("touchstart", this.handleTouchStart, {
      passive: true,
    });
    window.addEventListener("touchmove", this.handleTouchMove, {
      passive: true,
    });
    window.addEventListener("touchend", this.handleTouchEnd, {
      passive: true,
    });
    window.addEventListener("touchcancel", this.handleTouchEnd, {
      passive: true,
    });
    window.addEventListener("blur", this.handleWindowBlur);
    document.addEventListener("pointerout", this.handlePointerOut);
    document.addEventListener(
      "visibilitychange",
      this.handleVisibilityChange,
    );
  }

  disable() {
    if (!this.enabled) {
      return;
    }

    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("pointermove", this.handlePointerMove);
    window.removeEventListener("pointerdown", this.handlePointerDown);
    window.removeEventListener("pointerup", this.handlePointerUp);
    window.removeEventListener("pointercancel", this.handlePointerCancel);
    window.removeEventListener("touchstart", this.handleTouchStart);
    window.removeEventListener("touchmove", this.handleTouchMove);
    window.removeEventListener("touchend", this.handleTouchEnd);
    window.removeEventListener("touchcancel", this.handleTouchEnd);
    window.removeEventListener("blur", this.handleWindowBlur);
    document.removeEventListener("pointerout", this.handlePointerOut);
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange,
    );

    if (this.frameId !== null) {
      window.cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }

    this.canvas?.remove();
    this.canvas = null;
    this.context = null;
    this.particles = [];
    this.particlePool = [];
    this.lastFrameTime = 0;
    this.cursor.visible = false;
    this.cursor.hasPosition = false;
    this.touch.active = false;
    this.touch.pointerId = null;
    this.lastTrailPoint.mouse = null;
    this.lastTrailPoint.touch = null;
    document.documentElement.classList.remove("glitter-cursor-active");
    this.enabled = false;
  }

  destroy() {
    if (this.mounted) {
      removeMediaListener(this.motionMedia, this.handleMotionChange);
      this.mounted = false;
    }
    this.disable();
  }

  handleMotionChange() {
    if (this.motionMedia.matches) {
      this.disable();
    } else if (this.mounted) {
      this.enable();
    }
  }

  handleResize() {
    this.resizeCanvas();
    this.requestFrame();
  }

  resizeCanvas() {
    if (!this.canvas || !this.context) {
      return;
    }

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.devicePixelRatio = Math.min(
      window.devicePixelRatio || 1,
      MAX_DEVICE_PIXEL_RATIO,
    );
    this.canvas.width = Math.max(
      1,
      Math.round(this.width * this.devicePixelRatio),
    );
    this.canvas.height = Math.max(
      1,
      Math.round(this.height * this.devicePixelRatio),
    );
    this.context.setTransform(
      this.devicePixelRatio,
      0,
      0,
      this.devicePixelRatio,
      0,
      0,
    );
  }

  handlePointerMove(event) {
    if (event.pointerType === "mouse") {
      this.moveMouse(event.clientX, event.clientY);
      return;
    }

    if (
      (event.pointerType === "touch" || event.pointerType === "pen") &&
      this.touch.active &&
      event.pointerId === this.touch.pointerId
    ) {
      this.moveTouch(event.clientX, event.clientY);
    }
  }

  handlePointerDown(event) {
    if (event.pointerType === "mouse") {
      this.moveMouse(event.clientX, event.clientY);
      return;
    }

    if (
      (event.pointerType === "touch" || event.pointerType === "pen") &&
      event.isPrimary
    ) {
      this.beginTouch(event.pointerId, event.clientX, event.clientY);
    }
  }

  handlePointerUp(event) {
    if (event.pointerId === this.touch.pointerId) {
      this.endTouch();
    }
  }

  handlePointerCancel(event) {
    if (event.pointerId === this.touch.pointerId) {
      this.endTouch();
    }
  }

  handlePointerOut(event) {
    if (
      event.pointerType === "mouse" &&
      !event.relatedTarget &&
      this.cursor.visible
    ) {
      this.cursor.visible = false;
      this.lastTrailPoint.mouse = null;
      document.documentElement.classList.remove("glitter-cursor-active");
      this.requestFrame();
    }
  }

  handleTouchStart(event) {
    if (!this.touch.active && event.changedTouches.length > 0) {
      const touch = event.changedTouches[0];
      this.beginTouch(null, touch.clientX, touch.clientY);
    }
  }

  handleTouchMove(event) {
    const touch = event.touches[0] || event.changedTouches[0];
    if (!touch) {
      return;
    }

    if (!this.touch.active) {
      this.touch.active = true;
      this.lastTrailPoint.touch = null;
    }
    this.moveTouch(touch.clientX, touch.clientY);
  }

  handleTouchEnd(event) {
    if (event.touches.length === 0) {
      this.endTouch();
    }
  }

  handleWindowBlur() {
    this.cursor.visible = false;
    this.touch.active = false;
    this.touch.pointerId = null;
    this.lastTrailPoint.mouse = null;
    this.lastTrailPoint.touch = null;
    document.documentElement.classList.remove("glitter-cursor-active");
    this.requestFrame();
  }

  handleVisibilityChange() {
    if (document.visibilityState === "hidden") {
      if (this.frameId !== null) {
        window.cancelAnimationFrame(this.frameId);
        this.frameId = null;
      }
      this.recycleParticles();
      this.lastFrameTime = 0;
      this.context?.clearRect(0, 0, this.width, this.height);
    } else {
      this.requestFrame();
    }
  }

  moveMouse(x, y) {
    if (!this.cursor.hasPosition) {
      this.cursor.x = x;
      this.cursor.y = y;
      this.cursor.hasPosition = true;
    }

    this.cursor.targetX = x;
    this.cursor.targetY = y;
    this.cursor.visible = true;
    document.documentElement.classList.add("glitter-cursor-active");
    this.emitTrail(x, y, "mouse");
    this.requestFrame();
  }

  beginTouch(pointerId, x, y) {
    this.touch.active = true;
    this.touch.pointerId = pointerId;
    this.touch.x = x;
    this.touch.y = y;
    this.lastTrailPoint.touch = null;
    this.moveTouch(x, y);
  }

  moveTouch(x, y) {
    this.touch.x = x;
    this.touch.y = y;
    this.touch.glowUntil = performance.now() + TOUCH_GLOW_LIFETIME;
    this.emitTrail(x, y, "touch");
    this.requestFrame();
  }

  endTouch() {
    this.touch.active = false;
    this.touch.pointerId = null;
    this.touch.glowUntil = performance.now() + TOUCH_GLOW_LIFETIME;
    this.lastTrailPoint.touch = null;
    this.requestFrame();
  }

  emitTrail(x, y, source) {
    const previous = this.lastTrailPoint[source];
    if (!previous) {
      this.lastTrailPoint[source] = { x, y };
      this.spawnParticle(x, y, source, 0, 0);
      return;
    }

    const deltaX = x - previous.x;
    const deltaY = y - previous.y;
    const distance = Math.hypot(deltaX, deltaY);
    this.lastTrailPoint[source] = { x, y };
    if (distance < 1.5) {
      return;
    }

    const directionX = deltaX / distance;
    const directionY = deltaY / distance;
    const spacing = source === "touch" ? 13 : 11;
    const steps = Math.min(8, Math.max(1, Math.ceil(distance / spacing)));
    for (let step = 1; step <= steps; step += 1) {
      const progress = step / steps;
      this.spawnParticle(
        previous.x + deltaX * progress,
        previous.y + deltaY * progress,
        source,
        directionX,
        directionY,
      );
    }
  }

  spawnParticle(x, y, source, directionX, directionY) {
    const limit =
      source === "touch" ? this.touchParticleLimit : this.maxParticles;
    if (this.particles.length >= limit) {
      return;
    }

    const particle = this.particlePool.pop();
    if (!particle) {
      return;
    }

    this.sparkleCounter += 1;
    const sparkleRate = source === "touch" ? 0.2 : 0.14;
    const isStar =
      Math.random() < sparkleRate || this.sparkleCounter % 17 === 0;
    const isHighlight = isStar && Math.random() < 0.12;
    const life = randomBetween(
      source === "touch" ? 0.52 : 0.48,
      PARTICLE_LIFETIME,
    );
    const drift = randomBetween(10, 30);

    particle.x = x;
    particle.y = y;
    particle.vx =
      -directionX * drift + randomBetween(-12, 12);
    particle.vy =
      -directionY * drift + randomBetween(-25, -5);
    particle.size = isHighlight
      ? randomBetween(4.2, 5.8)
      : isStar
        ? randomBetween(2.4, 4)
        : randomBetween(1.1, 2.6);
    particle.life = life;
    particle.maxLife = life;
    particle.color =
      PARTICLE_COLORS[
        Math.floor(Math.random() * PARTICLE_COLORS.length)
      ];
    particle.isStar = isStar;
    particle.rotation = randomBetween(-Math.PI, Math.PI);
    particle.rotationSpeed = randomBetween(-1.6, 1.6);
    particle.gravity = randomBetween(4, 14);
    particle.glow = isHighlight ? 12 : isStar ? 8 : 5;
    this.particles.push(particle);
  }

  recycleParticles() {
    this.particles.forEach((particle) => this.particlePool.push(particle));
    this.particles.length = 0;
  }

  requestFrame() {
    if (
      this.enabled &&
      document.visibilityState !== "hidden" &&
      this.frameId === null
    ) {
      this.frameId = window.requestAnimationFrame(this.renderFrame);
    }
  }

  renderFrame(now) {
    this.frameId = null;
    if (!this.enabled || !this.context) {
      return;
    }

    const deltaTime = this.lastFrameTime
      ? Math.min((now - this.lastFrameTime) / 1000, 0.05)
      : 1 / 60;
    this.lastFrameTime = now;
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.globalCompositeOperation = "lighter";

    let needsAnotherFrame = false;
    for (let index = 0; index < this.particles.length; ) {
      const particle = this.particles[index];
      particle.life -= deltaTime;

      if (particle.life <= 0) {
        this.particles[index] = this.particles[this.particles.length - 1];
        this.particles.pop();
        this.particlePool.push(particle);
        continue;
      }

      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;
      particle.vy += particle.gravity * deltaTime;
      particle.rotation += particle.rotationSpeed * deltaTime;
      this.drawParticle(particle, now);
      needsAnotherFrame = true;
      index += 1;
    }

    if (this.cursor.visible) {
      const differenceX = this.cursor.targetX - this.cursor.x;
      const differenceY = this.cursor.targetY - this.cursor.y;
      const ease = 1 - Math.exp(-deltaTime * 22);
      this.cursor.x += differenceX * ease;
      this.cursor.y += differenceY * ease;

      const isMoving =
        Math.abs(differenceX) > 0.12 || Math.abs(differenceY) > 0.12;
      if (!isMoving) {
        this.cursor.x = this.cursor.targetX;
        this.cursor.y = this.cursor.targetY;
      } else {
        needsAnotherFrame = true;
      }
      this.drawCursorGlow(this.cursor.x, this.cursor.y);
    }

    if (this.drawTouchGlow(now)) {
      needsAnotherFrame = true;
    }

    this.context.globalCompositeOperation = "source-over";
    if (needsAnotherFrame) {
      this.requestFrame();
    } else {
      this.lastFrameTime = 0;
    }
  }

  drawParticle(particle, now) {
    const lifeProgress = particle.life / particle.maxLife;
    const alpha = lifeProgress * lifeProgress;
    const size = particle.size * (0.18 + 0.82 * lifeProgress);
    const twinkle = particle.isStar
      ? 0.82 + Math.sin(now * 0.012 + particle.rotation) * 0.18
      : 1;

    this.context.save();
    this.context.globalAlpha = alpha * twinkle;
    this.context.fillStyle = particle.color;
    this.context.shadowColor = particle.color;
    this.context.shadowBlur = particle.glow * lifeProgress;

    if (particle.isStar) {
      this.drawFourPointStar(particle.x, particle.y, size, particle.rotation);
    } else {
      this.context.beginPath();
      this.context.arc(particle.x, particle.y, size, 0, Math.PI * 2);
      this.context.fill();
    }

    this.context.restore();
  }

  drawFourPointStar(x, y, size, rotation) {
    this.context.save();
    this.context.translate(x, y);
    this.context.rotate(rotation);
    this.context.beginPath();
    for (let point = 0; point < 8; point += 1) {
      const angle = -Math.PI / 2 + (point * Math.PI) / 4;
      const radius = point % 2 === 0 ? size : size * 0.22;
      const pointX = Math.cos(angle) * radius;
      const pointY = Math.sin(angle) * radius;
      if (point === 0) {
        this.context.moveTo(pointX, pointY);
      } else {
        this.context.lineTo(pointX, pointY);
      }
    }
    this.context.closePath();
    this.context.fill();
    this.context.restore();
  }

  drawCursorGlow(x, y) {
    this.drawRadialGlow(x, y, 42, 0.16);
    this.context.beginPath();
    this.context.arc(x, y, 7, 0, Math.PI * 2);
    this.context.strokeStyle = "rgba(255, 210, 122, 0.42)";
    this.context.lineWidth = 1;
    this.context.stroke();
    this.context.beginPath();
    this.context.arc(x, y, 2.4, 0, Math.PI * 2);
    this.context.fillStyle = "#FFB347";
    this.context.shadowColor = "#FF8A36";
    this.context.shadowBlur = 12;
    this.context.fill();
    this.context.shadowBlur = 0;
  }

  drawTouchGlow(now) {
    if (!this.touch.active && now >= this.touch.glowUntil) {
      return false;
    }

    const strength = this.touch.active
      ? 0.18
      : 0.18 * ((this.touch.glowUntil - now) / TOUCH_GLOW_LIFETIME);
    if (strength > 0) {
      this.drawRadialGlow(this.touch.x, this.touch.y, 54, strength);
    }
    return !this.touch.active && strength > 0.01;
  }

  drawRadialGlow(x, y, radius, strength) {
    const gradient = this.context.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(255, 138, 54, ${strength})`);
    gradient.addColorStop(0.38, `rgba(255, 179, 71, ${strength * 0.42})`);
    gradient.addColorStop(1, "rgba(255, 138, 54, 0)");
    this.context.fillStyle = gradient;
    this.context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
}

const glitterCursor = new GlitterCursor();
if (document.readyState === "complete") {
  window.requestAnimationFrame(() => glitterCursor.mount());
} else {
  window.addEventListener("load", () => glitterCursor.mount(), { once: true });
}
