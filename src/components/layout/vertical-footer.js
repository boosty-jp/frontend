import React from "react"
import { Row, Col } from 'antd';
import { CopyrightCircleOutlined } from "@ant-design/icons";
import { Link } from 'gatsby'

const VerticalFooter = () => {
    var now = new Date();
    var thisYear = now.getFullYear();
    return (
        <div style={{ maxWidth: '300px', textAlign: 'center', margin: '40px auto', color: "rgba(0,0,0,0.45)" }}>
            <Row>
                <Col span={8}><Link to="/notifications" style={{ color: "rgba(0,0,0,0.45)" }}>お知らせ</Link></Col>
                <Col span={8}><Link to="/faq" style={{ color: "rgba(0,0,0,0.45)" }}>よくある質問</Link></Col>
                <Col span={8}><Link to="/terms" style={{ color: "rgba(0,0,0,0.45)" }}>利用規約</Link></Col>
            </Row>
            <div style={{ marginTop: '12px' }}>Copyright <CopyrightCircleOutlined />
                {thisYear} <a href="https://wever.co.jp" style={{ color: "rgba(0,0,0,0.45)" }}>wever Inc.</a>
            </div>
        </div>
    )
}
export default VerticalFooter;