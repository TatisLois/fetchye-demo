import React, { useState } from 'react';
import { useFetchye } from 'fetchye';

const endpointComments = 'http://localhost:3004/comments'

// Example of shape with basic retry logic
// const options = {
//   errors: {
//     maxOnErrorRetry: 3,
//     onError: ({ key, error, options, run, retryOnErrorCount, maxOnErrorRetry }) => {
//       if (retryOnErrorCount < maxOnErrorRetry) {
//         run()
//       }
//     },
//   },
// };
const optionsOneKeepTrying = {
  errors: {
    maxOnErrorRetry: 3,
    onError: ({ key, error, options, run, retryOnErrorCount, maxOnErrorRetry }) => {
      console.group('arguments for onError')
      console.table({ key, error, options, run, retryOnErrorCount, maxOnErrorRetry })
      console.groupEnd()
      console.log(`retryOnErrorCount is ${retryOnErrorCount} out of maxOnErrorRetry: ${maxOnErrorRetry}`)
      if (retryOnErrorCount < maxOnErrorRetry) {
        console.log(`retryOnErrorCount: ${retryOnErrorCount} should be less then maxOnErrorRetry: ${maxOnErrorRetry}`)
        // Triggers the cycle again but with an updated retryOnErrorCount. In this way the consumer does not need to increment manually
        run()
      }
    },
  },
};

const optionsTwoSendAnalyticsAboutFailure = {
  errors: {
    maxOnErrorRetry: 3,
    onError: ({ key, error, options, run, retryOnErrorCount, maxOnErrorRetry }) => {
      console.group('arguments for onError')
      console.table({ key, error, options, run, retryOnErrorCount, maxOnErrorRetry })
      console.groupEnd()
      console.log(`retryOnErrorCount is ${retryOnErrorCount} out of maxOnErrorRetry: ${maxOnErrorRetry}`)
      // run once
      if (retryOnErrorCount < 0) {
        console.log(`retryOnErrorCount: ${retryOnErrorCount} should be less then maxOnErrorRetry: ${maxOnErrorRetry}`)
        // send log to splunk
        // navigator.sendBeacon(splunkEndpoint, {key, error //etc..})
      }
    },
  },
};



const fetcher = async (fetchClient, key, options) => {
  console.log('Message from inside fetcher');
  let payload;
  let error;
  try {
    throw('oh darn');
  } catch (requestError) {
    error = requestError;
  }

  return {
    payload,
    error,
  };
}

export function OnErrorExample() {
  const { isLoading, data, error } = useFetchye(endpointComments, optionsOneKeepTrying, fetcher)
  return (
    <>
      <h1> Example of onerror </h1>
      { data && JSON.stringify(data) }
    </>
  );
}