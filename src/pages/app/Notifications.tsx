import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Clock, AlertTriangle, Info } from "lucide-react";

// Dummy data for notifications
const notifications = [
    {
        id: 1,
        title: "Investment Successful",
        message: "Your investment of $500 in the 'Silver Plan' was successful.",
        type: "success", // success, warning, error, info
        timestamp: "2024-05-20T10:30:00Z",
        read: false,
    },
    {
        id: 2,
        title: "ROI Received",
        message: "You received $50 ROI from your 'Gold Plan' investment.",
        type: "success",
        timestamp: "2024-05-19T14:15:00Z",
        read: true,
    },
    {
        id: 3,
        title: "Withdrawal Pending",
        message: "Your withdrawal request for $200 is currently pending approval.",
        type: "warning",
        timestamp: "2024-05-18T09:00:00Z",
        read: true,
    },
    {
        id: 4,
        title: "System Maintenance",
        message: "The system will undergo maintenance on May 25th from 2:00 AM to 4:00 AM UTC.",
        type: "info",
        timestamp: "2024-05-15T16:00:00Z",
        read: true,
    },
    {
        id: 5,
        title: "Referral Bonus",
        message: "You earned a $25 referral bonus from a new signup.",
        type: "success",
        timestamp: "2024-05-14T11:45:00Z",
        read: true,
    },
    {
        id: 6,
        title: "Action Required: Verify Email",
        message: "Please verify your email address to unlock all features.",
        type: "error",
        timestamp: "2024-05-10T08:20:00Z",
        read: false,
    },
];

const getIcon = (type: string) => {
    switch (type) {
        case "success":
            return <Check className="w-5 h-5 text-success" />;
        case "warning":
            return <Clock className="w-5 h-5 text-warning" />;
        case "error":
            return <AlertTriangle className="w-5 h-5 text-destructive" />;
        case "info":
        default:
            return <Info className="w-5 h-5 text-blue-400" />;
    }
};

const getBadgeColor = (type: string) => {
    switch (type) {
        case "success":
            return "bg-success/20 text-success border-success/30";
        case "warning":
            return "bg-warning/20 text-warning border-warning/30";
        case "error":
            return "bg-destructive/20 text-destructive border-destructive/30";
        case "info":
        default:
            return "bg-blue-400/20 text-blue-400 border-blue-400/30";
    }
};


export default function Notifications() {
    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Notific<span className="gradient-text">ations</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Stay updated with your latest activities and system announcements.
                    </p>
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <Card
                            key={notification.id}
                            className={`glass-card p-4 transition-all hover:bg-primary/5 ${!notification.read ? "border-l-4 border-l-primary" : ""
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-2 rounded-full bg-primary/10 mt-1`}>
                                    {getIcon(notification.type)}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className={`font-semibold text-foreground ${!notification.read ? "text-primary" : ""}`}>
                                            {notification.title}
                                        </h3>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(notification.timestamp).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {notification.message}
                                    </p>
                                    <div className="pt-2">
                                        <Badge variant="outline" className={`${getBadgeColor(notification.type)} capitalize`}>
                                            {notification.type}
                                        </Badge>
                                    </div>
                                </div>
                                {!notification.read && (
                                    <div className="w-2 h-2 rounded-full bg-primary" title="Unread"></div>
                                )}
                            </div>
                        </Card>
                    ))}

                    {notifications.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground glass-card rounded-lg">
                            <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No notifications yet</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
