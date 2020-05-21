import React from "react"
import { Row, Col, Typography } from 'antd';
import SalesPoint1Image from "components/image/sales-points/sales1";
import SalesPoint2Image from "components/image/sales-points/sales2";
import SalesPoint3Image from "components/image/sales-points/sales3";

const { Paragraph } = Typography;
const titleStyle = { color: 'black', fontSize: '24px', fontWeight: '500', marginTop: '16px' };
const SalesPoints = () => {
    return (
        <Row type="flex" justify="center" gutter={20} align="middle">
            <Col sm={24} md={8} style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
                <SalesPoint1Image />
                <Paragraph style={titleStyle}>重い本にさようなら</Paragraph>
                <Paragraph >分厚くて重い技術書の持ち歩きや<br />置き場所に困る心配はありません</Paragraph>
            </Col>
            <Col sm={24} md={8} style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
                <SalesPoint2Image />
                <Paragraph style={titleStyle}>見やすいコード</Paragraph>
                <Paragraph >ハイライトされ、コピペも簡単にでき<br />学びながらコードを書きやすくなってます</Paragraph>
            </Col>
            <Col sm={24} md={8} style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
                <SalesPoint3Image />
                <Paragraph style={titleStyle}>お気に入り登録</Paragraph>
                <Paragraph >見返したいページをお気に入りし<br />すぐに検索できます</Paragraph>
            </Col>
        </Row>
    )
}

export default SalesPoints