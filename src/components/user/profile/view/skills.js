import React from "react"
import { List, Card, Avatar } from 'antd';
import styled from 'styled-components'
import IMG_1 from 'images/prize/2.svg'
import IMG_2 from 'images/prize/15.svg'
import IMG_3 from 'images/prize/36.svg'
import IMG_4 from 'images/prize/101.svg'
import IMG_5 from 'images/prize/55.svg'

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
    { id: '1', publishDate: '1日前', image: IMG_1, learned: 20, like: 23, title: 'Java文法マスター' },
    { id: '2', publishDate: '1日前', image: IMG_2, learned: 20, like: 23, title: 'Ruby on Rails基礎' },
    { id: '3', publishDate: '1日前', image: IMG_3, learned: 20, like: 23, title: 'C++初心者' },
    { id: '4', publishDate: '1日前', image: IMG_4, learned: 20, like: 23, title: 'ReactとRedux達人' },
    { id: '5', publishDate: '1日前', image: IMG_5, learned: 20, like: 2303, title: 'javascript' },
]

const TopSkills = () => {
    return (
        <div style={{ marginBottom: '24px' }}>
            <CategoryCard title="スキル" extra={<a href="#">すべて見る</a>}>
                <List
                    dataSource={categories}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.image} shape="square" />
                                }
                                title={<a href="https://ant.design">{item.title}</a>}
                            />
                        </List.Item>
                    )}
                />
            </CategoryCard>
        </div>
    )
}
export default TopSkills