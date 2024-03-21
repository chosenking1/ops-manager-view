const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://task-manager-api-production-e771.up.railway.app'
  : 'http://localhost:8000';

// const apiUrl = 'https://task-manager-api-production-e771.up.railway.app'
export default apiUrl;

