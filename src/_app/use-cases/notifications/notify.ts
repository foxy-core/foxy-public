import { Notification } from '~/_app/domain/notifications'
import { useNotificationsStore } from '~/_app/stores/notifications.store'

export const notify = (notification: Notification) => {
  const store = useNotificationsStore()

  store.notify(notification)
}
