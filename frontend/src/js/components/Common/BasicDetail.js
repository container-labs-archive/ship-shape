// @flow

import * as React from 'react';
import Typography from '@material-ui/core/Typography';

const getBasicDetails = (props) => {
  const {
    data: {
      job: {
        mostRecentPanelMatch: {
          profile,
          // jobTitle,
          jobSummary,
          dateOfPanel,
          // jobMatchNumber,
          isEvaluation,
        },
        // panelMembers,
        jobTitle,
        // jobSummary used to be here
        // jobSummary,
        jobNumber,
      },
    },
  } = props;

  let dayOfWeek;
  let month;
  let day;
  let year;

  const isStringDate = isNaN(dateOfPanel);
  if (isStringDate) {
    dayOfWeek = '';
    [year, month, day] = dateOfPanel.split('-');
  } else {
    [dayOfWeek, month, day, year, _] = new Date(parseInt(dateOfPanel, 10)).toString().split(' ');
  }

  return [
    {
      title: 'Job Title',
      content: jobTitle,
    },
    {
      title: 'Job Number',
      content: jobNumber,
    },
    {
      title: 'Job Summary',
      content: jobSummary,
    },
    {
      title: 'Date of Panel',
      content: `${dayOfWeek} ${day} / ${month} / ${year}`,
    },
    {
      title: 'Profile',
      // TODO: more null checking on profiles
      content: isEvaluation ? 'No Profile' : (profile ? profile.title : ''),
    },
  ];
};

type Props = {
  classes: Object,
  data: Object,
}

class BasicDetail extends React.PureComponent<Props> {
  render() {
    const { classes } = this.props;
    const basicDetails = getBasicDetails(this.props);

    return (
      <div className={classes.detailGroup}>
        {basicDetails.map(({ title, content }, index) => (
          <div className={classes.detail} key={`detail-${index}`}>
            <Typography
              variant="caption"
              className={classes.detailTitle}
              gutterBottom
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              className={classes.detailContent}
              gutterBottom
            >
              {content}
            </Typography>
          </div>
        ))}
      </div>
    );
  }
}

export default BasicDetail;
