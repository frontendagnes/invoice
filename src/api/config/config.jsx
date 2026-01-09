export const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_APIKEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
};

export const firebaseConfigTest = {
  apiKey: import.meta.env.VITE_APP_TEST_APIKEY,
  authDomain: import.meta.env.VITE_APP_TEST_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_TEST_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_APP_TEST_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_TEST_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_TEST_APP_ID,
};
