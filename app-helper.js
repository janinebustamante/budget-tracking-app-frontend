module.exports = {
  // API_URL: "http://localhost:4000",
  // API_URL: "https://peaceful-wildwood-93426.herokuapp.com/",
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  colorRandomizer: () => {
    return Math.floor(Math.random() * 16777215).toString(16);
  },
  // API_URL: process.env.NEXT_PUBLIC_API_URL,
  // getAccessToken: () => localStorage.getItem('token'),
  // toJSON: (response) => response.json()
};
