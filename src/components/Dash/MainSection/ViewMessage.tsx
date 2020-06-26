import React, { useEffect, useState } from 'react';
import { Socket, Presence, Channel } from 'phoenix';
import './style.scss';
import OakButton from '../../../oakui/OakButton';
import ComposeSection from './ComposeSection';
import { newId } from '../../../events/MessageService';
import OakViewer from '../../../oakui/OakViewer';
import OakAvatar from '../../../oakui/OakAvatar';
import { User, Personmessage } from '../../../types/graphql';
import { formatDateOrTimeText } from '../../Lib/DateUtils';

interface Props {
  message: any;
  selfUser: User;
  otherUser: User;
}

const ViewMessage = (props: Props) => {
  const [youareasender, setYouareasender] = useState(false);

  useEffect(() => {
    if (props.message.sender == props.selfUser.id) {
      setYouareasender(true);
    }
  }, [props.message]);

  return (
    <div className="view-message">
      <div className="column-left">
        {youareasender && (
          <OakAvatar
            firstName={props.selfUser.firstName || ''}
            lastName={props.selfUser.lastName || ''}
            variant="outline"
          />
        )}
        {!youareasender && (
          <OakAvatar
            firstName={props.otherUser.firstName || ''}
            lastName={props.otherUser.lastName || ''}
            variant="dotted"
          />
        )}
      </div>
      <div className="column-right">
        <div className="sender-meta">
          {youareasender && (
            <div className="sender-name">
              {props.selfUser.firstName} {props.selfUser.lastName}
            </div>
          )}
          {!youareasender && (
            <div className="sender-name">
              {props.otherUser.firstName} {props.otherUser.lastName}
            </div>
          )}
          <div className="sent-time typography-4">
            {formatDateOrTimeText(props.message.inserted_at)}
          </div>
        </div>
        <div>
          <OakViewer key={newId()}>{props.message.content}</OakViewer>
        </div>
      </div>
    </div>
  );
};

export default ViewMessage;
