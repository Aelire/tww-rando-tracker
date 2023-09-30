import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useId } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

function Tooltip({ children, tooltipContent }) {
  if (_.isNil(tooltipContent)) {
    return children;
  }

  const tooltipId = useId();

  return (
    <div
      className="tooltip-wrapper"
      data-tooltip-id={tooltipId}
      data-tooltip-place="bottom"
      data-tooltip-variant="light"
    >
      {children}
      <ReactTooltip
        id={tooltipId}
        className="tooltip-element"
      >
        {tooltipContent}
      </ReactTooltip>
    </div>
  );
}

Tooltip.defaultProps = {
  tooltipContent: null,
};

Tooltip.propTypes = {
  children: PropTypes.element.isRequired,
  tooltipContent: PropTypes.node,
};

export default Tooltip;
