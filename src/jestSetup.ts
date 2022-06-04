import 'jest-preset-angular/setup-jest';
import 'jest-preset-angular';

global['CSS'] = null;

// const mock = () => {
//   let storage = {};
//   return {
//     getItem: key => (key in storage ? storage[key] : null),
//     setItem: (key, value) => (storage[key] = value || ''),
//     removeItem: key => delete storage[key],
//     clear: () => (storage = {})
//   };
// };

var localStorageMock = (function() {
    var store = {};
    return {
      getItem: function(key) {
        return store[key];
      },
      setItem: function(key, value) {
        store[key] = value.toString();
      },
      clear: function() {
        store = {};
      },
      removeItem: function(key) {
        delete store[key];
      }
    };
  })();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
Object.defineProperty(window, 'sessionStorage', { value: localStorageMock });
Object.defineProperty(window, 'CSS', { value: null });

Object.defineProperty(window, 'getComputedStyle', {
value: () => {
  return {
    display: 'none',
    appearance: ['-webkit-appearance'],
  };
},
});

Object.defineProperty(document, 'doctype', {
value: '<!DOCTYPE html>',
});

Object.defineProperty(document.body.style, 'transform', {
value: () => {
  return {
    enumerable: true,
    configurable: true,
  };
},
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance'],
      getPropertyValue: prop => {
        return '';
      }
    };
  }
});


