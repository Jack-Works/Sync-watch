import React, { ReactNode } from 'react'
import ListView, { ListItem } from 'react-uwp/ListView'
import CustomAnimate from 'react-uwp/Animate/CustomAnimate'

import { getChatroom, MessageWithTime } from '../Network'
import { Input, messages } from '../utils'
import Typography from '../Typography'
import CommandBar from 'react-uwp/CommandBar'
import AppBarButton from 'react-uwp/AppBarButton'
import AppBarSeparator from 'react-uwp/AppBarSeparator'

interface Props {
    data: MessageWithTime[]
    max: number
    onNewMessage(val: string): void
}
const ListNode = function(data: MessageWithTime): ListItem {
    const _ = messages.getString(data.data) || data.data
    const node: Record<(typeof _)['type'], (d: typeof _) => ReactNode> = {
        chat: data => `${data.from}: ${data.text}`,
        system: data => (
            <Typography>
                {ty => <span style={{ ...ty.caption, color: 'rgba(255, 255, 255, 0.6)' }}>{data.text}</span>}
            </Typography>
        ),
    }
    return {
        itemNode: (
            <CustomAnimate
                key={data.time}
                children={(node[_.type] || node.chat)(_)}
                leaveStyle={{
                    opacity: 0,
                    transform: 'translateY(-48px)',
                    willChange: 'margin-top',
                }}
                enterStyle={{
                    opacity: 1,
                    transform: 'translateY(0)',
                    willChange: 'margin-top',
                }}
            />
        ),
        disabled: _.type === 'system',
        style: _.type === 'system' ? {} : {},
    }
}
function Chatboard(props: Props) {
    const data = props.data.map(ListNode)
    return (
        <aside>
            <CommandBar
                labelPosition="right"
                flowDirection="row"
                contentNode={<Typography>{ty => <h5 style={{ ...ty.title, lineHeight: '48px' }}>Chat</h5>}</Typography>}
                primaryCommands={[
                    <AppBarButton
                        icon="Upload"
                        label="同步进度"
                        onClick={() => dispatchEvent(new Event('sync-progress'))}
                    />,
                ]}
                secondaryCommands={[
                    <AppBarButton
                        icon="Clear"
                        label="清除通知"
                        onClick={() => dispatchEvent(new Event('clear-notification'))}
                    />,
                ]}
            />
            <Input onCommit={props.onNewMessage} autoFocus clearOnCommit icon="Send" style={{ width: '100%' }} />
            <div className="list">
                <ListView
                    listSource={data}
                    style={{
                        width: '100%',
                        border: 'none',
                        wordBreak: 'break-all',
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        padding: 0,
                    }}
                />
            </div>
        </aside>
    )
}
export default function ChatboardLogic(props: { session: string; name: string }) {
    const chatRoom = getChatroom(props.session, name)
    const [data, setData] = React.useState(chatRoom.messages)
    React.useEffect(() => {
        chatRoom.addAllMessageChangeListener(setData)
        return () => (chatRoom.removeAllMessageChangeListener(setData), void 0)
    })
    return <Chatboard max={chatRoom.MAX} data={data} onNewMessage={chatRoom.broadcast} />
}
