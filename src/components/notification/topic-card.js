import React from "react"
import { Divider, Card, Icon } from 'antd';
import { presetPalettes } from '@ant-design/colors'
import styled from 'styled-components'

const NotificationCard = styled(Card)`
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

const notifications = [
    { id: '1', title: 'メンテナンスのお知らせ', important: true, publishDate: '1日前' },
    { id: '2', title: 'Ver2.0のリリース予定', publishDate: '3日前' },
    { id: '3', title: '新しいカテゴリーの追加', publishDate: '2019年11月23日' },
    { id: '4', title: '不具合周知', publishDate: '2019年9月2日' },
    { id: '5', title: 'カリキュラムが10000を超えました', publishDate: '2019年1月2日' },
]

Icon.setTwoToneColor(presetPalettes.red.primary);

const TopicNotificationCard = () => {
    return (
        <NotificationCard title="お知らせ" >
            {notifications.map((c, idx) => {
                const isLast = idx === notifications.length - 1
                return (
                    <>
                        <p key={c.id} style={{ marginBottom: '4px' }}>
                            {c.important &&
                                <Icon type="warning" theme="twoTone" style={{ marginRight: '4px' }} />
                            }
                            {c.title}
                        </p>
                        <p style={{ color: presetPalettes.grey[1], fontSize: '12px', marginBottom: '4px' }}>
                            {c.publishDate}
                        </p>
                        {!isLast &&
                            <Divider style={{ margin: '12px 0px' }} />
                        }
                    </>
                )
            }
            )}
        </NotificationCard>
    )
}
export default TopicNotificationCard