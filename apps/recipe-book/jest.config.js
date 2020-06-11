module.exports = {
  name: 'recipe-book',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/recipe-book',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
