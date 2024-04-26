module.exports = {
  apps: [
    {
      name: "Sourtech Server",
      script: "dist/main.js",
      cwd: "./apps/server",
    },
    {
      name: "Sourtech Client",
      script: "../../node_modules/next/dist/bin/next",
      args: "start",
      cwd: "./apps/client",
      env: {
        PORT: 3001
      }
    },
  ],
};
