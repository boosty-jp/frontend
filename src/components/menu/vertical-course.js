import React from "react"
import { Icon, Menu } from 'antd';


const sections = [
    {
        title: 'JSXの基礎',
        id: 's-1',
        articles: [
            { id: 'a-1', title: 'Propsについて', learned: true },
            { id: 'a-2', title: 'Stateについて', learned: true },
            { id: 'a-3', title: '状態の管理方法を学ぶ', learned: true },
            { id: 'a-4', title: 'Storeを理解する', learned: true },
        ]
    },
    {
        title: 'コンポーネント思考',
        id: 's-2',
        articles: [
            { id: 'b-1', title: '関数コンポーネント', learned: true },
            { id: 'b-2', title: 'クラスコンポーネント', learned: false },
            { id: 'b-3', title: 'ライフサイクル', learned: false },
        ]
    },
    {
        title: '発展編',
        id: 's-3',
        articles: [
            { id: 'c-1', title: '既存のウェブサイトにReactを追加する', learned: true },
            { id: 'c-2', title: 'イベント処理', learned: true },
            { id: 'c-3', title: 'リストとkey', learned: true },
        ]
    },
    {
        title: '応用編',
        id: 's-4',
        articles: [
            { id: 'd-1', title: 'JSXの導入', learned: false },
            { id: 'd-2', title: 'フォームのバリデーション', learned: false },
            { id: 'd-3', title: 'stateのリフトアップ', learned: true },
            { id: 'd-4', title: 'コンポジション', learned: false },
            { id: 'd-5', title: '条件付きレンダー', learned: false },
            { id: 'd-6', title: 'レンダリングパフォーマンス', learned: false },
            { id: 'd-7', title: 'ComponentDidmount', learned: false },
        ]
    },
    {
        title: 'テストについて',
        id: 's-5',
        articles: [
            { id: 'e-1', title: 'テストの導入', learned: false },
            { id: 'e-2', title: 'ユニットテスト', learned: false },
            { id: 'e-3', title: 'リグレッションテスト', learned: true },
            { id: 'e-4', title: '総合テスト', learned: false },
            { id: 'e-5', title: 'e2eテスト', learned: false },
        ]
    },
]
const CourseMenu = ({ openedMenu, selectedMenu }) => {
    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={openedMenu}
            defaultSelectedKeys={selectedMenu}
        >
            {sections.map((s, s_idx) => {
                let allLearned = true;
                s.articles.forEach((a) => {
                    if (!a.learned) allLearned = false;
                })
                return (
                    <Menu.SubMenu
                        key={s.id}
                        title={
                            <>
                                <span style={{ marginRight: '8px' }}>{s_idx + 1}.</span>
                                {allLearned && <Icon type="check" style={{ marginRight: '4px', color: '#a0d911' }} />}
                                <span>{s.title}</span>
                            </>
                        }
                    >
                        {s.articles.map((a, a_idx) => {
                            return (
                                <Menu.Item key={"article-menu-" + a_idx + 1}>
                                    <span style={{ marginRight: '8px' }}>{s_idx + 1}-{a_idx + 1}.</span>
                                    {a.learned && <Icon type="check" style={{ marginRight: '4px', color: '#a0d911' }} />}
                                    <span> {a.title}</span>
                                </Menu.Item>
                            )
                        })}
                    </Menu.SubMenu>
                )
            })}
        </Menu>
    )
}

export default CourseMenu;