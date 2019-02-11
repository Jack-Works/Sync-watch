import React, { ReactNode } from 'react'
import ListView, { ListItem } from 'react-uwp/ListView'
import CustomAnimate from 'react-uwp/Animate/CustomAnimate'

import { getChatroom, State, MessageWithTime } from '../Network'
import { Input, messages } from '../utils'
import Typography from '../Typography'

interface Props {
    data: MessageWithTime[]
    max: number
    onNewMessage(val: string): void
}
const ListNode = function(data: MessageWithTime): ListItem {
    const _ = messages.getString(data.data) || data.data
    const node: Record<(typeof _)['type'], (d: typeof _) => ReactNode> = {
        chat: data => `${data.from}: ${data.text}`,
        system: data => <Typography>{ty => <span style={ty.caption}>{data.text}</span>}</Typography>,
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
            <Typography>{ty => <h5 style={ty.title}>Chat</h5>}</Typography>
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
