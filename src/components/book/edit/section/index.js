import React from 'react';
import BookEditSections from './sections';
import BookEditSectionHeader from './header';

const BookEditSectionsComponent = () => {
    return (
        <>
            <BookEditSectionHeader />
            <div style={{ marginTop: '20px' }}>
                <BookEditSections />
            </div>
        </>
    );

}
export default BookEditSectionsComponent;