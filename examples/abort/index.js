import React, { useState } from 'react';
import { useFetchye } from 'fetchye';

const endpointPosts = 'http://localhost:3004/posts'
const endpointComments = 'http://localhost:3004/comments'

const fetcher = async (fetchClient, key, options) => {
  let payload;
  let error;
  console.group('custom fetcher passed in options:')
  console.log(options)
  console.groupEnd()
  try {
    const res = await fetchClient(key)
    const response = await res.json();
    payload = {
      data: response,
      ok: res.ok,
      status: res.status,
    }
  } catch (requestError) {
    error = requestError;
  }

  return {
    payload,
    error,
  };
}

export function AbortExample() {
  const [isMount, setIsMount] = useState(true)
  const buttonCopy = isMount ? 'unmount component' : 'mount component'
  // Is not unmounted and will always complete the request cycle.
  useFetchye(endpointComments)
  return (
    <>
      <h1> Example of abort controller </h1>
      <button onClick={() => setIsMount((toggle) => !toggle)}> {buttonCopy} </button>
      { isMount && <AbortChild /> }
    </>
  );
}

function AbortChild() {
  const { data } = useFetchye(endpointPosts, {}, fetcher)
  return (
    <>
      <h1> Child component making useFetchye call </h1>
      { data && JSON.stringify(data) }
    </>
  );
}