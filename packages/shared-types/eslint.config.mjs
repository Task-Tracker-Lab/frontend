import baseConfig from '../../eslint.config.mjs';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([...baseConfig, globalIgnores(['dist/**'])]);

export default eslintConfig;
