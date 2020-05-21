import React from "react"
import { Typography, Button } from 'antd';
import PcBannerImage from "images/pc-sales-banner.png"
import { Link } from "gatsby"
import { isLoggedIn } from "services/local-user";

const { Paragraph } = Typography;

const boardStyle = {
    background: "white",
    borderRadius: "0.5rem",
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderColor: 'white',
    width: '100%',
    fontColor: 'black',
    overflow: 'hidden',
}

const paragraphStyle = { color: 'white', fontWeight: 'bold', letterSpacing: '0.4rem', fontSize: '22px' };
const saleStyle = { fontSize: '14px', color: 'white' }
const buttonStyle = { backgroundColor: '#2b2c34', borderColor: "#2b2c34", }

const CreatorSalesBanner = () => {
    let link = "/signup"
    let linkMessage = "登録する"
    if (isLoggedIn()) {
        link = "/book/edit/list";
        linkMessage = "執筆する";
    }

    return (
        <div style={boardStyle}>
            <div style={{ backgroundImage: `url(${PcBannerImage})`, width: '100%', height: '100%', backgroundSize: "cover", padding: '20px', textAlign: 'center' }} >
                <Paragraph style={paragraphStyle}>
                    執筆者 募集中!
                            </Paragraph>
                <p style={saleStyle}>
                    販売手数料 <span style={{ fontSize: '24px', marginRight: '4px' }}>50</span>% OFF<br />
                    <span style={{ fontSize: '14px' }}>
                        <Link to="" style={{ color: 'white' }}>キャンペーン</Link>開催中(6/30まで)
                                </span>
                </p>
                <Link to={link}>
                    <Button type="primary" style={buttonStyle} shape="round">{linkMessage}</Button>
                </Link>
            </div>
        </div>
    )
}
export default CreatorSalesBanner