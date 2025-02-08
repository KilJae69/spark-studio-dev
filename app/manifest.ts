import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Spark Studio | Web Apps Development Agency',
    short_name: 'Spark Studio',
    description: 'Welcome to Spark Studio, a leading web development agency combining cutting-edge design and technology to deliver bespoke solutions. Discover how we can bring your digital vision to life. ',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#1E293B',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}