import { FC, memo, useMemo } from 'react';
import {
  ColorValue,
  PixelRatio,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import HomeIcon from '@/assets/icons/home.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import LibraryIcon from '@/assets/icons/library.svg';
import ProfileIcon from '@/assets/icons/profile.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';

export type IconName =
  | 'home'
  | 'calendar'
  | 'library'
  | 'profile'
  | 'chevron-left'
  | 'chevron-right';

const IconMap: { [key in IconName]: FC<any> } = {
  home: HomeIcon,
  calendar: CalendarIcon,
  library: LibraryIcon,
  profile: ProfileIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
};

interface Props {
  name: IconName;
  size?: number;
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
}

const isIconName = (name: string): name is IconName => {
  if (IconMap[name as IconName]) {
    return true;
  }
  return false;
};

const SvgIcon: FC<Props> = ({ name, size = 24, color = '#000', style }) => {
  const fixedSize = useMemo(() => PixelRatio.roundToNearestPixel(size), [size]);

  const IconComponent = useMemo(() => {
    if (!isIconName(name)) {
      return null;
    }
    return IconMap[name];
  }, [name]);

  if (!IconComponent) {
    return null;
  }

  return (
    <View style={[{ width: fixedSize, height: fixedSize }, style]}>
      <IconComponent
        width={fixedSize}
        height={fixedSize}
        fill={color}
        style={{ color }}
      />
    </View>
  );
};

export default memo(SvgIcon);
