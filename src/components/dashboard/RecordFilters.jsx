import React /* useEffect */ from 'react';
import PropTypes from 'prop-types';
import StatusFilter from './StatusFilter';

const RecordFilters = ({
  setTypeFilter,
  setStatusFilter,
  statusFilter: currentStatus,
}) => (
  <div className="dashboard__filters">
    <select className="dashboard__filter-report-types" onChange={setTypeFilter}>
      <option value="">All</option>
      <option value="red-flag">Red Flag</option>
      <option value="intervention">Intervention</option>
    </select>

    <button className="dashboard__filter-toggle" type="button">
      Status
    </button>
    <ul className="dashboard__filter-categories">
      <StatusFilter
        setStatusFilter={setStatusFilter}
        value="All"
        active={currentStatus === ''}
      />
      <StatusFilter
        setStatusFilter={setStatusFilter}
        value="Draft"
        active={currentStatus === 'draft'}
      />
      <StatusFilter
        setStatusFilter={setStatusFilter}
        value="Under Investigation"
        active={currentStatus === 'under investigation'}
      />
      <StatusFilter
        setStatusFilter={setStatusFilter}
        value="Resolved"
        active={currentStatus === 'resolved'}
      />
      <StatusFilter
        setStatusFilter={setStatusFilter}
        value="Rejected"
        active={currentStatus === 'rejected'}
      />
    </ul>
  </div>
);

RecordFilters.defaultProps = {
  setTypeFilter: x => x,
  setStatusFilter: x => x,
  statusFilter: '',
};

RecordFilters.propTypes = {
  setTypeFilter: PropTypes.func,
  setStatusFilter: PropTypes.func,
  statusFilter: PropTypes.string,
};

export default RecordFilters;
