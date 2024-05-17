const envPackager = {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig: (env) => {
    if (!env) return null;
    return {
      apiKey: env.VITE_API_KEY,
      authDomain: env.VITE_AUTH_DOMAIN,
      projectId: env.VITE_PROJECT_ID,
      storageBucket: env.VITE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_MESSAGING_SENDER_ID,
      appId: env.VITE_APP_ID,
      measurementId: env.VITE_MEASUREMENT_ID,
    }
  }
}

module.exports = envPackager;