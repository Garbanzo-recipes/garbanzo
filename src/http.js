import 'whatwg-fetch';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';

const isPlainObject = (obj) => {
  const isObject = val => val != null
      && typeof val === 'object'
      && Array.isArray(val) === false
      && Object.prototype.toString.call(val) === '[object Object]';

  const hasModifiedConstructor = o => typeof o.constructor !== 'function';
  const hasModifiedPrototype = o => isObject(o.constructor.prototype) === false;
  const hasSpecificMethod = o => Object.prototype.hasOwnProperty.call(o, 'isPrototypeOf');

  return isObject(obj)
    && !hasModifiedConstructor(obj)
    && !hasModifiedPrototype(obj)
    && hasSpecificMethod(obj);
};

const sequentialPromises = funcs => funcs.reduce((promise, func) => promise
  .then(result => func().then(Array.prototype.concat.bind(result))),
Promise.resolve([]));

class Http {
  defaults = {};

  interceptors = {
    request: [],
    response: [],
  };

  constructor(defaults = {}, interceptors = null) {
    this.defaults = defaults;

    if (interceptors) {
      this.interceptors = interceptors;
    }
  }

  static install(Vue, options) {
    this.defaults = options;
    Vue.prototype.$http = this; // eslint-disable-line no-param-reassign
  }

  async request(options) {
    // baseUrl if set
    if (this.defaults.baseUrl) {
      options.baseUrl = this.defaults.baseUrl; // eslint-disable-line no-param-reassign
    }

    return sequentialPromises([
      ...this.interceptors.request,
      () => Http.request(options),
      ...this.interceptors.response,
    ]);
  }

  static async request(options) {
    // TODO: deep copy options into opts?
    // handle http errors if wanted
    // "signal" for cancellation

    const headers = options.headers || {};

    let body = options.data;
    if (isPlainObject(body) || Array.isArray(body)) {
      body = JSON.stringify(body);

      if (!headers.keys().includes('Content-Type')) {
        headers['Content-Type'] = 'application/json';
      }
    } else if (!(body instanceof Blob)) {
      body = options.data.toString();
    }

    if (options.data instanceof String && !headers.keys().includes('Content-Type')) {
      headers['Content-Type'] = 'text/plain';
    }

    if (options.auth) {
      const auth = btoa(`${options.auth.username}:${options.auth.password}`);
      headers.Authorization = `Basic ${auth}`;
    }

    if (options.withCredentials) {
      options.credentials = 'include'; // eslint-disable-line no-param-reassign
    }

    return Promise.race([
      fetch(options.url, Object.assign(options, {
        method: options.method ? options.method.toUpperCase() : 'GET',
        body,
        headers,
      })),
      new Promise((resolve, reject) => {
        if (options.timeout !== 0) {
          setTimeout(() => reject(new Error('timeout'), options.timeout));
        }
      }),
    ]);
  }
}

['get', 'delete', 'head', 'options'].forEach((method) => {
  // eslint-disable-next-line func-names
  Http[method] = function (url, options = null) {
    return Http.request(Object.assign({
      method,
      url,
    }, options));
  };

  // eslint-disable-next-line func-names
  Http.prototype[method] = function (url, options = null) {
    return this.request(Object.assign({
      method,
      url,
    }, options));
  };
});

['post', 'put', 'patch'].forEach((method) => {
  // eslint-disable-next-line func-names
  Http[method] = function (url, data = null, options = null) {
    return Http.request(Object.assign({
      method,
      url,
      data,
    }, options));
  };

  // eslint-disable-next-line func-names
  Http.prototype[method] = function (url, data = null, options = null) {
    return this.request(Object.assign({
      method,
      url,
      data,
    }, options));
  };
});

export default new Http();
