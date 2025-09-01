import { execSync } from 'node:child_process'

export const prepare = async () => {
    console.log('🔨 Running DXT build as part of semantic-release prepare step...');
    return execSync('npm run build:dxt', { stdio: 'inherit' });
}