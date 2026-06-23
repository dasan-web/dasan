module.exports = {
  apps: [
    {
      name: 'dasan-homepage',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 'max', // Runs in cluster mode using all CPU cores
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        DB_HOST: 'localhost',
        DB_PORT: 3306,
        DB_USER: 'root',
        DB_PASSWORD: 'ektks0518!',
        DB_DATABASE: 'dasan_homepage',
      },
    },
  ],
};
