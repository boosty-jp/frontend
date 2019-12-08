import React from "react"
import { Radio, List, Card, Avatar } from 'antd';
import IconText from 'components/text/icon'
import Icons from 'components/text/icons'
import styled from 'styled-components'
import IMG_1 from 'images/prize/2.svg'
import IMG_2 from 'images/prize/15.svg'
import IMG_3 from 'images/prize/36.svg'
import IMG_4 from 'images/prize/101.svg'
import IMG_5 from 'images/prize/55.svg'

const CompletedContentsCard = styled(Card)`
  .ant-card-body {
    padding: 16px;
  }
  .ant-card-head {
    padding: 8px 8px 8px 16px
  }
  .ant-card-head-title {
    padding: 8px 0px
  }
  .ant-card-extra {
    padding: 0px
  }
`;

const categories = [
    { id: '1', publishDate: '1日前', image: IMG_1, learned: 20, like: 23, title: 'Java11の新文法を理解する' },
    { id: '2', publishDate: '1日前', image: IMG_2, learned: 20, like: 23, title: 'Ruby on Railsでアプリケーションを作る' },
    { id: '3', publishDate: '1日前', image: IMG_3, learned: 20, like: 23, title: 'C++のコアな関数の中身を読み解く' },
    { id: '4', publishDate: '1日前', image: IMG_4, learned: 20, like: 23, title: 'ReactとReduxで作成するモダンなフロントエンド環境' },
    { id: '5', publishDate: '1日前', image: IMG_5, learned: 20, like: 2303, title: 'javascript' },
]

const CompletedContents = () => {
    return (
        <div style={{ marginBottom: '24px' }}>
            <CompletedContentsCard
                // title="学習したコース"
                title={<IconText type="check" text="学習したコンテンツ" />}
                extra={
                    <Radio.Group defaultValue="course" buttonStyle="solid">
                        <Radio.Button value="course">コース</Radio.Button>
                        <Radio.Button value="article">記事</Radio.Button>
                    </Radio.Group>
                }>
                <List
                    dataSource={categories}
                    renderItem={item => (
                        <List.Item key={item.id} style={{ padding: '4px 0' }}>
                            <List.Item.Meta
                                title={<a href="https://ant.design">{item.title}</a>}
                                avatar={<Avatar src={item.image} shape="square" style={{ marginTop: '8px' }} />}
                                description={
                                    <Icons
                                        icons={[
                                            <IconText type="check" text={item.learned} key="list-vertical-heart" />,
                                            <IconText type="user" text={item.like} key="list-vertical-check" />,
                                        ]}
                                    />}
                            />
                            < div > {item.publishDate}</div>
                        </List.Item>
                    )}
                />
            </CompletedContentsCard>
        </div>
    )
}
export default CompletedContents