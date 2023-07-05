// roles.js
const AccessControl = require("accesscontrol");
const access = new AccessControl();

access.grant("user")
    .readOwn("profile")
    .updateOwn("profile")

access.grant("admin")
    .extend("user")
    .readAny("profile")
    // .updateAny("profile")

// access.grant("super")
//  .extend("user")
//  .extend("admin")
//  .updateAny("profile")
//  .deleteAny("profile")
module.exports = access