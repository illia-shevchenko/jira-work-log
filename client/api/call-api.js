import queryString from 'querystring';

const defaultParams = {
  headers: {
    'content-type': 'application/json',
  },
};

class HttpError extends Error {
  constructor({ status, statusText }) {
    super(statusText);

    this.status = status;
  }
}

const getUrl = (resource) => `/api/${ resource }`;
const wrapFetch = (func) => async (...args) => {
  try {
    const response = await func(...args);

    if (!response.ok) {
      throw new HttpError(response);
    }

    return await response.json();
  } catch (error) {
    if (error.status === 401 && window.location.pathname !== '/') {
      window.location = '/';
    }

    throw error;
  }
};

export const get = wrapFetch((resource, params) => {
  const url = `${ getUrl(resource) }?${ queryString.stringify(params) }`;

  return fetch(url, Object.assign({
    method: 'GET',
    credentials: 'same-origin',
  }, defaultParams));
});

export const post = wrapFetch((resource, data) => {
  const url = getUrl(resource);

  return fetch(url, Object.assign({
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'same-origin',
  }, defaultParams));
});

