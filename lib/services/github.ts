// lib/services/github.ts
export const githubApi = {
    async getUserData(token: string) {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    },
  
    async getRepositories(token: string) {
      const response = await fetch('https://api.github.com/user/repos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    },
  
}