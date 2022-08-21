import { defineStore, skipHydrate } from 'pinia'
import { Notification } from '~/_app/domain/notifications'

export const useNotificationsStore = defineStore('notifications', () => {
  // notifications are client only so skip this on hydration
  const notifications = skipHydrate(ref([]))

  const notify = (notification: Notification) => {
    notifications.value?.push(notification)
  }

  return {
    notifications,
    notify,
  }
})
