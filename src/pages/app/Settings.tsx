import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, User, Mail, Lock, Bell } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully!");
  };

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
              <User className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>
              <p className="text-sm text-muted-foreground">Update your personal details</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" className="glass" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="john@example.com" className="glass" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wallet">Wallet ID</Label>
              <Input id="wallet" defaultValue="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7" className="glass" disabled />
            </div>
            <Button type="submit" className="bg-gradient-primary glow">Save Changes</Button>
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

        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center glow">
              <Bell className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground">Manage notification preferences</p>
            </div>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-foreground">Email Notifications</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-foreground">Transaction Alerts</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
