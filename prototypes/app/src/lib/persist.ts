/** Session persistence so an accidental refresh mid-demo keeps state.
 *  "Reset demo" in the sidebar clears everything deliberately. */
export function load<T>(key: string, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function save(key: string, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable — demo still works, just not refresh-proof */
  }
}
