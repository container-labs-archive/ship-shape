// @flow
import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
    primary: {
      light: '#6ec5ff',
      main: '#009874',
      dark: '#007d60',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff557c',
      main: '#e10050',
      dark: '#a80029',
      contrastText: '#fff',
    },
  },
});

import ProfileForm from 'Components/Profiles/ProfileForm';
import profile from './profile';
import { computeFactors } from 'Utils/matcher/factors';
import { fieldKeys, selectFields } from 'Utils/matcher/fields';
import { connect } from 'react-redux';

@connect(state => ({
  fields: selectFields(state),
}))
class SandboxApp extends React.Component {
  scoreData = () => {

  };

  render() {
    const {
      fields,
      fieldKeys,
    } = this.props;

    // const fields = {
    //   'evidence1': '',
    // }
    // const scores ={
    //   factors: {
    //     'sactor1': '',
    //   },
    //   meta: {
    //     totalVariants: 0,
    //   }
    // }

    const profiles = [
      {
        key: 'abc123',
        title: 'randomProfile'
      }
    ]

    const isHybridMatch = false;
    const accountId = '-LLdoqU6yx6RkiGZqWws';

    const scoreData = computeFactors(profile, fields, accountId, { isHybridMatch });


    return (
      <MuiThemeProvider theme={muiTheme}>
        <ProfileForm
          fields={fields}
          fieldKeys={fieldKeys}
          scores={scoreData}
          profiles={profiles}
          profile={profile}
        />
      </MuiThemeProvider>
    );
  }
}

export default SandboxApp;
