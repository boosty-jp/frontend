import React from "react"
import { Card, Avatar } from 'antd';

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
    { id: '1', title: 'Java', image: 'https://cdn.freebiesupply.com/logos/thumbs/2x/java-logo.png' },
    { id: '2', title: 'Ruby', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Devicon-ruby-plain-wordmark.svg/512px-Devicon-ruby-plain-wordmark.svg.png' },
    { id: '3', title: 'C++', image: 'https://www.brandeps.com/logo-download/C/C++-logo-vector-01.svg' },
    { id: '4', title: 'React', image: 'https://ja.reactjs.org/logo-og.png' },
    { id: '5', title: 'javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
]
const TopicCategoryCard = () => {
    return (
        <div style={{ marginBottom: '24px' }}>
            <CategoryCard title="おすすめのカテゴリー">
                {categories.map((c) =>
                    <p key={c.id}>
                        <Avatar shape="square" src={c.image} style={{ marginRight: '8px' }} />{c.title}
                    </p>
                )}
            </CategoryCard>
        </div>
    )
}
export default TopicCategoryCard