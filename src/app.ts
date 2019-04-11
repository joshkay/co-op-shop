import express = require('express');

import * as mainConfig from './config/main';
import * as clientConfig from './config/client';

const application = express();

mainConfig.init(application, express);
clientConfig.init(application, express);

export const app = application;