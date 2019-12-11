import React from "react"
import { Radio, List, Card } from 'antd';
import IconText from 'components/text/icon'
import Icons from 'components/text/icons'

import styled from 'styled-components'

const CreatedContentsCard = styled(Card)`
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
    { id: '1', publishDate: '1日前', learned: 20, like: 23, title: 'Java11の新文法を理解する', image: 'https://cdn.freebiesupply.com/logos/thumbs/2x/java-logo.png' },
    { id: '2', publishDate: '1日前', learned: 20, like: 23, title: 'Ruby on Railsでアプリケーションを作る', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Devicon-ruby-plain-wordmark.svg/512px-Devicon-ruby-plain-wordmark.svg.png' },
    { id: '3', publishDate: '1日前', learned: 20, like: 23, title: 'C++のコアな関数の中身を読み解く', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/306px-ISO_C%2B%2B_Logo.svg.png' },
    { id: '4', publishDate: '1日前', learned: 20, like: 23, title: 'ReactとReduxで作成するモダンなフロントエンド環境', image: 'https://ja.reactjs.org/logo-og.png' },
    { id: '5', publishDate: '1日前', learned: 20, like: 2303, title: 'javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
]
const CreatedContents = () => {
    return (
        <div style={{ marginBottom: '24px' }}>
            <CreatedContentsCard
                title="作成したコンテンツ"
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
                                description={
                                    <div style={{ marginLeft: '0px', marginTop: '8px' }}>
                                        <Icons
                                            icons={[
                                                <IconText type="check" text={item.learned} key="list-vertical-heart" />,
                                                <IconText type="user" text={item.like} key="list-vertical-check" />,
                                            ]}
                                        />
                                    </div>
                                }
                            />
                            <div>{item.publishDate}</div>
                        </List.Item>
                    )}
                />
            </CreatedContentsCard>
        </div>
    )
}
export default CreatedContents