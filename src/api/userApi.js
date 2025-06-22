import { authClient } from "../lib/auth";

export async function loginUser(formData, rememberMe = false) {
  try {
    const { data, error } = await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
        callbackURL: "/dashboard",
        rememberMe: rememberMe,
      },
      {
        // Vous pouvez ajouter des callbacks ici si nécessaire
      }
    );

    if (error) {
      throw new Error(error.message || "Erreur de connexion");
    }

    return data;
  } catch (err) {
    throw new Error(err.message || "Erreur de connexion");
  }
}

export async function logoutUser() {
  try {
    const { error } = await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          console.log("logout");
          router.push("/");
        },
      },
    });
    console.log(error);
    if (error) {
      throw new Error(error.message || "Erreur lors de la déconnexion");
    }
    return true;
  } catch (err) {
    throw new Error(err.message || "Erreur lors de la déconnexion");
  }
}

export async function getCurrentUser() {
  try {
    const { data, error } = await authClient.getSession();
    if (error) {
      return null;
    }
    return data?.user || null;
  } catch (err) {
    return null;
  }
}

export async function registerUser(formData) {
  try {
    console.log(formData, "register");
    // Format selon la documentation Better Auth
    const { data, error } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      // Supprimer passwordConfirmation car non supporté par l'API
      callbackURL: "/dashboard",
    });
    console.log(data, error);

    if (error) {
      throw new Error(error.message || "Erreur lors de l'inscription");
    }

    return data;
  } catch (err) {
    throw new Error(err.message || "Erreur lors de l'inscription");
  }
}

export async function updateUserProfile(formData) {
  try {
    console.log(formData, "update profile");
    // Utiliser l'API Better Auth pour mettre à jour le profil utilisateur
    const { data, error } = await authClient.updateUser({
      name: formData.name,
      lastName: formData.lastName,
      phone: formData.phone,
    });

    if (error) {
      throw new Error(
        error.message || "Erreur lors de la mise à jour du profil"
      );
    }

    return data;
  } catch (err) {
    throw new Error(err.message || "Erreur lors de la mise à jour du profil");
  }
}
