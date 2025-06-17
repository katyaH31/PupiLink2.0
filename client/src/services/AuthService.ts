import Collections from "../enums/Collections";
import User from "../models/User";
import pb from "../server/Connection";

class AuthService {
  async login(email: string, password: string): Promise<boolean> {
    return await pb
      .collection(Collections.USERS)
      .authWithPassword(email, password)
      .then(() => pb.authStore.isValid);
  }

  async loginWithGoogle(): Promise<boolean> {
    const provider = "google";
    const redirectUrl = window.location.origin + "/oauth-callback"; // Debes crear esta ruta en tu frontend

    
    await pb.collection(Collections.USERS).authWithOAuth2({ provider, url: redirectUrl });

  
    return pb.authStore.isValid;
  }

  // Function to change password
  async changePassword(
    email: string,
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> {
    return await pb
      .collection(Collections.USERS)
      .requestPasswordReset(email, { oldPassword, newPassword });
  }

  logout() {
    pb.authStore.clear();
  }

  isLoggedIn(): boolean {
    const data = pb.authStore.isValid;
    return data;
  }

  getUserData(): User {
    const data = pb.authStore.model as User;
    return data;
  }
}

export default new AuthService();
