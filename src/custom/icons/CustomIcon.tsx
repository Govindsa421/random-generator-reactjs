import { Icon } from './Icons';

interface IconProp {
  color: string;
  icon: string;
  size?: number | string;
  style?: object;
  onClick?: () => void;
}
export const CustomIcon = (props: IconProp) => {
  const { color, icon, size, ...rest } = props;
  return <Icon color={color} icon={icon} size={size} {...rest} />;
};
