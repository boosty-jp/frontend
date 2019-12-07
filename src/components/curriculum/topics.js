import React, { useState, useEffect, useRef } from "react"
import { Icon, Card } from 'antd';
import AvatarLabel from "components/avatar";
import { Link } from 'gatsby'
import styled from 'styled-components'

const TopicCard = styled(Card)`
  .ant-card-grid {
    padding: 16px;
  }
`;


const curriculums = [];
for (let i = 0; i < 5; i++) {
    curriculums.push({
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

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

const Icons = ({ icons }) => (
    <ul class="ant-list-item-action" style={{ marginLeft: '0px', marginTop: '8px' }}>
        {icons.map((i, idx) => {
            const isLast = idx === icons.length - 1
            return (
                <li key={"topic-curriculum-icons-" + idx}>
                    {i}
                    {!isLast &&
                        <em class="ant-list-item-action-split"></em>
                    }
                </li>
            )
        })}
    </ul>
)


const TopicCurriculums = () => {
    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    })

    let gridStyle;
    if (width < 480) {
        gridStyle = { width: '100%' }
    } else if (width < 720) {
        gridStyle = { width: '50%' }
    }
    // 何もしなければデフォルトで3分割される

    return (
        <div ref={ref} style={{ marginBottom: '24px' }}>
            <TopicCard
                title="おすすめのカリキュラム"
                extra={<Link to="/" >さらに表示</Link>}
            >
                {curriculums.map((c) =>
                    <Card.Grid key={c.id} style={gridStyle}>
                        <img alt={c.title} src={c.image} style={{ width: '100%' }} />
                        <div className="ant-card-meta-title" style={{ marginTop: '4px', marginBottom: '8px' }}>{c.title}</div>
                        <AvatarLabel name={c.user.name} image={c.user.image} updateDate="1日前" />
                        <Icons
                            icons={[
                                <IconText type="heart" text="156" key="list-vertical-heart" />,
                                <IconText type="heart" text="156" key="list-vertical-heart" />,
                                <IconText type="check" text="156" key="list-vertical-check" />,
                            ]}
                        />
                    </Card.Grid>
                )}
            </TopicCard>
        </div>
    )
}
export default TopicCurriculums