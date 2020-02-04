import React from 'react'
import { List, Row, Col } from 'antd';
import { Link } from 'gatsby';

const data = [
    { title: '利用規約', link: 'terms' },
    { title: 'プライバシーポリシー', link: 'privacy' },
]
const TermLayout = ({ children }) => {
    return (
        <div style={{ padding: '30px 20px', maxWidth: '100%', width: "900px", margin: 'auto', position: 'relative' }}>
            <Row gutter={[16, 16]}>
                <Col xs={0} sm={0} md={8} lg={6} xl={6}>
                    <List
                        bordered
                        dataSource={data}
                        style={{
                            background: 'white', borderRadius: '0.25rem'
                        }}
                        renderItem={item => (
                            <List.Item>
                                <Link to={item.link}>
                                    {item.title}
                                </Link>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col xs={24} sm={24} md={16} lg={18} xl={18}>
                    <div style={{ background: 'white', borderRadius: '0.25rem', padding: '20px' }}>
                        {children}
                    </div>
                </Col>
            </Row>
        </div >
    )
}

export default TermLayout