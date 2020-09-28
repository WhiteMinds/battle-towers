import { useState, useCallback } from 'react'

export function useSwitch(initialState = false) {
  const [state, setState] = useState(initialState)

  const on = useCallback(() => setState(true), [])
  const off = useCallback(() => setState(false), [])
  const toggle = useCallback(() => setState((state) => !state), [])

  return {
    state,
    on,
    off,
    toggle,
  }
}
