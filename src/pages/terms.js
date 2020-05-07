import React from 'react'
import SEO from 'components/seo'
import { Typography, Divider } from 'antd';
import TermLayout from 'components/layout/term-layout';

const { Title, Paragraph } = Typography;

const TermsPage = () => {
    return (
        <TermLayout activePage="term">
            <SEO />
            <Typography>
                <Title level={1} style={{ marginBottom: '30px', textAlign: 'center' }}>利用規約</Title>
                <div>
                    <Paragraph>
                        この利用規約（以下「本規約」といいます。）は、「サービス名」等、株式会社wever（以下「当社」といいます。）が提供する全てのサービス（以下「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下「ユーザー」といいます。）が本サービスをご利用の際は、本規約にご同意されたものとみなします。
                    </Paragraph>
                </div>
                <Divider />
                <Title level={2} >第1条（適用）</Title>
                <div>
                    <Paragraph>
                        1. 本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。
                    </Paragraph>
                    <Paragraph>
                        2. 当社は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
                    </Paragraph>
                    <Paragraph>
                        3. 本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。
                    </Paragraph>
                </div>
                <Divider />
                <Title level={2} >
                    第2条（利用登録）
                </Title>
                <div>
                    <Paragraph>
                        1. 本サービスにおいては、利用希望者が本規約に同意の上、当社の定める方法によって利用登録を申請し、当社が承認通知を送信することによって、利用登録が完了するものとします。
                    </Paragraph>
                    <Paragraph>
                        2. 利用希望者は、本サービス利用登録時に、当社が指定する利用希望者に関する情報（以下「ユーザー情報」といいます。）を登録する必要があります。ユーザーは、利用登録完了後にユーザー情報に変更が生じた場合は、速やかに当社の定める方法で変更手続きを行うものとします。
                    </Paragraph>
                    <Paragraph>
                        3. 当社は、利用希望者に以下の事由があると判断した場合、登録申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
                    </Paragraph>
                    <Paragraph>
                        ①利用登録の申請に際して、ユーザー情報に虚偽があることが判明した場合
                    </Paragraph>
                    <Paragraph>
                        ②本規約に違反したことがある者からの申請である場合
                    </Paragraph>
                    <Paragraph>
                        ③その他、当社が利用登録を相当でないと判断した場合
                     </Paragraph>
                </div>
                <Divider />
                <Title level={2} >
                    第3条（ユーザーIDおよびログインパスワードの管理）
                </Title>
                <div>
                    <Paragraph>
                        1. ユーザーは、自己の責任において、本サービスのユーザーIDおよびログインパスワードを適切に管理するものとします。
                    </Paragraph>
                    <Paragraph>
                        2. 登録ユーザーは、別途当社が許可した場合を除き、1人につき1つのアカウントを保有できるものとします。
                    </Paragraph>
                    <Paragraph>
                        3. ユーザーは、いかなる場合にも、ユーザーIDおよびログインパスワードを第三者に譲渡または貸与し、もしくは不特定多数で共用することはできません。当社は、ユーザーIDとログインパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。
                    </Paragraph>
                    <Paragraph>
                        4. ユーザーID及びログインパスワードが第三者に不正に使用されたことによって生じた損害について、当社は一切の責任を負わないものとします。
                    </Paragraph>
                </div>
                <Divider />
                <Title level={2} >
                    第4条（利用料金および支払方法）
                    </Title>
                <div>
                    <Paragraph>
                        1. ユーザーは、本サービスの有料部分の対価として、当社が別途定め、本ウェブサイトに表示する利用料金を、当社が指定する方法により支払うものとします。
                    </Paragraph>
                    <Paragraph>
                        2. ユーザーが利用料金の支払を遅滞した場合には、ユーザーは年14．6％の割合による遅延損害金を支払うものとします。
                    </Paragraph>
                </div>
                <Divider />
                <Title level={2} >
                    第5条（禁止事項）
                </Title>
                <div>
                    ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
                    <Paragraph>1. 法令または公序良俗に違反する行為</Paragraph>
                    <Paragraph>2. 犯罪行為に関連する行為</Paragraph>
                    <Paragraph>3. 当社、本サービスの他のユーザー、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</Paragraph>
                    <Paragraph>4. 当社のサービスの運営を妨害するおそれのある行為</Paragraph>
                    <Paragraph>5. 他のユーザーに関する個人情報等を収集または蓄積する行為</Paragraph>
                    <Paragraph>6. 不正アクセスをし、またはこれを試みる行為</Paragraph>
                    <Paragraph>7. 他のユーザーに成りすます行為</Paragraph>
                    <Paragraph>8. 当社のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</Paragraph>
                    <Paragraph>9. 当社、本サービスの他のユーザーまたは第三者の著作権、知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為</Paragraph>
                    <Paragraph>10. 以下の表現を含み、または含むと当社が判断する内容を本サービス上に投稿し、または送信する行為</Paragraph>
                    <Paragraph>①　当社、本サービスの他のユーザーまたは第三者の著作権、知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害するもの</Paragraph>
                    <Paragraph>②　過度に暴力的な表現、性的、わいせつ的、その他不快感を与える恐れのあるもの</Paragraph>
                    <Paragraph>③　人種、国籍、信条、性別、社会的身分、門地等による差別につながる表現</Paragraph>
                    <Paragraph>④　自殺、自傷行為、薬物乱用を誘引または助長する表現</Paragraph>
                    <Paragraph>⑤　その他反社会的な内容を含み他人に不快感を与える表現</Paragraph>
                    <Paragraph>11. 以下を目的とし，または目的とすると当社が判断する行為</Paragraph>
                    <Paragraph>①　営業、宣伝、広告、勧誘、その他営利を目的とする行為（当社の認めたものを除きます。）</Paragraph>
                    <Paragraph>②　性行為やわいせつな行為を目的とする行為</Paragraph>
                    <Paragraph>③　面識のない異性との出会いや交際を目的とする行為</Paragraph>
                    <Paragraph>④　他のユーザーに対する嫌がらせや誹謗中傷を目的とする行為</Paragraph>
                    <Paragraph>⑤　当社、本サービスの他のユーザー、または第三者に不利益、損害または不快感を与えることを目的とする行為</Paragraph>
                    <Paragraph>⑥　その他本サービスが予定している利用目的と異なる目的で本サービスを利用する行為</Paragraph>
                    <Paragraph>⑦　宗教活動または宗教団体への勧誘行為</Paragraph>
                    <Paragraph>⑧　その他、当社が不適切と判断する行為</Paragraph>
                </div>
                <Divider />
                <Title level={2} >
                    第6条（本サービスの提供の停止等）
                </Title>
                <div>
                    <Paragraph>
                        1. 当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知すること    なく本サービスの全部または一部の提供を停止または中断することができるものとします。
                    </Paragraph>
                    <Paragraph>
                        ① 本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
                    </Paragraph>
                    <Paragraph>
                        ② 地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困　難となった場合
                    </Paragraph>
                    <Paragraph>
                        ③ コンピュータまたは通信回線等が事故により停止した場合
                    </Paragraph>
                    <Paragraph>
                        ④ その他、当社が本サービスの提供が困難と判断した場合
                    </Paragraph>
                    <Paragraph>
                        2. 当社は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
                    </Paragraph>
                </div>
                <Divider />
                <Title level={2} >
                    第7条（著作権）
                    </Title>
                <div>
                    <Paragraph>
                        1. ユーザーは、自ら著作権等の必要な知的財産権を有するか、または必要な権利者の許諾    を得た投稿、コメント、テキストデータ、および画像や動画・音声ファイルなどの投稿テキストに付随して投稿されたデータ(以下「投稿内容」といいます)関してのみ、本サービスを利用し、投稿ないしアップロードすることができるものとします。ユーザーの投稿内容によって、第三者との間で何らかの紛争が発生した場合には、ユーザーの費用と責任において問題を解決するものとし、当社は一切の責任を負わないものとします。
                    </Paragraph>
                    <Paragraph>
                        2. ユーザーが本サービスを利用して投稿ないしアップロードした投稿内容の著作権については、当該ユーザーその他既存の権利者に留保されるものとします。ただし、当社は、本サービスを利用して投稿ないしアップロードされた投稿内容について、本サービスの改良、品質の向上、または不備の是正等ならびに本サービスの周知宣伝等に必要な範囲で、表示、編集、複製、転載、配布、公衆送信などができるものとし、かつその内容を無償にて利用（出版、映像、翻訳、電子書籍化などの利用の場合を含む）することできるものとします。
                    </Paragraph>
                    <Paragraph>
                        3. ユーザーは、本サービスを利用して投稿した投稿内容を、他のユーザーが使用することを許諾するものとし、特にコードなどプログラムに関するものは他のユーザーが商用私用問わず使用できるものとします。
                    </Paragraph>
                    <Paragraph>
                        4. 前項本文の定めるものを除き、本サービスおよび本サービスに関連する一切の情報についての著作権およびその他の知的財産権はすべて当社または当社にその利用を許諾した権利者に帰属し、ユーザーは無断で複製、譲渡、貸与、翻訳、改変、転載、公衆送信（送信可能化を含みます。）伝送、配布、出版、営業使用等をしてはならないものとします。
                    </Paragraph>
                    <Paragraph>
                        5. 当社、ユーザー、その他の第三者が投稿内容を利用したことによってユーザーおよび第三者に生じた損害については、当社では一切の保証をいたしません。
                    </Paragraph>
                </div>
                <Divider />
                <Title level={2} >
                    第8条（利用制限および登録抹消）
                </Title>
                <div>
                    <Paragraph>
                        1. 当社は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、投稿内容を削除または修正を行い、ユーザーに対して本サービスの全部もしくは一部の利用を制限しまたはユーザーとしての登録を抹消することができるものとします。ユーザーはこれについて一切の異議をとなえないものとします。
                    </Paragraph>
                    <Paragraph>① 本規約のいずれかの条項に違反した場合</Paragraph>
                    <Paragraph>② 登録事項に虚偽があることが判明した場合</Paragraph>
                    <Paragraph>③ ユーザーID及びログインパスワードを不正に使用した場合。</Paragraph>
                    <Paragraph>④ 本サービスで提供する情報を不正に使用した場合。</Paragraph>
                    <Paragraph>⑤ 料金等の支払債務の不履行があった場合</Paragraph>
                    <Paragraph>⑥ 当社からの連絡に対し、一定期間返答がない場合</Paragraph>
                    <Paragraph>⑦ 本サービスについて、最終の利用から一定期間利用がない場合</Paragraph>
                    <Paragraph>⑧ ユーザーが本サービス上に投稿した投稿内容不適切な内容であると当社が判断した場合。</Paragraph>
                    <Paragraph>⑨ その他、当社が本サービスの利用を適当でないと判断した場合</Paragraph>
                    <Paragraph>
                        2. 前項各号のいずれかに該当した場合、ユーザーは、当然に当社に対する一切の債務につ　いて期限の利益を失い、その時点において負担する一切の債務を直ちに一括して弁済しなければなりません。
                    </Paragraph>
                    <Paragraph>
                        3 当社は、本条に基づき当社が行った行為によりユーザーに生じた損害について、一切の責任を負いません。
                    </Paragraph>
                </div>
                <Divider />
                <Title level={2} >
                    第9条（ユーザーによる本サービスの終了）
                    </Title>
                <div>
                    ユーザーは、当社の定める退会手続により、本サービスを終了できるものとします。
                </div>
                <Divider />
                <Title level={2} >
                    第10条（退会後の取り扱い）
                </Title>
                <div>
                    当社は、ユーザーが本サービスの利用を終了した場合及び当社が本サービスを廃止したことなど、何らかの理由によりユーザーが本サービスの利用資格を失った後においても、ユーザーが登録したユーザー情報及び投稿内容を使用することができるものとします。
                </div>
                <Divider />
                <Title level={2} >
                    第11条（保証の否認および免責事項）
                    </Title>
                <div>
                    <Paragraph>
                        1. 当社は、以下の内容について明示的にも黙示的にも保証しておりません。
                    </Paragraph>
                    <Paragraph>① 本サービスが中断、遅延、廃止されないこと</Paragraph>
                    <Paragraph>② 本サービスが安全、確実もしくはいかなるエラー、バグも発生しないこと</Paragraph>
                    <Paragraph>③ 本サービスにいかなる瑕疵もないこと</Paragraph>
                    <Paragraph>④ 本サービスのサービス内容が　ユーザーの特定の目的に適合すること</Paragraph>
                    <Paragraph>⑤ 本サービスを通じてユーザーが登録するユーザー情報又は投稿内容が消失しないこと</Paragraph>
                    <Paragraph>⑥ ユーザーが本サービスを通じて取得する情報又は他のユーザーの投稿内容が正確、適正、信頼できるものであること</Paragraph>
                    <Paragraph>⑦ 本サービスを通じてユーザーが投稿した投稿内容に、コンピューターウィルス等有害なものが含まれていないこと。</Paragraph>
                    <Paragraph>
                        2. 当社は，本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。
                    </Paragraph>
                    <Paragraph>
                        3. 当社は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
                    </Paragraph>
                </div>
                <Divider />
                <Title level={2} >
                    第12条（サービス内容の変更等）
                </Title>
                <div>
                    当社は，ユーザーに通知することなく，本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。
                </div>
                <Divider />
                <Title level={2} >
                    第13条（利用規約の変更）
                </Title>
                <div>
                    <Paragraph>
                        1. 当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
                    </Paragraph>
                    <Paragraph>
                        2. 本規約の変更については、過去の規約に優先して適用されるものとし、本サービスに掲載をもって発効するものとします。
                    </Paragraph>
                </div>
                <Divider />
                <Title level={2} >
                    第14条（個人情報の取扱い）
                </Title>
                <div>
                    当社は，本サービスの利用によって取得する個人情報については，当社「プライバシーポリシー」に従い適切に取り扱うものとします。
                </div>
                <Divider />
                <Title level={2} >
                    第15条（通知または連絡）
                </Title>
                <div>
                    ユーザーと当社との間の通知または連絡は、当社の定める方法によって行うものとします。当社は、ユーザーから、当社が別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。
                </div>
                <Divider />
                <Title level={2} >
                    第16条（権利義務の譲渡の禁止）
                </Title>
                <div>
                    ユーザーは，当社の書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。
                </div>
                <Divider />
                <Title level={2} >
                    第17条（準拠法・裁判管轄）
                </Title>
                <div>
                    <Paragraph>
                        1. 本規約の解釈にあたっては，日本法を準拠法とします。
                    </Paragraph>
                    <Paragraph>
                        2. 本サービスに関して紛争が生じた場合には，当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
                    </Paragraph>
                </div>
            </Typography>
        </TermLayout>
    )
}

export default TermsPage