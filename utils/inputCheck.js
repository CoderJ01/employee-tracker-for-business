// utility to check if an object has the required properties
// e.g., inputCheck(object, 'prop1', 'prop2', 'etc')

var utilitiesCheck = (obj, ...props) => {
    const errors = [];

    props.forEach(prop => {
        // if property is blank or doesn't exist, add to errors array
        if (obj[prop] === undefined || obj[prop] === '') {
            errors.push(`No ${prop} specified`);
        }
    });

    if (errors.length) {
        return {
            errors: errors.join('')
        };
    }

    return null;
}

module.exports = utilitiesCheck;