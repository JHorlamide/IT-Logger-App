import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logAction';

/*** Custom Component ***/
import LogsItem from './LogsItem';
import Preloader from '../Layout/Preloader';

const Logs = ({ log: { logs, loading }, getLogs }) => {
  /*** NOTE: Loads logs when component loads ***/
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
  }

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className="center">No logs to show...</p>
      ) : (
        logs.map((log) => {
          return <LogsItem key={log.id} log={log} />;
        })
      )}
    </ul>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    log: state.log,
  };
};

export default connect(mapStateToProps, { getLogs })(Logs);
