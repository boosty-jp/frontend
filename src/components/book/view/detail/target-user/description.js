import React from "react"
import { connect } from 'react-redux'
import { Avatar } from 'antd';
import { CheckOutlined } from "@ant-design/icons";

const TargetUserDescriptionItem = ({ description }) => {

    return (
        <div style={{
            marginBottom: '18px',
            margin: '0px 0px 18px 0px',
            padding: '0',
            textIndent: '-2.4em',
            paddingLeft: '2.4em',
        }}
        >
            <Avatar icon={<CheckOutlined />} size={24} style={{ backgroundColor: "#1890ff", textIndent: '0em' }} />
            <span style={{
                color: 'black',
                fontSize: '18px',
                marginLeft: '0.5em',
                textIndent: '0.5em',
                verticalAlign: 'middle',
            }}>
                {description}
            </span>
        </div>
    )
}

const TargetDescriptionsComponent = (props) => {
    return (
        <div style={{ marginTop: '20px' }}>
            {props.descriptions.map(description => {
                return (
                    <TargetUserDescriptionItem description={description} key={description} />
                )
            })}
        </div>
    )
}

const mapStateToProps = state => ({
    descriptions: state.bookView.targetDescriptions,
})

const TargetDescriptions = connect(mapStateToProps)(TargetDescriptionsComponent);
export default TargetDescriptions