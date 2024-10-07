const axiosInstance = axios.create({
  baseURL: 'https://mern-site-z5gs.onrender.com',
  withCredentials: true, // Send cookies with every request
});

axiosInstance.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Adjust as necessary
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
