import React from "react"
import Layout from "components/layout/horizontal"
import SEO from "components/seo/seo"
import { Typography, Collapse } from "antd"
import { Link } from 'gatsby'

const { Title } = Typography;
const { Panel } = Collapse;

const salesQuestions = [
    { title: '販売手数料はいくらですか？', text: <>7/31まではキャンペーン開催中のため通常の半額の10%となります。それ以降は20%となります。<br /><Link to="notification/service-charge">販売手数料について</Link></> },
    { title: '売上はいつ振り込まれますか？', text: <>月初(毎月1日)に入金が行われます。<br /><Link to="notification/sale-deposit-timing">売上のふりこみについて</Link></> },
    { title: '販売金額の上限を上げたい', text: "現在は、50000円が上限となっています。ご了承ください。" },
]

const paymentQuestions = [
    { title: 'クレジットカード以外の決済手段はありますか？', text: '現在はクレジットカードのみとなっております。' },
    { title: 'クレジットカードの入力フォームが表示されません', text: 'アドブロッカーなどのブラウザの拡張機能によって、フォームが表示されないようになっている恐れがあります。該当の拡張機能をオフにして再度お試しください。' },
    { title: 'クレジットカード以外の決済手段はありますか？', text: '現在はクレジットカードのみとなっております。' },
]

const contentsQuestions = [
    { title: '技術書を執筆したい', text: <>ユーザー登録後、<a href="https://boosty.jp/book/edit/list">こちら</a>のページの新規作成より執筆いただけます。</> },
    { title: '複数人で執筆したい', text: <>現在は1ユーザーでの執筆のみ可能となっています。複数人での執筆は、今後対応予定です。</> },
    { title: '不適切なコンテンツをみつけた', text: <>お手数ですが、<a href="https://form.run/@boosty-help">こちらから</a>お問い合わせください。運営側で判断し対応させていただきます。</> },
    { title: '正しくページが表示されない', text: <>最新版のブラウザをご利用ください。boostyで対応しているブラウザはGoogle Chrome, Firefox, Safari, Edgeとなります。解消されない場合は<a href="https://form.run/@boosty-help">こちらから</a>お問い合わせください。</> },
]

const FAQPage = () => {
    return (
        <Layout contentBackgroundColor="white">
            <SEO title="よくある質問" description="販売金額の上限を上げたい。販売手数料はいくらですか？売上はいつ振り込まれますか？などboostyをご利用の上でのよくあるご質問への答えをご案内します。" />
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
