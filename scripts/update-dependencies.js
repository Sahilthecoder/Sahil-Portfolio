const { execSync } = require('child_process');

const packagesToUpdate = [
    'braces',
    'chokidar',
    'micromatch',
    'webpack',
    'react-typewriter-effect'
];

console.log('Starting dependency updates...');

packagesToUpdate.forEach(package => {
    try {
        console.log(`\nUpdating ${package}...`);
        execSync(`npm update ${package}`, { stdio: 'inherit' });
        console.log(`✅ Successfully updated ${package}`);
    } catch (error) {
        console.log(`❌ Failed to update ${package}: ${error.message}`);
    }
});

console.log('\nUpdating all other packages...');
execSync('npm update', { stdio: 'inherit' });

console.log('\nRebuilding package-lock.json...');
execSync('npm install', { stdio: 'inherit' });

console.log('\nChecking for vulnerabilities...');
execSync('npm audit', { stdio: 'inherit' });

console.log('\nAll updates completed!');
