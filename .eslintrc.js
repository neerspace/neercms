module.exports = {
  root: true,
  // ignorePatterns: [
  //   'projects/**/*'
  // ],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.*?.json'],
        createDefaultProgram: true,
      },
      plugins: ['no-relative-import-paths'],
      extends: [
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:prettier/recommended',
      ],
      rules: {
        'max-len': ['error', { code: 140 }],
        '@angular-eslint/directive-selector': [
          'error',
          { type: 'attribute', prefix: 'app', style: 'camelCase' },
        ],
        '@angular-eslint/component-selector': [
          'off',
          { type: 'element', prefix: 'app', style: 'kebab-case' },
        ],
        '@angular-eslint/no-host-metadata-property': ['error', { allowStatic: true }],
        'no-relative-import-paths/no-relative-import-paths': [
          'error',
          {
            allowSameFolder: true,
            rootDir: 'src',
          },
        ],
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        'max-len': ['error', { code: 140 }],
      },
    },
  ],
};
