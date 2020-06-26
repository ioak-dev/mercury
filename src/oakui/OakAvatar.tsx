import React, { useEffect } from 'react';
import './styles/oak-avatar.scss';

interface Props {
  showName?: boolean;
  size?: string;
  firstName?: string;
  lastName?: string;
  variant?: 'outline' | 'dotted';
}
const OakAvatar = (props: Props) => {
  const getStyle = () => {
    const style = props.variant ? props.variant : '';

    return style;
  };

  return (
    <div className={`oak-avatar ${getStyle()}`}>
      {/* <AvatarImage
      v-if="user.avatar"
      v-bind:reference="user.avatar"
      v-bind:size="size"
    /> */}
      <div
        className={`${props.size ? props.size : ''} avatar-icon typography-6`}
      >
        {`${props.firstName?.substring(0, 1)}${props.lastName?.substring(
          0,
          1
        )}`}
      </div>
      {props.showName && <div className="avatar-name">{props.firstName}</div>}
    </div>
  );
};

export default OakAvatar;
