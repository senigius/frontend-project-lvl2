install:
		npm ci

gendiff:
		node bin/gendiff.js

test:
		NODE_OPTIONS=--experimental-vm-modules npx jest