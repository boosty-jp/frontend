import React, { useState, useEffect, useRef } from "react"
import CourseLayout from 'components/layout/vertical/course';
import withLocation from "components/wrapper/location";

const CourseDetailPage = ({ search }) => {
    const { id } = search
    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    })

    let marginToMenu = '0px';
    if (width > 740) {
        marginToMenu = '30px'
    }

    return (
        <CourseLayout>
            <div ref={ref}>
                <div style={{ background: '#fff', maxWidth: '740px', width: '100%', margin: marginToMenu + ' auto' }}>
                </div>
            </div>
            {/* <div style={{ background: '#fff', padding: '24px' }}>
                    <Typography>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={24} md={18} lg={16} xl={16} style={{ textAlign: 'left' }}>
                                <Typography.Title level={1}>コースのタイトル</Typography.Title>
                                <Typography.Paragraph>Raspberry Piと銘打たれてますが、コンピュータアーキテクチャの歴史的な背景も踏まえて解説されています。プロセッサ・メモリ・ストレージ・ネットワーク・OS・プログラミングなど、コンピュータ単体の基本的な知識を学べます。　歴史をあわせて知ることができるため、知的好奇心がおおいに刺激され、楽しく読むことができます。この本が難しく感じられる場合は、プログラムはなぜ動くのかもオススメです。</Typography.Paragraph>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={8} xl={8} style={{ textAlign: 'left' }}>
                                <img src={IMAGE} style={{ width: '100%' }} />
                            </Col>
                        </Row>
                    </Typography>
                </div>
                <TwoColumnLayout
                    left={<Sections />}
                    right={<AuthorCard />}
                /> */}
        </CourseLayout>
    );
}

export default withLocation(CourseDetailPage)