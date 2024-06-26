module.exports = {
  apps: [
    {
      name: "Safetrade Server",
      script: "dist/main.js",
      cwd: "./apps/server",
      instances: "max",
      exec_mode: "cluster",
    },
    {
      name: "Safetrade Client",
      script: "../../node_modules/next/dist/bin/next",
      args: "start",
      cwd: "./apps/client",
      instances: "max",
      exec_mode: "cluster",
      env: {
        PORT: 3001,
      },
    },
  ],
};
