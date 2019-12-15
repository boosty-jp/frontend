import React from 'react';
import { Typography, Row, Col } from 'antd';
import CourseLayout from 'components/layout/vertical/course';
import IMAGE from 'images/hero4.png'
import TwoColumnLayout from 'components/layout/two-column';
import Sections from 'components/course/sections';
import AuthorCard from 'components/course/author'

export default class CourseDetailPage extends React.Component {
    render() {
        return (
            <CourseLayout>
                <div style={{ background: '#fff', padding: '24px' }}>
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
                />
            </CourseLayout>
        );
    }
}