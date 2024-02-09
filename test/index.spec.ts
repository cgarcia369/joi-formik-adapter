import Joi from "joi";
import { joiFormikAdapter } from "../index";

const getJoiSchema = () => {
  return {
    schema: Joi.object({
      name: Joi.string().required(),
      age: Joi.number().optional()
    }).messages({
      "any.required": "Required",
      "string.empty": "Required",
      "number.base": "Invalid number"
    })
  };
};
describe("JoiAdapter", () => {
  it("should pass without any error", async () => {
    const obj = {
      name: "John",
      age: 20
    };
    const { schema } = getJoiSchema();
    const { validate } = joiFormikAdapter(schema);
    expect(await validate(obj)).toBeUndefined();
  });
  it("should return a validation error", async () => {
    const obj = {
      name: "",
      age: ""
    };
    const validationError = {
      inner: [
        {
          path: "name",
          message: "Required"
        },
        {
          path: "age",
          message: "Invalid number"
        }
      ]
    };
    const { schema } = getJoiSchema();
    const { validate } = joiFormikAdapter(schema);
    await expect(validate(obj)).rejects.toMatchObject(validationError);
  });
  it("should not return any error in optional fields", async () => {
    const obj = {
      name: "John",
      age: undefined
    };
    const { schema } = getJoiSchema();
    const { validate } = joiFormikAdapter(schema);
    expect(await validate(obj)).toBeUndefined();
  });
});
