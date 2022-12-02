let instances = process.env.ASM_APP_INSTANCE
  ? parseInt(process.env.ASM_APP_INSTANCE, 10)
  : 2;

if (instances > 16) {
  instances = 16;
} else if (instances < 1) {
  instances = 1;
}

module.exports = {
  apps: [
    {
      name: 'http',
      script: './app-http.js',
      instances,
      output: '/dev/stdout',
      error: '/dev/stderr',
      max_memory_restart: '256M',
    },
    {
      name: 'worker',
      output: '/dev/stdout',
      error: '/dev/stderr',
      script: './app-worker.js',
      instances: 1,
    },
  ],
};
