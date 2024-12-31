module.exports = {
  apps: [
    {
      max_restarts: 5,
      name: "server",
      script: "./dist/server.js",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      // error_file: "/var/log/pm2/server_error.log",
      // out_file: "/var/log/pm2/server_out.log",
      exec_mode: "cluster",
      instances: "max",
      // combine_logs: true,
    },
  ],
};
