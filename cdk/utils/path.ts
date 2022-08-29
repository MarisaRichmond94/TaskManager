import { spawnSync } from 'child_process';

const getBasePath = () => {
  return spawnSync('git', [ 'rev-parse', '--show-toplevel' ]).stdout.toString().trim();
};

export {
  getBasePath,
};
