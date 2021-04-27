import '../scss/index.scss';
import config from '../../common/configs/config.json';
import Project from './Project';

new Project('project', config.api.baseUrl);
