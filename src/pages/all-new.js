import React from "react"
import VerticalLayout from "components/layout/vertical";
import { getCurrentUser } from "services/local-user";
import AllNewList from "components/book/view/list/all-new-list"
import NOSEO from "components/seo/noseo";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const AllNewPage = () => {
    const userId = getCurrentUser().userId;
    if (userId !== process.env.GATSBY_ADMIN_USER_ID) navigate("/404");

    return (
        <VerticalLayout activeMenuKey="shelf">
            <NOSEO title="新刊の本" />
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                <AllNewList />
            </div>
        </VerticalLayout>
    )
}
export default AllNewPage