import React from "react"
import AvatarImage from 'components/avatar/image'

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontSize: 'bold',
    fontColor: 'black',
}

const BookAuthor = () => {
    return (
        <div style={{ marginTop: '20px', ...cardStyle }}>
            <p style={{ fontWeight: 'bold', color: 'black', fontSize: '22px', textAlign: 'center', marginBottom: '30px' }}>
                著者情報
            </p>
            <div style={{ margin: '0 auto', textAlign: 'center' }}>
                <AvatarImage displayName="吉岡 たかし" style={{ width: '100px', height: '100px', fontSize: '40px' }} size={100} />
                <p style={{ marginTop: '10px', color: 'black', fontSize: '20xp', marginBottom: '6px' }}>吉岡 たかし</p>
                <p style={{ fontSize: '14xp' }}>株式会社XXX シニアエンジニア</p>
            </div>
            <p style={{ fontSize: '18px' }}>株式会社XXXでSNSサービスの開発・マネジメントに従事。ソリューションアーキテクト資格保持。5年のAWS利用実績よりAWS公認のエバンジェリストを努め、カンファレンスなどでのAWSについての登壇回数は国内トップクラス。</p>
        </div>
    )
}

export default BookAuthor