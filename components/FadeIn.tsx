'use client'

import { createContext, useContext } from 'react'
import { m, useReducedMotion } from 'framer-motion'

const FadeInStaggerContext = createContext(false)

const viewport = { once: true, margin: '0px 0px -200px' }

export function FadeIn(
  props: React.ComponentPropsWithoutRef<typeof m.div>,
) {
  const shouldReduceMotion = useReducedMotion()
  const isInStaggerGroup = useContext(FadeInStaggerContext)

  return (
    <m.div
      variants={{
        hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: 'hidden',
            whileInView: shouldReduceMotion ? 'visible' : 'visible',
            viewport,
          })}
      {...props}
    />
  )
}

export function FadeInStagger({
  faster = false,
  ...props
}: React.ComponentPropsWithoutRef<typeof m.div> & { faster?: boolean }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <FadeInStaggerContext.Provider value={true}>
      <m.div
        initial="hidden"
        whileInView={shouldReduceMotion ? 'visible' : 'visible'}
        viewport={viewport}
        transition={{ staggerChildren: shouldReduceMotion ? 0 : (faster ? 0.12 : 0.2) }}
        {...props}
      />
    </FadeInStaggerContext.Provider>
  )
}