/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodburl: "mongodb+srv://movie:99256188@movie.mp36rv4.mongodb.net/?retryWrites=true&w=majority",
},

  images: {
    domains: ['localhost']
  },

}

module.exports = nextConfig
