import React from 'react';

import modalStore from '/imports/stores/modalStore';

import {createProvider} from '/imports/components/Provider';

import RecruiterLandingView from '/imports/views/landing/RecruiterLandingView';

class App extends React.Component {

  renderPage() {
    // TODO: show the actual page based on the route
    return (<RecruiterLandingView  />);
  }

  renderCurrentModal() {
    let currentModal = this.props.modalData.current;
    if (currentModal) {
      return React.createElement(currentModal.component, currentModal.params);
    }

    return null;
  }

  renderGrowlContainer() {
    return (
      <div className="growl-container" />
    );
  }

  render() {
    return (
      <div>
        {this.renderCurrentModal()}
        {this.renderGrowlContainer()}
        {this.renderPage()}
      </div>
    );
  }

}

export default createProvider({modalData: modalStore}, <App />);
