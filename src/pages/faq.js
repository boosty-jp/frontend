import React from "react"
import Layout from "components/layout/horizontal"
import SEO from "components/seo/seo"
import { Typography, Collapse } from "antd"

const { Paragraph, Title } = Typography;
const { Panel } = Collapse;

const salesQuestions = [
    { title: '販売金額の上限を上げたい', text: "現在は、50000円が上限となっています。ご了承ください。" },
    { title: '販売金額の上限を上げたい', text: "現在は、50000円が上限となっています。ご了承ください。" },
    { title: '販売手数料はいくらですか？', text: <>20%となります。販売手数料に関する詳細は、<a href="">こちら</a>をご覧ください。</> },
    { title: '売上はいつ振り込まれますか？', text: <>月末に振り込まれます。振り込みに関する詳細は、<a href="">こちら</a>をご覧ください。</> },
]

const paymentQuestions = [
    { title: 'クレジットカード以外の決済手段はありますか？', text: '現在はクレジットカードのみとなっております。' },
    { title: 'クレジットカードの入力フォームが表示されません', text: 'アドブロッカーなどのブラウザの拡張機能によって、フォームが表示されないようになっている恐れがあります。該当の拡張機能をオフにして再度お試しください。' },
    { title: 'クレジットカード以外の決済手段はありますか？', text: '現在はクレジットカードのみとなっております。' },
    { title: '正しくページが表示されない', text: <>最新版のブラウザをご利用ください。boostyで対応しているブラウザはGoogle Chrome, Firefox, Safari, Edgeとなります。解消されない場合は<a href="https://form.run/@boosty-help">こちらから</a>お問い合わせください。</> },
]

const contentsQuestions = [
    { title: '不適切なコンテンツをみつけた', text: <>お手数ですが、<a href="https://form.run/@boosty-help">こちらから</a>お問い合わせください。運営側で判断し対応させていただきます。</> },
    { title: '販売金額の上限を上げたい', text: "現在は、50000円が上限となっています。ご了承ください。" },
    { title: '販売手数料はいくらですか？', text: <>20%となります。販売手数料に関する詳細は、<a href="">こちら</a>をご覧ください。</> },
    { title: '売上はいつ振り込まれますか？', text: <>月末に振り込まれます。振り込みに関する詳細は、<a href="">こちら</a>をご覧ください。</> },
]

const FAQPage = () => {
    return (
        <Layout contentBackgroundColor="white">
            <SEO title="Home" />
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px 20px 80px 20px' }}>
                <Title level={2} style={{ textAlign: 'center' }}>よくある質問</Title>
                <div style={{ marginTop: '60px' }}>
                    <Title level={4} style={{ textAlign: 'center' }}>- 販売に関して -</Title>
                    <Collapse >
                        {salesQuestions.map((question, idx) => {
                            return (
                                <Panel header={question.title} key={idx}>
                                    {question.text}
                                </Panel>
                            )
                        })}
                    </Collapse>
                </div>
                <div style={{ marginTop: '60px' }}>
                    <Title level={4} style={{ textAlign: 'center' }}>- 支払いに関して -</Title>
                    <Collapse >
                        {paymentQuestions.map((question, idx) => {
                            return (
                                <Panel header={question.title} key={idx}>
                                    {question.text}
                                </Panel>
                            )
                        })}
                    </Collapse>
                </div>
                <div style={{ marginTop: '60px' }}>
                    <Title level={4} style={{ textAlign: 'center' }}>- コンテンツに関して -</Title>
                    <Collapse >
                        {contentsQuestions.map((question, idx) => {
                            return (
                                <Panel header={question.title} key={idx}>
                                    {question.text}
                                </Panel>
                            )
                        })}
                    </Collapse>
                </div>
            </div>
        </Layout>
    )
}

export default FAQPage
