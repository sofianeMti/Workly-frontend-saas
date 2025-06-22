import React from "react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function PasswordForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Ici, vous pourriez implémenter la logique pour mettre à jour le mot de passe
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4 h-full w-full flex-col">
        <h2 className="text-xl font-semibold mb-4">
          Modifier votre mot de passe
        </h2>

        <div>
          <Label
            htmlFor="currentPassword"
            className="text-sm font-medium text-foreground dark:text-foreground"
          >
            Mot de passe actuel
          </Label>
          <Input
            type="password"
            id="currentPassword"
            className="mt-2"
            {...register("currentPassword", {
              required: "Le mot de passe actuel est requis",
            })}
          />
          {errors.currentPassword && (
            <p className="mt-2 text-sm text-red-500">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="newPassword"
            className="text-sm font-medium text-foreground dark:text-foreground"
          >
            Nouveau mot de passe
          </Label>
          <Input
            type="password"
            id="newPassword"
            className="mt-2"
            {...register("newPassword", {
              required: "Le nouveau mot de passe est requis",
              minLength: {
                value: 8,
                message: "Le mot de passe doit contenir au moins 8 caractères",
              },
            })}
          />
          {errors.newPassword && (
            <p className="mt-2 text-sm text-red-500">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-foreground dark:text-foreground"
          >
            Confirmer le nouveau mot de passe
          </Label>
          <Input
            type="password"
            id="confirmPassword"
            className="mt-2"
            {...register("confirmPassword", {
              required: "Veuillez confirmer votre mot de passe",
              validate: (value) =>
                value === watch("newPassword") ||
                "Les mots de passe ne correspondent pas",
            })}
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex justify-between gap-4 h-full mt-4">
          <Button
            variant="ghost"
            type="button"
            className="py-2 font-medium"
            onClick={() => navigate("/dashboard/account")}
          >
            Retour
          </Button>
          <Button
            variant="default"
            type="submit"
            className="py-2 font-medium"
            disabled={isSubmitting}
          >
            Mettre à jour le mot de passe
          </Button>
        </div>
      </div>
    </form>
  );
}
