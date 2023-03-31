const fs = require('fs');
const path = require('path');

function createComponent(componentName) {
  const componentDirPath = path.join(process.cwd(), componentName);

  // Create the component directory
  fs.mkdirSync(componentDirPath);

  // Create the tsx file and write the import statement for the scss file
  const componentTsxPath = path.join(componentDirPath, `${componentName}.tsx`);
  const componentTsxContent = `import styles from './${componentName}.module.scss';

  function ${componentName}() {
    return (
      <div className={styles.${componentName}}>
        {/* Your component JSX goes here */}
      </div>
    );
  }

  export default ${componentName};
  `;

  fs.writeFileSync(componentTsxPath, componentTsxContent);

  // Create the scss file
  const componentScssPath = path.join(
    componentDirPath,
    `${componentName}.module.scss`
  );
  const componentScssContent = `.${componentName} {
    /* Your component styles go here */
  }
  `;

  fs.writeFileSync(componentScssPath, componentScssContent);

  return componentName;
}

if (require.main === module) {
  // The script was invoked from the command line
  if (process.argv.length < 3) {
    console.log('No component name supplied');
    process.exit(1);
  }

  const componentName = process.argv[2];
  const result = createComponent(componentName);
  console.log(`The ${result} component has been created.`);
} else {
  // The script was imported as a module
  module.exports = createComponent;
}
