export const getCondition = (page, filters, sorter) => {
    return (
        {
            filter: getFilter(filters),
            sortField: getSortField(sorter),
            sortOrder: getSortOrder(sorter),
            page: page.current,
            resultCount: page.pageSize,
        }
    )
}

const getFilter = (filters) => {
    if (!filters || !filters.status || !filters.status[0]) return ''
    return filters.status[0];
}

const getSortField = (sorter) => {
    if (!sorter || !sorter.field) return ''
    return sorter.field;
}

const getSortOrder = (sorter) => {
    if (!sorter || !sorter.order) return ''
    return sorter.order;
}