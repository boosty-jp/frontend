import React from "react"
import ContentLayout from "components/layout/content-layout";
import withLocation from "components/wrapper/location";
import SEO from "components/seo"
import BookView from "components/book/view/detail"

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const BookPage = (props) => {
    const { id } = props.search
    if (!id) navigate("/404");

    return (
        <ContentLayout>
            <SEO title="DEMO" />
            <div style={{ maxWidth: "900px", margin: 'auto', padding: '20px 16px' }}>
                <BookView id={id} />
            </div>
        </ContentLayout >
    );
}

export default withLocation(BookPage)