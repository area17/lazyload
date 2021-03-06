import isBreakpoint from '@area17/a17-helpers/src/utility/isBreakpoint'
import purgeProperties from '@area17/a17-helpers/src/utility/purgeProperties'

// see https://code.area17.com/a17/fe-boilerplate/wikis/js-functions-createBehavior

function Behavior(node, config = {}) {
  if (!node || !(node instanceof Element)) {
    throw new Error('Node argument is required');
  }

  this.node = node;
  this.options = Object.assign({}, config.options || {});

  this.__subBehaviors = [];
  this.__isEnabled = false;
  this.__children = config.children;

  // Auto-bind all custom methods to "this"
  this.customMethodNames.forEach(methodName => {
    this[methodName] = this[methodName].bind(this);
  });

  return this;
}

Behavior.prototype = Object.freeze({
  init() {
    // Get options from data attributes on node
    const regex = new RegExp('^data-' + this.name + '-(.*)', 'i');
    for (let i = 0; i < this.node.attributes.length; i++) {
      const attr = this.node.attributes[i];
      const matches = regex.exec(attr.nodeName);

      if (matches != null && matches.length >= 2) {
        if (this.options[matches[1]]) {
          console.warn(
            `Ignoring ${
              matches[1]
            } option, as it already exists on the ${name} behavior. Please choose another name.`
          );
        }
        this.options[matches[1]] = attr.value;
      }
    }

    // Behavior-specific lifecycle
    if (this.lifecycle.init != null) {
      this.lifecycle.init.call(this);
    }

    if (this.lifecycle.resized != null) {
      this.__resizedBind = this.__resized.bind(this);
      window.addEventListener('resized', this.__resizedBind);
    }

    if (this.lifecycle.mediaQueryUpdated != null || this.options.media) {
      this.__mediaQueryUpdatedBind = this.__mediaQueryUpdated.bind(this);
      window.addEventListener('mediaQueryUpdated', this.__mediaQueryUpdatedBind);
    }

    if (this.options.media) {
      this.__toggleEnabled();
    } else {
      this.enable();
    }
  },
  destroy() {
    if (this.__isEnabled === true) {
      this.disable();
    }

    // Behavior-specific lifecycle
    if (this.lifecycle.destroy != null) {
      this.lifecycle.destroy.call(this);
    }

    this.__subBehaviors.forEach(sub => {
      sub.destroy();
    });

    if (this.lifecycle.resized != null) {
      window.removeEventListener('resized', this.__resizedBind);
    }

    if (this.lifecycle.mediaQueryUpdated != null || this.options.media) {
      window.removeEventListener('mediaQueryUpdated', this.__mediaQueryUpdatedBind);
    }

    purgeProperties(this);
  },
  getChild(childName, context, multi = false) {
    if (context == null) {
      context = this.node;
    }
    if (this.__children != null && this.__children[childName] != null) {
      return this.__children[childName];
    }
    return context[multi ? 'querySelectorAll' : 'querySelector'](
      '[data-' + this.name.toLowerCase() + '-' + childName.toLowerCase() + ']'
    );
  },
  getChildren(childName, context) {
    return this.getChild(childName, context, true);
  },
  isEnabled() {
    return this.__isEnabled;
  },
  enable() {
    this.__isEnabled = true;
    if (this.lifecycle.enabled != null) {
      this.lifecycle.enabled.call(this);
    }
  },
  disable() {
    this.__isEnabled = false;
    if (this.lifecycle.disabled != null) {
      this.lifecycle.disabled.call(this);
    }
  },
  addSubBehavior(Behavior, node, config = {}) {
    const subBehavior = new Behavior(node, config);
    subBehavior.behaviorName = this.name;
    subBehavior.init();
    this.__subBehaviors.push(subBehavior);
    return subBehavior;
  },
  __toggleEnabled() {
    const isValidMQ = isBreakpoint(this.options.media);
    if (isValidMQ && !this.__isEnabled) {
      this.enable();
    } else if (!isValidMQ && this.__isEnabled) {
      this.disable();
    }
  },
  __mediaQueryUpdated() {
    if (this.lifecycle.mediaQueryUpdated != null) {
      this.lifecycle.mediaQueryUpdated.call(this);
    }
    if (this.options.media) {
      this.__toggleEnabled();
    }
  },
  __resized() {
    if (this.lifecycle.resized != null) {
      this.lifecycle.resized.call(this);
    }
  },
});

const createBehavior = (name, def, lifecycle = {}) => {
  const fn = function(...args) {
    Behavior.apply(this, args);
  };

  const customMethodNames = [];

  const customProperties = {
    name: {
      get() {
        return this.behaviorName;
      },
    },
    behaviorName: {
      value: name,
      writable: true,
    },
    lifecycle: {
      value: lifecycle,
    },
    customMethodNames: {
      value: customMethodNames,
    },
  };

  // Expose the definition properties as 'this[methodName]'
  const defKeys = Object.keys(def);
  defKeys.forEach(key => {
    customMethodNames.push(key);
    customProperties[key] = {
      value: def[key],
      writable: true,
    };
  });

  fn.prototype = Object.create(Behavior.prototype, customProperties);
  return fn;
};

export default createBehavior;
