// @flow

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';

const greenColor = green['500'];
const yellowColor = yellow['800'];
const redColor = red['500'];


const styles = theme => ({
  factorFieldTable: {
    marginTop: 20,
    marginBottom: 20,
  },

  cell: {
    padding: 10,
    textAlign: 'center',
    border: 'none',
  },

  disabledType: {
    color: theme.palette.grey[400],
  },

  rightText: {
    textAlign: 'right',
  },

  indexCell: {
    width: '3%',
    padding: 10,
    textAlign: 'center',
  },
  factorCell: {
    width: '25%',
    padding: 10,
  },
  evidenceCell: {
    width: '30%',
    textAlign: 'center',
    padding: '5px 10px 20px 0',
  },
  profileScoreCell: {
    width: '10%',
    textAlign: 'center',
    padding: 10,
  },
  panelScoreCell: {
    width: '10%',
    padding: 10,
  },
  resultCell: {
    width: '10%',
    textAlign: 'center',
    padding: 10,
  },
  jeScoreCell: {
    width: '12%',
    textAlign: 'center',
    padding: 10,
  },
  expansionPanel: {
    boxShadow: 'none',
    maxWidth: 300,
  },
  expansionPanelSummaryRoot: {
    paddingLeft: 0,
  },
  expansionPanelDetailsRoot: {
    paddingLeft: 0,
  },
  expansionPanelDisabled: {
    backgroundColor: 'inherit',
  },
  match: {
    backgroundColor: greenColor,
    color: 'white',
  },
  nonMatch: {
    backgroundColor: redColor,
    color: 'white',
  },
  variant: {
    backgroundColor: yellowColor,
    color: 'white',
  },

  profileMatch: {
    backgroundColor: greenColor,
    color: 'white',
  },

  levelMatch: {
    backgroundColor: greenColor,
    color: 'white',
  },

  incomplete: {
    backgroundColor: yellowColor,
    color: 'white',
  },
});

export default styles;
