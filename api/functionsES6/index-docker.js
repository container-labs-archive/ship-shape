// @flow
/*
 * This file is to use the graphql api locally for development or in a Docker image
 * NOTE: subscriptions do not work this way
 */
import app from './server';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server is ready on', `http://localhost:${PORT}`);
});
