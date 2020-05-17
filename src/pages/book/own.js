import React from "react"

import SEO from "components/seo/seo"
import OwnBookList from "components/book/view/list/own-list"
import VerticalLayout from "components/layout/vertical"

const OwnedBookPage = () => (
    <VerticalLayout activeMenuKey="shelf">
        <SEO
            title="本棚"
            description="購入した技術書の一覧を確認できます。たくさんの技術書から多くのことを学び、あなたのスキルをさらに磨きましょう。"
        />
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <OwnBookList />
        </div>
    </VerticalLayout>
)

export default OwnedBookPage