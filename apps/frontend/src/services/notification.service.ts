import { FalizNotificationsAPI } from "../types/api.types";

class NotificationService {
  public showNotification(title: string, body: string, options?: NotificationOptions): void {
    if (window.faliz && window.faliz.notifications && typeof window.faliz.notifications.show === 'function') {
      window.faliz.notifications.show(title, body);
      return;
    }

    // Fallback to Web Notification API
    if (!("Notification" in window)) {
      console.warn("Browser does not support notifications.");
      return;
    }

    if (Notification.permission === "granted") {
      new Notification(title, { body, ...options });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(title, { body, ...options });
        }
      });
    }
  }
}

export const notificationService = new NotificationService();
