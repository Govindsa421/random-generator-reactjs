import IcoMoon, { IconProps } from 'react-icomoon';
import * as iconSet from './icons.json';

export const Icon = (props: IconProps) => (
  <IcoMoon iconSet={iconSet} {...props} />
);
