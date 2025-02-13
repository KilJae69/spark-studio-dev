const API_URL = process.env.FILAMENT_API_URL;
    const API_KEY = process.env.FILAMENT_API_KEY;

export async function getLocalizedPosts(locale: string) {
    
    try {
      const res = await fetch(`${API_URL}/api/v1/posts`, {
        method: 'GET',
        headers: {
          'Accept-Language': locale, // Language selection
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`, 
        },
      });
  
      if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.statusText}`);
      }
  
      return await res.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
export async function getLocalizedCaseStudies(locale: string) {
    
    try {
      const res = await fetch(`${API_URL}/api/v1/case-studies`, {
        method: 'GET',
        headers: {
          'Accept-Language': locale, // Language selection
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`, 
        },
      });
  
      if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.statusText}`);
      }
  
      return await res.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }


  export async function getLocalizedPost(locale: string, slug: string) {

    try {
      const res = await fetch(`${API_URL}/api/v1/posts/${slug}`, {
        method: 'GET',
        headers: {
          'Accept-Language': locale, // Language selection
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`, 
        },
      });
  
      if (!res.ok) {
        throw new Error(`Failed to fetch post: ${res.statusText}`);
      }
  
      return await res.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  export async function getLocalizedCaseStudy(locale: string, slug: string) {

    try {
      const res = await fetch(`${API_URL}/api/v1/case-studies/${slug}`, {
        method: 'GET',
        headers: {
          'Accept-Language': locale, // Language selection
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`, 
        },
      });
  
      if (!res.ok) {
        throw new Error(`Failed to fetch post: ${res.statusText}`);
      }
  
      return await res.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }