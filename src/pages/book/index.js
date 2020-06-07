import React from "react"
import withLocation from "components/wrapper/location";
import BookView from "components/book/view/detail"
import VerticalLayout from "components/layout/vertical";
import BookSEO from "components/seo/book-seo";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const BookPage = (props) => {
    const { id } = props.search
    if (!id) navigate("/404");

    return (
        <VerticalLayout>
            <BookSEO />
            <div style={{ maxWidth: "1100px", padding: '20px', margin: '0 auto' }}>
                <BookView id={id} />
            </div>
        </VerticalLayout>
    );
}

export default withLocation(BookPage)