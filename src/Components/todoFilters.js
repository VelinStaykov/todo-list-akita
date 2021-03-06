import { StatusFilters } from '../Store/todoModel'

const TodoFilters = (props) => {

    const StatusFilter = ({ value: status, onChange }) => {
        const renderedFilters = Object.keys(StatusFilters).map((key) => {
            const value = StatusFilters[key]
            const handleClick = () => onChange(value)
            const className = value === status ? 'selected' : ''

            return (
                <li key={value}>
                    <button className={className} onClick={handleClick}>
                        {key}
                    </button>
                </li>
            )
        })

        return (
            <div className="filters statusFilters">
                <h5>Filter by Status</h5>
                <ul>{renderedFilters}</ul>
            </div>
        )
    }

    const status = props.status

    const onStatusChange = (status) => {
        props.updateFilter(status)
    }

    return (
        <footer className="filters">
            <StatusFilter value={status} onChange={onStatusChange} />
        </footer>
    )
}

export default TodoFilters