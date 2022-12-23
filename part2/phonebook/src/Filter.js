const Filter = ({filterRule, handleFiltering}) => <>
    filter shown with: <input value={filterRule} onChange={handleFiltering} />
</>

export default Filter