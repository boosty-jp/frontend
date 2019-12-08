import React from "react"
import { List, Card, Avatar } from 'antd';

import styled from 'styled-components'

const CategoryCard = styled(Card)`
  .ant-card-body {
    padding: 16px;
  }
  .ant-card-head {
    padding: 8px 8px 8px 16px
  }
  .ant-card-head-title {
    padding: 8px 0px
  }
`;

const categories = [
    { id: '1', point: 23, title: 'Java', image: 'https://cdn.freebiesupply.com/logos/thumbs/2x/java-logo.png' },
    { id: '2', point: 23, title: 'Ruby', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Devicon-ruby-plain-wordmark.svg/512px-Devicon-ruby-plain-wordmark.svg.png' },
    { id: '3', point: 23, title: 'C++', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/306px-ISO_C%2B%2B_Logo.svg.png' },
    { id: '4', point: 23, title: 'React', image: 'https://ja.reactjs.org/logo-og.png' },
    { id: '5', point: 2303, title: 'javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
]
const TopCategories = () => {
    return (
        <div style={{ marginBottom: '24px' }}>
            <CategoryCard title="上位のカテゴリー">
                <List
                    dataSource={categories}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.image} />
                                }
                                title={<a href="https://ant.design">{item.title}</a>}
                            />
                            <div>{item.point} pt</div>
                        </List.Item>
                    )}
                />
            </CategoryCard>
        </div>
    )
}
export default TopCategories