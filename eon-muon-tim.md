tf: t => t
tf: t => 2 * (t - 2 * Math.max(0, t - 0.5)),
tf: t => 1 - 4 * (t - 0.5)* (t - 0.5),
tf: t => 1,
tf: t => Math.sin(Math.PI * t / 2)
tf: t => Math.pow(t, 2)