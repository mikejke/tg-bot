import nconf from 'nconf';

nconf.argv().env().file('config.json');
