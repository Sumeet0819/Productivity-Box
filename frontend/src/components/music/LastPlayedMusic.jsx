import React from 'react'
import { Heart, Play, SkipBack, SkipForward } from 'lucide-react'

const LastPlayedMusic = () => {
  return (
    <div className="rounded-[2rem] bg-[var(--surface-container-lowest)] p-6 shadow-[var(--shadow-focus)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.75rem] uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">
            Last played
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--on-surface)]">
            Blooming Moon
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
            Aria Green · Dreamfolk Session
          </p>
        </div>
        <button className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] transition hover:bg-[var(--surface-container-lowest)]">
          <Heart size={18} />
        </button>
      </div>

      <div className="mt-6 flex items-center gap-4 rounded-[1.75rem] bg-[var(--surface-container-low)] p-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-[rgba(0,106,60,0.08)] text-[var(--primary)]">
          <span className="text-3xl">♫</span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--on-surface)]">Forest Nights</p>
          <p className="mt-2 text-xs text-[var(--on-surface-variant)]">
            Relaxed acoustic track with warm piano and soft percussion.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface)]">
          <div className="h-full w-3/5 rounded-full bg-[var(--primary)]" />
        </div>
        <div className="mt-3 flex items-center justify-between text-[0.75rem] text-[var(--on-surface-variant)]">
          <span>1:46</span>
          <span>3:32</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] transition hover:bg-[var(--surface-container-lowest)]">
          <SkipBack size={18} />
        </button>
        <button className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-[0_30px_60px_rgba(0,106,60,0.18)] transition hover:bg-[var(--primary-container)]">
          <Play size={20} />
        </button>
        <button className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] transition hover:bg-[var(--surface-container-lowest)]">
          <SkipForward size={18} />
        </button>
      </div>
    </div>
  )
}

export default LastPlayedMusic
