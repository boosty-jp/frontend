import React from "react"
import { Input, Typography } from 'antd';

const SearchForm = () => (
    <>
        <div style={{ backgroundColor: 'white' }}>
            <div style={{ maxWidth: '100%', width: "1250px", margin: 'auto', padding: '30px 20px 30px 20px', position: 'relative' }}>
                <div style={{ textAlign: 'center' }}>
                    <Typography.Title level={3}>「React」の検索結果</Typography.Title>
                    <Input.Search
                        placeholder="検索ワードを入力する"
                        enterButton="検索"
                        size="large"
                        onSearch={value => console.log(value)}
                        style={{ maxWidth: 500 }}
                    />
                </div>
            </div>
        </div>
    </>
)

export default SearchForm