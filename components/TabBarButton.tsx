import { FC } from 'react';
import { Pressable, Text, View } from 'react-native';
import { icons } from '@/constants/icons';
import className, { style } from 'twrnc';

type TabBarButtonProps = {
  isFocused: boolean;
  label: string;
  routeName: 'index' | 'playlist';
  color: string;
  [key: string]: any;
};

export const TabBarButton: FC<TabBarButtonProps> = ({ isFocused, label, routeName, color, ...props }) => {
  return (
    <Pressable {...props} className="flex-1 items-center justify-center gap-1">
      <View style={className`px-4`}>{icons[routeName]({ color: isFocused ? '#79299e' : color })}</View>
      <Text
        style={[
          className`text-base text-center pb-2 font-(family-name:Iceland_400Regular) ${
            isFocused ? 'text-[#79299e]' : 'text-gray-400'
          }`,
          { fontFamily: 'Iceland_400Regular' },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};
