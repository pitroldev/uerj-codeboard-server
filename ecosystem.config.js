module.exports = {
  apps: [
    {
      name: "server",
      script: "./dist/server.js",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      // error_file: "/var/log/pm2/server_error.log",
      // out_file: "/var/log/pm2/server_out.log",
      exec_mode: "cluster",
      instances: "max",
    },
  ],
};
