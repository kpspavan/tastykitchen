import './index.css'

const Filter = props => {
  const {sortByOptions, updateaction, activesort} = props

  const onchangeby = event => {
    updateaction(event.target.value)
  }

  return (
    <div>
      <div className="filter-flex">
        <div>
          <h1 className="filter-h1">Popular Restaurants</h1>
          <p className="filter-para">
            Select Your favourite restaurant special dish and makes your day
            happy...
          </p>
        </div>
        <div className="flex">
          <h1 className="filter-sort">Sort By</h1>
          <select
            value={activesort}
            onChange={onchangeby}
            className="filter-select"
          >
            {sortByOptions.map(eachOption => (
              <option key={eachOption.id}>{eachOption.value}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
export default Filter
