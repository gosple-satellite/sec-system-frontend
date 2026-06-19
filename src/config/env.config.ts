// ============================================================
// Environment Configuration
// ============================================================

interface AppConfig {
  apiBaseUrl: string;
  appName: string;
  appVersion: string;
  appEnv: 'development' | 'staging' | 'production';
  isDevelopment: boolean;
  isProduction: boolean;
}

const config: AppConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  appName: import.meta.env.VITE_APP_NAME || 'RCCG Security Management System',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  appEnv: (import.meta.env.VITE_APP_ENV as AppConfig['appEnv']) || 'development',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export default config;
