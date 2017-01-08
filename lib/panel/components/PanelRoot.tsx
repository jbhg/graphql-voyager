import * as _ from 'lodash';
import * as React from "react";
import { connect } from "react-redux"
import * as ReactModal from "react-modal";

import {
  changeActiveIntrospection,
  changeSortByAlphabet,
  changeSkipRelay,
  panelChangeIntrospectionLoadVisibility,
} from '../../actions/';

interface PanelRootProps {
  isLoading: boolean;
  sortByAlphabet: boolean;
  skipRelay: boolean;
  showIntrospectionLoad: boolean;
  activePreset: string;
  presetsNames: Array<string>;
}

function mapStateToProps(state) {
  return {
    isLoading: !state.svgRenderingFinished,
    sortByAlphabet: state.displayOptions.sortByAlphabet,
    skipRelay: state.displayOptions.skipRelay,
    showIntrospectionLoad: state.panel.showIntrospectionLoad,
    activePreset: state.introspection.activePreset,
    presetsNames: _.keys(state.introspection.presets),
  };
}

class PanelRoot extends React.Component<PanelRootProps, void> {
  render() {
      let {
        isLoading,
        sortByAlphabet,
        skipRelay,
        showIntrospectionLoad,
        activePreset,
        presetsNames,
      } = this.props;
      var dispatch = this.props['dispatch'];
      return (
        <div>
          <h1>GraphQL Voyager</h1>
          {isLoading &&
          <h2>
            Loading
          </h2>
          }
          <ReactModal isOpen={showIntrospectionLoad}
            contentLabel="Load Introspection"
            onRequestClose={
              () => dispatch(panelChangeIntrospectionLoadVisibility(false))
            }
          >
            <h2>Please select introspection:</h2>
            <form onSubmit={e => {
                e.preventDefault()
                var presetName = e.target['elements'].introspection.value
                dispatch(changeActiveIntrospection(presetName));
                dispatch(panelChangeIntrospectionLoadVisibility(false));
            }}>
              {_.map(presetsNames, (name,i) => <label key={i}>
                  <input type="radio" name="introspection" value={name}
                  defaultChecked={activePreset === name}/> {name}<br/>
                </label>
              )}
              <button type="submit"> Change Introspection </button>
            </form>
          </ReactModal>
          <button
            onClick={
              () => dispatch(panelChangeIntrospectionLoadVisibility(true))
            }
          > Load Introspection </button>
          <br/>
          <input type="checkbox" name="sortByAlphabet" checked={sortByAlphabet}
            onChange={
              (e) => dispatch(changeSortByAlphabet(e.target['checked']))
            }
          />
          sortByAlphabet <br/>
          <input type="checkbox" name="skipRelay" checked={skipRelay}
            onChange={
              (e) => dispatch(changeSkipRelay(e.target['checked']))
            }
          /> skipRelay
        </div>
      );
  }
}

export default connect(mapStateToProps)(PanelRoot);