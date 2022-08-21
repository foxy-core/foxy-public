export enum NotificationStatus {
  Error = 'Error',
  Warning = 'Warning',
  Success = 'Success',
  Info = 'Info',
}

export type Notification = {
  status: NotificationStatus
  text: string
}
