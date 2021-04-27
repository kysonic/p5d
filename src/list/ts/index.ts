import List from './list';
import config from '../../common/configs/config.json';

import '../scss/index.scss';

const list = new List('list', config.api.baseUrl);

list.fetchList();
