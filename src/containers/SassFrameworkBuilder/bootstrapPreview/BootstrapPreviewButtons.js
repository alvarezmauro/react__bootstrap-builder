import React from 'react';

const BootstrapPreviewButton = () => {
  return (
    <div>
      <h1>Buttons</h1>

      <div className="mt-3 mb-5">
        <h3>Default buttons</h3>
        <button type="button" className="btn btn-primary">Primary</button>
        <button type="button" className="btn btn-secondary">Secondary</button>
        <button type="button" className="btn btn-info">Info</button>
        <button type="button" className="btn btn-success">Success</button>
        <button type="button" className="btn btn-warning">Warning</button>
        <button type="button" className="btn btn-danger">Danger</button>
        <button type="button" className="btn btn-light">Light</button>
        <button type="button" className="btn btn-dark">Dark</button>
        <button type="button" className="btn btn-link">Link</button>
      </div>

      <div className="mt-3 mb-5">
        <h3>Buttons with outline</h3>
        <button type="button" className="btn btn-outline-primary">Primary</button>
        <button type="button" className="btn btn-outline-secondary">Secondary</button>
        <button type="button" className="btn btn-outline-info">Info</button>
        <button type="button" className="btn btn-outline-success">Success</button>
        <button type="button" className="btn btn-outline-warning">Warning</button>
        <button type="button" className="btn btn-outline-danger">Danger</button>
        <button type="button" className="btn btn-outline-light">Light</button>
        <button type="button" className="btn btn-outline-dark">Dark</button>
      </div>



      <div className="mt-3 mb-5">
        <h3>Buttons sizes</h3>
        <button type="button" className="btn btn-success btn-sm">Small</button>
        <button type="button" className="btn btn-success">Default</button>
        <button type="button" className="btn btn-success btn-lg">Large</button>

        <button type="button" className="btn btn-danger btn-lg btn-block">Block level button</button>
      </div>



      <div className="mt-3 mb-5">
        <h3>Disabled button</h3>
        <p>
          <a className="btn btn-primary btn-lg disabled" role="button">The a Element</a>
        </p>

        <p>
          <button type="button" className="btn btn-lg btn-primary" disabled="disabled">The button Element</button>
        </p>

        <p>
          <input type="button" className="btn btn-lg btn-primary" disabled="disabled" value="The 'input' Element" />
        </p>
      </div>

    </div>
  );
};


export default BootstrapPreviewButton;
