import React, { useState, useEffect, useRef } from "react"
import { Typography, Button } from 'antd';
import BackgroundImage from "images/background1.png"
import { Link } from "gatsby"
import { isLoggedIn } from "services/local-user";

const { Paragraph } = Typography;
const paragraphStyle = { textAlign: 'center', color: 'white', fontWeight: 'bold', letterSpacing: '0.5rem' };
const buttonStyle = { backgroundColor: '#2b2c34', borderColor: "#2b2c34" }
const CreatorBanner = () => {
    let link = "/signup"
    let linkMessage = "登録する"
    if (isLoggedIn()) {
        link = "/book/edit/list";
        linkMessage = "執筆する";
    }

    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    }, []);

    let fontStyle = { fontSize: "5vw", height: "32vw", padding: '5vw' };
    let buttonSize = "large"
    if (width > 1600) {
        fontStyle = { fontSize: "4vw", height: "26vw", padding: '4vw' };
    } else if (width < 700) {
        fontStyle = { fontSize: "7vw", height: "48vw", padding: '7vw' };
        buttonSize = "middle"
    }

    return (
        <Link to={link}>
            <div ref={ref} style={{ backgroundImage: `url(${BackgroundImage})`, width: '100%', backgroundSize: "cover", ...fontStyle }} >
                <Paragraph style={paragraphStyle}>
                    Need Writter.
                <br />
                執筆者 募集中！
                <br />
                    <Button type="primary" size={buttonSize} style={buttonStyle} shape="round">{linkMessage}</Button>
                    <p style={{ fontSize: '14px' }}>販売手数料50% OFF<br />キャンペーン開催中(6/30まで)</p>
                </Paragraph>
            </div>
        </Link>
    )
}
export default CreatorBanner