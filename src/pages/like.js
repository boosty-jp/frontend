import React from "react"
import SEO from "components/seo/seo"
import VerticalLayout from "components/layout/vertical"
import { Radio } from 'antd'
import { HeartTwoTone } from '@ant-design/icons';
import { isLoggedIn } from "services/local-user";
import NeedLoginComponent from "components/auth/need-login";
import LikedPageList from "components/book/view/page/like-list";
import LikedBookList from "components/book/view/list/like-list";

const boardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
    minHeight: '500px',
}

class LikedList extends React.Component {
    state = { mode: 'book' }

    changeMode = e => {
        this.setState({ mode: e.target.value });
    }

    render() {
        if (!isLoggedIn()) {
            return (<NeedLoginComponent />)
        }

        return (
            <div style={boardStyle}>
                <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
                    <HeartTwoTone twoToneColor="#ff7875" style={{ marginRight: '8px' }} /><span>お気に入り</span>
                </p>
                <Radio.Group defaultValue="book" buttonStyle="solid" onChange={this.changeMode}>
                    <Radio.Button value="book">技術書</Radio.Button>
                    <Radio.Button value="page">ページ</Radio.Button>
                </Radio.Group>
                {this.state.mode === "book" && <LikedBookList />}
                {this.state.mode === "page" && <LikedPageList />}
            </div>
        )
    }
}

const LikedPage = () => (
    <VerticalLayout activeMenuKey="like">
        <SEO title="お気に入り" description="お気に入り保存した技術書やページを確認できます。" />
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <LikedList />
        </div>
    </VerticalLayout>
)

export default LikedPage