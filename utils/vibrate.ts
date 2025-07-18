export function safeVibrate(pattern: number | number[] = 200): void {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(pattern)
    } catch (error) {
      console.warn("Vibration not supported or failed:", error)
    }
  }
}

export function vibratePattern(type: "success" | "error" | "warning" | "notification"): void {
  const patterns = {
    success: [100, 50, 100],
    error: [200, 100, 200, 100, 200],
    warning: [150, 100, 150],
    notification: [50, 50, 50],
  }

  safeVibrate(patterns[type])
}
