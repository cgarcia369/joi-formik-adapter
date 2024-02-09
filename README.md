# joi-formik-adapter
An adapter of joi object validation to Formik validation schema

## Install

```sh
# npm
$ npm install joi-formik-adapter

```

## Usage

```TSX
import Joi from "joi";
import { Formik } from 'formik';
import { joiFormikAdapter } from 'joi-formik-adapter';

const Schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().optional()
}).messages({
        "any.required": "Required",
        "string.empty": "Required",
        "number.base": "Invalid number"
    })
};

const Component = () => (
  <Formik
    validationSchema={joiFormikAdapter(Schema)}
  >
    {...}
  </Formik>
);
```