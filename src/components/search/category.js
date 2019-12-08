import React from "react"
import { Tag, Typography, Divider } from 'antd';
import { Link } from "gatsby";

const categories = [
    { id: 1, title: 'React' },
    { id: 2, title: 'Javascript' },
    { id: 3, title: '開発環境' },
    { id: 4, title: 'Java' },
    { id: 5, title: '外国語' },
    { id: 6, title: 'スペイン語' },
    { id: 7, title: 'C++' },
    { id: 8, title: '応用情報技術者試験' },
]
const SearchCategoryForm = () => (
    <>
        <div style={{ backgroundColor: 'white' }}>
            <div style={{ maxWidth: '100%', width: "1250px", margin: 'auto', padding: '30px 20px 30px 20px', position: 'relative' }}>
                <div style={{ textAlign: 'center' }}>
                    <Typography.Title level={3}>「フロントエンド」のカテゴリー</Typography.Title>
                </div>
                <div style={{ margin: '40px auto 0px auto', textAlign: 'center' }}>
                    <Divider>
                        <span style={{ fontSize: '14px' }}>他のカテゴリー<Link to="/" style={{ fontWeight: '350' }}> (一覧表示)</Link></span>
                    </Divider>
                    {categories.map((c) => {
                        return (
                            <Tag key={c.id}>{c.title}</Tag>
                        )
                    })}
                </div>
            </div>
        </div>
    </>
)

export default SearchCategoryForm