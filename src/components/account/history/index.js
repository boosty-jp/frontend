import React from "react"
import { Typography } from 'antd';
import { isLoggedIn } from "services/local-user";
import NeedLoginComponent from "components/auth/need-login";
import OrderHistories from "components/account/history/list"

const { Paragraph } = Typography;

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
}

class OrderHistoryList extends React.Component {
    render() {
        if (!isLoggedIn()) {
            return (<NeedLoginComponent />)
        }

        return (
            <div style={{ padding: '20px', width: '100%', margin: 'auto' }}>
                <Paragraph style={{ textAlign: 'center', fontSize: '28px', color: 'black' }}>購入履歴</Paragraph>
                <div style={cardStyle}>
                    <OrderHistories />
                </div>
            </div>
        )
    }
}

export default OrderHistoryList