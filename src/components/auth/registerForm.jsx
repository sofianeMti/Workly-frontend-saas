import * as React from "react";
import { useForm } from "react-hook-form";

import { registerUser } from "../../api/userApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm();

  // Pour vérifier que les mots de passe correspondent
  const password = watch("password");

  const onSubmit = async (formData) => {
    try {
      const registerData = {
        email: formData.email,
        name: formData.name,
        lastName: formData.lastName,
        password: formData.password,
        passwordConfirmation: formData.passwordConfirm,
      };
      await registerUser(registerData);
    } catch (err) {
      setFormError("root", {
        type: "manual",
        message: err.message || "Erreur lors de l'inscription",
      });
      console.error(err);
    }
  };

  return (
    <form
      action="#"
      method="post"
      className="mt-6 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <div className="grid grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="name-register-04"
            className="text-sm font-medium text-foreground dark:text-foreground"
          >
            Prénom
          </Label>
          <Input
            type="text"
            id="name-login-04"
            name="name-login-04"
            autoComplete="name"
            placeholder="ephraim@blocks.so"
            className="mt-2"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label
            htmlFor="lastName-register-04"
            className="text-sm font-medium text-foreground dark:text-foreground"
          >
            Nom
          </Label>
          <Input
            type="text"
            id="lastName-login-04"
            name="lastName-login-04"
            autoComplete="lastName"
            placeholder="ephraim@blocks.so"
            className="mt-2"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="mt-2 text-sm text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div> */}
      <div>
        <Label
          htmlFor="email-register-04"
          className="text-sm font-medium text-foreground dark:text-foreground"
        >
          Email
        </Label>
        <Input
          type="email"
          id="email-login-04"
          name="email-login-04"
          autoComplete="email"
          placeholder="ephraim@blocks.so"
          className="mt-2"
          {...register("email", {
            required: "Email est requis",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email invalide",
            },
          })}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Label
          htmlFor="password-login-04"
          className="text-sm font-medium text-foreground dark:text-foreground"
        >
          Mot de passe
        </Label>
        <Input
          type="password"
          id="password-login-04"
          name="password-login-04"
          autoComplete="password"
          placeholder="********"
          className="mt-2"
          {...register("password", {
            required: "Mot de passe est requis",
            minLength: {
              value: 6,
              message: "Le mot de passe doit contenir au moins 8 caractères",
            },
          })}
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="mt-4 w-full py-2 font-medium"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
      </Button>
    </form>
  );
};

export default RegisterForm;
