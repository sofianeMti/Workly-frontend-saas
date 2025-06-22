import React from "react";
import { Label } from "../common/Label";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { useForm } from "react-hook-form";
import { User } from "../../hooks/useSession";
import { BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileForm() {
  const { session } = User();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: session?.user?.name || "",
      lastName: session?.user?.lastName || "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Ici, vous pourriez implémenter la logique pour mettre à jour le profil
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4 h-full w-full flex-col p-4 border rounded-2xl">
        <div>
          <Label
            htmlFor="name"
            className="text-sm font-medium text-foreground dark:text-foreground"
          >
            Prénom
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            defaultValue={session?.user?.name}
            autoComplete="name"
            placeholder="Votre prénom"
            className="mt-2"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label
            htmlFor="lastName"
            className="text-sm font-medium text-foreground dark:text-foreground"
          >
            Nom
          </Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={session?.user?.lastName}
            autoComplete="family-name"
            placeholder="Votre nom"
            className="mt-2"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="mt-2 text-sm text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className="flex gap-4 h-full w-full flex-col">
          <Label
            htmlFor="email"
            className="font-medium text-foreground dark:text-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Email</span>
              <BadgeCheck className="h-4 w-4" />
            </div>
          </Label>
          <p>{session?.user?.email}</p>
        </div>
        <div className="flex justify-between gap-4 h-full">
          <div className="flex gap-4">
            <Button
              variant="ghost"
              type="button"
              className="mt-4 py-2 font-medium"
              onClick={() => navigate("/account/change-password")}
            >
              Modifier le mot de passe
            </Button>
            <Button
              variant="ghost"
              type="button"
              className="mt-4 py-2 font-medium"
              onClick={() => navigate("/account/change-email")}
            >
              Modifier l'adresse mail
            </Button>
          </div>
          <div>
            <Button
              variant="default"
              type="submit"
              className="mt-4 py-2 font-medium"
              disabled={isSubmitting}
            >
              Sauvegarder
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
