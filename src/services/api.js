const API_BASE_URL = '/api/v1';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/users/register', {
      method: 'POST',
      body: userData,
    });
  }

  async login(username, email, password) {
    return this.request('/users/login', {
      method: 'POST',
      body: { username, email, password },
    });
  }

  async logout() {
    return this.request('/users/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request('/users/current-user', {
      method: 'POST',
    });
  }

  async verifyEmail(token) {
    return this.request(`/users/verify-email/${token}`, {
      method: 'GET',
    });
  }

  async resendEmailVerification() {
    return this.request('/users/resend-email-verification', {
      method: 'POST',
    });
  }

  async refreshAccessToken() {
    return this.request('/users/refresh-access-token', {
      method: 'POST',
    });
  }

  async changePassword(oldPassword, newPassword) {
    return this.request('/users/change-password', {
      method: 'POST',
      body: { oldPassword, newPassword },
    });
  }

  async forgotPassword(email) {
    return this.request('/users/forgot-password', {
      method: 'POST',
      body: { email },
    });
  }

  async resetPassword(token, newPassword) {
    return this.request(`/users/reset-password/${token}`, {
      method: 'POST',
      body: { newPassword },
    });
  }
}

export const apiService = new ApiService();