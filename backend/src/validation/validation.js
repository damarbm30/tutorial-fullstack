import { ResponseError } from "../error/response.js";

export const validate = (schema, req) => {
  const result = schema.validate(req, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (result.error) {
    throw new ResponseError(400, result.error.message);
  } else {
    return result.value;
  }
};
