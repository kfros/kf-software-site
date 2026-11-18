declare module "*/payday-balance/engine.js" {
  const Engine: Record<string, unknown>;
  export default Engine;
}

declare module "*/payday-balance/telemetry.js" {
  const Telemetry: Record<string, unknown>;
  export default Telemetry;
}

declare module "*/payday-balance/app.js" {
  const AppController: {
    mountPaydayCalculator: (options?: Record<string, unknown>) => () => void;
  };
  export default AppController;
}
