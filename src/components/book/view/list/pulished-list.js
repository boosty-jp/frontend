import React from "react"

import Book1Image from 'images/book-cover-1.png'
import Book2Image from 'images/book-cover-2.png'
import Book3Image from 'images/book-cover-3.png'
import Book4Image from 'images/book-cover-4.png'
import { List, Select } from 'antd'
import { Link } from "gatsby"
import OwnBookItem from 'components/book/view/list/item'
import SimpleBorderedShadowButton from "components/button/simple-border-shadow"

const { Option } = Select

let books = [
    {
        title: 'React Redux入門書',
        imageUrl: Book1Image,
        author: { name: '金沢 たかし' },
    },
    {
        title: '詳細解説 Vue.js',
        imageUrl: Book2Image,
        author: { name: '山下 智己' },
    },
    {
        title: 'Ruby on Rails パーフェクトガイド',
        imageUrl: Book3Image,
        author: { name: '池上 拓' },
    },
    {
        title: '今すぐ使えるJavascriptテクニック',
        imageUrl: Book4Image,
        author: { name: '渡辺 秀作' },
    },
]

books = [...books, ...books, ...books, ...books, ...books, ...books, ...books, ...books, ...books, ...books]

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
}

const PublishedBookList = () => (
    <div style={cardStyle}>
        <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'black', textAlign: 'center' }}>著書</p>
        <div style={{ textAlign: 'right', marginBottom: '40px' }}>
            <span style={{ marginRight: '18px' }}>並び替え: </span>
            <Select defaultValue="saleDate" style={{ width: 150 }} >
                <Option value="saleDate">発売日</Option>
                <Option value="updateDate">改定日</Option>
                <Option value="title">タイトル</Option>
            </Select>
        </div>
        <List
            grid={{
                gutter: 16,
                xs: 3,
                sm: 4,
                md: 4,
                lg: 6,
                xl: 6,
                xxl: 6,
            }}
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 12,
            }}
            dataSource={books}
            renderItem={book => (
                <List.Item>
                    <Link to="/book">
                        <div style={{ width: '100%', margin: '0 auto' }}>
                            <OwnBookItem imageUrl={book.imageUrl} title={book.title} author={{ name: "" }} />
                        </div>
                    </Link>
                </List.Item>
            )}
        />
        <div style={{ marginTop: '20px', textAlign: "center" }}>
            <SimpleBorderedShadowButton color="#1890ff" text="一覧を見る"></SimpleBorderedShadowButton>
        </div>
    </div>
)

export default PublishedBookList