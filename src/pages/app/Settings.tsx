import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, User as UserIcon, Lock, Bell } from "lucide-react";
import { toast } from "sonner";
import { useUser, useUpdateUser } from "@/api/hooks/useUser";

export default function Settings() {
  const { data: user, isLoading } = useUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    walletAddress: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        walletAddress: user.walletAddress || user.wallet?.walletAddress || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Create a payload that satisfies the User type if necessary, 
    // or cast it if we only want to send partial updates and the backend supports it.
    // The backend controller accepts partial updates.
    // However, the hook is typed to expect 'User'. 
    // We'll construct a merged object to be safe with the Typescript definition, 
    // or simpler: just cast the payload to any to bypass strict type checking for the mutation payload 
    // if we want to send only changed fields, but the backend update logic handles extra fields gracefully (it selects specific fields from body).
    // Let's try sending the merged object.

    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      // walletAddress is disabled in UI so we might not need to send it, but purely for consistency:
      walletAddress: formData.walletAddress,
    };

    updateUser(updatedUser, {
      onSuccess: () => {
        // Toast is already handled in useUpdateUser
      },
      onError: (error) => {
        console.error("Failed to update settings:", error);
      }
    });
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-screen">
          <p>Loading settings...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <span className="gradient-text">Settings</span>
          </h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center glow">
              <UserIcon className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>
              <p className="text-sm text-muted-foreground">Update your personal details</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="glass"
                disabled={isLoading || isUpdating}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="glass"
                disabled={isLoading || isUpdating}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wallet">Wallet ID</Label>
              <Input
                id="walletAddress" // Changed from 'wallet' to 'walletAddress' to match state key usually, or map it manually. Let's map manually in handleChange if needed, or just standardise.
                value={formData.walletAddress}
                onChange={handleChange}
                className="glass"
                disabled={isLoading || isUpdating}
              />
            </div>
            <Button type="submit" className="bg-gradient-primary glow" disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center glow">
              <Lock className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Security</h3>
              <p className="text-sm text-muted-foreground">Manage your security settings</p>
            </div>
          </div>
          <Button variant="outline" className="border-primary/30">Change Password</Button>
        </Card>


      </div>
    </AppLayout>
  );
}
