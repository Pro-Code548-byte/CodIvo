export const btn =
  'inline-block cursor-pointer select-none rounded-[12px] border-2 px-6 py-2.5 text-base font-extrabold no-underline transition-all duration-100 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none'

export const btnPrimary = `${btn} border-primary-hover bg-primary text-white shadow-[0_4px_0_0_var(--color-primary-hover)] enabled:hover:-translate-y-0.5 enabled:hover:brightness-105 enabled:hover:shadow-[0_5px_0_0_var(--color-primary-hover)]`

export const btnAccent = `${btn} border-accent-hover bg-accent text-white shadow-[0_4px_0_0_var(--color-accent-hover)] enabled:hover:-translate-y-0.5 enabled:hover:brightness-105 enabled:hover:shadow-[0_5px_0_0_var(--color-accent-hover)]`

export const btnOutline = `${btn} border-surface-2 bg-bg text-ink shadow-[0_4px_0_0_var(--color-surface-2)] enabled:hover:-translate-y-0.5 enabled:hover:border-primary enabled:hover:shadow-[0_5px_0_0_var(--color-primary)]`

export const btnGhost = `${btn} border-transparent bg-transparent text-muted shadow-none enabled:hover:text-ink`

export const btnSm = 'px-3.5 py-1.5 text-sm shadow-[0_3px_0_0_var(--color-primary-hover)]'
