import {FiInstagram, FiTwitter} from 'react-icons/fi'
import {VscGithubAlt} from 'react-icons/vsc'
import './index.css'

const Footer = () => (
  <div className="footer">
    <p className="covid-name-footer">
      COVID19<span className="india-name-footer">INDIA</span>
    </p>
    <p className="footer-tag">
      we stand with everyone fighting on the front lines
    </p>
    <div className="footer-icons-section">
      <VscGithubAlt className="footer-icon" />
      <FiInstagram className="footer-icon" />
      <FiTwitter className="footer-icon" />
    </div>
  </div>
)

export default Footer
