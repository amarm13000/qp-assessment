import HTTPError from "./HTTPError";
class HTTPBadRequest extends HTTPError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

export default HTTPBadRequest;