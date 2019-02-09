import {connect} from 'react-redux'
import ConfigurationView from 'components/configurationView'

const mapStateToProps = (state) => ({
  // app theme
  theme: state.settings.theme
})

const mapDispatchToProps = (dispatch) => ({
  // handleClickTab: (tab) => dispatch(openConfigTab(tab))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationView)
