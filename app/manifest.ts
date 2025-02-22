import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Spark Studio | Agencija za Web Razvoj',
    short_name: 'Spark Studio',
    description: 'Dobrodošli u Spark Studio, vodeću agenciju za web razvoj koja spaja savremeni dizajn i tehnologiju za izradu prilagođenih rješenja. Otkrijte kako možemo oživjeti vašu digitalnu viziju.',
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