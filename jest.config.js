const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.spec.json");

module.exports = {
	preset: "jest-preset-angular",
	roots: ["<rootDir>/src/"],
	testMatch: ["**/+(*.)+(spec).+(ts)"],
	setupFilesAfterEnv: ["<rootDir>/src/jestSetup.ts"],
	collectCoverage: true,
	coverageReporters: ["html"],
	coverageDirectory: "coverage/acacia-ready",
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
  	prefix: "<rootDir>/",
    globalSetup: 'jest-preset-angular/global-setup',
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    snapshotSerializers: [
      'jest-preset-angular/build/serializers/no-ng-attributes',
      'jest-preset-angular/build/serializers/ng-snapshot',
      'jest-preset-angular/build/serializers/html-comment'
    ]
	})
  }
