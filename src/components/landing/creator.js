import React from "react"
import { Typography } from 'antd';
import CreatorImage from "components/image/hero/creator";

const { Paragraph, Title } = Typography;

class CreatorComponent extends React.Component {
    render() {
        return (
            <>
                <div style={{
                    backgroundColor: '#A5D6FF',
                    height: '550px',
                    borderTopRightRadius: '100%'
                }}>
                    <div style={{ padding: '180px 0px 0px 0px', textAlign: 'center' }}>
                        <Title level={1} style={{ color: 'black', lineHeight: '1.8' }}>技術書を作りませんか？</Title>
                    </div>
                    <div style={{ maxWidth: '300px', margin: '20px auto 0px auto' }}>
                        <CreatorImage />
                    </div>
                </div>
                <div style={{ backgroundColor: '#A5D6FF' }}>
                    <div style={{ maxWidth: "900px", margin: 'auto', padding: '20px 20px 120px 20px' }}>
                        <Paragraph style={{ fontSize: '22px', textAlign: 'center', color: 'black' }}>boostyでは教材を作成してくれる方を募集しています。</Paragraph>
                        <Paragraph style={{ fontSize: '22px', textAlign: 'center', color: 'black' }}>作成した教材は収益化できます。</Paragraph>
                        <Paragraph style={{ fontSize: '22px', textAlign: 'center', color: 'black' }}>分野は問いません、お気軽にご連絡ください。</Paragraph>
                    </div>
                </div>
                <div style={{
                    backgroundColor: '#A5D6FF',
                    height: '200px',
                    borderBottomLeftRadius: '100%'
                }}>
                </div>
            </>
        )
    }
}

export default CreatorComponent