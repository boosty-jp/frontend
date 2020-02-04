import React from "react"

import Book1Image from 'images/book-cover-1.png'
import Book2Image from 'images/book-cover-2.png'
import Book3Image from 'images/book-cover-3.png'
import Book4Image from 'images/book-cover-4.png'
import { List } from 'antd'
import { Link } from "gatsby"
import OwnBookItem from 'components/book/view/list/item'
import SimpleBorderedShadowButton from "components/button/simple-border-shadow"

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

books = [...books]

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
}

const RecentViewedBookList = () => (
    <div style={cardStyle}>
        <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'black', textAlign: 'center' }}>最近見た本</p>
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
            dataSource={books}
            renderItem={book => (
                <List.Item>
                    <Link to="/book">
                        <div style={{ width: '100%', margin: '0 auto' }}>
                            <OwnBookItem imageUrl={book.imageUrl} title={book.title} author={book.author} />
                        </div>
                    </Link>
                </List.Item>
            )}
        />
        <div style={{ marginTop: '20px', textAlign: "center" }}>
            <SimpleBorderedShadowButton color="#1890ff" text="本棚を見る"></SimpleBorderedShadowButton>
        </div>
    </div>
)

export default RecentViewedBookList