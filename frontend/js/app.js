import './polyfills/polyfills.js';
import resized from '@area17/a17-helpers/src/utility/resized'
import * as Behaviors from './behaviors';
import manageBehaviors from './functions/manageBehaviors';
import lazyload from '@area17/a17-lazyload';

// HTML4 browser?
if (!A17.browserSpec || A17.browserSpec === 'html4') {
  // lets kill further JS execution of A17 js here
  throw new Error('HTML4');
}

document.addEventListener('DOMContentLoaded', function(){
  // go go go
  manageBehaviors(Behaviors);

  // on resize, check
  resized();

  // lazy load
  lazyload();
});
