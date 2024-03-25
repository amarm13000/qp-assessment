import HTTPError from "./HTTPError";
class HTTPUnauthorized extends HTTPError {
  constructor(message = "Internal Server Error") {
    super(500, message);
  }
}

export default HTTPUnauthorized;
