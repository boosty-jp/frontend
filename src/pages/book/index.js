import React from "react"
import ContentLayout from "components/layout/content-layout";
import SEO from "components/seo"
import Book1Image from 'images/book1.png'
import BookDetailCard from "components/book/view/detail/card"
import BookCardList from "components/book/view/list/card-list"

const course = {
    title: 'AWS 入門書',
    imageUrl: Book1Image,
    author: { name: '吉岡 たかし' },
    price: 2980
}

const CoursePage = () => {

    return (
        <ContentLayout>
            <SEO title="DEMO" />
            <div style={{ maxWidth: "900px", margin: 'auto', padding: '20px 16px' }}>
                <BookDetailCard title={course.title} imageUrl={course.imageUrl} author={course.author} price={course.price} />
                <p style={{ fontWeight: 'bold', color: 'black', fontSize: '22px', textAlign: 'center', margin: '30px auto 10px auto' }}>
                    おすすめの教材
            </p>
                <BookCardList />
            </div>
        </ContentLayout >
    );
}

export default CoursePage;