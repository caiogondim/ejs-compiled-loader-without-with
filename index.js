const ejs = require('ejs');
const uglify = require('uglify-js');

module.exports = function (source) {
  this.cacheable && this.cacheable();
  const template = ejs.compile(source, {
    client: true,
    filename: '.',
    webpack: this,
    _with: false
  });

  const ast = uglify.parser.parse(template.toString());

  return 'module.exports = ' + uglify.uglify.gen_code(ast, { beautify: true });
};
