const yup = require('yup');

const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).+$/;
const pwdRegexMsg = 'Your password is too weak :o';
const rolesRegex = /^manager|employee|admin/
const rolesRegexMsg = 'roles must be  at least manager or employee or admin'


const createUserValidator = yup.object().shape({

  username: yup.string().trim().required().min(3).max(50),
  //email: yup.string().trim().lowercase().required().email().max(255),
  roles: yup.array().required().min(1, 'must be at least one role').of(yup.string().trim().lowercase().matches(rolesRegex, rolesRegexMsg)),
  password: yup.string().required().min(8).max(64).matches(pwdRegex, pwdRegexMsg)
});

const updateUserValidator = yup.object().shape({

   //const { id, username, roles, active, password } = req.validatedData
  id:yup.string().required(),
 
  username: yup.string().trim().required().min(3).max(50),
  //email: yup.string().trim().lowercase().required().email().max(255),
  roles: yup.array().required().min(1, 'must be at least one role').of(yup.string().trim().lowercase().matches(rolesRegex, rolesRegexMsg)),
  active:yup.boolean().default(true),
  password: yup.string().min(8).max(64).matches(pwdRegex, pwdRegexMsg).default(null).nullable()
});


module.exports = { updateUserValidator,createUserValidator };