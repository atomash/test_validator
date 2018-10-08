const Joi = require('joi');

const schema = Joi.object({
	name: Joi.string().max(10).required(),
	age: Joi.number().min(18).required().options({
		language: {
			number: {
				min: '{{limit}}+'
			}	
		}
	}),
	test: Joi.number().min(18).required()
});

const user = {
	name: 'test',
	age: 17,
	test: 7
}

const options = {
	abortEarly: false,
	language: {
		key: '',
        string: {
			base: 'not string',
			max: 'max {{limit}} characres'
		},
		any: { empty: 'is required' },
		
    }
};

const result = Joi.validate(user, schema, options);
const errors = [];

if (result.error) {
	result.error.details.forEach(function (detail) {
		errors.push({
			key: detail.path[0],
			message: detail.message
		});
	})
}

console.log(errors);

// schema.validate(user, options)
// 	.then(valid => {
// 		console.log(JSON.stringify(valid) + 'create')
// 	})
// 	.catch(errors => {
// 		console.log(errors)
// 	})