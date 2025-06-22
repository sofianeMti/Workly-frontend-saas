"use client";

import * as React from "react";
import { Button } from "../components/ui/Button";
import { Separator } from "../components/ui/Separator";
import { GitHubIcon, GoogleIcon } from "../components/ui/Icons";
import RegisterForm from "../components/auth/registerForm";

export default function SignupPage() {
  return (
    <main>
      <div className="flex h-screen">
        <div className="w-1/2 flex items-center justify-center">
          <div className="flex items-center justify-center min-h-screen">
            <div className="sm:mx-auto sm:max-w-3xl w-full px-4">
              <h3 className="text-2xl font-semibold text-foreground dark:text-foreground">
                Créez votre compte
              </h3>
              <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                Prenez quelques instants pour vous inscrire
              </p>
              {/* <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground">
            Vous n'avez pas de compte ?{" "}
            <a
              href="/signup"
              className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90"
            >
              Inscription
            </a>
          </p> */}
              <div className="mt-8 flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button
                  variant="outline"
                  className="flex-1 items-center justify-center space-x-2 py-2"
                  asChild
                >
                  <a href="#">
                    <GitHubIcon className="size-5" aria-hidden={true} />
                    <span className="text-sm font-medium">
                      Connexion avec GitHub
                    </span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="mt-2 flex-1 items-center justify-center space-x-2 py-2 sm:mt-0"
                  asChild
                >
                  <a href="#">
                    <GoogleIcon className="size-4" aria-hidden={true} />
                    <span className="text-sm font-medium">
                      Connexion avec Google
                    </span>
                  </a>
                </Button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    ou
                  </span>
                </div>
              </div>
              <RegisterForm />
            </div>
          </div>
        </div>
        <div className="w-1/2 p-5 flex items-center min-h-screen justify-center">
          <div className="flex p-6 items-center justify-center bg-red-500 w-full h-full rounded-lg"></div>
        </div>
      </div>
    </main>
  );
}
