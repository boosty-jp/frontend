import React from "react"
import { Avatar } from 'antd';

const TargetUserDescriptionItem = ({ description }) => {

    return (
        <div style={{
            marginBottom: '18px',
            margin: '0px 0px 18px 0px',
            padding: '0',
            textIndent: '-4em',
            paddingLeft: '4em',
        }}
        >
            <Avatar icon="check" size={32} style={{ backgroundColor: "#1890ff", textIndent: '0em' }} />
            <span style={{
                color: 'black',
                fontSize: '18px',
                marginLeft: '1.4em',
                textIndent: '1.4em',
                verticalAlign: 'middle',
            }}>
                {description}
            </span>
        </div>
    )
}

const items = [
    "AWSについての前提知識はなくてOK",
    "クラウド関係の前提知識はなくてOK",
    "サーバーやネットワークなどの最低限のインフラ知識がある",
]

const TargetDescriptions = () => {
    return (
        <div style={{ marginTop: '20px' }}>
            {items.map(i => {
                return (
                    <TargetUserDescriptionItem description={i} key={i} />
                )
            })}
        </div>
    )
}
export default TargetDescriptions