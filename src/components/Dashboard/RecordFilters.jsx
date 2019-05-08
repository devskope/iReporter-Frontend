import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import StatusFilter from './StatusFilter';

const RecordFilters = ({
  setTypeFilter,
  setStatusFilter,
  statusFilter: currentStatus,
}) => {
  const [mobileToggleActive, setMobileToggleActive] = useState(false);

  const mobileToggleClass = classNames({
    'dashboard__filter-toggle': true,
    active: mobileToggleActive,
  });

  const statusFilterClass = classNames({
    'dashboard__filter-categories': true,
    active: mobileToggleActive,
  });

  return (
    <div className="dashboard__filters">
      <select
        className="dashboard__filter-report-types"
        onChange={setTypeFilter}
      >
        <option value="">All</option>
        <option value="red-flag">Red Flag</option>
        <option value="intervention">Intervention</option>
      </select>

      <button
        onClick={() => setMobileToggleActive(!mobileToggleActive)}
        className={mobileToggleClass}
        type="button"
      >
        Status
      </button>
      <ul className={statusFilterClass}>
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
};

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
