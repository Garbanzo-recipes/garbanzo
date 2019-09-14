import 'whatwg-fetch';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';

const isPlainObject = (o) => {
  const isObject = o => val != null
      && typeof val === 'object'
      && Array.isArray(val) === false
      && Object.prototype.toString.call(o) === '[object Object]';

  const hasModifiedConstructor = o => typeof o.constructor !== 'function';
  const hasModifiedPrototype = o => isObject(o.constructor.prototype) === false;
  const hasSpecificMethod = o => o.constructor.prototype.hasOwnProperty('isPrototypeOf');

  return isObject(o) && !hasModifiedConstructor(o) && !hasModifiedPrototype(o) && hasSpecificMethod(o);
}

const sequentialPromises = funcs => funcs.reduce((promise, func) => promise
  .then(result => func().then(Array.prototype.concat.bind(result)))
, Promise.resolve([]));

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
    Vue.prototype.$http = this;
  }

  async request(options) {
    // baseUrl if set

    return sequentialPromises([
      ...interceptors.request,
      () => Http.request(options),
      ...interceptors.response,
    ]);
  }

  static async request(options) {
    // handle http errors if wanted
    // "signal" for cancellation

    let headers = options.headers || {};

    let body = options.data;
    if (isPlainObject(data) || Array.isArray(data)) {
      body = JSON.stringify(data);

      if (!headers.keys().includes('Content-Type')) {
        headers['Content-Type'] = 'application/json';
      }
    } else if (!body instanceof Blob) {
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
      options.credentials = 'include';
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
};

['get', 'delete', 'head', 'options'].forEach((method) => {
  Http[method] = function (url, options = null) {
    return Http.request(Object.assign({
      method,
      url,
    }, options));
  };

  Http.prototype[method] = function(url, options = null) {
    return this.request(Object.assign({
      method,
      url,
    }, options));
  };
});

['post', 'put', 'patch'].forEach((method) => {
  Http[method] = function (url, data = null, options = null) {
    return request(Object.assign({
      method,
      url,
      data,
    }, options));
  };

  Http.prototype[method] = function(url, data = null, options = null) {
    return this.request(Object.assign({
      method,
      url,
      data,
    }, options));
  };
});

export default new Http();