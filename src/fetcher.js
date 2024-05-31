/**
 * Example use:
 * import Fetcher from '{path_to}/fetcher.js';
 * const fetcher = new Fetcher("api");
 * 
 * function App() {
 *   const [freelancers, setFreelancers] = useState([]);
 *   
 *   useEffect(() => {
 *     fetcher.route("freelancers").get(setFreelancers);
 *   }, [])  
 * }
 * 
 * Note: route fn saves string inside fetcher, so if you call a fetch method w/o setting a route it might have an old route saved
 */
class Fetcher {
  /**
   * Init new Fetcher with a common base route
   * E.g: const fetcher = new Fetcher("api");
   * @param {String} baseRoute to apply to all subsequent fetch calls
   */
  constructor(baseRoute) {
    if (baseRoute[0] !== '/')
      baseRoute = '/' + baseRoute;
    this.baseRoute = baseRoute;
    this.subRoutes = "";
    this.headers = { 'Content-Type': 'application/json' };
  }

  // TODO: make any necessary changes for using Firebase uid instead of token
  setToken(token) {
    if (token) this.headers['Authorization'] = `Bearer ${token}`;
    else delete this.headers['Authorization'];

    return this; // facilitate chaining
  }

  /**
   * Join all given routes into one string, w/ route elements separated by a '/'
   * @param {Array} routes (individual elements will be coerced into strings)
   * @returns {String} combined path
   */
  static joinRoutes(routes) {
    if (!Array.isArray(routes)) return "";

    // join individual strings in routes with a "/" to build a path
    let result = routes.join('/');
    // collapse repeating '/'s into one, in case extras were created during the join
    result = result.replace(/\/+/g, '/');

    return result;
  }

  /**
   * @returns full path currently recorded in the fetcher
   */
  url() {
    return Fetcher.joinRoutes([this.baseRoute, this.subRoutes]);
  }

  /**
   * Sets the sub routes to add onto base route when building full path, chain before any fetch call to ensure correct route
   * E.g: fetcher.route("freelancers").get(setFreelancers) or fetcher.route(["freelancer", id]).get(setFreelancer)
   * @param {String | Array} routes to set, '/'s are not needed if argument is an array
   * @returns {Fetcher} this, to facilitate chaining
   */
  route(routes) {
    if (Array.isArray(routes)) {
      this.subRoutes = Fetcher.joinRoutes(routes);
    } else if (typeof (routes) === "string") {
      this.subRoutes = routes;
    } else {
      console.error(`Error: fetcher.route provided with invalid routes: ${routes}`);
    }

    return this;
  }
  addRoute(route) {
    this.subRoutes = Fetcher.joinRoutes([this.subRoutes, route]);

    return this;
  }

  /**
   * Generic async fetch function that takes in all relevant fetch information
   * - cathes fetch errors, making it safe 
   * - can be used independently of any Fetcher instance
   * @param {String} url to fetch from
   * @param {Object} obj containing optional data
   * @param {String} obj.method passed to fetch ("GET"[default], "DELETE", "PUT", or "POST")
   * @param {Object} obj.headers passed to fetch
   * @param {Object} obj.body passed to fetch
   * @param {Function} obj.useResult callback which is called with the result of the fetch as the only argument
   * @returns {Promise} which will resolve to undefined or the result of the fetch, usually an Object
   */
  static async safe(url, { method, headers, body, useResult }) {
    if (!method) method = "GET";
    try {
      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body),
      });
      if (!response.ok) return;
      const json = await response.json();

      if (useResult instanceof Function) {
        useResult(json);
      }
      return json;
    } catch (error) {
      console.error(`Error fetching(${method ?? ""}) ${url}: ${error}`);
    }
  }

  /** Middleman function to reduce repetition by applying all relevant internal properties */
  async do({ method, body, useResult }) {
    return Fetcher.safe(this.url(), { method, headers: this.headers, body, useResult });
  }

  /**
  * Gets the route recorded in this fetcher, and applies a callback to the result.
  * @param {Function | undefined} useResult to use fetch result w/o having to await
   * @returns {Promise} which will resolve to an object or undefined
  */
  async get(useResult) {
    return this.do({ useResult });
  }
  /**
  * Deletes at the route recorded in this fetcher, and applies a callback to the result.
  * @param {Function | undefined} useResult to use fetch result w/o having to await
   * @returns {Promise} which will resolve to an object or undefined
  */
  async delete(useResult) {
    return this.do({ method: "DELETE", useResult });
  }
  /**
  * Creates a new entry at the route recorded in this fetcher, and applies a callback to the result.
   * @param {Object} body passed to the fetch request
  * @param {Function | undefined} useResult to use fetch result w/o having to await
   * @returns {Promise} which will resolve to an object or undefined
  */
  async post(body, useResult) {
    return this.do({ method: "POST", body, useResult });
  }
  /**
  * Edits an individual entry at the route recorded in this fetcher, and applies a callback to the result.
   * @param {Object} body passed to the fetch request
  * @param {Function | undefined} useResult to use fetch result w/o having to await
   * @returns {Promise} which will resolve to an object or undefined
  */
  async put(body, useResult) {
    return this.do({ method: "PUT", body, useResult });
  }
  /**
   * Edits an individual entry at the route recorded in this fetcher using the PATCH method, and applies a callback to the result.
   * @param {Object} body passed to the fetch request
   * @param {Function | undefined} useResult to use fetch result without having to await
   * @returns {Promise} which will resolve to an object or undefined
   */
  async patch(body, useResult) {
    return this.do({ method: "PATCH", body, useResult });
  }
}

export default Fetcher;