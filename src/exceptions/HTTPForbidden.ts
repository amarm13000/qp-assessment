import HTTPError from "./HTTPError";
class HTTPForbidden extends HTTPError {
  constructor(message = "Bad Request") {
    super(403, message);
  }
}

export default HTTPForbidden;