import HTTPError from "./HTTPError";
class HTTPUnauthorized extends HTTPError {
    constructor(message = 'Unauthorized user') {
        super(401, message);
    }
}

export default HTTPUnauthorized