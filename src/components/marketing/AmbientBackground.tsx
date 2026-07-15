export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="zephipay-environment pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div className="zephipay-environment-base" />

      <div className="zephipay-environment-scene zephipay-environment-morning">
        <div className="zephipay-environment-morning-coral" />
        <div className="zephipay-environment-morning-gold" />
        <div className="zephipay-environment-morning-blue" />

        <div className="zephipay-cloud-field zephipay-cloud-field-morning">
          <span className="zephipay-cloud-layer zephipay-cloud-layer-a" />
          <span className="zephipay-cloud-layer zephipay-cloud-layer-b" />
          <span className="zephipay-cloud-layer zephipay-cloud-layer-c" />
        </div>
      </div>

      <div className="zephipay-environment-scene zephipay-environment-day">
        <div className="zephipay-environment-day-light" />
        <div className="zephipay-environment-day-blue" />

        <div className="zephipay-cloud-field zephipay-cloud-field-day">
          <span className="zephipay-cloud-layer zephipay-cloud-layer-a" />
          <span className="zephipay-cloud-layer zephipay-cloud-layer-b" />
          <span className="zephipay-cloud-layer zephipay-cloud-layer-c" />
        </div>
      </div>

      <div className="zephipay-environment-scene zephipay-environment-evening">
        <div className="zephipay-environment-evening-coral" />
        <div className="zephipay-environment-evening-pink" />
        <div className="zephipay-environment-evening-violet" />
        <div className="zephipay-environment-evening-horizon" />

        <div className="zephipay-cloud-field zephipay-cloud-field-evening">
          <span className="zephipay-cloud-layer zephipay-cloud-layer-a" />
          <span className="zephipay-cloud-layer zephipay-cloud-layer-b" />
          <span className="zephipay-cloud-layer zephipay-cloud-layer-c" />
        </div>
      </div>

      <div className="zephipay-environment-scene zephipay-environment-night">
        <div className="zephipay-environment-night-blue" />
        <div className="zephipay-environment-night-cyan" />

        <div className="zephipay-cloud-field zephipay-cloud-field-night">
          <span className="zephipay-cloud-layer zephipay-cloud-layer-a" />
          <span className="zephipay-cloud-layer zephipay-cloud-layer-b" />
          <span className="zephipay-cloud-layer zephipay-cloud-layer-c" />
        </div>
      </div>

      <div className="zephipay-environment-grid" />
      <div className="zephipay-environment-vignette" />
    </div>
  );
}
