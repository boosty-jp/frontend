import React, { useState, useEffect, useRef } from "react"
import { Row, Col, Typography } from 'antd';
import StepArticleImage from "components/images/step/article";
import StepWordImage from "components/images/step/word";
import StepTestImage from "components/images/step/test";
const { Title } = Typography;

const steps = [
    { title: "1. Web上で読める", image: <StepArticleImage />, description: '教材はweb上で確認できるため、いつでもどこでも学習できます。重たい本を持ち歩く必要はありません。' },
    { title: "2. 単語カードで覚える", image: <StepWordImage />, description: '難しい専門用語も単語カードを用いることで記憶に定着化できます。自分で単語カードを作る必要はありません。' },
    { title: "3. 演習問題で理解度を確かめる", image: <StepTestImage />, description: '演習問題を解くことで、より一層理解を深められます。間違えた問題をもとに、理解不足な箇所を診断し学び直すことができます。' },
]
const FeatureComponent = () => {
    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    }, []);

    return (
        <>
            <div
                ref={ref}
                style={{
                    backgroundColor: '#white',
                    height: '300px',
                    borderTopLeftRadius: '100%'
                }}>
                <div style={{ padding: '200px 0px', textAlign: 'center' }}>
                    <Title level={1} style={{ color: 'black', lineHeight: '1.8' }}>特徴</Title>
                </div>
            </div>
            <div style={{ backgroundColor: '#A5D6FF' }}>
                <div style={{ maxWidth: "900px", margin: 'auto', padding: '40px 20px 120px 20px' }}>
                    {/* <Title level={1} style={{ color: 'black', textAlign: 'center', marginBottom: '60px' }}>利用シーン</Title> */}
                    {steps.map((s, idx) => {

                        if (width >= 768) {
                            if (idx % 2 === 0) {
                                return (
                                    <Row type="flex" align="middle" gutter={16} style={{ marginTop: '150px' }} key={s.title}>
                                        <Col span={10} >
                                            <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'black' }}>{s.title}</p>
                                            <p style={{ fontSize: '16px' }}>{s.description}</p>
                                        </Col>
                                        <Col span={14} style={{ textAlign: 'center' }}>
                                            {s.image}
                                        </Col >
                                    </Row>
                                )
                            } else {
                                return (
                                    <Row type="flex" align="middle" gutter={16} style={{ marginTop: '150px' }} key={s.title}>
                                        <Col span={14} style={{ textAlign: 'center' }}>
                                            {s.image}
                                        </Col>
                                        <Col span={10} >
                                            <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'black' }}>{s.title}</p>
                                            <p style={{ fontSize: '16px' }}>{s.description}</p>
                                        </Col >
                                    </Row>
                                )
                            }
                        } else {
                            return (
                                <div style={{ marginTop: '150px' }} key={s.title}>
                                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'black' }}>{s.title}</p>
                                    <p style={{ fontSize: '16px' }}>{s.description}</p>
                                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                        {s.image}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            <div style={{
                backgroundColor: '#A5D6FF',
                height: '200px',
                borderBottomRightRadius: '100%'
            }}>
            </div>
        </>
    )
}
export default FeatureComponent