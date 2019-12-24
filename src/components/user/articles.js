import React, { useState, useEffect, useRef } from "react"
import { List } from 'antd';
import AvatarLabel from "components/avatar/author-label";
import IconText from 'components/text/icon'

const listData = [];
for (let i = 0; i < 5; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `ant design part para para i pasdp pi aifa papa ${i}`,
        user: {
            image: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            name: 'tomokiya',
        },
        image: 'http://www.13and9design.com/wp-content/uploads/150324_139forWeverDucre_EUROLUCE_fb_titelbild.jpg',
        tags: [{ id: 1, title: 'ruby' }, { id: 2, title: 'gatsby' }]
    });
}

const UserCreatedArticles = () => {
    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    })

    let gridStyle;
    if (width < 500) {
        gridStyle = { width: '100%' }
    } else {
        gridStyle = { height: '120px', width: 'auto' }
    }

    return (
        <div ref={ref} style={{ background: 'white' }}>
            <List
                size="large"
                bordered
                dataSource={listData}
                itemLayout="vertical"
                header={<div style={{ fontWeight: '500', fontSize: '16px', color: 'rgba(0,0,0,0.85)' }}>記事</div>}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText type="heart" text="156" key="list-vertical-heart" />,
                            <IconText type="check" text="156" key="list-vertical-check" />,
                        ]}
                        extra={
                            <img
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                style={gridStyle}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={<p style={{ fontSize: '20px' }}>{item.title}</p>}
                            style={{ marginBottom: '0px' }}
                        />
                        <AvatarLabel name={item.user.name} image={item.user.image} updateDate="1日前" />
                    </List.Item>
                )}
            />
        </div>
    )
}
export default UserCreatedArticles