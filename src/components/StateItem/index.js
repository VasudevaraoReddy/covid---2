import {Component} from 'react'
import './index.css'
import statesList from '../../states'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
class StateItem extends Component {
  state = {stateData: [], allDistrictsData: []}

  componentDidMount() {
    this.getStateDetails()
  }

  getStateDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/covid19-state-wise-data`)
    const data = await response.json()
    console.log(data[id])
    const {total, meta, districts} = data[id]
    const confirmed = total.confirmed ? total.confirmed : 0
    const deceased = total.deceased ? total.deceased : 0
    const recovered = total.recovered ? total.recovered : 0
    const tested = total.tested ? total.tested : 0
    const internationalNumberFormat = new Intl.NumberFormat('en-US')
    const population = data[id].meta.population ? data[id].meta.population : 0
    const lastUpdateDate = new Date(meta.last_updated)
    const stateName = [statesList.find(state => state.state_code === id)]
    const date = lastUpdateDate.getDate()
    const year = lastUpdateDate.getUTCFullYear()
    const month = months[lastUpdateDate.getMonth()]
    const overallDate = `${month} ${date} ${year}`
    const a = {
      confirmed: internationalNumberFormat.format(confirmed),
      deceased: internationalNumberFormat.format(deceased),
      recovered: internationalNumberFormat.format(recovered),
      tested: internationalNumberFormat.format(tested),
      population,
      active: internationalNumberFormat.format(
        confirmed - (deceased + recovered),
      ),
      overallDate,
      stateName: stateName[0]?.state_name,
    }
    this.setState({stateData: a})
    const updatedDistrictsList = []
    const districtKeyNames = Object.keys(data[id].districts)
    districtKeyNames.forEach(eachDistrictName => {
      if (districts[eachDistrictName]) {
        const districtWiseConfirmed =
          districts[eachDistrictName].total?.confirmed
        const districtWiseDeceased = districts[eachDistrictName].total?.deceased
        const districtWiseRecovered =
          districts[eachDistrictName].total?.recovered
        const updatedEachDistrict = {
          districtWiseConfirmed,
          districtWiseRecovered,
          districtWiseDeceased,
          districtWiseActive:
            districtWiseConfirmed -
            (districtWiseDeceased + districtWiseRecovered),
          districtName: eachDistrictName,
        }
        updatedDistrictsList.push(updatedEachDistrict)
      }
    })
    this.setState({allDistrictsData: updatedDistrictsList})
  }

  render() {
    const {stateData} = this.state
    return (
      <div className="state-bg">
        <div className="state-top">
          <div className="state-left-section">
            <p className="state-name-heading">{stateData.stateName}</p>
            <p>Last Updated On {stateData.overallDate}</p>
          </div>
          <div className="state-right-section">
            <p>Tested</p>
            <p className="tested-count">{stateData.tested}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default StateItem
