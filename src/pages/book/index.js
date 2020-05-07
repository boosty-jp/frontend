import React from "react"
import withLocation from "components/wrapper/location";
import SEO from "components/seo"
import BookView from "components/book/view/detail"
import VerticalLayout from "components/layout/vertical";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const BookPage = (props) => {
    const { id, preview } = props.search
    if (!id) navigate("/404");

    return (
        <VerticalLayout>
            <SEO title="DEMO" />
            <div style={{ maxWidth: "1100px", padding: '20px', margin: '0 auto' }}>
                <BookView id={id} preview={preview} />
            </div>
        </VerticalLayout>
    );
}

export default withLocation(BookPage)