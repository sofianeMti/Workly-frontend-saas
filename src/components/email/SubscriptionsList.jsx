import React, { useState } from "react";
import { Button } from "../common/Button";
import { Check, X, Edit2, Loader2, Calendar, CreditCard } from "lucide-react";
import { Input } from "../common/Input";
import { Label } from "../common/Label";

export default function SubscriptionsList({ subscriptions = [], isLoading = false, onSave }) {
  const [editedSubscriptions, setEditedSubscriptions] = useState(subscriptions);
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Si les abonnements changent (par exemple, lors du chargement initial), mettre à jour l'état local
  React.useEffect(() => {
    setEditedSubscriptions(subscriptions);
  }, [subscriptions]);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleChange = (id, field, value) => {
    setEditedSubscriptions(
      editedSubscriptions.map((sub) =>
        sub.id === id ? { ...sub, [field]: value } : sub
      )
    );
  };

  const handleAccept = (id) => {
    setEditedSubscriptions(
      editedSubscriptions.map((sub) =>
        sub.id === id ? { ...sub, status: "accepted" } : sub
      )
    );
  };

  const handleReject = (id) => {
    setEditedSubscriptions(
      editedSubscriptions.map((sub) =>
        sub.id === id ? { ...sub, status: "rejected" } : sub
      )
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Filtrer uniquement les abonnements acceptés
      const acceptedSubscriptions = editedSubscriptions.filter(
        (sub) => sub.status === "accepted"
      );
      
      await onSave(acceptedSubscriptions);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des abonnements:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium">Analyse de vos emails en cours...</p>
        <p className="text-sm text-muted-foreground mt-2">
          Nous recherchons vos abonnements dans votre boîte mail.
          <br />
          Cela peut prendre quelques minutes.
        </p>
      </div>
    );
  }

  if (editedSubscriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <p className="text-lg font-medium">Aucun abonnement détecté</p>
        <p className="text-sm text-muted-foreground mt-2">
          Nous n'avons pas trouvé d'abonnements dans vos emails.
          <br />
          Vous pouvez ajouter des abonnements manuellement.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {editedSubscriptions.length} abonnements détectés
        </h2>
        <Button
          onClick={handleSave}
          disabled={isSaving || editedSubscriptions.filter(s => s.status === "accepted").length === 0}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Enregistrement...
            </>
          ) : (
            "Enregistrer les abonnements"
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {editedSubscriptions.map((subscription) => (
          <div
            key={subscription.id}
            className={`border rounded-lg p-4 ${
              subscription.status === "accepted"
                ? "border-green-200 bg-green-50"
                : subscription.status === "rejected"
                ? "border-red-200 bg-red-50"
                : "border-gray-200"
            }`}
          >
            {editingId === subscription.id ? (
              <div className="flex flex-col gap-3">
                <div>
                  <Label htmlFor={`name-${subscription.id}`}>Nom</Label>
                  <Input
                    id={`name-${subscription.id}`}
                    value={subscription.name}
                    onChange={(e) =>
                      handleChange(subscription.id, "name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`amount-${subscription.id}`}>Montant</Label>
                  <Input
                    id={`amount-${subscription.id}`}
                    type="number"
                    step="0.01"
                    value={subscription.amount}
                    onChange={(e) =>
                      handleChange(
                        subscription.id,
                        "amount",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`billingCycle-${subscription.id}`}>
                    Cycle de facturation
                  </Label>
                  <select
                    id={`billingCycle-${subscription.id}`}
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={subscription.billingCycle}
                    onChange={(e) =>
                      handleChange(
                        subscription.id,
                        "billingCycle",
                        e.target.value
                      )
                    }
                  >
                    <option value="monthly">Mensuel</option>
                    <option value="quarterly">Trimestriel</option>
                    <option value="yearly">Annuel</option>
                  </select>
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingId(null)}
                  >
                    Terminer
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{subscription.name}</h3>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(subscription.id)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-600 hover:text-green-700"
                      onClick={() => handleAccept(subscription.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleReject(subscription.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <CreditCard className="h-4 w-4" />
                  <span>{subscription.amount.toFixed(2)} €</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {subscription.billingCycle === "monthly"
                      ? "Mensuel"
                      : subscription.billingCycle === "quarterly"
                      ? "Trimestriel"
                      : "Annuel"}
                  </span>
                </div>
                {subscription.detectedFrom && (
                  <div className="mt-2 text-xs text-gray-500">
                    Détecté dans: {subscription.detectedFrom}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
