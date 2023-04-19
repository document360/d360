import Configstore from "configstore";
import pkg from "../../package.json";

const configStore = new Configstore(
    `${pkg.name}-${process.env.NODE_ENV || 'production'}`
);

export default configStore;









