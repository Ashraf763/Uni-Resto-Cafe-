import './index.css'

const FailureView = () => (
  <div className="failure-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      alt="failure"
      className="failure-image"
    />
    <h1>Oops! something went wrong</h1>
    <p>We cant find the items you are looking for</p>
  </div>
)

export default FailureView
