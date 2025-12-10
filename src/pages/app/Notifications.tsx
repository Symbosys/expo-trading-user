import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Clock, AlertTriangle, Info } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/api/apiClient";
import { useInView } from 'react-intersection-observer';
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

// Backend-aligned Notification interface (no meta)
interface Notification {
    id: string;
    title: string;
    message: string;
    type: "INFO" | "SUCCESS" | "WARNING" | "ERROR" | "PROMOTIONAL" | "SYSTEM";
    createdAt: string;
    updatedAt: string;
}

// TanStack Infinite Query hook for fetching notifications with pagination
const useInfiniteNotifications = () => {
    return useInfiniteQuery({
        queryKey: ['notifications'],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await api.get(`/notifications/all?page=${pageParam}&limit=10`);
            if (!data.success) {
                throw new Error("Failed to fetch notifications");
            }
            return {
                data: data.data,
                nextPage: data.pagination.hasNextPage ? pageParam + 1 : undefined,
            };
        },
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
    });
};

const getIcon = (type: string) => {
    switch (type) {
        case "SUCCESS":
            return <Check className="w-5 h-5 text-success" />;
        case "WARNING":
            return <Clock className="w-5 h-5 text-warning" />;
        case "ERROR":
            return <AlertTriangle className="w-5 h-5 text-destructive" />;
        case "INFO":
        case "PROMOTIONAL":
        case "SYSTEM":
        default:
            return <Info className="w-5 h-5 text-blue-400" />;
    }
};

const getBadgeColor = (type: string) => {
    switch (type) {
        case "SUCCESS":
            return "bg-success/20 text-success border-success/30";
        case "WARNING":
            return "bg-warning/20 text-warning border-warning/30";
        case "ERROR":
            return "bg-destructive/20 text-destructive border-destructive/30";
        case "INFO":
        case "PROMOTIONAL":
        case "SYSTEM":
        default:
            return "bg-blue-400/20 text-blue-400 border-blue-400/30";
    }
};

export default function Notifications() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteNotifications();
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const allNotifications = data?.pages.flatMap(page => page.data) || [];

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
                    {isLoading ? (
                        <div className="text-center py-12 text-muted-foreground glass-card rounded-lg">
                            <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>Loading notifications...</p>
                        </div>
                    ) : allNotifications.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground glass-card rounded-lg">
                            <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No notifications yet</p>
                        </div>
                    ) : (
                        allNotifications.map((notification) => (
                            <Card
                                key={notification.id}
                                className={`glass-card p-4 transition-all hover:bg-primary/5`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-2 rounded-full bg-primary/10 mt-1`}>
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className={`font-semibold text-foreground`}>
                                                {notification.title}
                                            </h3>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(notification.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {notification.message}
                                        </p>
                                        <div className="pt-2">
                                            <Badge variant="outline" className={`${getBadgeColor(notification.type)} capitalize`}>
                                                {notification.type.toLowerCase()}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}

                    {hasNextPage && (
                        <div ref={ref} className="flex justify-center py-4">
                            {isFetchingNextPage ? (
                                <p className="text-muted-foreground">Loading more...</p>
                            ) : (
                                <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                                    Load More
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}