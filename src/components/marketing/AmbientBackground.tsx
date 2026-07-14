export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="zephipay-ambient pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div className="zephipay-ambient-directional-light" />
      <div className="zephipay-ambient-hero-halo" />
      <div className="zephipay-ambient-steel-reflection" />

      <div className="zephipay-ambient-orb zephipay-ambient-orb-primary" />
      <div className="zephipay-ambient-orb zephipay-ambient-orb-secondary" />

      <div className="zephipay-ambient-horizon" />
      <div className="zephipay-ambient-grid" />
      <div className="zephipay-ambient-vignette" />
    </div>
  );
}
