import { CustomIcon } from '../icons/CustomIcon';
import './notification.css';
interface NotificationProps {
  message: string;
  type: string;
  onClose: () => void;
}
export const Notification = (props: NotificationProps) => {
  const { message, type, onClose } = props;
  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <CustomIcon
        onClick={onClose}
        icon="cancel-circle"
        color="white"
        size={20}
      />
    </div>
  );
};
