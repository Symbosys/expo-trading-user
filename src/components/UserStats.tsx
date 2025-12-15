import { api } from "@/api/apiClient";
import { useSetting } from "@/api/hooks/useSetting";
import { useQuery } from "@tanstack/react-query";
import { User, Users } from "lucide-react";

interface Setting {
    id: string;
    phoneNumber: string;
    email: string;
    activeUser: string;
    totalUser: string;
    createdAt: string;
    updatedAt: string;
}

export function UserStats() {
    const { data: setting, isLoading, isError } = useSetting();

    if (isLoading) {
        return (
            <section className="py-20 px-4 bg-gradient-to-b from-card to-background">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">
                            Join Our Growing <span className="gradient-text">Community</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Thousands of satisfied investors trust CryptoInvest for their crypto journey.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="glass-card p-8 rounded-2xl text-center">
                            <User className="w-16 h-16 text-primary mx-auto mb-4 opacity-20" />
                            <div className="h-10 w-32 mx-auto bg-primary/10 animate-pulse rounded"></div>
                            <div className="text-xl font-semibold text-foreground mt-2">Active Users</div>
                            <p className="text-sm text-muted-foreground mt-2">Investing daily with guaranteed returns</p>
                        </div>
                        <div className="glass-card p-8 rounded-2xl text-center">
                            <Users className="w-16 h-16 text-primary mx-auto mb-4 opacity-20" />
                            <div className="h-10 w-32 mx-auto bg-primary/10 animate-pulse rounded"></div>
                            <div className="text-xl font-semibold text-foreground mt-2">Total Users</div>
                            <p className="text-sm text-muted-foreground mt-2">Join the largest crypto investment network</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (isError || !setting) {
        return null;
    }

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-card to-background">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">
                        Join Our Growing <span className="gradient-text">Community</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Thousands of satisfied investors trust CryptoInvest for their crypto journey.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="glass-card p-8 rounded-2xl text-center">
                        <User className="w-16 h-16 text-primary mx-auto mb-4 opacity-20" />
                        <div className="text-5xl font-bold gradient-text mb-2">{setting.activeUser}+</div>
                        <div className="text-xl font-semibold text-foreground">Active Users</div>
                        <p className="text-sm text-muted-foreground mt-2">Investing daily with guaranteed returns</p>
                    </div>
                    <div className="glass-card p-8 rounded-2xl text-center">
                        <Users className="w-16 h-16 text-primary mx-auto mb-4 opacity-20" />
                        <div className="text-5xl font-bold gradient-text mb-2">{setting.totalUser}+</div>
                        <div className="text-xl font-semibold text-foreground">Total Users</div>
                        <p className="text-sm text-muted-foreground mt-2">Join the largest crypto investment network</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
