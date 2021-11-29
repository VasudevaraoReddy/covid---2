import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class About extends Component {
  state = {faqsList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getFaqs()
  }

  getFaqs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch('https://apis.ccbp.in/covid19-faqs')
    if (response.ok === true) {
      const data = await response.json()
      const updatedFaqsList = data.faq.map(each => ({
        qno: each.qno,
        question: each.question,
        answer: each.answer,
        category: each.category,
      }))
      this.setState({
        faqsList: updatedFaqsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFaqsListView = () => {
    const {faqsList} = this.state
    return (
      <ul className="ul">
        {faqsList.map(eachFaq => (
          <li key={eachFaq.qno}>
            <p className="question">{eachFaq.question}</p>
            <p className="answer">{eachFaq.answer}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="Oval" color="#007bff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="fail-image"
      />
      <p>Oops! Something Went Wrong</p>
      <button className="retry-btn" type="button" onClick={this.getFaqs}>
        Retry
      </button>
    </div>
  )

  renderAll = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderFaqsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="about-bg">
        <div className="about-section">
          <h1 className="about-head">About</h1>
          <p className="last-update">Latest Update</p>
          <h1 className="about-head-2">
            COVID-19 vaccines be ready for distribution
          </h1>
          {this.renderAll()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default About
