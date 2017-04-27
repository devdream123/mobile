interface FCMPlugin {
    subscribeToTopic: ( topic, success, error ) => any;
    unsubscribeFromTopic: ( topic, success, error ) => any;
    onNotification: ( callback, success, error ) => any;
    onTokenRefresh: ( callback ) => any;

    getToken: (success: (token: string) => any, error: (err: any) => any) => any;

    onNotificationReceived: (payload: any) => any;
    onTokenRefreshReceived: (payload: any) => any; // ?
}
