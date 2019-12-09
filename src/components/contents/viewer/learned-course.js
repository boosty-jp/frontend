import React from "react"
import { List } from 'antd';
import IconText from 'components/text/icon'
import Icons from 'components/text/icons'

const categories = [
    { id: '1', publishDate: '1日前', learned: 20, like: 23, title: 'Java11の新文法を理解する', image: 'https://cdn.freebiesupply.com/logos/thumbs/2x/java-logo.png' },
    { id: '2', publishDate: '1日前', learned: 20, like: 23, title: 'Ruby on Railsでアプリケーションを作る', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Devicon-ruby-plain-wordmark.svg/512px-Devicon-ruby-plain-wordmark.svg.png' },
    { id: '3', publishDate: '1日前', learned: 20, like: 23, title: 'C++のコアな関数の中身を読み解く', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/306px-ISO_C%2B%2B_Logo.svg.png' },
    { id: '4', publishDate: '1日前', learned: 20, like: 23, title: 'ReactとReduxで作成するモダンなフロントエンド環境', image: 'https://ja.reactjs.org/logo-og.png' },
    { id: '5', publishDate: '1日前', learned: 20, like: 2303, title: 'javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
    { id: '6', publishDate: '1日前', learned: 20, like: 23, title: 'Java11の新文法を理解する', image: 'https://cdn.freebiesupply.com/logos/thumbs/2x/java-logo.png' },
    { id: '7', publishDate: '1日前', learned: 20, like: 23, title: 'Ruby on Railsでアプリケーションを作る', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Devicon-ruby-plain-wordmark.svg/512px-Devicon-ruby-plain-wordmark.svg.png' },
    { id: '8', publishDate: '1日前', learned: 20, like: 23, title: 'C++のコアな関数の中身を読み解く', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/306px-ISO_C%2B%2B_Logo.svg.png' },
    { id: '9', publishDate: '1日前', learned: 20, like: 23, title: 'ReactとReduxで作成するモダンなフロントエンド環境', image: 'https://ja.reactjs.org/logo-og.png' },
    { id: '10', publishDate: '1日前', learned: 20, like: 2303, title: 'javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
    { id: '11', publishDate: '1日前', learned: 20, like: 23, title: 'Java11の新文法を理解する', image: 'https://cdn.freebiesupply.com/logos/thumbs/2x/java-logo.png' },
    { id: '12', publishDate: '1日前', learned: 20, like: 23, title: 'Ruby on Railsでアプリケーションを作る', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Devicon-ruby-plain-wordmark.svg/512px-Devicon-ruby-plain-wordmark.svg.png' },
    { id: '13', publishDate: '1日前', learned: 20, like: 23, title: 'C++のコアな関数の中身を読み解く', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/306px-ISO_C%2B%2B_Logo.svg.png' },
    { id: '14', publishDate: '1日前', learned: 20, like: 23, title: 'ReactとReduxで作成するモダンなフロントエンド環境', image: 'https://ja.reactjs.org/logo-og.png' },
    { id: '15', publishDate: '1日前', learned: 20, like: 2303, title: 'javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
]
const LearnedCourse = () => {
    return (
        <div style={{ marginBottom: '24px' }}>
            <List
                dataSource={categories}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                renderItem={item => (
                    <List.Item key={item.id} style={{ padding: '4px 0' }}>
                        <List.Item.Meta
                            title={<a href="https://ant.design">{item.title}</a>}
                            description={
                                <Icons
                                    icons={[
                                        <IconText type="heart" text={item.like} key="list-vertical-check" />,
                                        <IconText type="check" text={item.learned} key="list-vertical-heart" />,
                                        <IconText type="user" text={item.learned} key="list-vertical-heart" />,
                                    ]}
                                />}
                        />
                        <div>{item.publishDate}</div>
                    </List.Item>
                )}
            />
        </div>
    )
}
export default LearnedCourse