const FLY_MS = 700
const BUMP_MS = 420

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
}

function bumpCart(target) {
  target.classList.remove('cart-target-bump')
  void target.offsetWidth
  target.classList.add('cart-target-bump')
  window.setTimeout(() => target.classList.remove('cart-target-bump'), BUMP_MS)
}

export function flyToCart(sourceEl) {
  if (!sourceEl || prefersReducedMotion()) return

  const target = document.querySelector('[data-cart-target]')
  if (!target) return

  const from = sourceEl.getBoundingClientRect()
  const to = target.getBoundingClientRect()
  if (!from.width || !from.height) return

  const clone = sourceEl.cloneNode(true)
  clone.setAttribute('aria-hidden', 'true')
  clone.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'))

  Object.assign(clone.style, {
    position: 'fixed',
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
    margin: '0',
    zIndex: '80',
    pointerEvents: 'none',
    transformOrigin: 'center center',
    boxShadow: '0 18px 40px rgba(28, 22, 18, 0.22)',
  })

  document.body.appendChild(clone)

  const dx = to.left + to.width / 2 - (from.left + from.width / 2)
  const dy = to.top + to.height / 2 - (from.top + from.height / 2)
  const arc = Math.min(120, Math.abs(dy) * 0.25 + 48)

  sourceEl.classList.remove('fly-source-pulse')
  void sourceEl.offsetWidth
  sourceEl.classList.add('fly-source-pulse')
  window.setTimeout(() => sourceEl.classList.remove('fly-source-pulse'), 400)

  if (typeof clone.animate !== 'function') {
    clone.remove()
    bumpCart(target)
    return
  }

  const animation = clone.animate(
    [
      {
        transform: 'translate(0, 0) scale(1) rotate(0deg)',
        opacity: 1,
      },
      {
        transform: `translate(${dx * 0.45}px, ${dy * 0.2 - arc}px) scale(0.55) rotate(-8deg)`,
        opacity: 0.95,
        offset: 0.4,
      },
      {
        transform: `translate(${dx}px, ${dy}px) scale(0.12) rotate(12deg)`,
        opacity: 0.25,
      },
    ],
    {
      duration: FLY_MS,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'forwards',
    },
  )

  const finish = () => {
    clone.remove()
    bumpCart(target)
  }

  if (animation.finished) {
    animation.finished.then(finish).catch(() => clone.remove())
  } else {
    animation.onfinish = finish
  }
}
