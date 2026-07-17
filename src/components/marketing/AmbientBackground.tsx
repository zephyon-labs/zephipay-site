export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="zephipay-atmosphere-v2 pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div className="zephipay-atmosphere-v2-scene zephipay-atmosphere-v2-morning" />
      <div className="zephipay-atmosphere-v2-scene zephipay-atmosphere-v2-day" />
      <div className="zephipay-atmosphere-v2-scene zephipay-atmosphere-v2-evening" />
      <div className="zephipay-atmosphere-v2-scene zephipay-atmosphere-v2-night" />

      <div className="zephipay-atmosphere-v2-grid" />
      <div className="zephipay-atmosphere-v2-vignette" />
    </div>
  );
}
