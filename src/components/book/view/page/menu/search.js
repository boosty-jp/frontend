import React from "react"
import algoliasearch from 'algoliasearch/lite';
import { Input, Icon, AutoComplete, Typography } from 'antd';
import { InstantSearch, connectAutoComplete } from 'react-instantsearch-dom';
import { createPageViewLink } from "utils/link-generator";
import { Link } from 'gatsby'

const { Option } = AutoComplete;
const { Paragraph } = Typography;

const algoliaClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY
)

const searchClient = {
    search(requests) {
        if (requests.every(({ params }) => !params.query)) {
            return Promise.resolve({
                results: requests.map(() => ({
                    hits: [],
                    nbHits: 0,
                    nbPages: 0,
                    processingTimeMS: 0,
                })),
            });
        }

        return algoliaClient.search(requests);
    },
};

const Autocomplete = ({ hits, currentRefinement, refine }) => {
    const options = hits
        .map(hit => {
            console.log(hit);
            return (
                <Option key={hit.objectID} value={hit.title}>
                    <Link to={createPageViewLink(hit.objectID, hit.bookId)}>
                        <Paragraph style={{ color: 'black', fontSize: '16px', marginBottom: '8px' }}>{hit.title}</Paragraph>
                        <Paragraph ellipsis style={{ fontSize: '11px' }}>{hit.rawTexts}</Paragraph>
                    </Link>
                </Option>
            )
        });

    return (
        <>
            <AutoComplete
                className="certain-category-search"
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={false}
                dropdownStyle={{ maxWidth: '260px' }}
                size="large"
                style={{ width: '100%' }}
                dataSource={options}
                placeholder="検索"
                optionLabelProp=""
                onChange={value => refine(value)}
                value={currentRefinement}
            >
                <Input
                    suffix={<Icon type="search" className="certain-category-icon" />}
                />
            </AutoComplete>
        </>
    )
};

const CustomAutocomplete = connectAutoComplete(Autocomplete);

const App = () => (
    <InstantSearch indexName="page" searchClient={searchClient}>
        <CustomAutocomplete />
    </InstantSearch>
);
export default App;