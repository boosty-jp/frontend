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
    { id: '1', title: 'laula huso', image: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' },
    { id: '2', title: 'tomokiya', image: 'https://i.pravatar.cc/150?img=37' },
    { id: '3', title: '高田康暉', image: 'https://i.pravatar.cc/150?img=57' },
    { id: '4', title: 'Carij Deplau', image: 'https://i.pravatar.cc/150?img=69' },
    { id: '5', title: '松本ひろゆき', image: 'https://i.pravatar.cc/150?img=52' },
]
const TopicUserCard = () => {
    return (
        <div style={{ marginBottom: '24px' }}>
            <CategoryCard title="おすすめのユーザー">
                {categories.map((c) =>
                    <p key={c.id}>
                        <Avatar shape="circle" src={c.image} style={{ marginRight: '8px' }} />{c.title}
                    </p>
                )}
            </CategoryCard>
        </div>
    )
}
export default TopicUserCard